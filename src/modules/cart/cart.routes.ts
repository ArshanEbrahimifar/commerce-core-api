import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import { addCartItemSchema } from "./cart.schema";
import { addCartItemController, getCartController } from "./cart.controller";

const router = Router();

router.get("/", requireAuth, getCartController);

router.post(
  "/items",
  requireAuth,
  validateResource(addCartItemSchema),
  addCartItemController,
);

export default router;
