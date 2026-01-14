"use client";

import React, { useState } from "react";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Registration failed");

            setMessage("Реєстрація успішна ✅");
        } catch (err: any) {
            setMessage(err.message || "Помилка при реєстрації ❌");
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Login failed");

            localStorage.setItem("token", data.token);
            setMessage("Вхід успішний ✅");
        } catch (err: any) {
            setMessage(err.message || "Помилка при вході ❌");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col w-80 gap-4 p-6 bg-white rounded-2xl shadow-md">
                <h2 className="text-xl font-bold text-center">Авторизація</h2>

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="button"
                    onClick={handleRegister}
                    disabled={loading}
                    className="mt-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                    Зареєструватись
                </button>

                <button
                    type="button"
                    onClick={handleLogin}
                    disabled={loading}
                    className="py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition disabled:opacity-50"
                >
                    Увійти
                </button>

                {message && (
                    <p className="text-center mt-2 text-sm text-gray-700">{message}</p>
                )}
            </div>
        </div>
    );
}
