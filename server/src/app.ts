import express from "express";
import authRoutes from "./features/auth/auth.routes";
import cors from "cors";

export const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", // фронтенд
    credentials: true,               // якщо плануєш cookies/JWT
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use("/auth", authRoutes);


