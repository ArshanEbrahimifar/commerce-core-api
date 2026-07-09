import { AppError } from "../../utils/app-error";
import { Product } from "../product/product.model";
import { Cart } from "./cart.model";
import { AddCartItemInput, UpdateCartItemInput } from "./cart.schema";

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
export const getCartByUserId = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    return {
      user: userId,
      items: [],
    };
  }
  return cart;
};
export const updateCartItemQuantity = async (
  userId: string,
  productId: string,
  input: UpdateCartItemInput,
) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new AppError("User has no available cart", 404);
  }
  const item = cart.items.find(
    (value) => value.product.toString() === productId,
  );
  if (!item) {
    throw new AppError("Item not found in cart", 404);
  }
  item.quantity = input.quantity;

  await cart.save();
  return cart;
};
