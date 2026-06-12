"use client";

import React, { useState } from "react";
import { 
    Search, 
    Sparkles, 
    ChevronDown, 
    CheckCircle2, 
    Code2, 
    Building2, 
    Copy, 
    Check, 
    ArrowRight,
    MessageSquare,
    BookOpen,
    HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
    id: string;
    category: "DSA" | "System Design" | "Frontend" | "Backend" | "Behavioral";
    difficulty: "Easy" | "Medium" | "Hard";
    question: string;
    companies: string[];
    answer: string;
    code?: string;
    language?: string;
};

const questionsBank: Question[] = [
    {
        id: "q1",
        category: "DSA",
        difficulty: "Medium",
        question: "Longest Substring Without Repeating Characters",
        companies: ["Google", "Amazon", "Microsoft", "Meta"],
        answer: "We use a sliding window approach with a hash map to track the last seen index of each character. As we iterate through the string with a right pointer, if we find a repeating character within our current window, we shrink the window from the left by jumping the left pointer to `lastSeenIndex + 1`.",
        code: `function lengthOfLongestSubstring(s: string): number {
    let maxLength = 0;
    const charMap = new Map<string, number>();
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (charMap.has(char) && charMap.get(char)! >= left) {
            left = charMap.get(char)! + 1;
        }
        charMap.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}`,
        language: "typescript"
    },
    {
        id: "q2",
        category: "System Design",
        difficulty: "Hard",
        question: "Design a Scalable Rate Limiter",
        companies: ["Stripe", "Netflix", "Lyft"],
        answer: "A rate limiter restricts the number of requests a client can make in a given timeframe. We can implement this using the Token Bucket or Leaky Bucket algorithm. Redis is ideal for storage because it offers extremely fast read/writes and supports atomic transactions (like INCR and EXPIRE) and Lua scripting to prevent race conditions in clustered deployments.",
        code: `# Redis Lua Script for atomic token bucket check
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")

if current + 1 > limit then
    return 0
else
    redis.call("INCRBY", key, 1)
    if current == 0 then
        redis.call("EXPIRE", key, 1) -- 1 second window
    end
    return 1
end`
    },
    {
        id: "q3",
        category: "Frontend",
        difficulty: "Medium",
        question: "Optimize a React application with slow rendering",
        companies: ["Meta", "Uber", "Airbnb"],
        answer: "Optimization involves identifying and fixing redundant re-renders. 1) Use React DevTools Profiler to locate slow renders. 2) Implement memoization with React.memo(), useMemo, and useCallback. 3) Virtualize long lists using react-window. 4) Use lazy loading and code-splitting via dynamic imports. 5) Keep state localized to prevent triggering global renders.",
        code: `// Example of Memoized Item and List Virtualization
import React, { useMemo, useCallback } from 'react';

const TodoItem = React.memo(({ todo, onToggle }) => {
    return (
        <div onClick={() => onToggle(todo.id)} className="p-2 border-b border-white/5 cursor-pointer">
            {todo.text} {todo.done ? '✅' : '⏳'}
        </div>
    );
});
TodoItem.displayName = 'TodoItem';`
    },
    {
        id: "q4",
        category: "Backend",
        difficulty: "Medium",
        question: "How do you handle race conditions in database updates?",
        companies: ["Amazon", "Goldman Sachs", "Paypal"],
        answer: "To handle concurrent write access, we choose between: 1) Optimistic Locking: Best for read-heavy apps; we add a version column and reject writes if the version has changed. 2) Pessimistic Locking: Best for write-heavy, high-collision apps; we lock the rows (e.g., using SELECT ... FOR UPDATE) until the transaction finishes. 3) Atomic Operations: Databases can perform raw updates like UPDATE accounts SET balance = balance + 10 WHERE id = 1."
    },
    {
        id: "q5",
        category: "Behavioral",
        difficulty: "Easy",
        question: "Tell me about a time you had a conflict with a teammate.",
        companies: ["Google", "Amazon", "Microsoft"],
        answer: "Use the STAR method: Situation (describe the project context), Task (describe the conflict, e.g., difference in technical approach), Action (explain how you took initiative to set up a synchronous alignment meeting, listed pros/cons objectively, ran a prototype test), Result (how it resolved, what you learned, and how it strengthened the working relationship)."
    },
    {
        id: "q6",
        category: "DSA",
        difficulty: "Hard",
        question: "Merge k Sorted Lists optimally",
        companies: ["Amazon", "Google", "Facebook"],
        answer: "Using a Min-Heap (Priority Queue), we insert the head of all k lists. We pop the minimum node, attach it to our result list, and insert the next node from that specific list back into the heap. The time complexity is O(N log k) where N is the total nodes and k is the number of sorted lists.",
        code: `// Time: O(N log k), Space: O(k) for heap
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> queue = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode node : lists) {
            if (node != null) queue.add(node);
        }
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (!queue.isEmpty()) {
            tail.next = queue.poll();
            tail = tail.next;
            if (tail.next != null) queue.add(tail.next);
        }
        return dummy.next;
    }
}`,
        language: "java"
    }
];

