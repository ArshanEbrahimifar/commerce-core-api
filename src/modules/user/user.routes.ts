import { Router } from "express";
import { validateResource } from "../../middlewares/validate-resource.middleware";
import { registerUserController } from "./user.controller";
import { registerUserSchema } from "./user.schema";

const router = Router();

router.post(
  "/register",
  validateResource(registerUserSchema),
  registerUserController,
);

export default router;
