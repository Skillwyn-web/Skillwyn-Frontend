"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LogOut, Menu, UserRound, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, loading, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Features", href: "/features" },
        { name: "DSA", href: "/dsa" },
        { name: "Roadmaps", href: "/roadmaps" },
        { name: "Profile", href: "/profile" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
    ];

    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-300 ${isScrolled
                ? "py-3"
                : "py-5"
                }`}
        >
            <div className={`mx-auto flex max-w-7xl items-center justify-between border border-white/10 bg-black/45 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition-all ${isScrolled ? "bg-black/62" : ""}`}>
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
                        <Image
                            src="/skillwyn-logo.png"
                            alt="SkillWyn logo"
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                    </div>
                    <span className="text-[15px] md:text-base font-semibold tracking-[-0.035em] text-ink">
                        SkillWyn
                    </span>
                </Link>

                <div className="hidden items-center rounded-full border border-white/8 bg-white/[0.025] px-2 py-1 text-[11px] font-bold uppercase text-white/46 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="rounded-full px-4 py-2 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <ThemeToggle />
                    {loading ? (
                        <div className="h-9 w-32 animate-pulse border border-white/10 bg-white/[0.04]" />
                    ) : user ? (
                        <>
                            <Link
                                href="/profile"
                                className="flex max-w-[170px] items-center gap-2 border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black uppercase text-white/72 transition-colors hover:border-white/30 hover:text-white"
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden bg-white text-[10px] text-black">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name || "Profile"} className="h-full w-full object-cover" />
                                    ) : (
                                        <UserRound className="h-3.5 w-3.5" />
                                    )}
                                </span>
                                <span className="truncate">{user.name || "Profile"}</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 border border-white/12 px-3 py-2 text-xs font-black uppercase text-white/48 transition-colors hover:border-white/30 hover:text-white"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-xs font-bold uppercase text-white/48 transition-colors hover:text-white"
                            >
                                Login
                            </Link>
                            <Link
                                href="/get-started"
                                className="flex items-center gap-2 border border-white/16 bg-white px-4 py-2 text-xs font-black uppercase text-black transition-colors hover:bg-white/88 group"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </>
                    )}
                </div>
                
                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden p-2 text-text-muted hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-4 right-4 bg-black/95 border border-white/10 py-4 px-4 flex flex-col gap-4 shadow-2xl backdrop-blur-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-base font-semibold text-ink py-2 border-b border-white/10"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 pt-4">
                        <ThemeToggle />
                        {loading ? (
                            <div className="h-12 w-full animate-pulse border border-white/10 bg-white/[0.04]" />
                        ) : user ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full border border-white/12 py-3 text-center font-semibold text-ink"
                                >
                                    {user.name || "Profile"}
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        void logout();
                                    }}
                                    className="w-full border border-white/12 py-3 text-center font-semibold text-ink"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-center py-3 border border-white/12 text-ink font-semibold"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/get-started"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-center py-3 bg-white text-black font-bold flex items-center justify-center gap-2"
                                >
                                    Get Started <ArrowRight className="w-4 h-4" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
