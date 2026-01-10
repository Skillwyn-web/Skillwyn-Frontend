"use client";

import { RippleButton } from "@/components/ui/RippleButton";
import Link from "next/link";

const ArrowRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

const PlayCircle = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
);

export function HeroSection() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden bg-black text-white pt-20">
            {/* Background Gradients/Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />

            {/* Navigation Arrows */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-zinc-600 hover:text-white transition-colors hidden md:block hover:scale-110 active:scale-95">
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-zinc-600 hover:text-white transition-colors hidden md:block hover:scale-110 active:scale-95">
                <ChevronRight className="w-8 h-8" />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
                {/* Badge */}
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm animate-fade-in-up"
                    style={{ animationDelay: "0ms" }}
                >
                    <span className="text-xs font-semibold text-blue-400">✨ New: System Design Bootcamp</span>
                </div>

                {/* Headline */}
                <h1
                    className="text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-fade-in-up"
                    style={{ animationDelay: "100ms" }}
                >
                    Structured chaos into <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient-x">
                        hireable skills.
                    </span>
                </h1>

                {/* Subhheading */}
                <p
                    className="max-w-2xl text-lg text-zinc-400 animate-fade-in-up"
                    style={{ animationDelay: "200ms" }}
                >
                    The all-in-one platform for developers. Interactive roadmaps, LeetCode-style practice, and mentorship to crack MAANG interviews.
                </p>

                {/* Buttons */}
                <div
                    className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up"
                    style={{ animationDelay: "300ms" }}
                >
                    <RippleButton
                        className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        rippleColor="rgba(0, 0, 0, 0.1)"
                    >
                        Start Your Roadmap
                        <ArrowRight className="w-4 h-4" />
                    </RippleButton>

                    <RippleButton
                        className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-zinc-900 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors"
                    >
                        <PlayCircle className="w-4 h-4" />
                        Watch Demo
                    </RippleButton>
                </div>
            </div>
        </section>
    );
}
