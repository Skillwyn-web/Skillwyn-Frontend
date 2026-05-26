'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    role: 'admin' | 'user';
    name?: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => Promise<void>;
    isAdmin: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = 'skillwyn_current_user';
const AUTH_CLIENT_COOKIE = 'skillwyn_client_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadCurrentUser = async () => {
            const storedUser = readStoredUser();
            if (storedUser) {
                setUser(storedUser);
            }

            try {
                const res = await fetch('/api/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                    cache: 'no-store',
                });

                if (!res.ok) {
                    if (!storedUser) {
                        setUser(null);
                    }
                    return;
                }

                const currentUser = await res.json();
                setUser(currentUser);
                storeUser(currentUser);
            } catch (error) {
                console.error('Failed to load current user', error);
                if (!storedUser) {
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        void loadCurrentUser();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        storeUser(userData);
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
            clearStoredUser();
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

function readStoredUser(): User | null {
    if (typeof window === 'undefined') return null;

    try {
        const value = window.localStorage.getItem(AUTH_STORAGE_KEY);
        if (value) return JSON.parse(value) as User;

        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${AUTH_CLIENT_COOKIE}=`))
            ?.split('=')[1];

        return cookieValue ? JSON.parse(decodeCookieValue(cookieValue)) as User : null;
    } catch {
        return null;
    }
}

function storeUser(user: User) {
    if (typeof window === 'undefined') return;
    const value = JSON.stringify(user);
    window.localStorage.setItem(AUTH_STORAGE_KEY, value);
    document.cookie = `${AUTH_CLIENT_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

function clearStoredUser() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    document.cookie = `${AUTH_CLIENT_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

function decodeCookieValue(value: string) {
    let decoded = value;
    for (let i = 0; i < 2; i += 1) {
        try {
            decoded = decodeURIComponent(decoded);
        } catch {
            return decoded;
        }
    }
    return decoded;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
