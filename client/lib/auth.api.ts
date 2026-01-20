import {API_URL} from "./api";

export const requestMagicLink = async (email: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Request failed");
    }

    return res.json();
};

export const getMe = async () => {
    try {
        const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
};

export const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
};
