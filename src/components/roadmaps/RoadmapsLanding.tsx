"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Minimal sharp icons
const Icons = {
    Cpp: () => (
        <div className="flex items-center justify-center w-full h-full font-mono font-bold text-blue-500">
            C++
        </div>
    ),
    Java: () => (
        <div className="flex items-center justify-center w-full h-full font-mono font-bold text-orange-500">
            JV
        </div>
    ),
    Python: () => (
        <div className="flex items-center justify-center w-full h-full font-mono font-bold text-yellow-400">
            PY
        </div>
    ),
    Frontend: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    Backend: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <path d="M22 6l-10 7L2 6" />
        </svg>
    ),
    Fullstack: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
        </svg>
    ),
};

const domains = [
    {
        title: "Data Structures & Algorithms",
        description: "Engineering fundamentals and problem solving foundations.",
        tracks: [
            {
                id: "dsa-cpp",
                title: "C++",
                subtitle: "Performance & Systems",
                time: "4-6 months",
                level: "Intermediate",
                icon: <Icons.Cpp />,
                accent: "decoration-blue-500"
            },
            {
                id: "dsa-java",
                title: "Java",
                subtitle: "Enterprise Architecture",
                time: "4-6 months",
                level: "Intermediate",
                icon: <Icons.Java />,
                accent: "decoration-orange-500"
            },
            {
                id: "dsa-python",
                title: "Python",
                subtitle: "Data & Scripting",
                time: "3-4 months",
                level: "Beginner",
                icon: <Icons.Python />,
                accent: "decoration-yellow-500"
            },
        ]
    },
    {
        title: "Development Stacks",
        description: "Building production-ready applications.",
        tracks: [
            {
                id: "dev-frontend",
                title: "Frontend",
                subtitle: "UX/UI & React Ecosystem",
                time: "6 months",
                level: "Beginner",
                icon: <Icons.Frontend />,
                accent: "decoration-cyan-500"
            },
            {
                id: "dev-backend",
                title: "Backend",
                subtitle: "Systems & Distributed Data",
                time: "6-8 months",
                level: "Advanced",
                icon: <Icons.Backend />,
                accent: "decoration-green-500"
            },
            {
                id: "dev-fullstack",
                title: "Fullstack",
                subtitle: "End-to-End Product Engineering",
                time: "8-12 months",
                level: "Hard",
                icon: <Icons.Fullstack />,
                accent: "decoration-purple-500"
            },
        ]
    }
];

export default function RoadmapsLanding() {
    return (
        <div className="min-h-screen bg-[#09090b] text-white p-8 md:p-12 font-sans selection:bg-white selection:text-black">
            {/* Subtle Dot Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="mb-20 pt-10 border-b border-zinc-800 pb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white"
                    >
                        Curriculum
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-xl max-w-2xl font-light"
                    >
                        Structured learning paths designed for engineering excellence.
                        Select a track to begin your journey.
                    </motion.p>
                </header>

                <div className="space-y-24">
                    {domains.map((domain, domainIdx) => (
                        <section key={domainIdx}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mb-10"
                            >
                                <div className="flex items-baseline gap-4 mb-2">
                                    <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest">0{domainIdx + 1}</span>
                                    <h2 className="text-2xl font-semibold text-white">{domain.title}</h2>
                                </div>
                                <p className="text-zinc-500 pl-[3rem]">{domain.description}</p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {domain.tracks.map((track, trackIdx) => (
                                    <motion.div
                                        key={track.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: trackIdx * 0.1 }}
                                    >
                                        <Link href={`/roadmaps/${track.id}`} className="group block h-full">
                                            <div className="h-full bg-zinc-900 border border-zinc-800 p-6 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800/50 flex flex-col items-start justify-between">
                                                <div className="w-full">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className={`w-12 h-12 rounded bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-200 group-hover:text-white group-hover:border-zinc-700 transition-colors`}>
                                                            {track.icon}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <span className="text-[10px] uppercase tracking-wider border border-zinc-800 rounded px-2 py-1 text-zinc-500">
                                                                {track.level}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <h3 className={`text-xl font-bold text-white mb-2 group-hover:underline ${track.accent} decoration-2 underline-offset-4`}>
                                                        {track.title}
                                                    </h3>
                                                    <p className="text-zinc-400 text-sm mb-8">
                                                        {track.subtitle}
                                                    </p>
                                                </div>

                                                <div className="w-full pt-6 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-500 font-mono">
                                                    <span>{track.time}</span>
                                                    <span className="flex items-center gap-2 group-hover:text-white transition-colors">
                                                        View Syllabus
                                                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
