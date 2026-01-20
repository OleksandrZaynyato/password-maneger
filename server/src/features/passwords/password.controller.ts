import { Request, Response } from "express";
import * as passwordService from "./password.service";

export const createPassword = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId; // auth middleware should provide this
        const { userLogin, title, website, password } = req.body;

        if (!userLogin || !title || !website || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const savedPassword = await passwordService.createPassword({
            userId,
            userLogin,
            title,
            website,
            password,
        });

        res.status(201).json(savedPassword);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getUserPasswords = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const passwords = await passwordService.getPasswordsByUser(userId);
        res.json(passwords);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const deletePassword = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;

        const deleted = await passwordService.deletePassword(id, userId);
        if (!deleted) return res.status(404).json({ message: "Password not found" });

        res.json({ message: "Password deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};