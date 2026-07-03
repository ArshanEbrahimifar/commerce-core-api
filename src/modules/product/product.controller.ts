import { type AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { createProduct } from "./product.service";
import { type CreateProductInput } from "./product.shema";

export const createProductController = asyncHandler(async (req, res) => {
  const input = req.body as CreateProductInput;
  const { userId } = req as AuthenticatedRequest;

  const product = await createProduct(input, userId);

  res.status(209).json({
    success: true,
    message: "Product created successfully",
    data: {
      product,
    },
  });
});
