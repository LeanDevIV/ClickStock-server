import { Router } from "express";
import { chatbotController } from "../controllers/chatbot.controller.js";

const router = Router();

router.post("/", chatbotController);

export default router;
