import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { createOrderController } from "./order.controller";

const router = Router();

router.get("/", requireAuth, createOrderController);

export default router;
