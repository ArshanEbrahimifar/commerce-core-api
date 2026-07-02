import { type Request, type Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { type RegisterUserInput } from "./user.schema";
import { createUser } from "./user.service";

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
