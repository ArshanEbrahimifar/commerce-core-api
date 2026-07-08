import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import { addCartItemSchema } from "./cart.schema";
import { addCartItemController } from "./cart.controller";

const router = Router();

router.post(
  "/items",
  requireAuth,
  validateResource(addCartItemSchema),
  addCartItemController,
);

export default router;
