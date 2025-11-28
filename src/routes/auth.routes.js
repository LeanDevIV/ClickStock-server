import { Router } from "express";
import { socialLoginController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/social", socialLoginController);

export default router;
