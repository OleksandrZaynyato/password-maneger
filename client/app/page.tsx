"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import AddPasswordForm, { Password } from "@/components/AddPasswordForm";
import PasswordTable from "@/components/PasswordTable";
import { API_URL } from "@/lib/api";

export default function HomePage() {
    const { email, loading } = useAuth();
    const [passwords, setPasswords] = useState<Password[]>([]);

    const fetchPasswords = async () => {
        try {
            const res = await fetch(`${API_URL}/password`, {
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch passwords");
            const data = await res.json();
            setPasswords(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (email) fetchPasswords();
    }, [email]);

    const handleAdd = (newPassword: Password) => {
        setPasswords((prev) => [...prev, newPassword]);
    };

    const handleDelete = (id: string) => {
        setPasswords((prev) => prev.filter((p) => p.id !== id));
    };

    if (loading) return <p className="text-center py-16">Loading…</p>;

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">
                {email ? `Welcome back, ${email}!` : "Password Manager"}
            </h1>

            <AddPasswordForm onAdd={handleAdd} />
            <PasswordTable passwords={passwords} onDelete={handleDelete} />
        </div>
    );
}
