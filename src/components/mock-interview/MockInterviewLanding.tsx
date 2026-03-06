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
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30">
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
                <header className="mb-16 text-center max-w-3xl mx-auto">
                    <div className="inline-block px-3 py-1 mb-4 border border-purple-500/30 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono tracking-wider uppercase">
                        AI-Powered Coaching
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
                    >
                        Master Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Interview</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg leading-relaxed"
                    >
                        Practice with our advanced AI interviewer. Get real-time feedback, improve your confidence, and land your dream job.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Settings Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-8 space-y-10"
                    >

                        {/* 1. Choose Role */}
                        <section>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-xs">1</span>
                                Target Role
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={() => setSettings({ ...settings, role: role.id })}
                                        className={`p-4 rounded-xl border text-left transition-all ${settings.role === role.id
                                            ? "bg-white text-black border-white shadow-lg shadow-white/5"
                                            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800"
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{role.icon}</div>
                                        <div className="font-semibold text-sm">{role.label}</div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 2. Choose Type */}
                        <section>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-xs">2</span>
                                Interview Focus
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {types.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setSettings({ ...settings, type: type.id })}
                                        className={`p-5 rounded-xl border text-left transition-all h-full ${settings.type === type.id
                                            ? "bg-gradient-to-br from-purple-900/40 to-purple-900/10 border-purple-500 text-white"
                                            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800"
                                            }`}
                                    >
                                        <div className="font-bold mb-1">{type.label}</div>
                                        <div className={`text-xs leading-relaxed ${settings.type === type.id ? 'text-purple-200' : 'text-zinc-500'}`}>
                                            {type.desc}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 3. Choose Difficulty */}
                        <section>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-xs">3</span>
                                Difficulty Level
                            </h3>
                            <div className="flex gap-2 p-1 bg-zinc-900 rounded-lg border border-zinc-800 w-fit">
                                {difficulties.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSettings({ ...settings, difficulty: level })}
                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${settings.difficulty === level
                                            ? "bg-zinc-800 text-white shadow-sm ring-1 ring-white/10"
                                            : "text-zinc-500 hover:text-zinc-300"
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 4. Choose Interviewer */}
                        <section>
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-xs">4</span>
                                Interviewer Persona
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setSettings({ ...settings, interviewer: 'female' })}
                                    className={`relative p-4 rounded-xl border text-left flex items-center gap-4 transition-all overflow-hidden ${settings.interviewer === 'female'
                                        ? "bg-zinc-800 border-purple-500/50 ring-1 ring-purple-500/20"
                                        : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                                        }`}
                                >
                                    <div className="w-12 h-12 rounded-full bg-zinc-700 overflow-hidden shrink-0">
                                        <img src="/avatars/female.png" alt="Sarah" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">Sarah (HR)</div>
                                        <div className="text-xs text-zinc-500">Professional & Structured</div>
                                    </div>
                                    {settings.interviewer === 'female' && <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full" />}
                                </button>
                                <button
                                    onClick={() => setSettings({ ...settings, interviewer: 'male' })}
                                    className={`relative p-4 rounded-xl border text-left flex items-center gap-4 transition-all overflow-hidden ${settings.interviewer === 'male'
                                        ? "bg-zinc-800 border-blue-500/50 ring-1 ring-blue-500/20"
                                        : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                                        }`}
                                >
                                    <div className="w-12 h-12 rounded-full bg-zinc-700 overflow-hidden shrink-0">
                                        <img src="/avatars/male.png" alt="David" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">David (Tech Lead)</div>
                                        <div className="text-xs text-zinc-500">Technical & Direct</div>
                                    </div>
                                    {settings.interviewer === 'male' && <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />}
                                </button>
                            </div>
                        </section>

                    </motion.div>

                    {/* Summary / Start Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-4"
                    >
                        <div className="sticky top-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-6">Session Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3">
                                    <span className="text-zinc-400">Role</span>
                                    <span className="font-semibold text-white capitalize">{settings.role.replace('-', ' ')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3">
                                    <span className="text-zinc-400">Focus</span>
                                    <span className="font-semibold text-white capitalize">{settings.type.replace('-', ' ')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-zinc-800 pb-3">
                                    <span className="text-zinc-400">Level</span>
                                    <span className={`font-semibold capitalize ${settings.difficulty === 'Senior' ? 'text-red-400' :
                                        settings.difficulty === 'Mid-Level' ? 'text-yellow-400' : 'text-green-400'
                                        }`}>
                                        {settings.difficulty}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-zinc-400">Est. Duration</span>
                                    <span className="font-semibold text-white">~15 Minutes</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSessionStarted(true)}
                                className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 flex items-center justify-center gap-2"
                            >
                                Start Interview
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>

                            <p className="text-center text-xs text-zinc-500 mt-4">
                                Microphone access is optional. You can type or speak your answers.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
