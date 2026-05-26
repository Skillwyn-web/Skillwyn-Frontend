"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { RippleButton } from "@/components/ui/RippleButton";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Signup failed");
            }

            login(data);
            router.replace("/profile");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Signup failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="page-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
            <div className="absolute inset-0 z-0 pointer-events-none page-grid opacity-50" />

            <div className="relative z-10 w-full max-w-md animate-fade-in-up">
                <div className="mb-12 flex justify-center">
                    <Link href="/" className="group relative flex h-20 w-20 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 shadow-2xl transition-all hover:scale-105 active:scale-95">
                        <span className="text-2xl font-black text-primary">SW</span>
                    </Link>
                </div>

                <div className="theme-card overflow-hidden p-8 sm:p-12">
                    <div className="mb-10 text-center">
                        <h1 className="mb-3 text-4xl font-black text-ink">Join SkillWyn</h1>
                        <p className="text-text-muted font-bold uppercase text-[10px]">Create your AI learning identity</p>
                    </div>

                    {error ? (
                        <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-xs font-bold text-red-500 uppercase tracking-wider">
                            {error}
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-text-muted uppercase ml-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="theme-input text-sm font-bold placeholder:text-text-muted"
                                placeholder="Jane Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-text-muted uppercase ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="theme-input text-sm font-bold placeholder:text-text-muted"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-text-muted uppercase ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="theme-input text-sm font-bold placeholder:text-text-muted"
                                placeholder="Min 8 chars"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-text-muted uppercase ml-1">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="theme-input text-sm font-bold placeholder:text-text-muted"
                                placeholder="Repeat password"
                            />
                        </div>

                        <RippleButton
                            className="theme-button w-full py-4 text-xs uppercase disabled:opacity-50"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : "Create Account"}
                        </RippleButton>
                    </form>

                    <p className="mt-12 text-center text-[10px] font-black uppercase text-text-muted">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary transition-colors hover:text-secondary ml-1">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
