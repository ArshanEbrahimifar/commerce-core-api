import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import {
  createOrderController,
  getMyOrderController,
} from "./order.controller";

const router = Router();

router.get("/", requireAuth, getMyOrderController);

router.post("/", requireAuth, createOrderController);

export default router;
