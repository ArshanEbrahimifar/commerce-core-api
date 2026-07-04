import { Router } from "express";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import { createProductSchema, getProductSchema } from "./product.shema";
import {
  createProductController,
  getProductController,
  getProductsController,
} from "./product.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  requireAuth,
  validateResource(createProductSchema),
  createProductController,
);
router.get("/", getProductsController);

router.get(
  "/:productId",
  validateResource(getProductSchema),
  getProductController,
);

export default router;
