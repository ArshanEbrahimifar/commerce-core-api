import { Product } from "./product.model";
import { type CreateProductInput } from "./product.shema";

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
