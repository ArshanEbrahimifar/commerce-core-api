import { AppError } from "../../utils/app-error";
import { Product } from "../product/product.model";
import { Cart } from "./cart.model";
import { AddCartItemInput } from "./cart.schema";

export const addItemToCart = async (
  userId: string,
  input: AddCartItemInput,
) => {
  const product = await Product.findById(input.productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }
  const existingItem = cart.items.find(
    (item) => item.product.toString() === input.productId,
  );
  if (existingItem) {
    existingItem.quantity += input.quantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity: input.quantity,
    });
  }
  await cart.save();
  return cart;
};
