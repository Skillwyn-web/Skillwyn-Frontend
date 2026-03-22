"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const roadmapsData: Record<string, { title: string; subtitle: string; description: string; steps: { title: string; desc: string; duration: string }[] }> = {
    "dsa-cpp": {
        title: "Data Structures & Algorithms",
        subtitle: "C++ Specialization",
        description: "A comprehensive analysis of algorithmic problem solving, memory management, and low-level optimization.",
        steps: [
            { title: "Language Primitives", desc: "Memory model, pointers, references, and strict type system mastery.", duration: "Week 1-2" },
            { title: "Standard Template Library", desc: "Deep dive into Vectors, Maps, Sets, and Iterators.", duration: "Week 3-4" },
            { title: "Asymptotic Analysis", desc: "Formal proofs of Big O, Theta, and Omega notations.", duration: "Week 5" },
            { title: "Linear Data Structures", desc: "Implementation of custom Vectors, Linked Lists, Stacks, and queues.", duration: "Week 6-8" },
            { title: "Recursive Algorithms", desc: "Backtracking framework, pruning strategies, and recursion trees.", duration: "Week 9-10" },
            { title: "Hierarchical Structures", desc: "Trees, BSTs, AVL balancing, and Heaps.", duration: "Week 11-13" },
            { title: "Graph Theory", desc: "BFS/DFS traversal, Dijkstra, Prim’s, and Kruskal’s algorithms.", duration: "Week 14-16" },
            { title: "Dynamic Programming", desc: "Optimization techniques including Memoization and 2D Tabulation.", duration: "Week 17-20" },
        ]
    },
    "dsa-java": {
        title: "Data Structures & Algorithms",
        subtitle: "Java Enterprise",
        description: "Object-oriented implementation of core algorithms with a focus on clean architecture and efficiency.",
        steps: [
            { title: "Java Core", desc: "Object Cycle, Garbage Collection, Interfaces, and Generics.", duration: "Week 1-2" },
            { title: "Collections Framework", desc: "ArrayList, LinkedList, HashMap internal working, and HashSet.", duration: "Week 3-4" },
            { title: "Algorithmic Efficiency", desc: "Time and Space complexity analysis.", duration: "Week 5" },
            { title: "Fundamental Structures", desc: "Stacks, Queues, and PriorityQueues implementation.", duration: "Week 6-8" },
            { title: "Sorting Architectures", desc: "Merge Sort, Quick Sort, and Stability analysis.", duration: "Week 9-10" },
            { title: "Tree Traversal", desc: "Binary Search Trees and balancing algorithms.", duration: "Week 11-13" },
            { title: "Graph Systems", desc: "Adjacency Matrix/List representations and pathfinding.", duration: "Week 14-16" },
            { title: "Advanced Patterns", desc: "Tries, Disjoint Sets, and Segment Trees.", duration: "Week 17-20" },
        ]
    },
    "dsa-python": {
        title: "Data Structures & Algorithms",
        subtitle: "Pythonic Approach",
        description: "Rapid problem solving leveraging Python's succinct syntax and powerful built-in libraries.",
        steps: [
            { title: "Language Functionality", desc: "List comprehensions, Generators, Decorators, and typing.", duration: "Week 1-2" },
            { title: "Built-in Data Types", desc: "Deep dive into Lists, Dictionaries, Sets, and Tuples.", duration: "Week 3-4" },
            { title: "Algorithm Design", desc: "Greedy algorithms, Divide and Conquer approach.", duration: "Week 5" },
            { title: "Stack & Queue", desc: "Deque implementation and standard LIFO/FIFO problems.", duration: "Week 6-8" },
            { title: "Tree Structures", desc: "Binary Tree traversals (Inorder, Preorder, Postorder).", duration: "Week 9-11" },
            { title: "Graph Algorithms", desc: "Network traversal and shortest path problems.", duration: "Week 12-14" },
            { title: "DP Patterns", desc: "Knapsack, LCS, and Matrix Chain Multiplication.", duration: "Week 15-18" },
        ]
    },
    "dev-frontend": {
        title: "Frontend Engineering",
        subtitle: "Modern Web Stack",
        description: "Architecture, component design, and state management for scalable client-side applications.",
        steps: [
            { title: "The DOM & Web APIs", desc: "Event loop, Shadow DOM, and Browser rendering engine.", duration: "Week 1-3" },
            { title: "Modern JavaScript", desc: "ESNext features, Modules, Promises, and Async patterns.", duration: "Week 4-6" },
            { title: "React Architecture", desc: "Virtual DOM, Reconciliation, and Fiber architecture.", duration: "Week 7-9" },
            { title: "State Systems", desc: "Context API, Redux/Zustand implementation patterns.", duration: "Week 10-12" },
            { title: "Styling Paradigms", desc: "CSS-in-JS vs Utility-first (Tailwind) architectures.", duration: "Week 13-14" },
            { title: "Performance", desc: "Code splitting, Lazy loading, and Memoization.", duration: "Week 15-16" },
            { title: "Testing & QA", desc: "Unit testing with Jest and Integration testing with Cypress.", duration: "Week 17-18" },
            { title: "CI/CD & Deployment", desc: "Automated pipelines and Edge deployment strategies.", duration: "Week 19-20" },
        ]
    },
    "dev-backend": {
        title: "Backend Engineering",
        subtitle: "Distributed Systems",
        description: "Server-side logic, database design, and scalability patterns for high-performance applications.",
        steps: [
            { title: "Runtime Environment", desc: "Node.js internal architecture and Event Loop.", duration: "Week 1-3" },
            { title: "API Standards", desc: "REST vs GraphQL vs gRPC architectures.", duration: "Week 4-5" },
            { title: "Database Modeling", desc: "Normalization with PostgreSQL and Document modeling with MongoDB.", duration: "Week 6-8" },
            { title: "Authentication", desc: "OAuth 2.0 flows, JWT, and Session management.", duration: "Week 9-10" },
            { title: "System Caching", desc: "Redis implementation strategies and CDN integration.", duration: "Week 11-12" },
            { title: "Message Queues", desc: "Asynchronous processing with RabbitMQ/Kafka.", duration: "Week 13-15" },
            { title: "Security Protocols", desc: "OWASP Top 10 mitigation and encryption standards.", duration: "Week 16-17" },
            { title: "Infrastructure", desc: "Docker containerization and AWS primitives.", duration: "Week 18-20" },
        ]
    },
    "dev-fullstack": {
        title: "Fullstack Engineering",
        subtitle: "End-to-End Systems",
        description: "Holistic application development covering the entire software development lifecycle.",
        steps: [
            { title: "Foundations", desc: "HTML5, CSS3, and JavaScript Deep Dive.", duration: "Week 1-4" },
            { title: "Backend Services", desc: "API development utilizing Express/NestJS.", duration: "Week 5-8" },
            { title: "Database Layer", desc: "SQL schema design and ORM integration.", duration: "Week 9-11" },
            { title: "Frontend Client", desc: "SPA development with React/Next.js.", duration: "Week 12-15" },
            { title: "System Integration", desc: "CORS, Proxy configurations, and Environment management.", duration: "Week 16-17" },
            { title: "State & Data Fetching", desc: "Server State management (React Query) and Client State.", duration: "Week 18-19" },
            { title: "Production Logic", desc: "Error handling, Logging, and Monitoring.", duration: "Week 20-22" },
            { title: "Capstone Project", desc: "Architecting a multi-tenant SaaS application.", duration: "Week 23-26" },
        ]
    },
};

