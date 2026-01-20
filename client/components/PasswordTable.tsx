"use client";

import { useState } from "react";
import { Password } from "./AddPasswordForm";
import { API_URL } from "@/lib/api";

interface PasswordTableProps {
    passwords: Password[];
    onDelete: (id: string) => void;
}

export default function PasswordTable({ passwords, onDelete }: PasswordTableProps) {
    const [visibleId, setVisibleId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/password/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to delete password");
            onDelete(id);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCopy = async (password: string) => {
        try {
            await navigator.clipboard.writeText(password);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
            <h2 className="text-xl font-semibold mb-4">Your Passwords</h2>

            {passwords.length === 0 ? (
                <p className="text-zinc-600">No passwords yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-zinc-100">
                            <th className="px-4 py-2 border-b">Title</th>
                            <th className="px-4 py-2 border-b">Website</th>
                            <th className="px-4 py-2 border-b">Login</th>
                            <th className="px-4 py-2 border-b">Password</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {passwords.map((p) => {
                            const isVisible = visibleId === p.id;

                            return (
                                <tr key={p.id} className="hover:bg-zinc-50">
                                    <td className="px-4 py-2 border-b">{p.title}</td>
                                    <td className="px-4 py-2 border-b">{p.website}</td>
                                    <td className="px-4 py-2 border-b">{p.userLogin}</td>

                                    <td className="px-4 py-2 border-b font-mono">
                                        {isVisible ? p.password : "••••••••"}
                                    </td>

                                    <td className="px-4 py-2 border-b flex gap-2">
                                        <button
                                            onClick={() => setVisibleId(isVisible ? null : p.id)}
                                            className="px-3 py-1 rounded-lg border border-zinc-300 hover:border-rose-400 hover:text-rose-600 transition"
                                        >
                                            {isVisible ? "Hide" : "Show"}
                                        </button>

                                        <button
                                            onClick={() => handleCopy(p.password)}
                                            className="px-3 py-1 rounded-lg border border-zinc-300 hover:border-emerald-400 hover:text-emerald-600 transition"
                                        >
                                            Copy
                                        </button>

                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-400 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
