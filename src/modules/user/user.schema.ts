import { z } from "zod";

export const registerUserSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
      email: z.string().trim().email("invalid Email address").toLowerCase(),
      password: z.string().min(8, "Password must be at least 8 characters"),
      passwordConfirmation: z.string(),
    })
    .refine(
      (data) => {
        data.password === data.passwordConfirmation;
      },
      {
        message: "Password do not match",
        path: ["passwordConfirmation"],
      },
    ),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().trim().email("invalid Email address").toLowerCase(),
    password: z.string().min(1, "Password is required"),
  }),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>["body"];
export type LoginUserInput = z.infer<typeof loginUserSchema>["body"];
