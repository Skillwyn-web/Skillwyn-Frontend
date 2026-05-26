"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  GraduationCap,
  Map,
  Play,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/RippleButton";

const signals = [
  { label: "AI mentor", value: "24/7" },
  { label: "Project labs", value: "18+" },
  { label: "Interview reps", value: "120" },
];

const pipeline = [
  {
    title: "Student profile scanned",
    detail: "Skill gaps, target role, time available",
    icon: GraduationCap,
    accent: "text-primary",
  },
  {
    title: "AI roadmap generated",
    detail: "Weekly plan, DSA sets, project briefs",
    icon: Map,
    accent: "text-secondary",
  },
  {
    title: "Resume rebuilt",
    detail: "ATS bullets from verified projects",
    icon: FileText,
    accent: "text-accent",
  },
  {
    title: "Job matches unlocked",
    detail: "Talent pool rank + interview prep",
    icon: BriefcaseBusiness,
    accent: "text-primary",
  },
];

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[96vh] items-center overflow-hidden bg-bg-dark px-4 pt-28 text-text-primary sm:px-6 lg:px-8">
      <div className="absolute inset-0 ai-grid opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,12,0.35),#07090c_88%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8 inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs font-bold uppercase text-primary"
          >
            <Sparkles className="h-4 w-4" />
            AI-powered education for serious learners
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="max-w-4xl text-5xl font-semibold leading-[1.04] text-ink sm:text-6xl lg:text-7xl"
          >
            Learn faster with an AI mentor that turns effort into{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              job-ready proof.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-7 max-w-2xl text-lg font-medium leading-8 text-text-muted sm:text-xl"
          >
            SkillWyn combines adaptive roadmaps, DSA practice, real projects, resume feedback, and mock interviews into one focused learning system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/get-started">
              <RippleButton
                className="group rounded-lg bg-primary px-7 py-4 text-base font-extrabold text-bg-dark shadow-[0_20px_60px_rgba(102,227,255,0.22)] transition-all hover:bg-secondary"
                rippleColor="rgba(7, 9, 12, 0.16)"
              >
                <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                  Start learning
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </RippleButton>
            </Link>
            <Link
              href="/mock-interview"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-subtle bg-surface/70 px-7 py-4 text-base font-bold text-text-primary transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Play className="h-5 w-5" />
              Try AI interview
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-3"
          >
            {signals.map((item) => (
              <div key={item.label} className="rounded-lg border border-border-subtle bg-bg-card/70 p-4">
                <div className="font-jetbrains text-2xl font-bold text-ink">{item.value}</div>
                <div className="mt-1 text-xs font-bold uppercase text-text-muted">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="relative"
        >
          <div className="theme-card p-3 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between border-b border-border-subtle px-3 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-ink">SkillWyn placement engine</p>
                  <p className="text-xs font-semibold text-text-muted">Roadmap → resume → job shortlist</p>
                </div>
              </div>
              <span className="rounded-lg border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-bold uppercase text-secondary">
                AI active
              </span>
            </div>

            <div className="grid gap-3 p-3 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-lg border border-border-subtle bg-surface/60 p-4">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm font-extrabold text-ink">Live student journey</p>
                  <p className="font-jetbrains text-xs text-primary">87% hire-ready</p>
                </div>

                <div className="relative space-y-4 before:absolute before:left-5 before:top-6 before:h-[calc(100%-3rem)] before:w-px before:bg-border-subtle">
                  {pipeline.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.title} className="relative flex items-start gap-4">
                        <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-bg-dark">
                          <Icon className={`h-5 w-5 ${step.accent}`} />
                        </div>
                        <div className="min-w-0 flex-1 rounded-lg border border-border-subtle bg-bg-card/70 p-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-extrabold text-ink">{step.title}</p>
                            <span className="font-jetbrains text-[10px] text-text-muted">0{index + 1}</span>
                          </div>
                          <p className="mt-1 text-xs font-semibold leading-5 text-text-muted">{step.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="rounded-lg border border-border-subtle bg-bg-dark p-4">
                  <p className="text-xs font-bold uppercase text-primary">AI recommendation</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-snug text-ink">
                    Frontend + DSA track, then startup-ready full-stack project.
                  </h3>
                </div>

                <div className="rounded-lg border border-accent/25 bg-accent/10 p-4">
                  <p className="text-xs font-bold uppercase text-accent">Resume impact</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                    Converts project logs into quantified resume bullets and a verified SkillWyn profile.
                  </p>
                </div>

                <div className="rounded-lg border border-secondary/25 bg-secondary/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase text-secondary">Job landing score</p>
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="h-2 rounded-full bg-border-subtle">
                    <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-text-muted">Unlocks talent pool after mock interview pass.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
