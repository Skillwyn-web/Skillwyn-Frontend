"use client";

import Link from "next/link";
import Image from "next/image";
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

const TypewriterText = () => {
    const texts = [
        "Join 35K+ job-ready developers.",
        "Master DSA & product development.",
        "Get ATS-friendly resumes instantly.",
        "Ace your next technical interview."
    ];
    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            timeout = setTimeout(() => {
                setDisplayedText(currentText.substring(0, displayedText.length - 1));
                if (displayedText.length === 1) {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }, 30);
        } else {
            timeout = setTimeout(() => {
                setDisplayedText(currentText.substring(0, displayedText.length + 1));
                if (displayedText.length === currentText.length) {
                    timeout = setTimeout(() => setIsDeleting(true), 2000);
                }
            }, 60);
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, textIndex, texts]);

    return (
        <span className="!text-white">
            {displayedText}
            <span className="animate-pulse text-[#3b82f6]">|</span>
        </span>
    );
};

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const getNextPath = () => {
        if (typeof window === "undefined") return "/";
        const next = new URLSearchParams(window.location.search).get("next");
        return next && next.startsWith("/") ? next : "/";
    };

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
            router.replace(getNextPath());
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Signup failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const next = encodeURIComponent(getNextPath());
        window.location.href = `/api/auth/google?next=${next}`;
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Panel - Hidden on mobile */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-[#0B1A56] p-12 relative overflow-hidden m-4 rounded-[2.5rem] shadow-2xl">
                {/* Glow effects */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3" />
                
                {/* Logo */}
                <div className="relative z-10 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
                        <Image src="/skillwyn-logo.png" alt="SkillWyn" width={36} height={36} className="h-9 w-9 object-contain drop-shadow-md invert brightness-0" />
                    </div>
                    <span className="text-[26px] font-black tracking-tight !text-white">SkillWyn</span>
                </div>

                {/* Hero Text with Typing Effect */}
                <div className="relative z-10 max-w-xl pr-8">
                    <h1 className="text-[44px] font-semibold leading-[1.3] !text-white tracking-tight mb-4">
                        Start your journey to <br />
                        <span className="inline-block min-h-[120px]">
                            <TypewriterText />
                        </span>
                    </h1>
                </div>

                {/* Footer Text */}
                <div className="relative z-10 text-[14px] font-medium !text-[#88a5ff]">
                    Create an account to continue your tech journey
                </div>
            </div>

            {/* Right Panel - Signup Form */}
            <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-[420px]">
                    <h2 className="text-[36px] font-bold tracking-tight !text-[#102a7a] mb-3">Create Account</h2>
                    <p className="text-[15px] font-medium !text-slate-500 mb-10">Enter your details to create your AI learning identity</p>

                    {error && (
                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
                            <svg className="h-5 w-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-bold text-red-800">Signup Error</h3>
                                <p className="mt-1 text-sm font-medium text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="mb-2.5 block text-sm font-bold !text-[#334155]">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 px-5 py-4 text-[15px] font-medium !text-slate-900 placeholder:!text-slate-400 outline-none transition-all hover:border-slate-300 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10 shadow-sm"
                                    placeholder="Jane Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-sm font-bold !text-[#334155]">Email address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 px-5 py-4 text-[15px] font-medium !text-slate-900 placeholder:!text-slate-400 outline-none transition-all hover:border-slate-300 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10 shadow-sm"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2.5 block text-sm font-bold !text-[#334155]">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 px-5 py-4 pr-12 text-[15px] font-medium !text-slate-900 placeholder:!text-slate-400 outline-none transition-all hover:border-slate-300 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10 shadow-sm"
                                        placeholder="Min 8 characters"
                                        minLength={8}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#102a7a] transition-colors cursor-pointer"
                                    >
                                        {showPassword ? <EyeOffIcon className="w-[22px] h-[22px]" /> : <EyeIcon className="w-[22px] h-[22px]" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2.5 block text-sm font-bold !text-[#334155]">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 px-5 py-4 pr-12 text-[15px] font-medium !text-slate-900 placeholder:!text-slate-400 outline-none transition-all hover:border-slate-300 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10 shadow-sm"
                                        placeholder="Repeat password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#102a7a] transition-colors cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOffIcon className="w-[22px] h-[22px]" /> : <EyeIcon className="w-[22px] h-[22px]" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <RippleButton
                            className="w-full rounded-2xl bg-[#2563eb] py-4 text-[16px] font-bold !text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_12px_25px_rgba(37,99,235,0.35)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </RippleButton>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 font-bold text-slate-400 text-[11px] uppercase tracking-[0.1em]">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-4 text-[15px] font-bold !text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60"
                            >
                                <GoogleIcon className="h-[22px] w-[22px] transition-transform group-hover:scale-110" />
                                Google
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-[15px] font-medium !text-slate-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-bold !text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
