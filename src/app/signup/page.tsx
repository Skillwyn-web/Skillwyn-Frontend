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
            router.push("/snap-code");
        } catch (err: any) {
            setError(err.message || "Signup failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-20 text-white">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/20 blur-[120px] opacity-40 animate-pulse-slow" />
                <div className="absolute inset-0 bg-[linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-md animate-fade-in-up">
                <div className="mb-8 flex justify-center">
                    <Link
                        href="/"
                        className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-transform hover:scale-105"
                    >
                        <span className="text-2xl font-black text-black">DP</span>
                        <div className="absolute inset-0 -translate-x-full overflow-hidden rounded-2xl bg-gradient-to-r from-transparent via-blue-400/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    </Link>
                </div>

                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">Create Account</h1>
                        <p className="text-zinc-400">Start your DevPath journey today</p>
                    </div>

                    {error ? (
                        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-500">
                            {error}
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                placeholder="Jane Doe"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                placeholder="At least 8 characters"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-zinc-300">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-white placeholder-zinc-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                placeholder="Re-enter password"
                            />
                        </div>

                        <RippleButton
                            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Sign Up"}
                        </RippleButton>
                    </form>

                    <p className="mt-8 text-center text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-blue-400 transition-colors hover:text-blue-300">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
