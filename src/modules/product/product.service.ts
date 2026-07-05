import { AppError } from "../../utils/app-error";
import { Product } from "./product.model";
import { UpdateProductInput, type CreateProductInput } from "./product.shema";

export const createProduct = async (
  input: CreateProductInput,
  userId: string,
) => {
  const product = await Product.create({
    name: input.name,
    description: input.description,
    price: input.price,
    stock: input.stock,
    category: input.category,
    createdBy: userId,
  });
  return product;
};

export const findAllProducts = async () => {
  return Product.find({}).sort({ createdAt: -1 });
};

export const findProductById = async (productId: string) => {
  return Product.findById(productId);
};

export const updateProduct = async (
  productId: string,
  input: UpdateProductInput,
  userId: string,
) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("The product does not exist", 404);
  }
  if (product.createdBy.toString() !== userId) {
    throw new AppError("You are not allowed to update this product", 403);
  }
  Object.assign(product, input);

  await product.save();
  return product;
};
