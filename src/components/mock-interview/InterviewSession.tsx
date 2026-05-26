"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InterviewSettings } from "./MockInterviewLanding";
import InterviewFeedback from "./InterviewFeedback";
import Image from "next/image";

const AVATARS = {
    female: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    male: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
};

const QUESTION_BANK: Record<string, string[]> = {
    "intro": [
        "Tell me a little about yourself and your background.",
        "Why are you interested in this role?",
        "What's a challenging project you've worked on recently?"
    ],
    "frontend-technical": [
        "Explain the concept of Virtual DOM in React.",
        "What is the difference between specificity in CSS?",
        "How do you optimize a React application for performance?",
        "Explain the Event Loop in JavaScript.",
        "What are the differences between Local Storage, Session Storage, and Cookies?"
    ],
    "backend-technical": [
        "Explain the difference between REST and GraphQL.",
        "How do you handle database transactions?",
        "What strategies do you use for scaling a backend service?",
        "Explain the concept of ACID properties in databases.",
        "How does HTTPS work under the hood?"
    ],
    "behavioral": [
        "Tell me about a time you had a conflict with a coworker.",
        "Describe a situation where you had to meet a tight deadline.",
        "What is your greatest professional strength?",
        "Tell me about a time you failed and what you learned from it.",
    ],
    "system-design": [
        "Design a URL shortening service like Bit.ly.",
        "How would you design a chat application like WhatsApp?",
        "Design a rate limiter.",
        "Design a notification system for a large scale app."
    ]
};

const TOTAL_QUESTIONS = 5;

type Message = {
    id: string;
    sender: 'ai' | 'user';
    text: string;
    timestamp: Date;
};

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

