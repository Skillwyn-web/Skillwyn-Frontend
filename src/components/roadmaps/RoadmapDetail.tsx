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
            <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-mono font-bold mb-4">404: MODULE_NOT_FOUND</h1>
                    <Link href="/roadmaps" className="text-zinc-500 hover:text-white underline underline-offset-4">
                        Return to Index
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-white selection:text-black">
            {/* Header */}
            <div className="border-b border-zinc-800 bg-[#09090b]">
                <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
                    <Link href="/roadmaps" className="inline-flex items-center text-xs font-mono text-zinc-500 hover:text-white mb-8 transition-colors">
                        <svg className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        BACK TO CURRICULUM
                    </Link>

                    <div className="space-y-4">
                        <div className="inline-block px-3 py-1 border border-zinc-800 rounded bg-zinc-900/50 text-xs font-mono text-zinc-400 mb-2">
                            MODULE: {slug.toUpperCase()}
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
                        >
                            {data.title}
                        </motion.h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-3xl">
                            {data.subtitle}
                        </p>
                        <div className="h-px w-20 bg-white/20 mt-6" />
                        <p className="text-zinc-500 max-w-2xl pt-4 leading-relaxed">
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Syllabus */}
            <div className="max-w-5xl mx-auto px-6 py-20">
                <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-12 border-b border-zinc-800 pb-4">
                    Syllabus Breakdown
                </h2>

                <div className="space-y-0">
                    {data.steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative border-l border-zinc-800 pl-8 md:pl-12 pb-12 last:pb-0"
                        >
                            {/* Timeline Marker */}
                            <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] bg-zinc-900 border border-zinc-600 transition-colors group-hover:bg-white group-hover:border-white" />

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                <div className="md:w-32 flex-shrink-0">
                                    <span className="text-xs font-mono text-zinc-500 block mb-1">{step.duration}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed max-w-2xl text-sm md:text-base">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Completion State */}
                <div className="mt-20 p-8 border border-zinc-800 bg-zinc-900/20 rounded-lg text-center">
                    <div className="inline-block p-3 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Program Completion</h3>
                    <p className="text-zinc-500 text-sm max-w-md mx-auto">
                        Upon completing all modules, you will have mastered the core competencies required for this domain.
                    </p>
                </div>

            </div>
        </div>
    );
}
