import { AppError } from "../../utils/app-error";
import { Cart } from "../cart/cart.model";
import { Order } from "./order.model";

export const createOrderFromCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }
  const orderItems = cart.items.map((item) => {
    const product = item.product as any;

    if (!product || !product._id) {
      throw new AppError("Product not found", 404);
    }

    return {
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const totalAmount = orderItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    status: "pending",
  });

  cart.items = [];

  await cart.save();

  return order;
};

export const getOrderByUserId = async (userId: string) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};

export const getOrderById = async (userId: string, orderId: string) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }
  return order;
};

export const cancelOrder = async (userId: string, orderId: string) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order.status !== "pending") {
    throw new AppError("Only pending orders can be cancelled", 400);
  }
  order.status = "cancelled";
  await order.save();

  return order;
};
