"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const { email, logout } = useAuth();

    return (
        <header className="border-b border-zinc-200 bg-white">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-rose-600">
                    Password Manager
                </Link>

                <nav className="flex gap-3 items-center">

                    {email ? (
                        <>
                            <span className="text-zinc-700">Hello, {email}</span>
                            <button
                                onClick={logout}
                                className="px-4 py-2 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-400 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded-lg border border-zinc-300 text-zinc-800 hover:border-rose-400 hover:text-rose-600 transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-500 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
