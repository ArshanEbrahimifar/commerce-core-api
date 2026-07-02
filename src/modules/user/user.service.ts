import { AppError } from "../../utils/app-error";
import { IUser, User } from "./user.model";
import { type RegisterUserInput } from "./user.schema";

export const createUser = async (input: RegisterUserInput) => {
  const existingUser = await User.exists({ email: input.email });
  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }
  const user = await User.create({
    name: input.name,
    email: input.email,
    password: input.password,
  });
  return User.findById(user._id).orFail();
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email }).select("+password");
};

export const findUserById = async (userId: string) => {
  return User.findById(userId);
};
