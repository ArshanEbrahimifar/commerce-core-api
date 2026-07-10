import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { createOrderFromCart } from "./order.service";

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
