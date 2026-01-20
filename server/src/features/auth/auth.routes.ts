import { Router } from "express";
import {login, logout, me, register, verify} from "./auth.controller";
import {authMiddleware} from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.get("/verify", verify);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.post("/logout", logout);

export default router;
