import { Router } from "express";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import {
  loginUserController,
  registerUserController,
  getMeController,
} from "./user.controller";
import { loginUserSchema, registerUserSchema } from "./user.schema";
import { requireAuth } from "../../middlewares/auth.middleware";
const router = Router();

router.post(
  "/register",
  validateResource(registerUserSchema),
  registerUserController,
);

router.post("/login", validateResource(loginUserSchema), loginUserController);

router.get("/me", requireAuth, getMeController);

export default router;
