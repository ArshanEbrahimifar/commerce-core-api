import { type Request, type Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { LoginUserInput, type RegisterUserInput } from "./user.schema";
import { createUser, findUserByEmail } from "./user.service";
import { AppError } from "../../utils/app-error";
import { signAccessToken } from "../../utils/jwt";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const input = req.body as RegisterUserInput;
    const user = await createUser(input);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  },
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const input = req.body as LoginUserInput;
    const user = await findUserByEmail(input.email);
    if (!user) {
      throw new AppError("Invalid Email or Password", 401);
    }

    const isPasswordValid = await user.comparePassword(input.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid Email or Password", 401);
    }

    const accessToken = signAccessToken({ userId: user._id.toString() });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: {
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  },
);
