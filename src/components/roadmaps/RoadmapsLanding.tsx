"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Minimal sharp icons
const Icons = {
    Cpp: () => (
        <div className="flex items-center justify-center w-full h-full font-black text-blue-500 text-lg">
            C++
        </div>
    ),
    Java: () => (
        <div className="flex items-center justify-center w-full h-full font-black text-orange-500 text-lg">
            JV
        </div>
    ),
    Python: () => (
        <div className="flex items-center justify-center w-full h-full font-black text-yellow-500 text-lg">
            PY
        </div>
    ),
    Frontend: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    Backend: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <path d="M22 6l-10 7L2 6" />
        </svg>
    ),
    Fullstack: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
                time: "4-6 Months",
                level: "Mid",
                icon: <Icons.Cpp />,
                accent: "decoration-blue-500"
            },
            {
                id: "dsa-java",
                title: "Java",
                subtitle: "Enterprise Architecture",
                time: "4-6 Months",
                level: "Mid",
                icon: <Icons.Java />,
                accent: "decoration-orange-500"
            },
            {
                id: "dsa-python",
                title: "Python",
                subtitle: "Data & Scripting",
                time: "3-4 Months",
                level: "Easy",
                icon: <Icons.Python />,
                accent: "decoration-yellow-500"
            },
        ]
    },
    {
        title: "Development Stacks",
        description: "Building production-ready applications at scale.",
        tracks: [
            {
                id: "dev-frontend",
                title: "Frontend",
                subtitle: "Experience Engineering",
                time: "6 Months",
                level: "Basic",
                icon: <Icons.Frontend />,
                accent: "decoration-cyan-500"
            },
            {
                id: "dev-backend",
                title: "Backend",
                subtitle: "Distributed Systems",
                time: "8 Months",
                level: "Pro",
                icon: <Icons.Backend />,
                accent: "decoration-green-500"
            },
            {
                id: "dev-fullstack",
                title: "Fullstack",
                subtitle: "Product Architecture",
                time: "12 Months",
                level: "Expert",
                icon: <Icons.Fullstack />,
                accent: "decoration-purple-500"
            },
        ]
    }
];

export default function RoadmapsLanding() {
    return (
        <div className="min-h-screen bg-[#09090b] [.light-theme_&]:bg-[#F7F4EA] text-white [.light-theme_&]:text-zinc-900 p-8 md:p-12 font-sans selection:bg-white selection:text-black transition-colors duration-300">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [.light-theme_&]:bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="mb-24 pt-16 border-b border-zinc-800 [.light-theme_&]:border-black/5 pb-16">
                    <Link href="/" className="inline-flex items-center text-[10px] font-black tracking-widest text-zinc-500 hover:text-white [.light-theme_&]:hover:text-zinc-900 mb-10 transition-colors group uppercase">
                        <svg className="w-3 h-3 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Terminal Index
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white [.light-theme_&]:text-zinc-900 uppercase"
                    >
                        Roadmaps
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 [.light-theme_&]:text-zinc-600 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed"
                    >
                        Structured learning vectors designed for elite engineering performance. 
                        Select a track to initialize.
                    </motion.p>
                </header>

                <div className="space-y-32">
                    {domains.map((domain, domainIdx) => (
                        <section key={domainIdx}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mb-12"
                            >
                                <div className="flex items-baseline gap-4 mb-4">
                                    <span className="text-[10px] font-black text-zinc-600 [.light-theme_&]:text-zinc-400 uppercase tracking-[0.3em]">0{domainIdx + 1}</span>
                                    <h2 className="text-3xl font-black text-white [.light-theme_&]:text-zinc-900 uppercase tracking-tight">{domain.title}</h2>
                                </div>
                                <p className="text-zinc-500 [.light-theme_&]:text-zinc-600 font-bold uppercase tracking-widest text-[10px] pl-[3.5rem]">{domain.description}</p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {domain.tracks.map((track, trackIdx) => (
                                    <motion.div
                                        key={track.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: trackIdx * 0.1 }}
                                    >
                                        <Link href={`/roadmaps/${track.id}`} className="group block h-full">
                                            <div className="h-full bg-zinc-900/50 [.light-theme_&]:bg-white border border-zinc-800 [.light-theme_&]:border-black/5 p-8 transition-all duration-300 hover:border-zinc-500 [.light-theme_&]:hover:border-black/10 hover:bg-zinc-800/80 [.light-theme_&]:hover:bg-zinc-50 flex flex-col items-start justify-between rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                                <div className="w-full">
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className={`w-14 h-14 rounded-2xl bg-zinc-950 [.light-theme_&]:bg-zinc-100 border border-zinc-800 [.light-theme_&]:border-black/5 flex items-center justify-center text-zinc-200 [.light-theme_&]:text-zinc-900 group-hover:text-white [.light-theme_&]:group-hover:text-blue-500 transition-colors shadow-inner`}>
                                                            {track.icon}
                                                        </div>
                                                        <span className="text-[9px] font-black uppercase tracking-widest border border-zinc-800 [.light-theme_&]:border-black/5 rounded-lg px-3 py-1.5 text-zinc-600 shadow-sm">
                                                            {track.level}
                                                        </span>
                                                    </div>

                                                    <h3 className={`text-2xl font-black text-white [.light-theme_&]:text-zinc-900 mb-3 uppercase tracking-tight group-hover:underline ${track.accent} decoration-4 underline-offset-8 transition-all`}>
                                                        {track.title}
                                                    </h3>
                                                    <p className="text-zinc-500 [.light-theme_&]:text-zinc-600 text-xs mb-8 leading-relaxed font-bold uppercase tracking-wider">
                                                        {track.subtitle}
                                                    </p>
                                                </div>

                                                <div className="w-full pt-8 border-t border-zinc-800/50 [.light-theme_&]:border-black/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                                    <span>{track.time}</span>
                                                    <span className="flex items-center gap-2 group-hover:text-white [.light-theme_&]:group-hover:text-zinc-900 transition-colors">
                                                        Access
                                                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
