import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import {
  cancelOrderController,
  createOrderController,
  getMyOrderController,
  getOrderController,
} from "./order.controller";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import { getOrderSchema } from "./order.schema";

const router = Router();

router.get("/", requireAuth, getMyOrderController);

router.get(
  "/:orderId",
  requireAuth,
  validateResource(getOrderSchema),
  getOrderController,
);

router.post("/", requireAuth, createOrderController);

router.patch(
  "/:orderId/cancel",
  requireAuth,
  validateResource(getOrderSchema),
  cancelOrderController,
);

export default router;
