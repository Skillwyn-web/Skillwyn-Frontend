'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    role: 'admin' | 'user';
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => Promise<void>;
    isAdmin: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const res = await fetch('/api/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                    cache: 'no-store',
                });

                if (!res.ok) {
                    setUser(null);
                    return;
                }

                const currentUser = await res.json();
                setUser(currentUser);
            } catch (error) {
                console.error('Failed to load current user', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        void loadCurrentUser();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Logout request failed', error);
        } finally {
            setUser(null);
            router.push('/login');
        }
    };

    const value = {
        user,
        login,
        logout,
        isAdmin: user?.role === 'admin',
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
