import { Router } from "express";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import {
  createProductSchema,
  getProductSchema,
  getProductsSchema,
  updateProductSchema,
} from "./product.shema";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  updateProductController,
} from "./product.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", validateResource(getProductsSchema), getProductsController);

router.get(
  "/:productId",
  validateResource(getProductSchema),
  getProductController,
);

router.post(
  "/",
  requireAuth,
  validateResource(createProductSchema),
  createProductController,
);

router.patch(
  "/:productId",
  requireAuth,
  validateResource(updateProductSchema),
  updateProductController,
);

router.delete(
  "/:productId",
  requireAuth,
  validateResource(getProductSchema),
  deleteProductController,
);

export default router;
