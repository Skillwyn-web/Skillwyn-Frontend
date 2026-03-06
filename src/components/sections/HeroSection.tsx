"use client";

import { RippleButton } from "@/components/ui/RippleButton";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const CodeIcon = ({ className }: { className?: string }) => (
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
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
)

const TerminalIcon = ({ className }: { className?: string }) => (
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
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
)


// --- Components ---

const GridBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Radial Gradient for Spotlight */}
        <div
            className="absolute inset-0 z-10 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]"
        />

        {/* Grid Pattern */}
        <div
            className="absolute inset-0 z-0 opacity-[0.15]"
            style={{
                backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}
        />

        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/20 blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/20 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
);

const FloatingBadge = ({ text }: { text: string }) => (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md animate-fade-in-up hover:border-zinc-700 transition-colors cursor-default mb-8 group">
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{text}</span>
    </div>
);

const InteractiveElement = ({
    baseRotate,
    sensitivity,
    children,
    className
}: {
    baseRotate: string;
    sensitivity: number;
    children: React.ReactNode;
    className?: string;
}) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setOffset({ x: x * sensitivity, y: y * sensitivity });
    };

    const handleMouseLeave = () => {
        setOffset({ x: 0, y: 0 });
    };

    return (
        <div
            className="transition-transform duration-100 ease-out hover:z-50 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `${baseRotate} translate(${offset.x}px, ${offset.y}px)`
            }}
        >
            <div className={`transition-transform duration-100 ease-out ${className}`}>
                {children}
            </div>
        </div>
    );
};


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
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 overflow-hidden bg-black text-white pt-20">
            <GridBackground />

            {/* Subtle Interactive Trace (optional, follows mouse slightly) */}
            <div
                className="absolute w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none transition-transform duration-75 ease-out z-0"
                style={{
                    transform: `translate(${mousePosition.x / 10}px, ${mousePosition.y / 10}px)`,
                    top: '20%',
                    left: '30%',
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8">

                {/* Badge */}
                <FloatingBadge text="New: System Design Bootcamp 2026" />

                {/* Main Headline */}
                <div className="space-y-4">
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] animate-fade-in-up"
                        style={{ animationDelay: "100ms" }}
                    >
                        Structured chaos into <br className="hidden md:block" />
                        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
                            hireable skills.
                            {/* Underline decoration */}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </span>
                    </h1>
                </div>

                {/* Subheading */}
                <p
                    className="max-w-2xl text-lg md:text-xl text-zinc-400 animate-fade-in-up leading-relaxed"
                    style={{ animationDelay: "200ms" }}
                >
                    The all-in-one platform for developers. Interactive roadmaps, LeetCode-style practice, and mentorship to crack MAANG interviews.
                </p>

                {/* Buttons */}
                <div
                    className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up pt-4"
                    style={{ animationDelay: "300ms" }}
                >
                    <Link href="/roadmaps">
                        <RippleButton
                            className="group bg-white text-black rounded-full hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] active:scale-95 px-8 py-4"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                        >
                            <span className="flex items-center gap-2 text-base font-semibold whitespace-nowrap">
                                Start Your Roadmap
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </RippleButton>
                    </Link>

                    <RippleButton
                        className="bg-zinc-900/50 backdrop-blur-sm text-white rounded-full border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 active:scale-95 px-8 py-4"
                        rippleColor="rgba(255, 255, 255, 0.1)"
                    >
                        <span className="flex items-center gap-2 text-base font-semibold whitespace-nowrap">
                            <PlayCircle className="w-4 h-4 text-zinc-400" />
                            Watch Demo
                        </span>
                    </RippleButton>
                </div>
            </div>

            {/* Decorative Floating Elements/Code-ish things */}
            {/* 3D Floating Elements (Behind Content) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* 3D Perspective Container */}
                <div style={{ perspective: '1000px' }} className="w-full h-full relative">

                    {/* Element 1: Python Snippet (Left) */}
                    <div className="absolute top-[10%] left-[-10%] sm:left-[5%] md:left-[10%] scale-75 md:scale-100 animate-float-slow opacity-90 pointer-events-auto">
                        <InteractiveElement
                            baseRotate="rotateY(15deg) rotateX(5deg) rotateZ(-2deg)"
                            sensitivity={-0.02}
                            className="hover:scale-110"
                        >
                            <div className="bg-[#1e1e1e] rounded-xl border border-zinc-700/50 shadow-2xl p-4 w-64 backdrop-blur-sm hover:border-blue-500/50 hover:shadow-blue-500/20 transition-colors">
                                <div className="flex gap-1.5 mb-3 border-b border-zinc-800 pb-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                </div>
                                <div className="font-mono text-xs text-blue-300 leading-relaxed pointer-events-none">
                                    <span className="text-purple-400">def</span> <span className="text-yellow-300">binary_search</span>(arr, x):<br />
                                    &nbsp;&nbsp;low = <span className="text-orange-400">0</span><br />
                                    &nbsp;&nbsp;high = <span className="text-purple-400">len</span>(arr) - <span className="text-orange-400">1</span><br />
                                    &nbsp;&nbsp;<span className="text-purple-400">while</span> low {"<="} high:<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;mid = (low + high) // <span className="text-orange-400">2</span>
                                </div>
                            </div>
                        </InteractiveElement>
                    </div>

                    {/* Element 2: React Component (Right) */}
                    <div className="absolute bottom-[20%] right-[-10%] sm:right-[5%] md:right-[8%] scale-75 md:scale-100 animate-float-slower opacity-90 pointer-events-auto">
                        <InteractiveElement
                            baseRotate="rotateY(-15deg) rotateX(5deg) rotateZ(2deg)"
                            sensitivity={-0.02}
                            className="hover:scale-110"
                        >
                            <div className="bg-[#1e1e1e] rounded-xl border border-zinc-700/50 shadow-2xl p-4 w-72 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-purple-500/20 transition-colors">
                                <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
                                    <div className="text-[10px] text-zinc-400">SpaceCard.tsx</div>
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                                    </div>
                                </div>
                                <div className="font-mono text-xs text-zinc-300 leading-relaxed pointer-events-none">
                                    <span className="text-blue-400">import</span> {"{ useState }"} <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span>;<br />
                                    <br />
                                    <span className="text-blue-400">export function</span> <span className="text-yellow-300">Space</span>() {"{"}<br />
                                    &nbsp;&nbsp;<span className="text-blue-400">const</span> [data, setData] = <span className="text-yellow-300">useState</span>(<span className="text-blue-400">null</span>);<br />
                                    &nbsp;&nbsp;<span className="text-blue-400">return</span> (<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"<"}<span className="text-green-400">div</span> className=<span className="text-orange-300">"3d-card"</span>{">"}
                                </div>
                            </div>
                        </InteractiveElement>
                    </div>

                    {/* Element 3: Algorithm Tag (Floating Top Right - smaller) */}
                    <div
                        className="absolute top-[20%] right-[5%] lg:right-[15%] flex animate-bounce-slow opacity-90 pointer-events-auto"
                        style={{ animationDuration: '4s' }}
                    >
                        <InteractiveElement
                            baseRotate="rotate(12deg)"
                            sensitivity={0.01}
                            className="hover:scale-110 hover:skew-y-3"
                        >
                            <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 px-4 py-2 rounded-lg shadow-xl hover:bg-zinc-800 transition-colors">
                                <span className="font-mono text-sm text-green-400">{">_"} System Design</span>
                            </div>
                        </InteractiveElement>
                    </div>

                    {/* Element 4: Data Structure Node (Floating Bottom Left - smaller) */}
                    <div
                        className="absolute bottom-[25%] left-[5%] lg:left-[20%] flex animate-bounce-slow opacity-90 pointer-events-auto"
                        style={{ animationDuration: '5s', animationDelay: '1s' }}
                    >
                        <InteractiveElement
                            baseRotate="rotate(-6deg)"
                            sensitivity={0.03}
                            className="hover:scale-110"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 border border-blue-400/50 flex items-center justify-center shadow-lg shadow-blue-900/50 hover:shadow-blue-500/50 transition-shadow">
                                    <span className="font-bold text-white">88</span>
                                </div>
                                <div className="w-0.5 h-6 bg-zinc-700" />
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                                        <span className="text-xs text-zinc-400">42</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                                        <span className="text-xs text-zinc-400">91</span>
                                    </div>
                                </div>
                            </div>
                        </InteractiveElement>
                    </div>

                </div>
            </div>


        </section>
    );
}
