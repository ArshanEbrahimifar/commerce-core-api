import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { createOrderFromCart, getOrderByUserId } from "./order.service";

export const createOrderController = asyncHandler(async (req, res) => {
  const { userId } = req as AuthenticatedRequest;

  const order = await createOrderFromCart(userId);

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: {
      order,
    },
  });
});

export const getMyOrderController = asyncHandler(async (req, res) => {
  const { userId } = req as AuthenticatedRequest;

  const orders = await getOrderByUserId(userId);

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    results: orders.length,
    data: {
      orders,
    },
  });
});
