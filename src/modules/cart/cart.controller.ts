import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { AddCartItemInput } from "./cart.schema";
import { addItemToCart } from "./cart.service";

export const addCartItemController = asyncHandler(async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const input = req.body as AddCartItemInput;

  const cart = await addItemToCart(userId, input);

  res.status(200).json({
    success: true,
    message: "Item added to cart successfully",
    data: {
      cart,
    },
  });
});
