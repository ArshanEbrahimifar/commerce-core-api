import { Router } from "express";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./product.shema";
import {
  createProductController,
  getProductController,
  getProductsController,
  updateProductController,
} from "./product.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", getProductsController);

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

export default router;
