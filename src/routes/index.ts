import { Router } from "express";
import healthRoutes from "./health.routes";
import userRoutes from "../modules/user/user.routes";
import productRoutes from "../modules/product/product.routes";
const router = Router();

router.use(healthRoutes);

router.use("/users", userRoutes);

router.use("/products", productRoutes);

export default router;
