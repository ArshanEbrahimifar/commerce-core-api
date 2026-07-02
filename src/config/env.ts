import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(3000),

  MONGODB_URI: z.string().url(),

  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),

  JWT_ACCESS_SECRET: z
    .string()
    .min(32, "JWT_ACCESS_SECRET must be at least 32 characters"),

  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
