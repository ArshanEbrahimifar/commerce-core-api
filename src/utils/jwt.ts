import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

type AccessTokenPayLoad = {
  userId: string;
};
const accessTokenOptions: SignOptions = {
  expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
};

export const signAccessToken = (payload: AccessTokenPayLoad) => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, accessTokenOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayLoad;
};
