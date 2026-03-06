"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InterviewFeedback({ messages, onExit }: { messages: any[]; onExit: () => void }) {
    // Determine random scores for realism
    const [scores, setScores] = useState({ technical: 0, clarity: 0, confidence: 0 });

    useEffect(() => {
        // Simulate calculation
        setScores({
            technical: 70 + Math.floor(Math.random() * 20),
            clarity: 75 + Math.floor(Math.random() * 20),
            confidence: 60 + Math.floor(Math.random() * 30),
        });
    }, []);

    const overall = Math.round((scores.technical + scores.clarity + scores.confidence) / 3);

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-2">Interview Analysis</h2>
                    <p className="text-zinc-400">Here's how you performed based on AI evaluation.</p>
                </div>

                <div className="flex justify-center mb-12">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="absolute w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="#333" strokeWidth="8" fill="transparent" />
                            <circle
                                cx="80" cy="80" r="70" stroke="#8b5cf6" strokeWidth="8" fill="transparent"
                                strokeDasharray={440}
                                strokeDashoffset={440 - (440 * overall) / 100}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="text-center">
                            <div className="text-4xl font-bold">{overall}%</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Score</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-zinc-800/50 p-4 rounded-xl text-center">
                        <div className="text-blue-400 font-bold text-xl mb-1">{scores.technical}%</div>
                        <div className="text-xs text-zinc-500">Technical</div>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-xl text-center">
                        <div className="text-green-400 font-bold text-xl mb-1">{scores.clarity}%</div>
                        <div className="text-xs text-zinc-500">Clarity</div>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-xl text-center">
                        <div className="text-yellow-400 font-bold text-xl mb-1">{scores.confidence}%</div>
                        <div className="text-xs text-zinc-500">Confidence</div>
                    </div>
                </div>

                <div className="space-y-4 mb-10">
                    <h3 className="font-bold text-lg mb-4">Key Feedback</h3>
                    <div className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className="text-green-500 text-lg">✓</span>
                        <p>Good use of terminology. You accurately described the core concepts asked.</p>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className="text-yellow-500 text-lg">⚠</span>
                        <p>Consider structuring your answers using the STAR method (Situation, Task, Action, Result) for behavioral questions.</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onExit}
                        className="flex-1 py-3 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition-colors"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex-1 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                    >
                        Detailed Report
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
