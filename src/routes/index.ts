import { Router } from "express";
import healthRoutes from "./health.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

router.use(healthRoutes);

router.use("/users", userRoutes);

export default router;
