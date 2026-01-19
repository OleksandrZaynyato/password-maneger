import { Request, Response } from "express";
import { registerUser, verifyMagicToken } from "./auth.service";
import { sendEmail } from "../../shared/utils/email"; // we’ll define it next

export const register = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const { user, token } = await registerUser({ email });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const magicLink = `${frontendUrl}/verify?token=${token}`;

    // Send email
    await sendEmail(user.email, "Your Magic Link", `Click to login: ${magicLink}`);

    return res.json({ message: "Magic link sent" });
};

export const verify = async (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token || typeof token !== "string") return res.status(400).json({ message: "Token required" });

    try {
        const user = await verifyMagicToken(token);
        // TODO: generate JWT here if you want session
        return res.json({ message: "User verified", user });
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
};
