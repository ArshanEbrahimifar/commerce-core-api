import { Router } from "express";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import { createProductSchema } from "./product.shema";
import {
  createProductController,
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
export default router;
