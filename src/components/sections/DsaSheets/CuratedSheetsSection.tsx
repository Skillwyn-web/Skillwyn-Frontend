"use client";

import React, { useState } from "react";
import Link from "next/link";

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
        color: "bg-indigo-500", // Using indigo instead of light blue
    },
    {
        id: "striver-sde",
        title: "Striver's SDE Sheet",
        description: "Hand-picked problems most frequently asked in MAANG interviews.",
        tag: "Interviews",
        icon: <BriefcaseIcon className="w-5 h-5 text-blue-500" />,
        progressVal: 0,
        totalVal: 180,
        color: "bg-blue-500",
    },
    {
        id: "dp-patterns",
        title: "DP Patterns",
        description: "Master the hardest topic: Knapsack, LCS, LIS, and Matrix Chain Multiplication.",
        tag: "Advanced",
        icon: <BrainCircuitIcon className="w-5 h-5 text-purple-500" />,
        progressVal: 12,
        totalVal: 50,
        color: "bg-purple-500",
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
        <section className="bg-black text-white py-20 px-4 border-t border-zinc-900">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header content */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold">Curated DSA Sheets</h2>
                        <p className="text-zinc-400 text-lg">
                            Battle-tested problem sets for Competitive Programming and Interview Prep. Track your progress systematically.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="bg-zinc-900/50 p-1 rounded-lg inline-flex self-start md:self-end border border-zinc-800">
                        {["Popular", "Topic Wise", "Company"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab
                                    ? "bg-zinc-800 text-white shadow-sm"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SHEETS.map((sheet) => (
                        <div
                            key={sheet.id}
                            className="group bg-zinc-900/30 border border-zinc-900 hover:border-zinc-700/50 rounded-xl p-6 transition-all hover:bg-zinc-900/50 flex flex-col justify-between h-full"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-lg bg-zinc-950 border border-zinc-800 group-hover:border-${sheet.color.replace('bg-', '')}/30`}>
                                        {sheet.icon}
                                    </div>
                                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                                        {sheet.tag}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                    {sheet.title}
                                </h3>
                                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                    {sheet.description}
                                </p>
                            </div>

                            {/* Progress Area */}
                            <div className="mt-auto space-y-3">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-zinc-500">Progress</span>
                                    <span className={sheet.isStart ? "text-white" : "text-zinc-300"}>
                                        {sheet.isStart ? "Start" : `${sheet.progressVal} / ${sheet.totalVal}`}
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                {!sheet.isStart && (
                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${sheet.color}`}
                                            style={{ width: `${(sheet.progressVal / (typeof sheet.totalVal === 'number' ? sheet.totalVal : 100)) * 100}%` }}
                                        />
                                    </div>
                                )}
                                {sheet.isStart && (
                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full w-0" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
