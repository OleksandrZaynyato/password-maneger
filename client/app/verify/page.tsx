"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function VerifyPage() {
    const params = useSearchParams();
    const router = useRouter();
    const token = params.get("token");
    const { setEmail } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        async function verify() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify?token=${token}`, {
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Verification failed");

                const data = await res.json();
                setEmail(data.user.email); // ✅ update global state
                router.replace("/"); // redirect home
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        verify();
    }, [token, router, setEmail]);

    if (loading) return <p className="text-center py-16">Verifying…</p>;

    return null;
}
