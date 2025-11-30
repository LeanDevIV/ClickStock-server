import { Router } from "express";
import { socialLoginController } from "../controllers/auth.controller.js";
import { validateSchema } from "../middleware/zodValidator.js";
import { socialLoginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post(
  "/social",
  validateSchema(socialLoginSchema),
  socialLoginController
);

export default router;
