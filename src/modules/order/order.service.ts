import { AppError } from "../../utils/app-error";
import { Cart } from "../cart/cart.model";
import { Product } from "../product/product.model";
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

    if (product.stock < item.quantity) {
      throw new AppError(`Not enough stock for ${product.name}`, 400);
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

  for (const item of cart.items) {
    const product = item.product as any;

    product.stock -= item.quantity;

    await product.save();
  }

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

  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: {
        stock: item.quantity,
      },
    });
  }

  order.status = "cancelled";

  await order.save();

  return order;
};
