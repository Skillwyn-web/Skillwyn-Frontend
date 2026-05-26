"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Minimal sharp icons
const Icons = {
    Cpp: () => (
        <div className="flex items-center justify-center w-full h-full font-black text-primary text-lg">
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
                accent: "decoration-primary"
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
                accent: "decoration-secondary"
            },
        ]
    }
];

export default function RoadmapsLanding() {
    return (
        <div className="page-shell relative min-h-screen p-8 transition-colors duration-300 md:p-12">
            <div className="absolute inset-0 page-grid pointer-events-none opacity-50" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="mb-24 border-b border-border-subtle pb-16 pt-16">
                    <Link href="/" className="mb-10 inline-flex items-center text-[10px] font-black uppercase text-text-muted transition-colors hover:text-primary group">
                        <svg className="w-3 h-3 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to SkillWyn
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 text-6xl font-black text-ink md:text-8xl"
                    >
                        Roadmaps
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-2xl text-xl font-medium leading-relaxed text-text-muted md:text-2xl"
                    >
                        AI-generated paths for students who want skills, portfolio proof, resume strength, and job-ready confidence.
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
                                    <span className="text-[10px] font-black text-text-muted uppercase">0{domainIdx + 1}</span>
                                    <h2 className="text-3xl font-black text-ink">{domain.title}</h2>
                                </div>
                                <p className="pl-[3.5rem] text-[10px] font-bold uppercase text-text-muted">{domain.description}</p>
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
                                            <div className="theme-card flex h-full flex-col items-start justify-between p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-2xl">
                                                <div className="w-full">
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border-subtle bg-bg-dark text-primary shadow-inner transition-colors group-hover:text-secondary">
                                                            {track.icon}
                                                        </div>
                                                        <span className="rounded-lg border border-border-subtle px-3 py-1.5 text-[9px] font-black uppercase text-text-muted shadow-sm">
                                                            {track.level}
                                                        </span>
                                                    </div>

                                                    <h3 className={`mb-3 text-2xl font-black text-ink group-hover:underline ${track.accent} decoration-4 underline-offset-8 transition-all`}>
                                                        {track.title}
                                                    </h3>
                                                    <p className="mb-8 text-xs font-bold uppercase leading-relaxed text-text-muted">
                                                        {track.subtitle}
                                                    </p>
                                                </div>

                                                <div className="flex w-full items-center justify-between border-t border-border-subtle pt-8 text-[10px] font-black uppercase text-text-muted">
                                                    <span>{track.time}</span>
                                                    <span className="flex items-center gap-2 transition-colors group-hover:text-primary">
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
