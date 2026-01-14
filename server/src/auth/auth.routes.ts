import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import clientPromise from "../config/DB";
import { Collection, Document } from "mongodb";

interface User extends Document {
    email: string;
    password: string;
}

interface PasswordResetToken extends Document {
    email: string;
    token: string;
    expiresAt: Date;
}

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    const client = await clientPromise;
    const db = client.db();
    const usersCollection: Collection<User> = db.collection("users");

    const existing = await usersCollection.findOne({ email });
    if (existing) return res.status(400).json({ message: "User exists" });

    const hashed: string = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ email, password: hashed });

    res.json({ message: "User registered" });
});

router.post("/login", async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;

    const client = await clientPromise;
    const db = client.db();
    const usersCollection: Collection<User> = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid: boolean = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token: string = jwt.sign({ email }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
    });

    res.json({ token });
});

router.post("/forgot-password", async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;

    const client = await clientPromise;
    const db = client.db();
    const tokenCollection: Collection<PasswordResetToken> = db.collection("passwordResetTokens");

    const token: string = crypto.randomBytes(32).toString("hex");

    await tokenCollection.insertOne({
        email,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 хв
    });

    res.json({ resetToken: token });
});

export default router;
