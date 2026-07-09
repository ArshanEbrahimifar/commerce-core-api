import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import { addCartItemSchema, updateCartItemSchema } from "./cart.schema";
import {
  addCartItemController,
  getCartController,
  updateCartItemController,
} from "./cart.controller";

const router = Router();

router.get("/", requireAuth, getCartController);

router.post(
  "/items",
  requireAuth,
  validateResource(addCartItemSchema),
  addCartItemController,
);

router.patch(
  "/items/:productId",
  requireAuth,
  validateResource(updateCartItemSchema),
  updateCartItemController,
);

export default router;
