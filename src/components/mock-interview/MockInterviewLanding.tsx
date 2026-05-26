"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import InterviewSession from "./InterviewSession";

// Types
export type InterviewSettings = {
    role: string;
    type: string;
    difficulty: string;
    interviewer: 'male' | 'female';
};

const roles = [
    { id: "frontend", label: "Frontend Engineer", icon: "🎨" },
    { id: "backend", label: "Backend Engineer", icon: "⚙️" },
    { id: "fullstack", label: "Fullstack Engineer", icon: "🚀" },
    { id: "devops", label: "DevOps Engineer", icon: "☁️" },
];

const types = [
    { id: "technical", label: "Technical (DSA & Code)", desc: "Algorithmic problems and language specifics." },
    { id: "behavioral", label: "Behavioral", desc: "STAR method, soft skills, and culture fit." },
    { id: "system-design", label: "System Design", desc: "Architecture, scalability, and trade-offs." },
];

const difficulties = ["Junior", "Mid-Level", "Senior"];

export default function MockInterviewLanding() {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [settings, setSettings] = useState<InterviewSettings>({
        role: "frontend",
        type: "technical",
        difficulty: "Mid-Level",
        interviewer: 'female'
    });

    if (sessionStarted) {
        return <InterviewSession settings={settings} onExit={() => setSessionStarted(false)} />;
    }

    return (
        <div className="page-shell relative min-h-screen transition-colors duration-300">
            <div className="absolute inset-0 page-grid opacity-40" />
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
                <header className="mb-16 text-center max-w-3xl mx-auto">
                    <div className="theme-kicker mb-4">
                        AI-Powered Coaching
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black mb-6 text-ink"
                    >
                        Master Your Next <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Interview</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-text-muted text-lg leading-relaxed font-medium"
                    >
                        Practice with our advanced AI interviewer. Get real-time feedback, improve your confidence, and land your dream job.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-8 space-y-10"
                    >
                        <section>
                            <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">1</span>
                                Target Role
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={() => setSettings({ ...settings, role: role.id })}
                                        className={`p-5 rounded-lg border text-left transition-all relative overflow-hidden group ${settings.role === role.id
                                            ? "bg-primary text-bg-dark border-primary shadow-xl scale-105"
                                            : "bg-bg-card border-border-subtle text-text-muted hover:border-primary/50 hover:bg-surface"
                                            }`}
                                    >
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{role.icon}</div>
                                        <div className="font-bold text-xs uppercase tracking-wider">{role.label}</div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">2</span>
                                Interview Focus
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {types.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setSettings({ ...settings, type: type.id })}
                                        className={`p-6 rounded-lg border text-left transition-all h-full ${settings.type === type.id
                                            ? "bg-primary/15 border-primary text-ink shadow-lg shadow-primary/10"
                                            : "bg-bg-card border-border-subtle text-text-muted hover:border-primary/50 hover:bg-surface"
                                            }`}
                                    >
                                        <div className="font-black text-sm uppercase mb-2 tracking-wide">{type.label}</div>
                                        <div className={`text-xs leading-relaxed font-medium ${settings.type === type.id ? 'text-text-muted' : 'text-text-muted'}`}>
                                            {type.desc}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">3</span>
                                Difficulty Level
                            </h3>
                            <div className="flex gap-2 p-1.5 bg-bg-card rounded-lg border border-border-subtle w-fit shadow-inner">
                                {difficulties.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSettings({ ...settings, difficulty: level })}
                                        className={`px-8 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${settings.difficulty === level
                                            ? "bg-primary text-bg-dark shadow-xl"
                                            : "text-text-muted hover:text-primary"
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-bold">4</span>
                                Interviewer Persona
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setSettings({ ...settings, interviewer: 'female' })}
                                    className={`relative p-5 rounded-2xl border text-left flex items-center gap-4 transition-all overflow-hidden ${settings.interviewer === 'female'
                                        ? "bg-zinc-800 [.light-theme_&]:bg-white border-purple-500 shadow-xl"
                                        : "bg-zinc-900 border-zinc-800 [.light-theme_&]:bg-white [.light-theme_&]:border-black/5 hover:bg-zinc-800 [.light-theme_&]:hover:bg-zinc-50"
                                        }`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-700 overflow-hidden shrink-0 shadow-lg">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600" alt="Sarah" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white [.light-theme_&]:text-zinc-900">Sarah (HR)</div>
                                        <div className="text-xs text-zinc-500 font-medium">Professional & Structured</div>
                                    </div>
                                    {settings.interviewer === 'female' && <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />}
                                </button>
                                <button
                                    onClick={() => setSettings({ ...settings, interviewer: 'male' })}
                                    className={`relative p-5 rounded-2xl border text-left flex items-center gap-4 transition-all overflow-hidden ${settings.interviewer === 'male'
                                        ? "bg-zinc-800 [.light-theme_&]:bg-white border-blue-500 shadow-xl"
                                        : "bg-zinc-900 border-zinc-800 [.light-theme_&]:bg-white [.light-theme_&]:border-black/5 hover:bg-zinc-800 [.light-theme_&]:hover:bg-zinc-50"
                                        }`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-zinc-700 overflow-hidden shrink-0 shadow-lg">
                                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600" alt="David" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white [.light-theme_&]:text-zinc-900">David (Tech Lead)</div>
                                        <div className="text-xs text-zinc-500 font-medium">Technical & Direct</div>
                                    </div>
                                    {settings.interviewer === 'male' && <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />}
                                </button>
                            </div>
                        </section>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-4"
                    >
                        <div className="theme-card sticky top-24 p-8">
                            <h3 className="text-xl font-black mb-8 border-b border-border-subtle pb-4 text-ink">Session Summary</h3>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between items-center text-xs border-b border-zinc-800/50 [.light-theme_&]:border-black/5 pb-4">
                                    <span className="text-zinc-500 font-bold uppercase tracking-wider">Role</span>
                                    <span className="font-black text-white [.light-theme_&]:text-zinc-900 uppercase">{settings.role.replace('-', ' ')}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs border-b border-zinc-800/50 [.light-theme_&]:border-black/5 pb-4">
                                    <span className="text-zinc-500 font-bold uppercase tracking-wider">Focus</span>
                                    <span className="font-black text-white [.light-theme_&]:text-zinc-900 uppercase">{settings.type.replace('-', ' ')}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs border-b border-zinc-800/50 [.light-theme_&]:border-black/5 pb-4">
                                    <span className="text-zinc-500 font-bold uppercase tracking-wider">Level</span>
                                    <span className={`font-black uppercase ${settings.difficulty === 'Senior' ? 'text-red-500' :
                                        settings.difficulty === 'Mid-Level' ? 'text-yellow-500' : 'text-green-500'
                                        }`}>
                                        {settings.difficulty}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-500 font-bold uppercase tracking-wider">Est. Duration</span>
                                    <span className="font-black text-white [.light-theme_&]:text-zinc-900 uppercase">15 Minutes</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSessionStarted(true)}
                                className="theme-button flex w-full items-center justify-center gap-3 py-5 text-sm uppercase"
                            >
                                Start Interview
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>

                            <p className="text-center text-[10px] text-zinc-500 mt-6 font-bold uppercase tracking-wider leading-relaxed">
                                Microphone access is optional. <br/> You can type or speak your answers.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
