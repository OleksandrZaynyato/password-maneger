import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {loginUser, registerUser, verifyMagicToken} from "./auth.service";
import { sendEmail } from "../../shared/utils/email";
import {getLoginInfo} from "../../shared/utils/loginInfo"; // we’ll define it next

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
    console.log("VERIFY CONTROLLER HIT");

    const { token } = req.query;
    if (!token || typeof token !== "string") {
        return res.status(400).json({ message: "Token required" });
    }

    try {
        const user = await verifyMagicToken(token);

        // 🔐 Create JWT
        const jwtToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        res.cookie("auth", jwtToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // 📍 Login info
        const { ip, userAgent, time } = getLoginInfo(req);

        // ✉️ Send security email
        await sendEmail(
            user.email,
            "New login to your account",
            `
Hello,

You have successfully logged in.

📅 Time: ${time}
🌍 IP address: ${ip}
💻 Device: ${userAgent}

If this wasn't you, please contact support immediately.
`
        );

        return res.json({ message: "Logged in" });
    } catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email required" });
    }

    const { user, token } = await loginUser({ email });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const magicLink = `${frontendUrl}/verify?token=${token}`;

    await sendEmail(
        user.email,
        "Your login link",
        `Click to login: ${magicLink}`
    );

    return res.json({ message: "Login link sent" });
};

export const me = async (req: Request, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Not logged in" });

        res.json({ user: { email: (req.user as any).email, userId: (req.user as any).userId } });
    } catch (err) {
        console.error("ME endpoint error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const logout = async (_req: Request, res: Response) => {
    res.clearCookie("auth", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
    res.json({ message: "Logged out" });
};
