"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState("Verifying...");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            setError("No token provided");
            setStatus("");
            return;
        }

        const verifyToken = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify?token=${token}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Verification failed");
                setStatus("✅ Verified! You are logged in.");
            } catch (err: any) {
                setError(err.message);
                setStatus("");
            }
        };

        verifyToken();
    }, [token]);

    return (
        <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl border border-zinc-200 shadow-sm text-center">
            {status && <p className="text-green-600 text-lg">{status}</p>}
            {error && <p className="text-red-600 text-lg">{error}</p>}
        </div>
    );
}
