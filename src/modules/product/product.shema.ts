import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Product name must be at least 2 characters")
      .max(100, "Product name must be at most 100 characters"),
    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must be at most 1000 characters"),
    price: z.coerce.number().positive(),
    stock: z.coerce
      .number()
      .int("Stock must be an Integer")
      .min(0, "Stock can not be negative")
      .default(0),
    category: z
      .string()
      .trim()
      .min(2, "Category must be at least 2 characters")
      .max(50, "Category must be at most 50 characters")
      .transform((value) => value.toLowerCase()),
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>["body"];

export const getProductSchema = z.object({
  params: z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product id"),
  }),
});

export type GetProductParams = z.infer<typeof getProductSchema>["params"];

export const updateProductSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Product name must be at least 2 characters")
        .max(100, "Product name must be at most 100 characters")
        .optional(),
      description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must be at most 1000 characters")
        .optional(),
      price: z.coerce
        .number()
        .positive("Price must be greater than zero")
        .optional(),
      stock: z.coerce
        .number()
        .int("Stock must be an Integer")
        .min(0, "Stock can not be negative")
        .default(0)
        .optional(),
      category: z
        .string()
        .trim()
        .min(2, "Category must be at least 2 characters")
        .max(50, "Category must be at most 50 characters")
        .transform((value) => value.toLowerCase())
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is requireds",
    }),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>["body"];
