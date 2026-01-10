"use client";

import React, { useState } from "react";
import Link from "next/link";

export function Navbar() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const navLinks = [
        { name: "Roadmaps", href: "#" },
        { name: "Practice", href: "#" },
        { name: "Bootcamps", href: "#" },
        { name: "Pro", href: "#" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    <span className="font-bold text-black">DP</span>
                </div>
                <span className="text-lg font-bold text-white tracking-wide">DevPath</span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-400">
                {navLinks.map((link, index) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="relative px-4 py-2 hover:text-white transition-colors group"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* CSS-only spotlight effect */}
                        <span
                            className={`absolute inset-0 bg-white/10 rounded-lg -z-10 transition-all duration-300 ease-out origin-center ${hoveredIndex === index ? "scale-100 opacity-100" : "scale-90 opacity-0"
                                }`}
                        />
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Link
                    href="#"
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                >
                    Log In
                </Link>
                <Link
                    href="#"
                    className="px-4 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                    Start Learning
                </Link>
            </div>
        </nav>
    );
}
