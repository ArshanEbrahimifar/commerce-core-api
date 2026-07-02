import { Router } from "express";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import { loginUserController, registerUserController } from "./user.controller";
import { loginUserSchema, registerUserSchema } from "./user.schema";

const router = Router();

router.post(
  "/register",
  validateResource(registerUserSchema),
  registerUserController,
);

router.post("/login", validateResource(loginUserSchema), loginUserController);

export default router;
