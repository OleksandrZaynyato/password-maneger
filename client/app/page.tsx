"use client";

import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
    const { email, loading } = useAuth();

    if (loading) return null; // optional: loading placeholder

    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <h2 className="text-2xl font-semibold mb-4">
                {email ? `Welcome back, ${email}!` : "Securely store and manage your passwords."}
            </h2>
            <p className="text-zinc-700">
                {email
                    ? "You are logged in and ready to manage your passwords."
                    : "Please login or register to start using your password manager."}
            </p>
        </div>
    );
}
