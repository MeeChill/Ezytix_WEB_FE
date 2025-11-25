/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "../lib/axios";

// =======================
// User type dari backend
// =======================

export interface User {
    id: number;
    full_name: string;
    username: string;
    email: string;
    phone: string;
    role: "customer" | "admin";
    created_at: string;
    updated_at: string;
}

// =======================
// Auth context type
// =======================

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// =======================
// Provider (VERSION SIMPLE)
// =======================

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await api.get("/auth/me", { withCredentials: true });
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// =======================
// Hook
// =======================

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
