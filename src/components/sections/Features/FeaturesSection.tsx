"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Icons
const PathIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="6" cy="6" r="3" />
    <path d="M6 9v2a6 6 0 0 0 6 6 4 4 0 0 0 4-4" />
    <path d="M19 13a3 3 0 1 0-2.6-5" />
  </svg>
);

const TerminalIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const FeaturesSection = () => {
  return (
    <section className="bg-black [.light-theme_&]:bg-[#F7F4EA] py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/4 -left-12 h-64 w-64 rounded-full bg-blue-900/10 [.light-theme_&]:bg-blue-400/10 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-12 h-64 w-64 rounded-full bg-purple-900/10 [.light-theme_&]:bg-purple-400/10 blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white [.light-theme_&]:text-zinc-900 mb-4 tracking-tight"
          >
            Everything you need to crack it.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-400 [.light-theme_&]:text-zinc-600 text-lg font-medium"
          >
            From hello world to offer letter.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2 bg-zinc-900/30 [.light-theme_&]:bg-white border border-zinc-800 [.light-theme_&]:border-black/5 rounded-2xl p-8 relative overflow-hidden group hover:border-zinc-700 [.light-theme_&]:hover:border-black/10 transition-all shadow-sm"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 [.light-theme_&]:opacity-[0.05] group-hover:opacity-20 transition-opacity">
              <PathIcon className="w-48 h-48 text-white [.light-theme_&]:text-zinc-900 rotate-12" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-10 h-10 rounded-lg bg-zinc-800 [.light-theme_&]:bg-zinc-100 flex items-center justify-center mb-6 border border-zinc-700 [.light-theme_&]:border-black/5"
                >
                  <PathIcon className="w-5 h-5 text-gray-200 [.light-theme_&]:text-zinc-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-white [.light-theme_&]:text-zinc-900 mb-2">Interactive Roadmaps</h3>
                <p className="text-zinc-400 [.light-theme_&]:text-zinc-600 mb-6 max-w-sm font-medium">Detailed step-by-step guides for Frontend, Backend, DevOps, and AI. Don't just watch tutorials, follow a path.</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['MERN', 'Java Spring', 'DevOps'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="bg-zinc-800 [.light-theme_&]:bg-zinc-100 border border-zinc-700 [.light-theme_&]:border-black/5 text-[10px] uppercase tracking-wider font-bold text-zinc-400 [.light-theme_&]:text-zinc-500 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-1 bg-zinc-900/30 [.light-theme_&]:bg-white border border-zinc-800 [.light-theme_&]:border-black/5 rounded-2xl p-8 relative overflow-hidden group hover:border-zinc-700 [.light-theme_&]:hover:border-black/10 transition-all shadow-sm flex flex-col"
          >
            <motion.div
              whileHover={{ rotate: -10 }}
              className="w-10 h-10 rounded-lg bg-zinc-800 [.light-theme_&]:bg-zinc-100 flex items-center justify-center mb-6 border border-zinc-700 [.light-theme_&]:border-black/5"
            >
              <TerminalIcon className="w-5 h-5 text-gray-200 [.light-theme_&]:text-zinc-600" />
            </motion.div>
            <h3 className="text-xl font-bold text-white [.light-theme_&]:text-zinc-900 mb-2">Practice Arena</h3>
            <p className="text-zinc-400 [.light-theme_&]:text-zinc-600 mb-8 text-sm font-medium">Built-in IDE. 500+ curated DSA problems categorized by company tags.</p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-auto bg-black [.light-theme_&]:bg-zinc-50 rounded-lg p-4 font-mono text-xs text-zinc-400 [.light-theme_&]:text-zinc-600 border border-zinc-800 [.light-theme_&]:border-black/5 relative shadow-xl"
            >
              <div className="absolute top-3 left-3 flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/20"></div>
              </div>
              <div className="pt-4 space-y-1">
                <div><span className="text-purple-400">const</span> <span className="text-blue-400">solve</span> = () ={'>'} {'{'}</div>
                <div className="pl-4 text-zinc-600 [.light-theme_&]:text-zinc-400">// Happy Coding!</div>
                <div>{'}'}</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="md:col-span-1 bg-zinc-900/30 [.light-theme_&]:bg-white border border-zinc-800 [.light-theme_&]:border-black/5 rounded-2xl p-8 relative overflow-hidden group hover:border-zinc-700 [.light-theme_&]:hover:border-black/10 transition-all shadow-sm flex flex-col"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-lg bg-zinc-800 [.light-theme_&]:bg-zinc-100 flex items-center justify-center mb-6 border border-zinc-700 [.light-theme_&]:border-black/5"
            >
              <UsersIcon className="w-5 h-5 text-gray-200 [.light-theme_&]:text-zinc-600" />
            </motion.div>
            <h3 className="text-xl font-bold text-white [.light-theme_&]:text-zinc-900 mb-2">Peer Learning</h3>
            <p className="text-zinc-400 [.light-theme_&]:text-zinc-600 mb-8 text-sm font-medium">Join study groups, code reviews, and weekly live doubt clearing sessions.</p>

            <div className="mt-auto flex -space-x-3 pl-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-zinc-800 [.light-theme_&]:bg-zinc-100 border-2 border-black [.light-theme_&]:border-white flex items-center justify-center overflow-hidden shadow-sm"
                >
                  <div className={`w-full h-full bg-zinc-700/50 [.light-theme_&]:bg-zinc-200/50 animate-pulse`} />
                </div>
              ))}
              <div
                className="w-10 h-10 rounded-full bg-zinc-800 [.light-theme_&]:bg-zinc-100 border-2 border-black [.light-theme_&]:border-white flex items-center justify-center text-[10px] text-white [.light-theme_&]:text-zinc-900 font-bold shadow-sm"
              >
                +4k
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="md:col-span-2 bg-zinc-900/30 [.light-theme_&]:bg-white border border-zinc-800 [.light-theme_&]:border-black/5 rounded-2xl p-8 relative overflow-hidden group hover:border-zinc-700 [.light-theme_&]:hover:border-black/10 transition-all shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-8 h-full">
              <div className="flex flex-col h-full">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 rounded-lg bg-zinc-800 [.light-theme_&]:bg-zinc-100 flex items-center justify-center mb-6 border border-zinc-700 [.light-theme_&]:border-black/5"
                >
                  <BriefcaseIcon className="w-5 h-5 text-gray-200 [.light-theme_&]:text-zinc-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-white [.light-theme_&]:text-zinc-900 mb-2">Career Toolkit</h3>
                <p className="text-zinc-400 [.light-theme_&]:text-zinc-600 font-medium">ATS-friendly resume builder and mock interview scheduler designed for tech roles.</p>
              </div>

              <div className="relative self-end w-full">
                <div
                  className="bg-zinc-900/50 [.light-theme_&]:bg-zinc-50 border border-zinc-800 [.light-theme_&]:border-black/5 rounded-t-xl p-4 w-full h-32 transition-all duration-300 shadow-sm"
                >
                  <div className="flex gap-4 items-center mb-4 border-b border-zinc-800 [.light-theme_&]:border-black/5 pb-4">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 [.light-theme_&]:bg-zinc-200"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-1.5 w-1/3 bg-zinc-800 [.light-theme_&]:bg-zinc-200 rounded"></div>
                      <div className="h-1.5 w-1/4 bg-zinc-800 [.light-theme_&]:bg-zinc-200 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-zinc-800/50 [.light-theme_&]:bg-zinc-200/50 rounded"></div>
                    <div className="h-1.5 w-5/6 bg-zinc-800/50 [.light-theme_&]:bg-zinc-200/50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