export default function InterviewQuestions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    
    // AI Mockup State
    const [aiQuery, setAiQuery] = useState("");
    const [aiAnswer, setAiAnswer] = useState("");
    const [isAiLoading, setIsAiLoading] = useState(false);

    const categories = ["All", "DSA", "System Design", "Frontend", "Backend", "Behavioral"];

    const handleCopy = (id: string, text: string) => {
        void navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleAiSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!aiQuery.trim()) return;

        setIsAiLoading(true);
        setAiAnswer("");

        setTimeout(() => {
            setIsAiLoading(false);
            if (aiQuery.toLowerCase().includes("solid")) {
                setAiAnswer("Here is the optimal response for SOLID principles:\n\n1. **S**ingle Responsibility: A class should have only one reason to change.\n2. **O**pen/Closed: Software entities should be open for extension, closed for modification.\n3. **L**iskov Substitution: Subtypes must be substitutable for their base types.\n4. **I**nterface Segregation: Clients shouldn't be forced to depend on interfaces they don't use.\n5. **D**ependency Inversion: High-level modules should not depend on low-level modules; both should depend on abstractions.");
            } else if (aiQuery.toLowerCase().includes("indexing") || aiQuery.toLowerCase().includes("database index")) {
                setAiAnswer("An index is a pointer structure (usually B-Tree or B+Tree) created on a database table to speed up searches. It acts like a book index, allowing the DB engine to skip scanning the entire table (Sequential Scan) and perform a fast binary traversal instead. Downside: Inserts, updates, and deletes become slower since the index must also be rewritten.");
            } else if (aiQuery.toLowerCase().includes("dsa") || aiQuery.toLowerCase().includes("roadmap")) {
                setAiAnswer("SkillWyn recommendation: Master Arrays, Two Pointers, and Sliding Window first. Then learn Trees and DFS/BFS, before finally diving into Dynamic Programming. Do not memorize; focus on pattern recognition.");
            } else {
                setAiAnswer(`SkillWyn AI analysis of: "${aiQuery}"\n\nTo answer this optimally in an interview:\n1. Keep it structured (e.g. explain Concept, then Use Case, then Tradeoffs).\n2. Mention edge cases or performance profiles (Time/Space complexities).\n3. Keep the user narrative clear. Check out our customized role roadmaps for details!`);
            }
        }, 1500);
    };

    const filteredQuestions = questionsBank.filter((q) => {
        const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
        const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              q.companies.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
            {/* Grid background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
                <div className="absolute left-1/3 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[150px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-10">
                {/* Hero kicker */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 border border-white/12 bg-white/[0.035] px-3.5 py-2 text-[10px] font-black uppercase text-white/58 tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.03)]">
                        <Sparkles className="h-4 w-4 text-white" />
                        SkillWyn resource portal
                    </div>
                </div>

                <div className="text-center mt-6">
                    <h1 className="text-[clamp(2.5rem,6.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.06em] text-white">
                        Master the Tech <br />
                        <span className="bg-gradient-to-r from-white via-white to-white/45 bg-clip-text text-transparent">Interview Rounds</span>
                    </h1>
                    <p className="mt-6 max-w-xl mx-auto text-sm md:text-base font-medium leading-7 text-white/45">
                        Examine curated interview questions from actual product rounds, including structural breakdowns, code solutions, and real-time AI responses.
                    </p>
                </div>

                {/* AI Helper Sandbox */}
                <div className="mt-16 border border-white/12 bg-[#090909]/90 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-xl max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white">
                            <Sparkles className="w-5 h-5" />
                        </span>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-white">SkillWyn AI Assistant</h3>
                            <p className="text-[10px] text-white/36 mt-0.5">Instant technical response & structural breakdown</p>
                        </div>
                    </div>

                    <form onSubmit={handleAiSubmit} className="flex flex-col gap-3">
                        <div className="flex gap-2 bg-black border border-white/10 p-2 focus-within:border-white/30 transition-all rounded-xl">
                            <input
                                type="text"
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                placeholder="Ask AI: Explain SOLID principles / DB Indexing / Mock interview tips..."
                                className="flex-1 bg-transparent px-3 py-2 text-sm text-white focus:outline-none border-none placeholder-white/30"
                            />
                            <button
                                type="submit"
                                disabled={isAiLoading}
                                className="bg-white hover:bg-white/88 transition-colors text-black font-semibold text-xs px-4 py-2 uppercase flex items-center gap-1.5 shrink-0 rounded-lg"
                            >
                                {isAiLoading ? "Analyzing..." : "Ask AI"}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </form>

                    <AnimatePresence mode="wait">
                        {isAiLoading && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-5 p-4 border border-white/10 bg-black/40 rounded-xl flex items-center justify-center gap-3"
                            >
                                <div className="w-4 h-4 rounded-full border-2 border-white/10 border-t-white animate-spin" />
                                <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">SkillWyn engine is processing...</span>
                            </motion.div>
                        )}

                        {aiAnswer && !isAiLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-5 p-4 border border-white/12 bg-white/[0.02] rounded-xl text-xs md:text-sm text-white/70 leading-relaxed font-mono whitespace-pre-wrap"
                            >
                                <span className="block text-[10px] font-black uppercase text-white/32 tracking-wider mb-2">Generated answer:</span>
                                {aiAnswer}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main Filter & Search Hub */}
                <div className="mt-20 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/10 pb-6">
                    {/* Category tabs */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-xs font-black uppercase transition-all rounded-full ${
                                    selectedCategory === cat
                                        ? "bg-white text-black font-semibold"
                                        : "border border-white/10 bg-white/[0.02] text-white/58 hover:border-white/30 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full md:w-80 flex items-center bg-white/[0.025] border border-white/10 p-2 rounded-xl focus-within:border-white/30 transition-all">
                        <Search className="w-4 h-4 text-white/40 ml-2" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search questions or companies..."
                            className="bg-transparent text-xs text-white px-2 py-1 focus:outline-none w-full border-none placeholder-white/30"
                        />
                    </div>
                </div>

                {/* Questions Grid/List */}
                <div className="mt-8 flex flex-col gap-4">
                    {filteredQuestions.length > 0 ? (
                        filteredQuestions.map((q) => {
                            const isExpanded = expandedQuestionId === q.id;
                            return (
                                <motion.div
                                    key={q.id}
                                    layout="position"
                                    className={`border border-white/10 bg-[#090909]/60 rounded-xl overflow-hidden transition-all duration-300 ${
                                        isExpanded ? "border-white/20 bg-white/[0.015]" : "hover:border-white/16"
                                    }`}
                                >
                                    {/* Header Row */}
                                    <div
                                        onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                                        className="flex items-start md:items-center justify-between p-5 md:p-6 cursor-pointer select-none gap-4"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                                            <span className={`inline-flex px-2 py-1 text-[9px] font-black uppercase text-center border shrink-0 tracking-wider ${
                                                q.difficulty === "Easy" ? "border-green-500/30 text-green-400" :
                                                q.difficulty === "Medium" ? "border-yellow-500/30 text-yellow-400" :
                                                "border-red-500/30 text-red-400"
                                            }`}>
                                                {q.difficulty}
                                            </span>
                                            <span className="text-[10px] font-bold text-white/32 uppercase tracking-wide">
                                                {q.category}
                                            </span>
                                            <h3 className="text-sm md:text-base font-semibold text-white tracking-tight">
                                                {q.question}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-4 shrink-0">
                                            {/* Company Badges */}
                                            <div className="hidden lg:flex items-center gap-1">
                                                {q.companies.slice(0, 3).map((c) => (
                                                    <span 
                                                        key={c}
                                                        className="text-[9px] font-black border border-white/10 bg-white/5 text-white/50 px-2 py-0.5"
                                                    >
                                                        {c}
                                                    </span>
                                                ))}
                                                {q.companies.length > 3 && (
                                                    <span className="text-[9px] font-bold text-white/30 pl-1">
                                                        +{q.companies.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${
                                                isExpanded ? "rotate-180 text-white" : ""
                                            }`} />
                                        </div>
                                    </div>

                                    {/* Expanded Answer Content */}
                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: "auto" }}
                                                exit={{ height: 0 }}
                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                className="border-t border-white/10 bg-black/40"
                                            >
                                                <div className="p-5 md:p-6 flex flex-col gap-6 text-sm text-white/70 leading-relaxed">
                                                    {/* Company list for Mobile */}
                                                    <div className="flex flex-wrap items-center gap-2 lg:hidden">
                                                        <span className="text-[10px] font-black uppercase text-white/32">Asked at:</span>
                                                        {q.companies.map((c) => (
                                                            <span key={c} className="text-[9px] border border-white/10 bg-white/5 px-2 py-0.5 text-white/60">
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Explanation text */}
                                                    <div>
                                                        <span className="block text-[10px] font-black uppercase text-white/32 tracking-wider mb-2">Approach & Explanation:</span>
                                                        <p className="font-sans font-medium text-white/60">{q.answer}</p>
                                                    </div>

                                                    {/* Optional Code Block */}
                                                    {q.code && (
                                                        <div className="relative border border-white/10 bg-black rounded-lg overflow-hidden">
                                                            {/* Code bar */}
                                                            <div className="flex justify-between items-center px-4 py-2 border-b border-white/10 bg-[#0d0d0d]">
                                                                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 font-mono flex items-center gap-1.5">
                                                                    <Code2 className="w-3.5 h-3.5" />
                                                                    {q.language || "code snippet"}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleCopy(q.id, q.code || "")}
                                                                    className="text-white/40 hover:text-white flex items-center gap-1.5 transition-colors p-1"
                                                                >
                                                                    {copiedId === q.id ? (
                                                                        <>
                                                                            <Check className="w-3.5 h-3.5 text-green-400" />
                                                                            <span className="text-[10px] font-bold text-green-400">Copied</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Copy className="w-3.5 h-3.5" />
                                                                            <span className="text-[10px] font-bold">Copy</span>
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </div>
                                                            {/* Code content */}
                                                            <pre className="p-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed text-white/80 select-text">
                                                                <code>{q.code}</code>
                                                            </pre>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="text-center py-16 border border-white/8 bg-[#090909]/40 rounded-xl">
                            <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <h3 className="text-base font-semibold text-white">No questions found</h3>
                            <p className="text-xs text-white/34 mt-1">Try resetting the search or category filters.</p>
                        </div>
                    )}
                </div>

                {/* Next items / Call to Action */}
                <div className="mt-24 border border-white/12 bg-white p-6 md:p-10 rounded-2xl text-black flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(255,255,255,0.05)]">
                    <div>
                        <p className="text-xs font-black uppercase text-black/45 tracking-wider">SkillWyn Adaptive Engine</p>
                        <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                            Unlock Company-Specific <br />Mock interview packs.
                        </h2>
                        <p className="mt-3 text-xs md:text-sm font-medium text-black/58 leading-relaxed max-w-xl">
                            Our AI will map these questions to dynamic roadmap sprints. Get real questions, solve them in our IDE, and track your hire-readiness scorecard.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2.5 shrink-0">
                        <a
                            href="/get-started"
                            className="inline-flex items-center justify-center gap-2 bg-black hover:bg-black/88 transition-colors px-6 py-3.5 text-xs font-bold uppercase text-white rounded-xl shadow-lg group"
                        >
                            Launch Free Mock Round
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <a
                            href="/dsa"
                            className="inline-flex items-center justify-center gap-2 border border-black/14 hover:border-black/30 transition-all px-6 py-3.5 text-xs font-bold uppercase text-black rounded-xl"
                        >
                            View DSA Sheets
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
