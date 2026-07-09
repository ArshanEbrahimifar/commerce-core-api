import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import {
  addCartItemSchema,
  removeCartItemSchema,
  updateCartItemSchema,
} from "./cart.schema";
import {
  addCartItemController,
  getCartController,
  removeCartItemController,
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

router.delete(
  "/items/:productId",
  requireAuth,
  validateResource(removeCartItemSchema),
  removeCartItemController,
);

export default router;
