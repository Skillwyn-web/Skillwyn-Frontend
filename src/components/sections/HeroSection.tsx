"use client";

import { RippleButton } from "@/components/ui/RippleButton";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

// --- Icons ---
const ArrowRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
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

const PlayCircle = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
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

// --- Components ---

const GridBackground = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-300">
        {/* Dynamic Spotlight - Dark Mode Only */}
        <div
            className="absolute inset-0 z-20 pointer-events-none [.light-theme_&]:hidden"
            style={{
                background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0, 0, 0, 0.9) 100%)`,
            }}
        />

        {/* Global Mask */}
        <div
            className="absolute inset-0 z-10 bg-black [.light-theme_&]:bg-[#F7F4EA] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)] [.light-theme_&]:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,white_100%)]"
        />

        {/* Grid Pattern */}
        <div
            className="absolute inset-0 z-0 opacity-[0.1] [.light-theme_&]:opacity-[0.25]"
            style={{
                backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                color: 'inherit'
            }}
        />

        {/* Animated Background Orbs */}
        <motion.div
            animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 [.light-theme_&]:bg-purple-300/10 blur-[120px]"
        />
        <motion.div
            animate={{
                x: [0, -50, 0],
                y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 [.light-theme_&]:bg-blue-300/10 blur-[120px]"
        />
    </div>
);

const FloatingBadge = ({ text }: { text: string }) => (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 [.light-theme_&]:bg-white/80 border border-zinc-800 [.light-theme_&]:border-black/5 backdrop-blur-md animate-fade-in-up hover:border-zinc-700 [.light-theme_&]:hover:border-black/10 transition-all cursor-default mb-8 group shadow-sm">
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium text-zinc-300 [.light-theme_&]:text-zinc-600 group-hover:text-white [.light-theme_&]:group-hover:text-zinc-900 transition-colors uppercase tracking-wider text-[10px]">{text}</span>
    </div>
);

export function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className={`hero-section-bg relative flex flex-col items-center justify-center min-h-[95vh] px-4 overflow-hidden pt-20 transition-colors duration-300 bg-black [.light-theme_&]:bg-[#F7F4EA] text-white [.light-theme_&]:text-zinc-900`}>
            <GridBackground mousePosition={mousePosition} />

            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">
                {/* Badge */}
                <FloatingBadge text="New: System Design Bootcamp 2026" />

                {/* Main Headline */}
                <div className="space-y-4">
                    <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1] md:leading-[1.1] animate-fade-in-up"
                        style={{ animationDelay: "100ms" }}
                    >
                        Structured chaos into <br className="hidden md:block" />
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 pb-2">
                            hireable skills.
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h1>
                </div>

                {/* Subheading */}
                <p
                    className="max-w-2xl text-lg md:text-xl text-zinc-400 [.light-theme_&]:text-zinc-600 animate-fade-in-up leading-relaxed font-medium"
                    style={{ animationDelay: "200ms" }}
                >
                    The all-in-one platform for developers. Interactive roadmaps, LeetCode-style practice, and mentorship to crack MAANG interviews.
                </p>

                {/* Buttons */}
                <div
                    className="flex flex-col sm:flex-row items-center gap-5 animate-fade-in-up pt-6"
                    style={{ animationDelay: "300ms" }}
                >
                    <Link href="/roadmaps">
                        <RippleButton
                            className="group bg-white [.light-theme_&]:bg-zinc-900 text-black [.light-theme_&]:text-white rounded-full hover:bg-zinc-200 [.light-theme_&]:hover:bg-black shadow-[0_0_20px_rgba(255,255,255,0.2)] [.light-theme_&]:shadow-[0_0_20px_rgba(0,0,0,0.1)] active:scale-95 px-10 py-5 transition-all"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                        >
                            <span className="flex items-center gap-2 text-lg font-bold whitespace-nowrap">
                                Start Your Roadmap
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </RippleButton>
                    </Link>

                    <RippleButton
                        className="bg-zinc-900/50 [.light-theme_&]:bg-white/50 backdrop-blur-sm text-white [.light-theme_&]:text-zinc-900 rounded-full border border-zinc-800 [.light-theme_&]:border-black/5 hover:bg-zinc-800 [.light-theme_&]:hover:bg-white hover:border-zinc-700 [.light-theme_&]:hover:border-black/10 active:scale-95 px-10 py-5 transition-all"
                        rippleColor="rgba(255, 255, 255, 0.1)"
                    >
                        <span className="flex items-center gap-2 text-lg font-bold whitespace-nowrap">
                            <PlayCircle className="w-5 h-5 text-zinc-400" />
                            Watch Demo
                        </span>
                    </RippleButton>
                </div>
            </div>
        </section>
    );
}
