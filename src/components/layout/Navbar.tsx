"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { RippleButton } from "@/components/ui/RippleButton";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            if (theme === 'light') {
                document.documentElement.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
        }
    }, [theme, mounted]);

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
                setTheme(e.newValue);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout, loading } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Roadmaps", href: "/roadmaps" },
        { name: "Practice", href: "/#practice" },
        { name: "Bootcamps", href: "/#pricing" },
        { name: "Snap Code", href: "/snap-code" },
        { name: "Pro", href: "/#pricing" },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#")) {
            const targetId = href.replace("/#", "");
            const element = document.getElementById(targetId);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                setIsSidebarOpen(false);
            }
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 will-change-transform ${isScrolled
                    ? "bg-black/90 [.light-theme_&]:bg-white/90 backdrop-blur-xl border-b border-white/5 [.light-theme_&]:border-black/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] [.light-theme_&]:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
                    : "bg-transparent border-b border-transparent"
                    }`}
            >
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="group p-2 -ml-2 text-zinc-400 [.light-theme_&]:text-zinc-500 hover:text-white [.light-theme_&]:hover:text-zinc-900 transition-colors rounded-lg hover:bg-white/5 [.light-theme_&]:hover:bg-black/5 active:scale-95"
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
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent z-20" />
                        </div>
                        <span className="text-lg font-bold text-white [.light-theme_&]:text-zinc-900 tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                            DevPath
                        </span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-1 rounded-full bg-zinc-900/50 [.light-theme_&]:bg-zinc-100/50 p-1 border border-white/5 [.light-theme_&]:border-black/5 backdrop-blur-md">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="relative px-5 py-2 text-sm font-medium text-zinc-400 [.light-theme_&]:text-zinc-600 hover:text-white [.light-theme_&]:hover:text-zinc-900 transition-colors"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.span
                                        layoutId="nav-hover-pill"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30
                                        }}
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full -z-10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                                    />
                                )}
                            </AnimatePresence>
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <button
                        aria-label="Toggle theme"
                        onClick={toggleTheme}
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 [.light-theme_&]:border-black/5 bg-zinc-800/80 [.light-theme_&]:bg-white hover:bg-zinc-700 [.light-theme_&]:hover:bg-zinc-100 transition-colors shadow-sm mr-1"
                    >
                        {mounted && (theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.635-7.64 6.348-9.098a.75.75 0 01.908.325.75.75 0 01-.098.976A7.501 7.501 0 0012 19.5a7.48 7.48 0 006.247-3.34.75.75 0 01.976-.098.75.75 0 01.325.908z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636M16.24 7.76a5.25 5.25 0 11-7.48 7.48 5.25 5.25 0 017.48-7.48z" />
                            </svg>
                        ))}
                    </button>
                    {loading ? (
                        <div className="w-20 h-5 bg-white/10 rounded animate-pulse" />
                    ) : !user ? (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-zinc-400 [.light-theme_&]:text-zinc-600 hover:text-blue-400 transition-colors hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                            >
                                Log In
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-white [.light-theme_&]:text-zinc-900 hidden sm:block">Hi, {user.name || 'Dev'}</span>
                            <button
                                onClick={logout}
                                className="text-sm font-medium text-zinc-400 hover:text-red-400 transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                    <RippleButton
                        className="hidden sm:flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all outline-none ring-0 focus:ring-2 focus:ring-blue-500/50"
                        rippleColor="rgba(255, 255, 255, 0.2)"
                    >
                        Start Learning
                    </RippleButton>
                </div>
            </nav>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
}
