"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

export interface Password {
    id: string;
    title: string;
    website: string;
    userLogin: string;
    password: string;
}

interface AddPasswordFormProps {
    onAdd: (password: Password) => void;
}

export default function AddPasswordForm({ onAdd }: AddPasswordFormProps) {
    const [newPassword, setNewPassword] = useState<Omit<Password, "id">>({
        title: "",
        website: "",
        userLogin: "",
        password: "",
    });

    const handleAdd = async () => {
        if (!newPassword.title || !newPassword.website || !newPassword.userLogin || !newPassword.password) return;

        try {
            const res = await fetch(`${API_URL}/password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(newPassword),
            });
            if (!res.ok) throw new Error("Failed to create password");

            const data: Password = await res.json();
            onAdd(data);
            setNewPassword({ title: "", website: "", userLogin: "", password: "" });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={newPassword.title}
                    onChange={(e) => setNewPassword({ ...newPassword, title: e.target.value })}
                    className="px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500"
                />
                <input
                    type="text"
                    placeholder="Website"
                    value={newPassword.website}
                    onChange={(e) => setNewPassword({ ...newPassword, website: e.target.value })}
                    className="px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500"
                />
                <input
                    type="text"
                    placeholder="User/Login"
                    value={newPassword.userLogin}
                    onChange={(e) => setNewPassword({ ...newPassword, userLogin: e.target.value })}
                    className="px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500"
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={newPassword.password}
                    onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
                    className="px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-100 focus:border-rose-500"
                />
            </div>
            <button
                onClick={handleAdd}
                className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-400 transition font-medium"
            >
                Add
            </button>
        </div>
    );
}
