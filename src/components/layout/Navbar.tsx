

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { RippleButton } from "@/components/ui/RippleButton";

export function Navbar() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Roadmaps", href: "#" },
        { name: "Practice", href: "#" },
        { name: "Bootcamps", href: "#" },
        { name: "Pro", href: "#" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 will-change-transform ${isScrolled
                    ? "bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-blue-900/10"
                    : "bg-transparent border-b border-transparent"
                    }`}
            >
                <div className="flex items-center gap-6">
                    {/* Hamburger Menu - Visible on Mobile/Tablet */}
                    <button
                        onMouseEnter={() => setIsSidebarOpen(true)}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="group p-2 -ml-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 active:scale-95"
                        aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}
                    >
                        <div className="relative flex flex-col items-center justify-center w-6 h-6">
                            <span
                                className={`absolute block h-0.5 bg-current transition-all duration-300 ease-out ${isSidebarOpen
                                        ? "w-6 rotate-45"
                                        : "w-5 -translate-y-1 group-hover:w-6"
                                    }`}
                            />
                            <span
                                className={`absolute block h-0.5 bg-current transition-all duration-300 ease-out ${isSidebarOpen
                                        ? "w-6 -rotate-45"
                                        : "w-5 translate-y-1 group-hover:w-4"
                                    }`}
                            />
                        </div>
                    </button>

                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-9 h-9 overflow-hidden rounded-xl bg-gradient-to-tr from-white to-zinc-200 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform group-hover:scale-105">
                            <span className="relative z-10 font-black text-black text-sm tracking-tighter">DP</span>
                            {/* Shine effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent z-20" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                            DevPath
                        </span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-1 rounded-full bg-zinc-900/50 p-1 border border-white/5 backdrop-blur-md">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative px-5 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {hoveredIndex === index && (
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full -z-10 animate-fade-in-up duration-200 border border-blue-500/20" />
                            )}
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href="#"
                        className="text-sm font-medium text-zinc-400 hover:text-blue-400 transition-colors hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    >
                        Log In
                    </Link>
                    <RippleButton
                        className="hidden sm:flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all outline-none ring-0 focus:ring-2 focus:ring-blue-500/50"
                        rippleColor="rgba(255, 255, 255, 0.2)"
                    >
                        Start Learning
                    </RippleButton>
                </div>
            </nav>

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
}




