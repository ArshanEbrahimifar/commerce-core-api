import { type AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { AppError } from "../../utils/app-error";
import { asyncHandler } from "../../utils/async-handler";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findProductById,
  updateProduct,
} from "./product.service";
import {
  GetProductParams,
  GetProductsQuery,
  UpdateProductInput,
  type CreateProductInput,
} from "./product.shema";

export const createProductController = asyncHandler(async (req, res) => {
  const input = req.body as CreateProductInput;
  const { userId } = req as AuthenticatedRequest;

  const product = await createProduct(input, userId);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: {
      product,
    },
  });
});

export const getProductsController = asyncHandler(async (req, res) => {
  const query = req.query as unknown as GetProductsQuery;

  const { products, pagination } = await findAllProducts(query);
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    results: products.length,
    pagination,
    data: {
      products,
    },
  });
});

export const getProductController = asyncHandler(async (req, res) => {
  const { productId } = req.params as GetProductParams;
  const product = await findProductById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }
  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: {
      product,
    },
  });
});

export const updateProductController = asyncHandler(async (req, res) => {
  const input = req.body as UpdateProductInput;
  const { userId } = req as AuthenticatedRequest;
  const { productId } = req.params as GetProductParams;
  const product = await updateProduct(productId, input, userId);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: {
      product,
    },
  });
});

export const deleteProductController = asyncHandler(async (req, res) => {
  const { productId } = req.params as GetProductParams;
  const { userId } = req as AuthenticatedRequest;

  await deleteProduct(productId, userId);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
