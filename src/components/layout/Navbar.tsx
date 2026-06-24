"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    ArrowRight, 
    LogOut, 
    Menu, 
    UserRound, 
    X, 
    ChevronDown,
    BookOpenCheck,
    FileQuestion,
    MessageSquareText,
    FileText,
    Map
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
    const { user, loading, logout } = useAuth();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "The Algorithmic Vault", href: "/algorithmic-vault", isHighlight: true },
        // { name: "Roadmaps", href: "#", comingSoon: true },
        // {
        //     name: "Resources",
        //     dropdown: [ ... ]
        // },
        // { name: "Pricing", href: "#", comingSoon: true },
        // { name: "About", href: "#", comingSoon: true },
    ];

    return (
        <nav className="sticky top-[40px] z-50 h-16 border-b border-[#f0f0f0] bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
                <Link href="/" className="group flex items-center gap-1.5">
                    <div className="flex h-14 w-14 items-center justify-center overflow-visible">
                        <Image
                            src="/skillwyn-logo.png"
                            alt="SkillWyn logo"
                            width={56}
                            height={56}
                            className="h-14 w-14 object-contain transition-transform duration-200 group-hover:scale-105"
                            priority
                        />
                    </div>
                    <span
                        style={{
                            
                            fontWeight: 800,
                            fontSize: "18px",
                            letterSpacing: "-0.04em",
                            color: "#0f172a",
                            lineHeight: 1,
                        }}
                    >
                        Skill<span style={{ color: "#2563eb" }}>Wyn</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-9 md:flex">
                    {navLinks.map((link) => {
                        if (link.dropdown) {
                            return (
                                <div
                                    key={link.name}
                                    className="relative py-5"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <button
                                        className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-[#2563eb]"
                                        onMouseEnter={(event) => {
                                            event.currentTarget.style.color = "#2563eb";
                                        }}
                                        onMouseLeave={(event) => {
                                            event.currentTarget.style.color = "#374151";
                                        }}
                                        style={{
                                            
                                            fontWeight: 500,
                                            fontSize: "15px",
                                            color: "#374151",
                                            letterSpacing: "-0.01em",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {link.name}
                                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute left-1/2 top-full flex w-60 -translate-x-1/2 flex-col rounded-lg border border-[#f0f0f0] bg-white py-2 text-left normal-case tracking-normal shadow-[0_18px_48px_rgba(15,23,42,0.12)]"
                                            >
                                                {link.dropdown.map((subLink) => {
                                                    return (
                                                        <Link
                                                            key={subLink.name}
                                                            href={subLink.href}
                                                            className="px-4 py-2.5 transition-colors hover:bg-[#f5f7ff] hover:text-[#2563eb]"
                                                            onMouseEnter={(event) => {
                                                                event.currentTarget.style.color = "#2563eb";
                                                            }}
                                                            onMouseLeave={(event) => {
                                                                event.currentTarget.style.color = "#374151";
                                                            }}
                                                            style={{
                                                                
                                                                fontWeight: 500,
                                                                fontSize: "14px",
                                                                color: "#374151",
                                                                textDecoration: "none",
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span>{subLink.name}</span>
                                                                {subLink.comingSoon && (
                                                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700">
                                                                        Soon
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
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
                                className={`transition-all duration-200 ${(link as any).isHighlight ? "flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-blue-700 shadow-[0_2px_10px_rgba(37,99,235,0.12)] hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-[0_4px_15px_rgba(37,99,235,0.18)]" : "hover:text-[#2563eb]"}`}
                                onMouseEnter={(event) => {
                                    if (!(link as any).isHighlight) {
                                        event.currentTarget.style.color = "#2563eb";
                                    }
                                }}
                                onMouseLeave={(event) => {
                                    if (!(link as any).isHighlight) {
                                        event.currentTarget.style.color = "#374151";
                                    }
                                }}
                                style={(link as any).isHighlight ? {
                                    fontWeight: 800,
                                    fontSize: "13px",
                                    letterSpacing: "0.02em",
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                } : {
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    color: "#374151",
                                    letterSpacing: "-0.01em",
                                    textDecoration: "none",
                                }}
                            >
                                <div className="flex items-center gap-1.5">
                                    {link.name}
                                    {(link as any).comingSoon && (
                                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700">
                                            Soon
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden items-center gap-4 md:flex">
                    {loading ? (
                        <div className="h-9 w-32 animate-pulse rounded-lg bg-[#f5f7ff]" />
                    ) : user ? (
                        <>
                            <Link
                                href="/profile"
                                className="flex max-w-[170px] items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:text-[#2563eb]"
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.color = "#2563eb";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.color = "#374151";
                                }}
                                style={{
                                    
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    color: "#374151",
                                }}
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f5f7ff] text-[10px] text-[#1a1a2e]">
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
                                className="flex items-center gap-2 px-3 py-2 transition-colors hover:text-[#2563eb]"
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.color = "#2563eb";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.color = "#374151";
                                }}
                                style={{
                                    
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    color: "#374151",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="uppercase transition-colors hover:text-[#2563eb]"
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.color = "#2563eb";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.color = "#374151";
                                }}
                                style={{
                                    
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    color: "#374151",
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Login
                            </Link>
                            <Link
                                href="/get-started"
                                className="group flex items-center gap-2 uppercase transition-colors hover:bg-[#1d4ed8]"
                                style={{
                                    
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    background: "#2563eb",
                                    color: "#ffffff",
                                    borderRadius: "8px",
                                    padding: "10px 20px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Get Started
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </>
                    )}
                </div>
                
                <button 
                    className="p-2 text-[#1a1a2e] transition-colors hover:text-[#2563eb] md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute left-4 right-4 top-full flex flex-col gap-2 rounded-lg border border-[#f0f0f0] bg-white px-4 py-4 shadow-[0_18px_48px_rgba(15,23,42,0.12)] md:hidden">
                    {navLinks.map((link) => {
                        if (link.dropdown) {
                            return (
                                <div key={link.name} className="flex flex-col border-b border-[#f0f0f0] py-2">
                                    <button
                                        onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                                        className="flex w-full items-center justify-between py-2 text-left text-sm font-medium text-[#1a1a2e]"
                                    >
                                        <span>{link.name}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileResourcesOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isMobileResourcesOpen && (
                                        <div className="mt-2 flex flex-col gap-1 pb-2 pl-4">
                                            {link.dropdown.map((subLink) => {
                                                return (
                                                    <Link
                                                        key={subLink.name}
                                                        href={subLink.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="rounded-md px-3 py-2 text-sm font-medium text-[#1a1a2e] transition-colors hover:bg-[#f5f7ff] hover:text-[#2563eb]"
                                                    >
                                                        {subLink.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="border-b border-[#f0f0f0] py-2 text-sm font-medium text-[#1a1a2e] transition-colors hover:text-[#2563eb]"
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <div className="flex flex-col gap-3 pt-4">
                        {loading ? (
                            <div className="h-12 w-full animate-pulse rounded-lg bg-[#f5f7ff]" />
                        ) : user ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-3 text-center text-sm font-medium text-[#1a1a2e]"
                                >
                                    {user.name || "Profile"}
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        void logout();
                                    }}
                                    className="w-full py-3 text-center text-sm font-medium text-[#1a1a2e]"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-3 text-center text-sm font-medium text-[#1a1a2e]"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/get-started"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563eb] py-3 text-center text-sm font-semibold text-white"
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
