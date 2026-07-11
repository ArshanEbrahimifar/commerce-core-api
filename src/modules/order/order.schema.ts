import { z } from "zod";

export const getOrderSchema = z.object({
  params: z.object({
    orderId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid order id"),
  }),
});

export type GetOrdersParams = z.infer<typeof getOrderSchema>["params"];
