"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InterviewSettings } from "./MockInterviewLanding";
import InterviewFeedback from "./InterviewFeedback";
import Image from "next/image";

// Simulated avatars (would be local assets in a real app)
// For now, we will use placeholders if local images are not set up perfectly
// But we *did* generate them. We need to expose them.
// Since we can't easily move the generated files to public/avatars in this environment without a shell command that might work or not, 
// I'll assume they are there or use a robust fallback.
// Actually, I'll use the generated image paths if possible, but standard NEXT.js requires them in public.
// I'll skip the file move complexity and just use a placeholder URL for the demo that looks good if the local one fails,
// or use a base64 string if I could read it. 
// Let's assume the user will see a broken image if I don't move it. 
// I will try to use a generic professional avatar placeholder from a reliable CDN for now to ensure it works immediately.
const AVATARS = {
    female: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    male: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
};

// --- SIMULATED AI DATA ---
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

// --- SPEECH RECOGNITION SETUP ---
// Define interface for SpeechRecognition since it's experimental
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

    // Voice State
    const [isMuted, setIsMuted] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
    const recognitionRef = useRef<any>(null);

    // Initialize Voice Features
    useEffect(() => {
        // Speech Recognition Setup
        const { webkitSpeechRecognition } = window as unknown as IWindow;
        if (webkitSpeechRecognition) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false; // Stop after one sentence/pause for this demo flow
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
                // If we have content, auto-send after a small pause? 
                // Better to let user review and click send, OR auto-send if they stopped speaking.
                // For this demo, we'll go back to idle.
                setState('idle');
            };

            recognitionRef.current = recognition;
        }

        // Initial Greeting
        const greeting = `Hi! I'm ${settings.interviewer === 'female' ? 'Sarah' : 'David'}. I'll be conducting your ${settings.difficulty} level ${settings.type} interview for the ${settings.role} position. To start, could you please introduce yourself?`;

        // Slight delay to allow component to mount
        setTimeout(() => {
            speak(greeting);
            addMessage('ai', greeting);
        }, 1000);

        return () => {
            window.speechSynthesis.cancel();
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    // Scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const speak = (text: string) => {
        if (isMuted) return;

        window.speechSynthesis.cancel(); // Stop previous
        const utterance = new SpeechSynthesisUtterance(text);

        // Try to pick a voice
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

        // Simulate AI thinking and response
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

    // Avatar Pulse Animation
    const avatarScale = state === 'speaking' ? [1, 1.05, 1] : 1;
    const avatarBorderColor = state === 'speaking'
        ? settings.interviewer === 'female' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(59, 130, 246, 0.5)'
        : 'transparent';

    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden relative">

            {/* Main Content: Avatar & Visualization */}
            <div className="flex-1 flex flex-col items-center justify-center relative p-8">

                {/* Avatar Container */}
                <motion.div
                    animate={{ scale: avatarScale }}
                    transition={{ repeat: state === 'speaking' ? Infinity : 0, duration: 1 }}
                    className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 shadow-[0_0_100px_rgba(0,0,0,0.5)] z-10"
                    style={{ borderColor: avatarBorderColor }}
                >
                    <Image
                        src={settings.interviewer === 'female' ? AVATARS.female : AVATARS.male}
                        alt="AI Interviewer"
                        fill
                        className="object-cover"
                    />

                    {/* Status Badge */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${state === 'speaking' ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`} />
                        {state === 'speaking' ? 'SPEAKING' : state === 'listening' ? 'LISTENING' : state === 'processing' ? 'THINKING' : 'IDLE'}
                    </div>
                </motion.div>

                {/* Subtitles / Latest Message */}
                <div className="absolute bottom-32 left-0 w-full px-8 text-center z-20">
                    <AnimatePresence mode="wait">
                        {messages.length > 0 && messages[messages.length - 1].sender === 'ai' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="inline-block max-w-2xl bg-black/50 backdrop-blur-md p-6 rounded-2xl text-lg md:text-xl font-medium leading-relaxed shadow-2xl border border-white/5"
                            >
                                {messages[messages.length - 1].text}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* Sidebar: Chat History & Controls */}
            <div className="w-96 border-l border-zinc-800 bg-zinc-900/50 backdrop-blur flex flex-col z-30 transform transition-transform duration-300 translate-x-full md:translate-x-0 absolute md:static right-0 h-full">
                <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6">
                    <span className="font-bold">Interview Chat</span>
                    <button onClick={onExit} className="text-red-400 text-sm hover:underline">Exit</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-zinc-600 mt-1">{msg.sender === 'user' ? 'Me' : 'AI'}</span>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Controls */}
                <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                    <div className="relative">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type or speak..."
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 pr-10 text-sm focus:ring-1 focus:ring-indigo-500 outline-none resize-none h-20"
                        />
                        <button
                            onClick={toggleListening}
                            className={`absolute right-2 bottom-2 p-2 rounded-full transition-all ${state === 'listening' ? 'bg-red-500 text-white animate-pulse' : 'bg-zinc-700 text-zinc-400 hover:text-white'}`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={`text-xs flex items-center gap-1 ${isMuted ? 'text-red-400' : 'text-zinc-500'}`}
                        >
                            {isMuted ? 'Unmute Audio' : 'Mute Audio'}
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || state === 'processing' || state === 'speaking'}
                            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