export default function InterviewSession({ settings, onExit }: { settings: InterviewSettings; onExit: () => void }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [state, setState] = useState<'idle' | 'listening' | 'speaking' | 'processing'>("idle");
    const [questionCount, setQuestionCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const { webkitSpeechRecognition } = window as unknown as IWindow;
        if (webkitSpeechRecognition) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => setState('listening');

            recognition.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join('');
                setInputValue(transcript);
            };

            recognition.onend = () => {
                setState('idle');
            };

            recognitionRef.current = recognition;
        }

        const greeting = `Hi! I'm ${settings.interviewer === 'female' ? 'Sarah' : 'David'}. I'll be conducting your ${settings.difficulty} level ${settings.type} interview for the ${settings.role} position. To start, could you please introduce yourself?`;

        setTimeout(() => {
            speak(greeting);
            addMessage('ai', greeting);
        }, 1000);

        return () => {
            window.speechSynthesis.cancel();
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const speak = (text: string) => {
        if (isMuted) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        const voices = window.speechSynthesis.getVoices();
        let voice;
        if (settings.interviewer === 'female') {
            voice = voices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Google US English'));
        } else {
            voice = voices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('Google UK English Male'));
        }
        if (voice) utterance.voice = voice;

        utterance.rate = 1.0;
        utterance.pitch = settings.interviewer === 'female' ? 1.1 : 0.9;

        utterance.onstart = () => setState('speaking');
        utterance.onend = () => setState('idle');

        synthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported in this browser. Please use Chrome.");
            return;
        }

        if (state === 'listening') {
            recognitionRef.current.stop();
        } else {
            setInputValue("");
            recognitionRef.current.start();
        }
    };

    const addMessage = (sender: 'ai' | 'user', text: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            sender,
            text,
            timestamp: new Date()
        }]);
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue("");
        addMessage('user', userText);
        setState('processing');

        setTimeout(async () => {
            const nextQ = await getNextQuestion();
            addMessage('ai', nextQ);
            speak(nextQ);
        }, 2000);
    };

    const getNextQuestion = async () => {
        if (questionCount >= TOTAL_QUESTIONS) {
            setIsFinished(true);
            return "Thank you! That concludes our interview session. I've gathered enough data to provide you with feedback. Sending your report now...";
        }

        let pool = [];
        if (settings.type === 'behavioral') pool = QUESTION_BANK['behavioral'];
        else if (settings.type === 'system-design') pool = QUESTION_BANK['system-design'];
        else {
            const key = settings.role.includes('frontend') ? 'frontend-technical' : 'backend-technical';
            pool = QUESTION_BANK[key] || QUESTION_BANK['frontend-technical'];
        }

        const q = pool[Math.floor(Math.random() * pool.length)];
        setQuestionCount(prev => prev + 1);

        const prefixes = ["Great.", "I see.", "Interesting.", "Okay, moving on."];
        const prefix = questionCount > 0 ? prefixes[Math.floor(Math.random() * prefixes.length)] + " " : "";

        return prefix + q;
    };

    if (isFinished) {
        return <InterviewFeedback messages={messages} onExit={onExit} />;
    }

    const avatarScale = state === 'speaking' ? [1, 1.05, 1] : 1;
    const avatarBorderColor = state === 'speaking'
        ? settings.interviewer === 'female' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(59, 130, 246, 0.5)'
        : 'transparent';

    return (
        <div className="page-shell flex h-screen overflow-hidden relative transition-colors duration-300">
            <div className="flex-1 flex flex-col items-center justify-center relative p-8">
                <motion.div
                    animate={{ scale: avatarScale }}
                    transition={{ repeat: state === 'speaking' ? Infinity : 0, duration: 1 }}
                    className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 shadow-[0_0_100px_rgba(0,0,0,0.5)] [.light-theme_&]:shadow-none z-10 bg-zinc-900"
                    style={{ borderColor: avatarBorderColor }}
                >
                    <Image
                        src={settings.interviewer === 'female' ? AVATARS.female : AVATARS.male}
                        alt="AI Interviewer"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${state === 'speaking' ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`} />
                        {state === 'speaking' ? 'SPEAKING' : state === 'listening' ? 'LISTENING' : state === 'processing' ? 'THINKING' : 'IDLE'}
                    </div>
                </motion.div>

                <div className="absolute bottom-32 left-0 w-full px-8 text-center z-20">
                    <AnimatePresence mode="wait">
                        {messages.length > 0 && messages[messages.length - 1].sender === 'ai' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="inline-block max-w-2xl bg-black/80 [.light-theme_&]:bg-white/90 backdrop-blur-xl p-8 rounded-3xl text-lg md:text-xl font-black leading-relaxed shadow-2xl border border-white/5 [.light-theme_&]:border-black/5 text-white [.light-theme_&]:text-zinc-900"
                            >
                                {messages[messages.length - 1].text}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="w-96 border-l border-zinc-800 [.light-theme_&]:border-black/5 bg-zinc-900/50 [.light-theme_&]:bg-white/50 backdrop-blur-2xl flex flex-col z-30 transform transition-transform duration-300 translate-x-full md:translate-x-0 absolute md:static right-0 h-full">
                <div className="h-20 border-b border-zinc-800 [.light-theme_&]:border-black/5 flex items-center justify-between px-8">
                    <span className="font-black text-xs uppercase tracking-widest opacity-50">Interview Session</span>
                    <button onClick={onExit} className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline p-2">Exit Session</button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-bold leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white shadow-indigo-500/10' : 'bg-zinc-800 [.light-theme_&]:bg-zinc-100 text-zinc-300 [.light-theme_&]:text-zinc-600 shadow-black/5'}`}>
                                {msg.text}
                            </div>
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mt-2 px-1">{msg.sender === 'user' ? 'Candidate' : 'AI Interviewer'}</span>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-6 border-t border-zinc-800 [.light-theme_&]:border-black/5 bg-zinc-900 [.light-theme_&]:bg-white">
                    <div className="relative group">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type your response here..."
                            className="w-full bg-zinc-800 [.light-theme_&]:bg-zinc-50 border border-zinc-700 [.light-theme_&]:border-black/5 rounded-2xl p-4 pr-12 text-sm font-bold focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none h-24 shadow-inner transition-all"
                        />
                        <button
                            onClick={toggleListening}
                            className={`absolute right-3 bottom-3 p-2.5 rounded-xl transition-all shadow-lg ${state === 'listening' ? 'bg-red-500 text-white animate-pulse' : 'bg-zinc-700 [.light-theme_&]:bg-white text-zinc-400 [.light-theme_&]:text-zinc-600 hover:text-white [.light-theme_&]:hover:text-zinc-900 shadow-black/20'}`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`text-[10px] uppercase font-black tracking-widest flex items-center gap-2 px-2 py-1 rounded-md transition-all ${isMuted ? 'text-red-500 bg-red-500/10' : 'text-zinc-500 hover:text-white'}`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full ${isMuted ? 'bg-red-500' : 'bg-zinc-500'}`} />
                            {isMuted ? 'Audio Suspended' : 'Audio On'}
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || state === 'processing' || state === 'speaking'}
                            className="bg-white [.light-theme_&]:bg-zinc-900 text-black [.light-theme_&]:text-white px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all shadow-lg shadow-white/5 [.light-theme_&]:shadow-black/10"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