export default function RoadmapDetail({ slug }: { slug: string }) {
    const data = roadmapsData[slug];

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#09090b] [.light-theme_&]:bg-[#F7F4EA] text-white [.light-theme_&]:text-zinc-900 transition-colors duration-300">
                <div className="text-center">
                    <h1 className="text-2xl font-black mb-4 uppercase tracking-[0.2em]">404_Module_Not_Found</h1>
                    <Link href="/roadmaps" className="text-zinc-500 font-bold hover:text-white [.light-theme_&]:hover:text-zinc-900 uppercase tracking-widest text-xs underline underline-offset-8">
                        Return to Index
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] [.light-theme_&]:bg-[#F7F4EA] text-white [.light-theme_&]:text-zinc-900 font-sans selection:bg-white selection:text-black transition-colors duration-300">
            <div className="border-b border-zinc-800 [.light-theme_&]:border-black/5 bg-[#09090b] [.light-theme_&]:bg-[#F7F4EA] shadow-xl">
                <div className="max-w-5xl mx-auto px-10 py-20 md:py-32">
                    <Link href="/roadmaps" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white [.light-theme_&]:hover:text-zinc-900 mb-12 transition-colors group">
                        <svg className="w-3.5 h-3.5 mr-2.5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Syllabus Directory
                    </Link>

                    <div className="space-y-6">
                        <div className="inline-block px-4 py-1.5 border border-zinc-800 [.light-theme_&]:border-black/5 rounded-xl bg-zinc-900/50 [.light-theme_&]:bg-white text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 shadow-sm">
                            System Module: {slug.toUpperCase()}
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-black tracking-tighter text-white [.light-theme_&]:text-zinc-900 uppercase"
                        >
                            {data.title}
                        </motion.h1>
                        <p className="text-2xl md:text-3xl text-zinc-500 [.light-theme_&]:text-zinc-600 font-bold tracking-tight max-w-3xl leading-relaxed uppercase">
                            {data.subtitle}
                        </p>
                        <div className="h-2 w-32 bg-white/5 [.light-theme_&]:bg-black/5 mt-10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-1/3 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                        </div>
                        <p className="text-zinc-500 [.light-theme_&]:text-zinc-600 max-w-2xl pt-10 leading-relaxed font-bold uppercase tracking-widest text-[10px]">
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-10 py-32">
                <h2 className="text-[10px] font-black text-zinc-600 [.light-theme_&]:text-zinc-400 uppercase tracking-[0.3em] mb-16 border-b border-zinc-800 [.light-theme_&]:border-black/5 pb-6">
                    Vector Breakdown
                </h2>

                <div className="space-y-4">
                    {data.steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative border-l-4 border-zinc-800/30 [.light-theme_&]:border-black/5 pl-10 md:pl-16 pb-16 last:pb-0"
                        >
                            <div className="absolute -left-[10px] top-2 w-4 h-4 rounded-full bg-zinc-900 [.light-theme_&]:bg-white border-2 border-zinc-700 [.light-theme_&]:border-black/10 transition-all group-hover:bg-blue-600 group-hover:border-blue-400 group-hover:scale-125 shadow-lg" />

                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                                <div className="md:w-40 flex-shrink-0">
                                    <span className="text-[10px] font-black text-zinc-600 [.light-theme_&]:text-zinc-400 uppercase tracking-widest block mb-1">{step.duration}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-white [.light-theme_&]:text-zinc-900 mb-3 uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-zinc-500 [.light-theme_&]:text-zinc-600 leading-relaxed max-w-2xl text-xs md:text-sm font-bold uppercase tracking-wide">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 p-10 md:p-16 border-2 border-zinc-800 [.light-theme_&]:border-black/5 bg-zinc-900/40 [.light-theme_&]:bg-white rounded-[3rem] text-center shadow-2xl transition-all hover:scale-[1.01]">
                    <div className="inline-block p-5 rounded-3xl bg-zinc-950 [.light-theme_&]:bg-zinc-100 border border-zinc-800 [.light-theme_&]:border-black/5 mb-8 shadow-inner">
                        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-black text-white [.light-theme_&]:text-zinc-900 mb-4 uppercase tracking-tighter">Vector Certification</h3>
                    <p className="text-zinc-500 [.light-theme_&]:text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
                        Upon successful unit completion, you will have established core competencies for architectural engineering in this domain.
                    </p>
                </div>
            </div>
        </div>
    );
}
