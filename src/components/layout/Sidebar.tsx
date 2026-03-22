"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#")) {
            const targetId = href.replace("/#", "");
            const element = document.getElementById(targetId);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                onClose();
            }
        }
    };

    if (!mounted) return null;

    return createPortal(
        <>
            <div
                className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            <div
                className={`fixed top-0 left-0 h-full w-80 z-[70] bg-[#0a0a0a] [.light-theme_&]:bg-[#F7F4EA] border-r border-white/10 [.light-theme_&]:border-black/5 transform transition-transform duration-300 ease-out shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-start mb-8">
                        <button
                            onClick={onClose}
                            aria-label="Close Sidebar"
                            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-600 transition-colors"
                            style={{ border: 'none', outline: 'none' }}
                        />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs font-semibold text-zinc-500 [.light-theme_&]:text-zinc-600 uppercase tracking-wider mb-4 pl-3">
                                Learning
                            </h3>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/roadmaps"
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${pathname === "/roadmaps"
                                            ? "bg-green-500/10 text-green-400 [.light-theme_&]:text-green-600 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                                            : "text-zinc-400 [.light-theme_&]:text-zinc-600 hover:text-white [.light-theme_&]:hover:text-zinc-900 hover:bg-white/5 [.light-theme_&]:hover:bg-black/5"
                                            }`}
                                    >
                                        <svg className={`w-4 h-4 ${pathname === "/roadmaps" ? "text-green-400" : "text-zinc-500 [.light-theme_&]:text-zinc-600 group-hover:text-zinc-300 [.light-theme_&]:group-hover:text-zinc-900"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                        </svg>
                                        Roadmaps
                                        {pathname === "/roadmaps" && (
                                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_currentColor]" />
                                        )}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#practice"
                                        onClick={(e) => handleScroll(e, "/#practice")}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 [.light-theme_&]:text-zinc-600 hover:text-white [.light-theme_&]:hover:text-zinc-900 hover:bg-white/5 [.light-theme_&]:hover:bg-black/5 transition-all group"
                                    >
                                        <svg className="w-4 h-4 text-zinc-500 [.light-theme_&]:text-zinc-600 group-hover:text-zinc-300 [.light-theme_&]:group-hover:text-zinc-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="16 18 22 12 16 6" />
                                            <polyline points="8 6 2 12 8 18" />
                                        </svg>
                                        Practice
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#pricing"
                                        onClick={(e) => handleScroll(e, "/#pricing")}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 [.light-theme_&]:text-zinc-600 hover:text-white [.light-theme_&]:hover:text-zinc-900 hover:bg-white/5 [.light-theme_&]:hover:bg-black/5 transition-all group"
                                    >
                                        <svg className="w-4 h-4 text-zinc-500 [.light-theme_&]:text-zinc-600 group-hover:text-zinc-300 [.light-theme_&]:group-hover:text-zinc-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                        </svg>
                                        Bootcamps
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 pl-3">
                                Career
                            </h3>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/resume-builder"
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${pathname === "/resume-builder"
                                            ? "bg-blue-500/10 text-blue-400 [.light-theme_&]:text-blue-600 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                            : "text-zinc-400 [.light-theme_&]:text-zinc-600 hover:text-white [.light-theme_&]:hover:text-zinc-900 hover:bg-white/5 [.light-theme_&]:hover:bg-black/5"
                                            }`}
                                    >
                                        <svg className={`w-4 h-4 ${pathname === "/resume-builder" ? "text-blue-400" : "text-zinc-500 [.light-theme_&]:text-zinc-600 group-hover:text-zinc-300 [.light-theme_&]:group-hover:text-zinc-900"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                        Resume Builder
                                        {pathname === "/resume-builder" && (
                                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_currentColor]" />
                                        )}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/mock-interview"
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${pathname === "/mock-interview"
                                            ? "bg-purple-500/10 text-purple-400 [.light-theme_&]:text-purple-600 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                                            : "text-zinc-400 [.light-theme_&]:text-zinc-600 hover:text-white [.light-theme_&]:hover:text-zinc-900 hover:bg-white/5 [.light-theme_&]:hover:bg-black/5"
                                            }`}
                                    >
                                        <svg className={`w-4 h-4 ${pathname === "/mock-interview" ? "text-purple-400" : "text-zinc-500 [.light-theme_&]:text-zinc-600 group-hover:text-zinc-300 [.light-theme_&]:group-hover:text-zinc-900"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        Mock Interviews
                                        {pathname === "/mock-interview" && (
                                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_currentColor]" />
                                        )}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5 [.light-theme_&]:border-black/5">
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/50 [.light-theme_&]:bg-zinc-200/50 border border-white/5 [.light-theme_&]:border-black/5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
                            <div className="text-xs">
                                <div className="text-white [.light-theme_&]:text-zinc-900 font-medium">Demo User</div>
                                <div className="text-zinc-500 [.light-theme_&]:text-zinc-600">Free Plan</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default Sidebar;
