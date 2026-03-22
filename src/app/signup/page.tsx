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
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black [.light-theme_&]:bg-[#F7F4EA] px-4 py-20 text-white transition-colors duration-300">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/20 [.light-theme_&]:bg-blue-400/10 blur-[120px] opacity-40 animate-pulse-slow" />
                <div className="absolute inset-0 bg-[linear-gradient(#ffffff03_1px,transparent_1px),linear-gradient(90deg,#ffffff03_1px,transparent_1px)] [.light-theme_&]:bg-[linear-gradient(#00000005_1px,transparent_1px),linear-gradient(90deg,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            </div>

            <div className="relative z-10 w-full max-w-md animate-fade-in-up">
                <div className="mb-12 flex justify-center">
                    <Link
                        href="/"
                        className="group relative flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white shadow-2xl transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="text-3xl font-black text-black tracking-tighter">DP</span>
                        <div className="absolute inset-0 -translate-x-full overflow-hidden rounded-[2rem] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
                    </Link>
                </div>

                <div className="overflow-hidden rounded-[3rem] border border-zinc-800 [.light-theme_&]:border-black/5 bg-zinc-900/40 [.light-theme_&]:bg-white/80 p-8 shadow-2xl backdrop-blur-2xl sm:p-12 transition-all">
                    <div className="mb-10 text-center">
                        <h1 className="mb-3 text-4xl font-black tracking-tighter text-white [.light-theme_&]:text-zinc-900 uppercase">Join Elite</h1>
                        <p className="text-zinc-500 [.light-theme_&]:text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Initialize your DevPath identity</p>
                    </div>

                    {error ? (
                        <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-xs font-bold text-red-500 uppercase tracking-wider">
                            {error}
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Identity</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-2xl border border-zinc-800 [.light-theme_&]:border-black/5 bg-zinc-950/50 [.light-theme_&]:bg-zinc-50 px-5 py-4 text-sm font-bold text-white [.light-theme_&]:text-zinc-900 placeholder-zinc-700 [.light-theme_&]:placeholder-zinc-400 transition-all focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none"
                                placeholder="JANE DOE"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Vector Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-2xl border border-zinc-800 [.light-theme_&]:border-black/5 bg-zinc-950/50 [.light-theme_&]:bg-zinc-50 px-5 py-4 text-sm font-bold text-white [.light-theme_&]:text-zinc-900 placeholder-zinc-700 [.light-theme_&]:placeholder-zinc-400 transition-all focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none"
                                placeholder="YOU@EXAMPLE.COM"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Access Logic</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="w-full rounded-2xl border border-zinc-800 [.light-theme_&]:border-black/5 bg-zinc-950/50 [.light-theme_&]:bg-zinc-50 px-5 py-4 text-sm font-bold text-white [.light-theme_&]:text-zinc-900 placeholder-zinc-700 [.light-theme_&]:placeholder-zinc-400 transition-all focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none"
                                placeholder="MIN 8 CHARS"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Verify Logic</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full rounded-2xl border border-zinc-800 [.light-theme_&]:border-black/5 bg-zinc-950/50 [.light-theme_&]:bg-zinc-50 px-5 py-4 text-sm font-bold text-white [.light-theme_&]:text-zinc-900 placeholder-zinc-700 [.light-theme_&]:placeholder-zinc-400 transition-all focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none"
                                placeholder="REPEAT ACCESS LOGIC"
                            />
                        </div>

                        <RippleButton
                            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 font-black text-xs uppercase tracking-[0.2em] text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "AUTHORIZING..." : "Initialize Session"}
                        </RippleButton>
                    </form>

                    <p className="mt-12 text-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        Acknowledge account?{" "}
                        <Link href="/login" className="text-blue-500 transition-colors hover:text-blue-400 ml-1">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
