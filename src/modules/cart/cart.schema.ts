import { z } from "zod";

export const addCartItemSchema = z.object({
  body: z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product id"),

    quantity: z.coerce
      .number()
      .int("Quantity must be an integer")
      .min(1, "Quantity must be at least 1")
      .default(1),
  }),
});

export type AddCartItemInput = z.infer<typeof addCartItemSchema>["body"];

export const updateCartItemSchema = z.object({
  params: z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product id"),
  }),

  body: z.object({
    quantity: z.coerce
      .number()
      .int("Quantity must be an Integer")
      .min(1, "Quantity must be at least 1"),
  }),
});

export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>["body"];
export type CartItemParams = z.infer<typeof updateCartItemSchema>["params"];
