import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/async-handler";
import {
  AddCartItemInput,
  CartItemParams,
  UpdateCartItemInput,
} from "./cart.schema";
import {
  addItemToCart,
  getCartByUserId,
  updateCartItemQuantity,
} from "./cart.service";

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
export const getCartController = asyncHandler(async (req, res) => {
  const { userId } = req as AuthenticatedRequest;

  const cart = await getCartByUserId(userId);

  res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    data: {
      cart,
    },
  });
});
export const updateCartItemController = asyncHandler(async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const input = req.body as UpdateCartItemInput;
  const { productId } = req.params as CartItemParams;

  const cart = await updateCartItemQuantity(userId, productId, input);

  res.status(200).json({
    success: true,
    message: "Cart item updated successfully",
    data: {
      cart,
    },
  });
});
