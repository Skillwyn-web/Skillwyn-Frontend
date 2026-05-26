"use client";

import Link from "next/link";
import { RippleButton } from "@/components/ui/RippleButton";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Icons
const GoogleIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const EyeOffIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.03 1.28-.08" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
)

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const getNextPath = () => {
        if (typeof window === "undefined") return "/profile";
        const next = new URLSearchParams(window.location.search).get("next");
        return next && next.startsWith("/") ? next : "/profile";
    };

    useEffect(() => {
        const oauthError = new URLSearchParams(window.location.search).get("error");
        if (oauthError) {
            setError("Google login failed. Check Google OAuth credentials and redirect URI.");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            login(data);
            router.replace(getNextPath());
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const next = encodeURIComponent(getNextPath());
        window.location.href = `/api/auth/google?next=${next}`;
    };

    const handleSocialLogin = async (provider: "github") => {
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/social-demo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ provider }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Social login failed");
            }

            login(data);
            router.replace(getNextPath());
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Social login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="page-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
            <div className="pointer-events-none absolute inset-0 z-0 page-grid opacity-50">
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md animate-fade-in-up">
                {/* Brand Logo Floating above */}
                <div className="flex justify-center mb-8">
                    <Link href="/" className="group relative flex h-16 w-16 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 shadow-[0_0_30px_rgba(102,227,255,0.16)] transition-transform hover:scale-105">
                        <span className="text-xl font-black text-primary">SW</span>
                    </Link>
                </div>

                <div className="theme-card overflow-hidden p-8 sm:p-10">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold text-ink">Welcome back</h1>
                        <p className="text-text-muted">Continue your AI learning journey</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-bold text-text-muted">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="theme-input placeholder:text-text-muted"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-bold text-text-muted">Password</label>
                                <Link href="#" className="text-xs text-primary hover:text-secondary transition-colors">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="theme-input pr-12 placeholder:text-text-muted"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <RippleButton
                            className="theme-button w-full py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </RippleButton>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border-subtle"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="rounded-lg bg-bg-card px-3 text-text-muted font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface/70 py-2.5 text-ink transition-all hover:border-primary/50 shadow-sm disabled:opacity-60"
                        >
                            <GoogleIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSocialLogin("github")}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface/70 py-2.5 text-ink transition-all hover:border-primary/50 shadow-sm disabled:opacity-60"
                        >
                            <GithubIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">GitHub</span>
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-text-muted">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-semibold text-primary hover:text-secondary transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
