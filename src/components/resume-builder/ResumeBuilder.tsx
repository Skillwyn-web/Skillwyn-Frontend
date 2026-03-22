"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/RippleButton";
import ResumeEditor from "./ResumeEditor";

export default function ResumeBuilder() {
    const [mode, setMode] = useState<"landing" | "editor">("landing");
    const [initialData, setInitialData] = useState<any>(null);

    const handleStartScratch = () => {
        setInitialData(null);
        setMode("editor");
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setTimeout(() => {
                setMode("editor");
            }, 1000);
        }
    };

    if (mode === "editor") {
        return <ResumeEditor initialData={initialData} onBack={() => setMode("landing")} />;
    }

    return (
        <div className="min-h-screen bg-[#09090b] [.light-theme_&]:bg-[#F7F4EA] text-white [.light-theme_&]:text-zinc-900 flex flex-col items-center justify-center p-6 font-sans overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [.light-theme_&]:bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="z-10 text-center max-w-3xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-6 tracking-tight text-white [.light-theme_&]:text-zinc-900"
                >
                    Build Your <span className="text-blue-500">Killer Resume</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 [.light-theme_&]:text-zinc-600 text-lg mb-12"
                >
                    Create a professional, ATS-friendly resume in minutes. Use our AI tools to enhance your bullet points and stand out.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={handleStartScratch}
                        className="group cursor-pointer bg-zinc-900 [.light-theme_&]:bg-white border border-zinc-800 [.light-theme_&]:border-black/5 p-8 rounded-2xl hover:border-blue-500/50 hover:bg-zinc-800/80 [.light-theme_&]:hover:bg-zinc-50 transition-all text-left shadow-xl [.light-theme_&]:shadow-sm"
                    >
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white [.light-theme_&]:text-zinc-900 group-hover:text-blue-400 transition-colors">Start from Scratch</h3>
                        <p className="text-zinc-500 [.light-theme_&]:text-zinc-600 text-sm">Build your resume step-by-step with our guided wizard.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="group relative cursor-pointer bg-zinc-900 [.light-theme_&]:bg-white border border-zinc-800 [.light-theme_&]:border-black/5 p-8 rounded-2xl hover:border-purple-500/50 hover:bg-zinc-800/80 [.light-theme_&]:hover:bg-zinc-50 transition-all text-left shadow-xl [.light-theme_&]:shadow-sm"
                    >
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer z-20"
                            accept=".pdf,.docx"
                            onChange={handleUpload}
                        />
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white [.light-theme_&]:text-zinc-900 group-hover:text-purple-400 transition-colors">Upload Resume</h3>
                        <p className="text-zinc-500 [.light-theme_&]:text-zinc-600 text-sm">Upload your existing resume (PDF) and we'll reformat it.</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
