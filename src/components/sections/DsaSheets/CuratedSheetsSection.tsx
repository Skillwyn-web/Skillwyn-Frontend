"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Icons
const ListIcon = ({ className }: { className?: string }) => (
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
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

const LayersIcon = ({ className }: { className?: string }) => (
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
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
    </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
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
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const BrainCircuitIcon = ({ className }: { className?: string }) => (
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
        <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0 .38 3.7 2.5 2.5 0 0 0 4.1 3 .76.76 0 0 1 .6-.24c.48 0 .86.42.8.9a2.5 2.5 0 0 0 2.38 2.1 2.5 2.5 0 0 0 2.38-2.1.76.76 0 0 1 .6-.64 2.5 2.5 0 0 0 4.1-3 2.5 2.5 0 0 0 .38-3.7 2.5 2.5 0 0 0-1.32-3 2.5 2.5 0 0 0-1.98-3 2.5 2.5 0 0 0-4.38.46" />
        <path d="M12 14v-4" />
        <path d="M12 10h-3.5" />
        <path d="M12 10h3.5" />
    </svg>
);

const ZapIcon = ({ className }: { className?: string }) => (
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
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const LayoutDashboardIcon = ({ className }: { className?: string }) => (
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
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
);

// Types
type Sheet = {
    id: string;
    title: string;
    description: string;
    tag: string;
    icon: React.ReactNode;
    progressVal: number;
    totalVal: number | string;
    color: string;
    isStart?: boolean;
};

// Data
const SHEETS: Sheet[] = [
    {
        id: "blind-75",
        title: "Blind 75",
        description: "The most essential LeetCode patterns covering Arrays to DP.",
        tag: "Must Do",
        icon: <ListIcon className="w-5 h-5 text-orange-500" />,
        progressVal: 52,
        totalVal: 75,
        color: "bg-orange-500",
    },
    {
        id: "neetcode-150",
        title: "NeetCode 150",
        description: "Extended version of Blind 75. Deep dive into every data structure.",
        tag: "Detailed",
        icon: <LayersIcon className="w-5 h-5 text-indigo-500" />,
        progressVal: 24,
        totalVal: 150,
        color: "bg-indigo-500", 
    },
    {
        id: "striver-sde",
        title: "Striver's SDE Sheet",
        description: "Hand-picked problems most frequently asked in MAANG interviews.",
        tag: "Interviews",
        icon: <BriefcaseIcon className="w-5 h-5 text-primary" />,
        progressVal: 0,
        totalVal: 180,
        color: "bg-primary",
    },
    {
        id: "dp-patterns",
        title: "DP Patterns",
        description: "Master the hardest topic: Knapsack, LCS, LIS, and Matrix Chain Multiplication.",
        tag: "Advanced",
        icon: <BrainCircuitIcon className="w-5 h-5 text-secondary" />,
        progressVal: 12,
        totalVal: 50,
        color: "bg-secondary",
    },
    {
        id: "algo-cram",
        title: "14-Day Algo Cram",
        description: "Last minute preparation. High-yield algorithms only.",
        tag: "Crash Course",
        icon: <ZapIcon className="w-5 h-5 text-teal-500" />,
        progressVal: 14,
        totalVal: 28,
        color: "bg-teal-500",
    },
    {
        id: "system-design",
        title: "System Design 101",
        description: "Scalability, Distributed Systems, CAP theorem. For Senior roles.",
        tag: "Design",
        icon: <LayoutDashboardIcon className="w-5 h-5 text-pink-500" />,
        progressVal: 0,
        totalVal: "Start",
        color: "bg-pink-500",
        isStart: true,
    },
];

export default function CuratedSheetsSection() {
    const [activeTab, setActiveTab] = useState("Popular");

    return (
        <section id="practice" className="border-t border-border-subtle bg-bg-dark px-4 py-20 text-text-primary transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-3xl font-semibold text-ink md:text-4xl">Curated DSA Sheets</h2>
                        <p className="text-lg leading-8 text-text-muted">
                            AI-organized problem sets for competitive programming and interview prep. Track your progress systematically.
                        </p>
                    </div>

                    <div className="relative inline-flex self-start rounded-lg border border-border-subtle bg-surface/70 p-1 transition-colors duration-300 md:self-end">
                        {["Popular", "Topic Wise", "Company"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab
                                    ? "text-ink font-bold"
                                    : "text-text-muted hover:text-primary"
                                    }`}
                            >
                                {activeTab === tab && (
                                    <motion.span
                                        layoutId="active-tab"
                                        className="absolute inset-0 rounded-md bg-bg-card shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SHEETS.map((sheet) => (
                        <motion.div
                            key={sheet.id}
                            whileHover={{ y: -5 }}
                            className="glass-card group relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-7 transition-all hover:border-primary/45"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none ${sheet.color}`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="rounded-lg border border-border-subtle bg-bg-dark p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                                        {sheet.icon}
                                    </div>
                                    <span className="rounded-lg border border-border-subtle bg-bg-dark px-2.5 py-1.5 text-[10px] font-bold uppercase text-text-muted transition-colors group-hover:text-primary">
                                        {sheet.tag}
                                    </span>
                                </div>

                                <h3 className="mb-3 text-xl font-bold text-ink transition-colors group-hover:text-primary">
                                    {sheet.title}
                                </h3>
                                <p className="mb-8 line-clamp-2 text-sm leading-relaxed text-text-muted">
                                    {sheet.description}
                                </p>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <Link
                                    href={`/sheets/${sheet.id}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary group/link"
                                >
                                    <span>Explore Sheet</span>
                                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>

                                <div className="mt-4 h-px w-full bg-border-subtle/70" />

                                <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                                    <span>{typeof sheet.totalVal === 'number' ? `${sheet.totalVal} Problems` : sheet.totalVal}</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className={`w-1 h-1 rounded-full ${sheet.color} opacity-40`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
