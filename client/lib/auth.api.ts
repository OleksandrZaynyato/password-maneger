import { API_URL } from "./api";

export const requestMagicLink = async (email: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Request failed");
    }

    return res.json();
};
