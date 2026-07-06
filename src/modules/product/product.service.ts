import { AppError } from "../../utils/app-error";
import { Product } from "./product.model";
import {
  GetProductsQuery,
  UpdateProductInput,
  type CreateProductInput,
} from "./product.shema";

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

export const findAllProducts = async (query: GetProductsQuery) => {
  const { search, category, minPrice, maxPrice, page, limit } = query;
  const filter: Record<string, any> = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceFilter: { $gte?: number; $lte?: number } = {};

    if (minPrice !== undefined) {
      priceFilter.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      priceFilter.$lte = maxPrice;
    }

    filter.price = priceFilter;
  }

  const skip = (page - 1) * limit;

  const [products, totalProducts] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    },
  };
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

export const deleteProduct = async (productId: string, userId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("the product not found", 404);
  }
  if (product.createdBy.toString() !== userId) {
    throw new AppError("you are not allowed to delete this product", 403);
  }

  await product.deleteOne();

  return product;
};
