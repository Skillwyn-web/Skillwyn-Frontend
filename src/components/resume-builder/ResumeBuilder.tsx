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
        <div className="page-shell relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 transition-colors duration-300">
            <div className="absolute inset-0 page-grid pointer-events-none opacity-50" />

            <div className="z-10 text-center max-w-3xl">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 text-5xl font-bold text-ink"
                >
                    Build Your <span className="text-primary">AI-Optimized Resume</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12 text-lg leading-8 text-text-muted"
                >
                    Turn projects, skills, and mock interview feedback into a professional ATS-friendly resume.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={handleStartScratch}
                        className="theme-card group cursor-pointer p-8 text-left transition-all hover:border-primary/50"
                    >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-ink group-hover:text-primary transition-colors">Start from Scratch</h3>
                        <p className="text-text-muted text-sm">Build your resume step-by-step with AI-guided structure.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="theme-card group relative cursor-pointer p-8 text-left transition-all hover:border-secondary/50"
                    >
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer z-20"
                            accept=".pdf,.docx"
                            onChange={handleUpload}
                        />
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                            <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-ink group-hover:text-secondary transition-colors">Upload Resume</h3>
                        <p className="text-text-muted text-sm">Upload your existing resume and let AI sharpen it.</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
