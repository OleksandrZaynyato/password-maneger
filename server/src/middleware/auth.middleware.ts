import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../features/auth/auth.model";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.auth; // ✅ cookie-parser required
        if (!token) return res.sendStatus(401);

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const user = await User.findById(payload.userId).lean();
        if (!user) return res.sendStatus(401);

        req.user = { userId: user._id.toString(), email: user.email };
        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        return res.sendStatus(401);
    }
};
