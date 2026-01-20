"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getMe, logout as apiLogout } from "@/lib/auth.api";

interface AuthContextType {
    email: string | null;
    loading: boolean;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
    setEmail: (email: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    email: null,
    loading: true,
    logout: async () => {},
    refresh: async () => {},
    setEmail: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        try {
            const data = await getMe();
            setEmail(data?.user?.email || null);
        } catch {
            setEmail(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await apiLogout();
        setEmail(null);
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <AuthContext.Provider value={{ email, loading, logout, refresh, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
