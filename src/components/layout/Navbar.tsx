"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LogOut, Menu, UserRound, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, loading, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks: any[] = [
        { name: "Home", href: "/home" },
        { name: "The Algorithmic Vault", href: "/algorithmic-vault", isHighlight: true },
    ];

    return (
        <header
            className={`sticky top-[40px] z-[100] h-[60px] transition-all duration-300 ${
                scrolled
                    ? "border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
                    : "border-b border-gray-100/60 bg-white/80 backdrop-blur-md"
            }`}
        >
            <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-5 lg:px-8">

                {/* ── Logo ── */}
                <Link href="/home" className="group flex shrink-0 items-center gap-2.5">
                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                        <Image
                            src="/skillwyn-logo.png"
                            alt="SkillWyn"
                            width={32}
                            height={32}
                            className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                            priority
                        />
                    </div>
                    <span className="text-[17px] font-bold leading-none tracking-tight text-gray-900">
                        Skill<span className="text-blue-600">Wyn</span>
                    </span>
                </Link>

                {/* ── Desktop Nav Links ── */}
                <div className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => {
                        if (link.dropdown) {
                            return (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <button className="group flex items-center gap-1 rounded-lg px-3.5 py-2 text-[14px] font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900">
                                        {link.name}
                                        <ChevronDown
                                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                                isDropdownOpen ? "rotate-180 text-blue-600" : "text-gray-400"
                                            }`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                                className="absolute left-0 top-[calc(100%+8px)] w-52 rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                                            >
                                                {link.dropdown.map((subLink: any) => (
                                                    <Link
                                                        key={subLink.name}
                                                        href={subLink.href}
                                                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                                                    >
                                                        <span>{subLink.name}</span>
                                                        {subLink.comingSoon && (
                                                            <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700">
                                                                Soon
                                                            </span>
                                                        )}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        if ((link as any).isHighlight) {
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="group relative mx-1 inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-blue-50 px-3.5 py-2 text-[14px] font-bold tracking-wide text-blue-700 ring-1 ring-blue-100 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:ring-blue-600"
                                >
                                    {link.name}
                                </Link>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative rounded-lg px-3.5 py-2 text-[15px] font-semibold tracking-wide text-slate-600 transition-all duration-200 hover:bg-gray-50 hover:text-slate-900"
                            >
                                {link.name}
                                {(link as any).comingSoon && (
                                    <span className="ml-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-500">
                                        Soon
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* ── Desktop Auth ── */}
                <div className="hidden items-center gap-2.5 md:flex">
                    {loading ? (
                        <div className="h-8 w-28 animate-pulse rounded-full bg-gray-100" />
                    ) : user ? (
                        <>
                            <div
                                className="flex max-w-[160px] items-center gap-2 rounded-full border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-[13px] font-medium text-gray-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                            >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-[9px] font-bold text-blue-700">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name || "Profile"} className="h-full w-full object-cover" />
                                    ) : (
                                        <UserRound className="h-3 w-3" />
                                    )}
                                </span>
                                <span className="truncate">{user.name || "Profile"}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-[13px] font-medium text-gray-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                                <LogOut className="h-3.5 w-3.5" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#3b82f6]/50 bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] px-7 py-2.5 text-[15px] font-bold tracking-wide text-[#ffffff] shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(37,99,235,0.45)] active:translate-y-0"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Log in
                                    <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                                {/* Hover glow effect */}
                                <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </Link>
                        </>
                    )}
                </div>

                {/* ── Mobile Hamburger ── */}
                <button
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isMobileMenuOpen ? (
                            <motion.span
                                key="x"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <X className="h-4.5 w-4.5" />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Menu className="h-4.5 w-4.5" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* ── Mobile Menu ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                    <style dangerouslySetInnerHTML={{ __html: `
                        #mobile-nav-menu {
                            background-color: #ffffff !important;
                        }
                    `}} />
                    <motion.div
                        id="mobile-nav-menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-x-3 top-[calc(100%+6px)] z-[100] flex flex-col rounded-2xl border border-gray-200/80 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.1)] md:hidden"
                    >
                        {/* Nav links */}
                        <div className="flex flex-col gap-0.5">
                            {navLinks.map((link) => {
                                if (link.dropdown) {
                                    return (
                                        <div key={link.name}>
                                            <button
                                                onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                                                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                            >
                                                <span>{link.name}</span>
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform duration-200 ${
                                                        isMobileResourcesOpen ? "rotate-180 text-blue-600" : "text-gray-400"
                                                    }`}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {isMobileResourcesOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="ml-3 flex flex-col gap-0.5 pb-1 pl-3 border-l-2 border-blue-100">
                                                            {link.dropdown.map((subLink: any) => (
                                                                <Link
                                                                    key={subLink.name}
                                                                    href={subLink.href}
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    className="rounded-lg px-3 py-2 text-[13px] font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                                                                >
                                                                    {subLink.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
                                            (link as any).isHighlight
                                                ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="my-3 h-px bg-gray-100" />

                        {/* Auth */}
                        {loading ? (
                            <div className="h-20 animate-pulse rounded-xl bg-gray-100" />
                        ) : user ? (
                            <div className="flex flex-col gap-2">
                                <div
                                    className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
                                        {user.name?.[0]?.toUpperCase() || "U"}
                                    </span>
                                    <span>{user.name || "My Profile"}</span>
                                </div>
                                <button
                                    onClick={() => { setIsMobileMenuOpen(false); void logout(); }}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50/60 py-3 text-[14px] font-medium text-red-600 transition-colors hover:bg-red-100"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="rounded-xl border border-gray-200 py-3 text-center text-[14px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/get-started"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-center text-[14px] font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 active:scale-[0.98]"
                                >
                                    Get Started
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
