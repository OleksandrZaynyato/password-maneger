"use client";

import { useState } from "react";
import { requestMagicLink } from "@/lib/auth.api";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            setLoading(true);
            await requestMagicLink(email);
            setSuccess("Registration link sent. Check your email.");
            setEmail("");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
            <h2 className="text-3xl font-bold mb-6">Register</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="px-4 py-3 rounded-lg border border-zinc-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                />

                <button
                    disabled={loading}
                    className="px-4 py-3 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-500 disabled:opacity-60 transition"
                >
                    {loading ? "Creating..." : "Create Account"}
                </button>
            </form>

            {success && <p className="text-green-600 mt-4">{success}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
    );
}
