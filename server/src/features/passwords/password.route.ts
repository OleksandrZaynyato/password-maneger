import { Router } from "express";
import * as passwordController from "./password.controller";
import { authMiddleware } from"../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, passwordController.createPassword);
router.get("/", authMiddleware, passwordController.getUserPasswords);
router.delete("/:id", authMiddleware, passwordController.deletePassword);

export default router;
