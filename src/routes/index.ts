import { Router } from "express";
import healthRoutes from "./health.routes";
import userRoutes from "../modules/user/user.routes";
import productRoutes from "../modules/product/product.routes";
import cartRoutes from "../modules/cart/cart.routes";
import orderRoutes from "../modules/order/order.routes";
const router = Router();

router.use(healthRoutes);

router.use("/users", userRoutes);

router.use("/products", productRoutes);

router.use("/cart", cartRoutes);

router.use("/orders", orderRoutes);

export default router;
