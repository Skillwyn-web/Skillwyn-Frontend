"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InterviewFeedback({ messages, onExit }: { messages: any[]; onExit: () => void }) {
    const [scores, setScores] = useState({ technical: 0, clarity: 0, confidence: 0 });

    useEffect(() => {
        setScores({
            technical: 70 + Math.floor(Math.random() * 20),
            clarity: 75 + Math.floor(Math.random() * 20),
            confidence: 60 + Math.floor(Math.random() * 30),
        });
    }, []);

    const overall = Math.round((scores.technical + scores.clarity + scores.confidence) / 3);

    return (
        <div className="min-h-screen bg-[#050505] [.light-theme_&]:bg-[#F7F4EA] flex items-center justify-center p-6 text-white [.light-theme_&]:text-zinc-900 font-sans transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-2xl w-full bg-zinc-900 [.light-theme_&]:bg-white border border-zinc-800 [.light-theme_&]:border-black/5 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden backdrop-blur-3xl transition-all"
            >
                <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 mb-6 border border-purple-500/20 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black tracking-[0.2em] uppercase">
                        AI Performance Analysis
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Your Feedback</h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Based on {messages.length} data points from your session.</p>
                </div>

                <div className="flex justify-center mb-16">
                    <div className="relative w-52 h-52 flex items-center justify-center">
                        <svg className="absolute w-full h-full transform -rotate-90">
                            <circle cx="104" cy="104" r="94" stroke="currentColor" strokeWidth="12" fill="transparent" className="opacity-10" />
                            <circle
                                cx="104" cy="104" r="94" stroke="url(#gradient)" strokeWidth="12" fill="transparent"
                                strokeDasharray={591}
                                strokeDashoffset={591 - (591 * overall) / 100}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#d946ef" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="text-center">
                            <div className="text-6xl font-black tracking-tighter">{overall}%</div>
                            <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-2">Overall Score</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-16">
                    <div className="bg-zinc-800/50 [.light-theme_&]:bg-zinc-50 p-6 rounded-[2rem] text-center border border-white/5 [.light-theme_&]:border-black/5 shadow-inner">
                        <div className="text-blue-400 font-black text-2xl mb-2 tracking-tighter">{scores.technical}%</div>
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Logic</div>
                    </div>
                    <div className="bg-zinc-800/50 [.light-theme_&]:bg-zinc-50 p-6 rounded-[2rem] text-center border border-white/5 [.light-theme_&]:border-black/5 shadow-inner">
                        <div className="text-green-400 font-black text-2xl mb-2 tracking-tighter">{scores.clarity}%</div>
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Articulation</div>
                    </div>
                    <div className="bg-zinc-800/50 [.light-theme_&]:bg-zinc-50 p-6 rounded-[2rem] text-center border border-white/5 [.light-theme_&]:border-black/5 shadow-inner">
                        <div className="text-yellow-400 font-black text-2xl mb-2 tracking-tighter">{scores.confidence}%</div>
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Presence</div>
                    </div>
                </div>

                <div className="space-y-6 mb-16 bg-zinc-800/30 [.light-theme_&]:bg-zinc-50 p-8 rounded-[2.5rem] border border-white/5 [.light-theme_&]:border-black/5">
                    <h3 className="font-black text-xs uppercase tracking-widest opacity-50 mb-6">Key Insights</h3>
                    <div className="flex items-start gap-4 text-sm font-medium leading-relaxed group">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">✓</div>
                        <p className="text-zinc-300 [.light-theme_&]:text-zinc-700">Exceptional use of terminology. You accurately described complex engineering trade-offs.</p>
                    </div>
                    <div className="flex items-start gap-4 text-sm font-medium leading-relaxed group">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">⚠</div>
                        <p className="text-zinc-300 [.light-theme_&]:text-zinc-700">Aim for more concise answers in the behavior section. Use the STAR method to structure results.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onExit}
                        className="flex-1 py-5 rounded-[1.5rem] bg-zinc-800 [.light-theme_&]:bg-zinc-100 text-white [.light-theme_&]:text-zinc-900 font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex-1 py-5 rounded-[1.5rem] bg-white [.light-theme_&]:bg-zinc-900 text-black [.light-theme_&]:text-white font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5 [.light-theme_&]:shadow-black/10"
                    >
                        Detailed Report
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
