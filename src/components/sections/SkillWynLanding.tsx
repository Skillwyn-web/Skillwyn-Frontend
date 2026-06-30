"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Braces,
  ClipboardCheck,
  Code2,
  Database,
  FileText,
  FolderKanban,
  GitBranch,
  LibraryBig,
  Map,
  MessagesSquare,
  MessageSquareText,
  Route,
  Server,
  Swords,
  UserRoundCheck,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";

const journey = [
  { label: "Roadmap", text: "AI maps your exact role path", icon: Map },
  { label: "Resume", text: "Projects become ATS-ready proof", icon: FileText },
  { label: "Placement", text: "Profile lands in hiring shortlists", icon: BriefcaseBusiness },
];

const mvpFeatures = [
  {
    title: "AI Roadmaps That Get You Shortlisted",
    text: "Stop guessing your path. Follow exact role-based paths for DSA, frontend, and backend that align with what tech companies actually hire for.",
    icon: Map,
  },
  {
    title: "The 50 Patterns That Crack MAANG",
    text: "Don't grind 500 random problems. Master the exact curated patterns our students use to clear interviews at top product companies.",
    icon: BookOpen,
  },
  {
    title: "Resumes That Pass The ATS Trap",
    text: "Convert your projects and skills into clean, high-impact ATS bullets that recruiters actively look for. Never get auto-rejected again.",
    icon: FileText,
  },
  {
    title: "Mock Interviews To Build Real Confidence",
    text: "Practice technical, HR, and system-design rounds with AI. Get structured feedback and eliminate interview anxiety before the real call.",
    icon: MessageSquareText,
  },
  {
    title: "A Profile That Proves Your Worth",
    text: "Degrees don't matter as much as proof of work. Get a verified public profile with a competitive rank that proves you can build real things.",
    icon: BadgeCheck,
  },
  {
    title: "Live Battles To Forge Problem Solvers",
    text: "Compete under pressure in live coding battles. Develop the speed and accuracy required to clear tough Online Assessment (OA) rounds.",
    icon: Swords,
  },
];

const scoreMetrics = [
  { label: "DSA consistency", value: "31%" },
  { label: "Project proof", value: "24%" },
  { label: "Resume strength", value: "18%" },
  { label: "Interview readiness", value: "27%" },
];

const productShowcase = [
  {
    title: "AI Resume Analyzer",
    text: "Upload your resume and get ATS score, missing keywords, strengths, and fixes built for tech roles.",
    href: "/resume",
    icon: FileText,
    accent: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "AI Mock Interviews",
    text: "Practice technical and HR rounds with structured feedback before the real interview call.",
    href: "/mock-interview",
    icon: MessageSquareText,
    accent: "bg-purple-50 text-purple-600",
  },
  {
    title: "AI Roadmap Builder",
    text: "Pick a role and follow a focused week-by-week path from basics to job-ready projects.",
    href: "/roadmaps",
    icon: Map,
    accent: "bg-teal-50 text-teal-600",
  },
  {
    title: "Resources Hub",
    text: "DSA sheets, interview packs, templates, cheat sheets, and career resources in one searchable hub.",
    href: "/resources",
    icon: BookOpen,
    accent: "bg-blue-50 text-blue-600",
  },
  {
    title: "AI Project Builder",
    text: "Turn skills into portfolio-ready project ideas, tasks, and resume bullets that prove ability.",
    href: "/resources",
    icon: Code2,
    accent: "bg-amber-50 text-amber-600",
  },
];

const techBadges = [
  { label: "React", icon: Atom, className: "left-[4%] top-[14%] sm:left-[8%]" },
  { label: "Node.js", icon: Server, className: "right-[5%] top-[17%] sm:right-[8%]" },
  { label: "DSA", icon: Braces, className: "left-[1%] top-[42%] sm:left-[3%]" },
  { label: "Python", icon: Code2, className: "right-[1%] top-[43%] sm:right-[3%]" },
  { label: "Git", icon: GitBranch, className: "left-[16%] bottom-[22%]" },
  { label: "SQL", icon: Database, className: "right-[17%] bottom-[22%]" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 42, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroLearningVisual({ loading }: { loading: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 34, scale: 0.98 }}
      animate={{ opacity: loading ? 0 : 1, x: loading ? 34 : 0, scale: loading ? 0.98 : 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="order-first relative z-[2] mx-auto w-full max-w-[340px] lg:order-none lg:max-w-[520px] lg:-translate-y-4"
    >
      <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] border border-white/20 bg-[#2563eb] p-3 shadow-[0_24px_70px_rgba(37,99,235,0.22)] sm:min-h-[430px] sm:rounded-[2rem] sm:p-4 lg:min-h-[560px] lg:p-6">
        <div className="absolute left-1/2 bottom-0 h-[260px] w-[340px] -translate-x-1/2 rounded-t-full bg-[#07136d] sm:h-[350px] sm:w-[440px] lg:h-[430px] lg:w-[530px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:48px_48px] opacity-45" />

        {techBadges.map((badge, index) => {
          const Icon = badge.icon;

          return (
            <motion.div
              key={badge.label}
              animate={{ y: [0, index % 2 === 0 ? -10 : 10, 0] }}
              transition={{ duration: 4.6 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute z-20 flex items-center gap-1.5 rounded-full border-[0.5px] border-white/70 bg-white px-2.5 py-1.5 text-[11px] font-black text-slate-700 shadow-[0_14px_34px_rgba(15,23,42,0.18)] sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${badge.className}`}
            >
              <Icon className="h-4 w-4 text-[#2563eb]" />
              <span>{badge.label}</span>
            </motion.div>
          );
        })}

        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 7, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[17%] top-[31%] z-10 h-12 w-12 rounded-full border-2 border-white/80"
        >
          <span className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom bg-white/80" />
          <span className="absolute left-1/2 top-1/2 h-0.5 w-1/3 bg-white/80" />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
          <Image
            src="/hero-student-human.png"
            alt="Smiling student ready for tech career"
            width={520}
            height={520}
            priority
            className="h-auto w-[80%] max-w-[250px] object-contain drop-shadow-[0_28px_40px_rgba(3,7,18,0.32)] sm:max-w-[350px] lg:max-w-[420px]"
          />
        </div>
      </div>
    </motion.div>
  );
}

function ProductPreview({ title }: { title: string }) {
  if (title.includes("Resume")) {
    return (
      <div className="relative mt-8 flex flex-1 items-end">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">ATS Preview</span>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-600">84/100</span>
          </div>
          <div className="space-y-2">
            {["Professional Summary", "React + Next.js", "Project Metrics", "Keywords"].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#2563eb]" />
                <div className="h-2 flex-1 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${82 - index * 10}%` }} />
                </div>
                <span className="w-24 text-[10px] font-semibold text-slate-500">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-[#eff6ff] p-3 text-xs font-semibold text-[#1d4ed8]">
            Add 3 measurable outcomes to improve recruiter signal.
          </div>
        </div>
      </div>
    );
  }

  if (title.includes("Mock")) {
    return (
      <div className="relative mt-8 flex flex-1 items-end">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          <div className="rounded-xl bg-[#2563eb] p-3 text-sm font-bold text-white">Frontend Interview • Round 2</div>
          <div className="mt-4 grid gap-3">
            {[
              ["Communication", "92%"],
              ["DSA reasoning", "78%"],
              ["React depth", "86%"],
            ].map(([label, score]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-3">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                  <span>{label}</span>
                  <span>{score}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-[#2563eb]" style={{ width: score }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (title.includes("Roadmap")) {
    return (
      <div className="relative mt-8 flex flex-1 items-end">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          {["Foundations", "React Projects", "Job Ready"].map((phase, index) => (
            <div key={phase} className="flex gap-3 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-[#2563eb] text-xs font-bold text-white">{index + 1}</div>
                {index < 2 ? <div className="h-full w-px bg-blue-100" /> : null}
              </div>
              <div className="flex-1 rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-bold text-slate-900">{phase}</p>
                <p className="mt-1 text-xs text-[#5b6fb3]">{index === 0 ? "5 topics" : index === 1 ? "5 projects" : "Interview sprint"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (title.includes("DSA")) {
    return (
      <div className="relative mt-8 flex flex-1 items-end">
        <div className="grid w-full gap-3">
          {["Arrays", "DP", "Graphs"].map((topic, index) => (
            <div key={topic} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.1)]">
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-900">{topic}</p>
                <span className="text-xs font-bold text-[#2563eb]">{12 + index * 6}/45 done</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${38 + index * 16}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (title.includes("Project")) {
    return (
      <div className="relative mt-8 flex flex-1 items-end">
        <div className="grid w-full gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          {["Idea", "Tasks", "Resume bullets"].map((stage) => (
            <div key={stage} className="rounded-xl bg-slate-50 p-3">
              <p className="text-sm font-bold text-slate-900">{stage}</p>
              <p className="mt-1 text-xs text-[#5b6fb3]">AI generates portfolio-ready output</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-8 flex flex-1 items-end">
      <div className="flex w-full flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
        {["DSA Sheet", "React Qs", "DBMS PDF", "SQL 50", "Templates", "System Design"].map((item) => (
          <span key={item} className="rounded-full bg-[#eff6ff] px-3 py-2 text-xs font-bold text-[#2563eb]">{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProductPreviewShowcase({ title }: { title: string }) {
  const showcaseImages: Record<string, string> = {
    "AI Resume Analyzer": "/resume-analyzer-showcase.png",
    "AI Mock Interviews": "/mock-interview-showcase.png",
    "AI Roadmap Builder": "/roadmap-builder-showcase.png",
    "Resources Hub": "/resource-hub-showcase.png",
    "AI Project Builder": "/project-builder-showcase.png",
  };
  const showcaseImage = showcaseImages[title];
  const isCompact = title.includes("Roadmap") || title.includes("Resources") || title.includes("Project");

  if (showcaseImage) {
    return (
      <div className="relative mt-auto pt-8">
        <div className="overflow-hidden rounded-[1.45rem] border border-[#bfdbfe] bg-white p-2 shadow-[0_26px_70px_rgba(15,23,42,0.18)]">
          <Image
            src={showcaseImage}
            alt={`${title} product preview`}
            width={1536}
            height={1024}
            className={`${isCompact ? "h-[240px]" : "h-[320px]"} w-full object-contain object-center`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    );
  }

  const laptop = "relative mt-auto pt-8";
  const screen = "relative overflow-hidden rounded-t-[1.35rem] border-[10px] border-[#0f172a] bg-white shadow-[0_28px_70px_rgba(15,23,42,0.22)]";
  const base = "mx-auto h-4 w-[88%] rounded-b-[1.2rem] bg-[#111827] shadow-[0_18px_45px_rgba(15,23,42,0.2)]";

  if (title.includes("Resume")) {
    return (
      <div className="relative mt-auto pt-8">
        <div className="relative overflow-hidden rounded-[1.45rem] border-[10px] border-[#0f172a] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.24)]">
          <Image
            src="/resume-analyzer-showcase.png"
            alt="AI resume analyzer showing a real resume and analysis panel"
            width={1536}
            height={1024}
            className="h-[300px] w-full object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="mx-auto h-4 w-[88%] rounded-b-[1.2rem] bg-[#111827] shadow-[0_18px_45px_rgba(15,23,42,0.2)]" />
      </div>
    );
  }

  if (title.includes("Mock")) {
    return (
      <div className={laptop}>
        <div className={screen}>
          <div className="bg-[#2563eb] px-4 py-3 text-xs font-black text-white">Live AI Mock Interview</div>
          <div className="grid min-h-[235px] grid-cols-[0.8fr_1fr] gap-4 p-5">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-3 h-16 rounded-2xl bg-[#dbeafe]" />
              <p className="text-xs font-bold text-slate-900">Explain React reconciliation.</p>
              <p className="mt-2 text-[10px] text-[#5b6fb3]">AI follow-up in 30 sec</p>
            </div>
            <div className="space-y-3">
              {[
                ["Communication", "92%"],
                ["DSA reasoning", "78%"],
                ["React depth", "86%"],
              ].map(([label, score]) => (
                <div key={label} className="rounded-xl border border-slate-100 bg-white p-3">
                  <div className="flex justify-between text-[10px] font-black text-slate-600">
                    <span>{label}</span>
                    <span>{score}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[#2563eb]" style={{ width: score }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={base} />
      </div>
    );
  }

  if (title.includes("Roadmap")) {
    return (
      <div className={laptop}>
        <div className={screen}>
          <div className="flex items-center justify-between bg-[#f8fbff] px-4 py-3">
            <span className="text-xs font-black text-[#2563eb]">Full-stack roadmap</span>
            <span className="text-[10px] font-bold text-slate-500">Week 4/12</span>
          </div>
          <div className="min-h-[235px] p-5">
            {["Foundations", "React projects", "Backend APIs", "Interview sprint"].map((phase, index) => (
              <div key={phase} className="flex gap-3 pb-4 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-[#2563eb] text-xs font-black text-white">{index + 1}</div>
                  {index < 3 ? <div className="h-full w-px bg-blue-100" /> : null}
                </div>
                <div className="flex-1 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-black text-slate-900">{phase}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-white">
                    <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${72 - index * 12}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={base} />
      </div>
    );
  }

  if (title.includes("DSA")) {
    return (
      <div className={laptop}>
        <div className={screen}>
          <div className="grid min-h-[235px] gap-3 bg-[#f8fbff] p-5">
            {["Arrays", "Dynamic programming", "Graphs"].map((topic, index) => (
              <div key={topic} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-slate-900">{topic}</p>
                  <span className="text-xs font-black text-[#2563eb]">{12 + index * 8}/45</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${38 + index * 18}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={base} />
      </div>
    );
  }

  if (title.includes("Project")) {
    return (
      <div className={laptop}>
        <div className={screen}>
          <div className="grid min-h-[235px] grid-cols-3 gap-3 bg-[#f8fbff] p-5">
            {["Idea", "Build", "Proof"].map((stage, index) => (
              <div key={stage} className="rounded-2xl bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
                <p className="text-xs font-black text-[#2563eb]">{stage}</p>
                <div className="mt-4 space-y-2">
                  <div className="h-2 rounded-full bg-slate-100" />
                  <div className="h-2 w-10/12 rounded-full bg-slate-100" />
                  <div className="h-2 w-7/12 rounded-full bg-slate-100" />
                </div>
                {index === 2 ? <div className="mt-5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-600">Ready</div> : null}
              </div>
            ))}
          </div>
        </div>
        <div className={base} />
      </div>
    );
  }

  return (
    <div className={laptop}>
      <div className={screen}>
        <div className="grid min-h-[235px] grid-cols-2 gap-3 bg-[#f8fbff] p-5">
          {["DSA Sheet", "React Qs", "DBMS PDF", "SQL 50", "Templates", "System Design"].map((item) => (
            <div key={item} className="rounded-2xl bg-white p-4 text-sm font-black text-[#2563eb] shadow-[0_12px_30px_rgba(15,23,42,0.06)]">{item}</div>
          ))}
        </div>
      </div>
      <div className={base} />
    </div>
  );
}

function FeatureArrow({ href, label, tone = "dark" }: { href: string; label: string; tone?: "dark" | "light" | "blue" }) {
  const isLight = tone === "light";

  return (
    <div
      aria-label="Coming Soon"
      style={{
        padding: "6px 14px",
        borderRadius: "100px",
        background: isLight ? "rgba(37,99,235,0.08)" : "rgba(255,255,255,0.15)",
        border: `1.5px solid ${isLight ? "rgba(0,0,0,0.15)" : tone === "blue" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.3)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "not-allowed",
        opacity: 0.7,
      }}
    >
      <span
        style={{
          fontSize: "10px",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: isLight ? "#0f172a" : "#ffffff",
        }}
      >
        Soon
      </span>
    </div>
  );
}

function MosaicArrow({ href, label }: { href: string; label: string }) {
  return (
    <div
      aria-label="Coming Soon"
      className="flex cursor-not-allowed items-center justify-center rounded-full border border-blue-200 bg-blue-50/50 px-3 py-1.5 opacity-80"
    >
      <span className="text-[10px] font-black uppercase tracking-widest text-[#2563eb]">
        Soon
      </span>
    </div>
  );
}

function ProductMosaic() {
  const cardClass = "group relative overflow-hidden rounded-[1.5rem] border border-blue-100/70 bg-[#fbfdff] p-7 shadow-[0_12px_34px_rgba(15,23,42,0.055)]";
  const titleClass = "text-[23px] font-bold leading-tight tracking-[-0.03em] text-[#102a7a]";
  const bodyClass = "mt-3 max-w-[95%] text-[13px] font-semibold leading-snug text-[#001447]/80";

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px", amount: 0.05 }}
      className="mx-auto grid max-w-7xl gap-6 grid-cols-6"
    >
      {/* Row 1: 3 Columns on large screens */}
      {/* Card 1: AI Resume Analyzer */}
      <motion.div variants={cardReveal} className={`${cardClass} col-span-6 md:col-span-3 lg:col-span-2 min-h-[380px] flex flex-col justify-between`}>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#2563eb]">
                <ClipboardCheck className="h-5 w-5" />
                <h3 className={titleClass}>AI Resume Analyzer</h3>
              </div>
              <p className={bodyClass}>ATS friendly and role specific resume, auto generated</p>
            </div>
            <MosaicArrow href="/resume" label="Open AI Resume Analyzer" />
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-blue-100/50 shadow-sm">
          <Image
            src="/resume-analyzer-showcase.png"
            alt="Resume analyzer preview"
            width={1536}
            height={1024}
            className="block h-[200px] w-full rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
      </motion.div>

      {/* Card 2: AI Roadmap Selection */}
      <motion.div variants={cardReveal} className={`${cardClass} col-span-6 md:col-span-3 lg:col-span-2 min-h-[380px] flex flex-col justify-between`}>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#2563eb]">
                <Route className="h-5 w-5" />
                <h3 className={titleClass}>AI Roadmap Selection</h3>
              </div>
              <p className={bodyClass}>Pick a role and get a focused path built around your goals.</p>
            </div>
            <MosaicArrow href="/roadmaps" label="Open AI Roadmap Selection" />
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-blue-100/50 shadow-sm">
          <Image
            src="/roadmap-builder-showcase.png"
            alt="AI roadmap selection preview"
            width={1024}
            height={1024}
            className="block h-[200px] w-full rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
      </motion.div>

      {/* Card 3: AI Mock Interviews */}
      <motion.div variants={cardReveal} className={`${cardClass} col-span-6 md:col-span-6 lg:col-span-2 min-h-[380px] flex flex-col justify-between`}>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#2563eb]">
                <MessagesSquare className="h-5 w-5" />
                <h3 className={titleClass}>AI Mock Interviews</h3>
              </div>
              <p className={bodyClass}>Practice before the real call. Real questions. Structured feedback.</p>
            </div>
            <MosaicArrow href="/mock-interview" label="Open AI Mock Interviews" />
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-blue-100/50 shadow-sm">
          <Image
            src="/mock-interview-showcase.png"
            alt="Mock interview preview"
            width={1920}
            height={1280}
            className="block h-[200px] w-full rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
      </motion.div>

      {/* Row 2: 2 Columns on medium/large screens */}
      {/* Card 4: Resources Hub */}
      <motion.div variants={cardReveal} className={`${cardClass} col-span-6 md:col-span-3 min-h-[360px] flex flex-col justify-between`}>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#2563eb]">
                <LibraryBig className="h-5 w-5" />
                <h3 className={titleClass}>Resources Hub</h3>
              </div>
              <p className={bodyClass}>DSA sheets, notes, templates, and interview kits in one place</p>
            </div>
            <MosaicArrow href="/resources" label="Open Resources Hub" />
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-blue-100/50 shadow-sm">
          <Image
            src="/resource-hub-showcase.png"
            alt="Resources Hub preview"
            width={1024}
            height={1024}
            className="block h-[220px] w-full rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
      </motion.div>

      {/* Card 5: AI Project Builder */}
      <motion.div variants={cardReveal} className={`${cardClass} col-span-6 md:col-span-3 min-h-[360px] flex flex-col justify-between`}>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#2563eb]">
                <FolderKanban className="h-5 w-5" />
                <h3 className={titleClass}>AI Project Builder</h3>
              </div>
              <p className={bodyClass}>Turn skills into portfolio-ready projects and resume proof</p>
            </div>
            <MosaicArrow href="/resources" label="Open AI Project Builder" />
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-blue-100/50 shadow-sm">
          <Image
            src="/project-builder-showcase.png"
            alt="AI Project Builder preview"
            width={1024}
            height={1024}
            className="block h-[220px] w-full rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SkillWynLanding() {
  const loading = false;
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 260]);

  return (
    <main className="relative min-h-screen bg-[#060708] text-[#fbfbf8] [.light-theme_&]:bg-[#f8f8f5] [.light-theme_&]:text-[#111111]">

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(36,87,255,0.055)_1px,transparent_1px)] bg-[size:84px_84px] opacity-55 [.light-theme_&]:opacity-35" />
        <motion.div style={{ y: glowY }} className="absolute left-[10%] top-8 h-[420px] w-[420px] rounded-full bg-[var(--color-secondary)]/14 blur-[120px] [.light-theme_&]:bg-[var(--color-secondary)]/10" />
        <motion.div style={{ y: glowY }} className="absolute right-[4%] top-[28rem] h-[360px] w-[360px] rounded-full bg-white/10 blur-[120px] [.light-theme_&]:bg-black/[0.035]" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#060708] to-transparent [.light-theme_&]:from-[#f8f8f5]" />
      </div>

      <Navbar />

      <motion.section
        style={{ y: heroY }}
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 overflow-hidden px-5 pb-10 pt-6 sm:px-6 lg:min-h-[calc(100vh-120px)] lg:grid-cols-[1fr_0.82fr] lg:gap-16 lg:px-10 lg:pb-8 lg:pt-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? 26 : 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[2]"
        >
          <div className="relative z-[2]">
            <h1
              className="text-white [.light-theme_&]:text-[#0f172a]"
              style={{

                fontWeight: 500,
                fontSize: "clamp(44px, 11vw, 88px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
              }}
            >
              Stop Learning.<br />
              Start Getting <span style={{ color: "#102a7a" }}>Placed.</span>
            </h1>
            <p
              className="mt-5 text-[#5b6fb3] sm:mt-8"
              style={{

                fontWeight: 500,
                fontSize: "clamp(15px, 3.7vw, 17px)",
                lineHeight: 1.72,
                letterSpacing: "-0.01em",
                maxWidth: "560px",
              }}
            >
              The ultimate AI ecosystem that forces you to build proof of work, master MAANG-level DSA, and clear interviews with absolute confidence.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Link
                href="/algorithmic-vault"
                className="group inline-flex items-center justify-center gap-2 uppercase !text-white shadow-[0_24px_80px_rgba(36,87,255,0.24)] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_28px_90px_rgba(36,87,255,0.36)] active:translate-y-0 active:scale-[0.99]"
                style={{

                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.02em",
                  background: "#2563eb",
                  color: "#ffffff",
                  borderRadius: "100px",
                  padding: "13px 24px",
                }}
              >
                The Algorithmic Vault <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <div
                className="inline-flex cursor-not-allowed items-center justify-center uppercase transition-all duration-200 opacity-60"
                style={{

                  fontWeight: 600,
                  fontSize: "14px",
                  background: "transparent",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "100px",
                  padding: "13px 24px",
                }}
              >
                Explore paths <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">Coming Soon</span>
              </div>
            </div>
            <div className="mt-8 inline-flex flex-col gap-4 rounded-[22px] border border-[#dbeafe] bg-white/80 p-4 shadow-[0_18px_45px_rgba(16,42,122,0.08)] sm:mt-11 sm:flex-row sm:items-center">
              <div className="flex -space-x-2">
                {["Y", "A", "R", "P", "K"].map((item, index) => (
                  <div
                    key={item}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#2563eb] text-xs font-black !text-white shadow-[0_10px_26px_rgba(37,99,235,0.20)]"
                    style={{ transform: `translateY(${index % 2 === 0 ? 0 : 2}px)` }}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div>
                <p
                  className="text-[#102a7a]"
                  style={{

                    fontWeight: 800,
                    fontSize: "15px",
                  }}
                >
                  Trusted by 35K+ learners
                </p>
                <p
                  className="mt-1 text-[#5b6fb3]"
                  style={{

                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  Building DSA, resumes, projects, and interview confidence.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <HeroLearningVisual loading={loading} />
      </motion.section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-10 lg:pt-10">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-5 uppercase tracking-[0.2em] text-[var(--color-secondary)]" style={{ fontSize: "12px", fontWeight: 700 }}>
            EVERYTHING YOU NEED
          </p>
          <h2
            className="mx-auto max-w-4xl text-white [.light-theme_&]:text-[#0f172a]"
            style={{

              fontWeight: 500,
              fontSize: "clamp(40px, 4.2vw, 48px)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
            }}
          >
            Stop Applying Into The Void.
            <br />
            <span style={{ color: "#102a7a" }}>Build A Profile That Gets Shortlisted.</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-white/58 [.light-theme_&]:text-[#5b6fb3]"
            style={{

              fontSize: "17px",
              lineHeight: 1.65,
              letterSpacing: "-0.01em",
            }}
          >
            Analyze. Practice. Build. Prepare. Get hire-ready faster.
          </p>
        </Reveal>

        <ProductMosaic />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="hidden"
        >
          <motion.div variants={fadeUp} className="group relative overflow-hidden rounded-[20px] bg-[#0a0f1e] p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:col-span-7">
            <div className="pointer-events-none absolute -right-20 -top-16 h-72 w-72 rounded-full bg-[#2563eb]/20 blur-3xl" />
            <div className="absolute right-6 top-6 z-20"><FeatureArrow href="/resume" label="Open AI Resume Analyzer" /></div>
            <div className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "#bfdbfe" }}>
              <FileText className="h-5 w-5 text-[#60a5fa]" />
              AI Resume Analyzer
            </div>
            <h3 className="relative z-10 mt-6 max-w-2xl text-[clamp(34px,3.4vw,48px)] font-medium leading-[1.04]" style={{ color: "#ffffff" }}>
              ATS score. Missing keywords. Fixed in 30 seconds.
            </h3>
            <div className="relative z-10 mt-10">
              <div className="mx-auto max-w-[660px]">
                <div className="relative overflow-hidden rounded-t-[1.15rem] border-[9px] border-[#050816] bg-white shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
                  <div className="absolute left-1/2 top-0 z-20 h-3.5 w-24 -translate-x-1/2 rounded-b-xl bg-[#050816]" />
                  <div className="flex h-9 items-center justify-between border-b border-slate-100 bg-white px-4">
                    <div className="text-[10px] font-black text-[#2563eb]">SkillWyn</div>
                    <div className="flex gap-4 text-[9px] font-bold text-slate-400">
                      <span>Resume</span>
                      <span>Analyze</span>
                      <span>Fix</span>
                    </div>
                  </div>
                  <div className="grid h-[300px] grid-cols-[0.96fr_1fr] bg-[#f8fbff] text-[#0f172a]">
                    <div className="border-r border-slate-200 bg-white p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#dbeafe]" />
                        <div>
                          <div className="h-2.5 w-24 rounded-full bg-slate-900" />
                          <div className="mt-1.5 h-1.5 w-32 rounded-full bg-slate-200" />
                        </div>
                      </div>
                      {["SUMMARY", "SKILLS", "PROJECTS", "EXPERIENCE", "EDUCATION"].map((section, index) => (
                        <div key={section} className="mb-3">
                          <div className="mb-1.5 text-[8px] font-black tracking-[0.12em] text-slate-500">{section}</div>
                          <div className="space-y-1.5">
                            <div className="h-1.5 rounded-full bg-slate-200" />
                            <div className="h-1.5 w-10/12 rounded-full bg-slate-100" />
                            {index < 3 ? <div className="h-1.5 w-8/12 rounded-full bg-slate-100" /> : null}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-black">AI Resume Analyzer</div>
                          <div className="mt-1 text-[9px] font-semibold text-slate-400">Analysis report and fixes</div>
                        </div>
                        <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black text-emerald-600">Good Fit</div>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                          <div className="flex items-center justify-between text-[10px] font-black">
                            <span>ATS Match</span>
                            <span className="text-[#2563eb]">84%</span>
                          </div>
                          <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                            <div className="h-full w-[84%] rounded-full bg-[#2563eb]" />
                          </div>
                        </div>
                        {["Missing keywords: REST APIs, Jest", "Rewrite summary with stronger impact", "Add project metrics for shortlist"].map((item) => (
                          <div key={item} className="rounded-xl border border-slate-100 bg-white p-3 text-[10px] font-bold text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                            {item}
                          </div>
                        ))}
                        <button className="rounded-lg bg-[#2563eb] px-4 py-2 text-[10px] font-black text-white">Apply AI Fix</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto h-4 w-[92%] rounded-b-2xl bg-[#050816] shadow-[0_18px_45px_rgba(0,0,0,0.28)]" />
              </div>
            </div>
            <div className="relative z-10 mt-8 text-sm font-semibold" style={{ color: "rgba(255,255,255,0.68)" }}>Powered by Claude AI</div>
          </motion.div>

          <motion.div variants={fadeUp} className="group relative overflow-hidden rounded-[20px] bg-[#2563eb] p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:col-span-5">
            <div className="pointer-events-none absolute -bottom-20 -right-24 h-72 w-72 rounded-full bg-white/12 blur-3xl" />
            <div className="absolute right-6 top-6 z-20"><FeatureArrow href="/mock-interview" label="Open AI Mock Interviews" tone="blue" /></div>
            <div className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white-force-muted">
              <MessageSquareText className="h-5 w-5 text-white-force" />
              AI Mock Interviews
            </div>
            <h3 className="relative z-10 mt-6 max-w-sm text-[clamp(32px,3vw,44px)] font-bold leading-[1.04] text-white-force">
              Practice before the real call.
            </h3>
            <div className="relative z-10 mt-10 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2 shadow-[0_22px_65px_rgba(15,23,42,0.2)]">
              <Image
                src="/mock-interview-partnership.jpg"
                alt="Mock interview practice session"
                width={1920}
                height={1280}
                className="h-56 w-full rounded-xl object-cover object-center"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
            </div>
            <div className="relative z-10 mt-6 space-y-4">
              <div className="w-[82%] rounded-2xl bg-white/18 px-5 py-4 text-base font-semibold text-white-force">Explain virtual DOM</div>
              <div className="ml-auto w-[86%] rounded-2xl bg-white px-5 py-4 text-base font-semibold text-[#0f172a] shadow-[0_18px_50px_rgba(15,23,42,0.14)]">It&apos;s a lightweight copy of the real DOM used to update UI efficiently.</div>
              <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2563eb] shadow-[0_14px_35px_rgba(15,23,42,0.12)]">Good answer - add complexity</div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="group relative min-h-[360px] overflow-hidden rounded-[20px] bg-[#f0f7ff] p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:col-span-4">
            <div className="absolute right-6 top-6 z-20"><FeatureArrow href="/roadmaps" label="Open AI Roadmap Builder" tone="light" /></div>
            <Map className="h-7 w-7 text-[#2563eb]" />
            <h3 className="mt-6 text-3xl font-medium leading-[1.05] text-[#0f172a]" >AI Roadmap Selection</h3>
            <div className="mt-7 overflow-hidden rounded-2xl border border-blue-100 bg-white p-2 shadow-[0_18px_50px_rgba(37,99,235,0.14)]">
              <Image
                src="/roadmap-selection-card-crop.png"
                alt="AI roadmap selection illustration"
                width={1024}
                height={1024}
                className="h-[330px] w-full rounded-xl object-cover object-center"
                sizes="(max-width: 768px) 100vw, 28vw"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="group relative min-h-[360px] overflow-hidden rounded-[20px] border border-[#e8edf5] bg-white p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:col-span-4">
            <div className="absolute right-6 top-6 z-20"><FeatureArrow href="/resources" label="Open Resources Hub" tone="light" /></div>
            <BookOpen className="h-7 w-7 text-[#2563eb]" />
            <h3 className="mt-6 text-3xl font-medium leading-[1.05] text-[#0f172a]" >Every resource. One place.</h3>
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="rounded-xl bg-white px-4 py-3 text-xs font-bold text-slate-400 shadow-sm">Search DSA, React, interviews...</div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ["450Q", "DSA Sheet"],
                  ["PDF", "React Notes"],
                  ["SQL", "Query Pack"],
                  ["HR", "Interview Kit"],
                ].map(([label, item], index) => (
                  <div key={item} className="rounded-xl bg-white p-3 shadow-sm">
                    <div className={`mb-2 grid h-8 w-8 place-items-center rounded-lg text-[10px] font-black ${index % 2 ? "bg-[#dbeafe] text-[#2563eb]" : "bg-[#eff6ff] text-[#1d4ed8]"}`}>{label}</div>
                    <div className="text-[10px] font-black text-[#0f172a]">{item}</div>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(transparent,#ffffff)]" />
            </div>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {["DSA", "React", "SQL", "HR", "PDF", "STAR"].map((tag, index) => (
                <div key={tag} className={`grid aspect-square place-items-center rounded-2xl text-sm font-black ${index % 2 ? "bg-[#eff6ff] text-[#2563eb]" : "bg-[#dbeafe] text-[#1d4ed8]"}`}>
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="group relative min-h-[360px] overflow-hidden rounded-[20px] bg-[#0f172a] p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:col-span-4">
            <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-[#2563eb]/20 blur-3xl" />
            <div className="absolute right-6 top-6 z-20"><FeatureArrow href="/resources" label="Open AI Project Builder" /></div>
            <Code2 className="h-7 w-7 text-[#60a5fa]" />
            <h3 className="relative z-10 mt-6 text-3xl font-medium leading-[1.05]" style={{ color: "#ffffff" }}>Skills &rarr; Portfolio. Automatically.</h3>
            <div className="relative z-10 mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <div className="mb-3 rounded-xl bg-[#2563eb] px-3 py-2 text-[10px] font-black text-white">AI generated project workspace</div>
              <div className="grid grid-cols-3 gap-2">
                {["Idea", "Tasks", "Proof"].map((stage, index) => (
                  <div key={stage} className="rounded-xl bg-white/8 p-3">
                    <div className="text-[10px] font-black text-blue-200">{stage}</div>
                    <div className="mt-3 space-y-2">
                      <div className="h-1.5 rounded-full bg-white/20" />
                      <div className="h-1.5 w-9/12 rounded-full bg-white/15" />
                    </div>
                    {index === 2 ? <div className="mt-3 rounded-full bg-emerald-400/15 px-2 py-1 text-[9px] font-black text-emerald-300">Ready</div> : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10 mt-6 rounded-2xl border border-white/10 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-black text-[#0f172a]">Weather Dashboard</span>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-600">Ready</span>
              </div>
              <div className="grid grid-cols-[0.75fr_1fr] gap-3">
                <div className="rounded-xl bg-[#eff6ff] p-3">
                  <div className="mb-3 h-14 rounded-lg bg-[#2563eb]" />
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-blue-200" />
                    <div className="h-2 w-8/12 rounded-full bg-blue-200" />
                  </div>
                </div>
                <div className="space-y-2">
                  {["Auth setup", "API cards", "Resume bullet"].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-black text-[#0f172a]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="mvp" className="hidden">
        <Reveal className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 font-jetbrains text-[10px] uppercase text-[var(--color-secondary)]">Phase 01 MVP</p>
            <h2 className="max-w-xl text-4xl font-medium leading-[1.04] text-white [.light-theme_&]:text-black md:text-5xl">
              Built around placing you, not selling endless tutorials.
            </h2>
          </div>
          <p className="max-w-2xl self-end text-base font-medium leading-8 text-white/56 [.light-theme_&]:text-[#5b6fb3] md:text-lg">
            SkillWyn starts with the core loop students actually need: discover the right path, practice the right questions, build visible proof, improve interview readiness, and share a hiring-ready score with companies.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-90px" }}
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {mvpFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                variants={fadeUp}
                key={feature.title}
                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#09161a]/82 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/35 [.light-theme_&]:border-black/10 [.light-theme_&]:bg-white/88"
              >
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[var(--color-secondary)]/12 blur-2xl transition-transform group-hover:scale-125" />
                <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.055] [.light-theme_&]:border-black/10 [.light-theme_&]:bg-black/[0.035]">
                  <Icon className="h-5 w-5 text-[var(--color-secondary)]" />
                </div>
                <h3 className="text-xl font-semibold text-white [.light-theme_&]:text-black">{feature.title}</h3>
                <p className="mt-4 min-h-24 text-sm font-medium leading-7 text-white/50 [.light-theme_&]:text-[#5b6fb3]">{feature.text}</p>
                <div className="mt-8 h-px w-10 bg-[var(--color-secondary)]/50 transition-all group-hover:w-24 group-hover:bg-[var(--color-secondary)]" />
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section id="score" className="relative z-10 bg-white py-[92px]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#2563eb]" >
              WHY COMPANIES TRUST SKILLWYN
            </p>
            <h2 className="text-[38px] font-medium leading-[1.16] text-[#102a7a] md:text-[52px]" >
              Improve Hiring Shortlists Using<br className="hidden sm:block" />
              SkillWyn Profile Signals
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium leading-7 text-[#5b6fb3]" >
              The verified profile students and companies both deserve, but resumes alone can&apos;t deliver.
            </p>
          </Reveal>

          <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              initial={{ opacity: 0, x: -56, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[24px] border border-[#dbeafe] bg-[#eaf2ff] shadow-[0_24px_80px_rgba(15,42,122,0.20)]"
            >
              <div className="relative bg-[linear-gradient(135deg,#ffffff,#dcebff)] p-4 sm:p-7">
                <div className="absolute inset-x-0 bottom-0 top-[40%] sm:top-auto sm:h-44 bg-[#0f2d86]" />
                <div className="relative rounded-[20px] border border-[#bfdbfe] bg-white p-4 sm:p-5 shadow-[0_24px_65px_rgba(15,42,122,0.20)]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-[14px] bg-[#2563eb] text-sm sm:text-base font-bold text-white" >
                        AS
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-[#0f172a]" >Aarav Sharma</h3>
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold text-[#5b6fb3]" >Frontend + DSA Track</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5b6fb3]" >GLOBAL RANK</p>
                      <p className="mt-0.5 sm:mt-1 text-2xl sm:text-3xl font-extrabold text-[#2563eb]" >#184</p>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
                    {[
                      ["Resume Strength", "ATS ✓"],
                      ["Project Proof", "3 builds"],
                      ["Interview Ready", "8 rounds"],
                      ["DSA Consistency", "41 day streak"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-[#dbeafe] bg-[#f0f7ff] p-3 sm:p-4 shadow-[0_8px_22px_rgba(37,99,235,0.08)]">
                        <p className="text-[10px] sm:text-[11px] font-semibold text-[#5b6fb3]" >{label}</p>
                        <p className="mt-1 sm:mt-2 text-sm sm:text-base font-bold text-[#2563eb]" >{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-4 sm:mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["Razorpay", "Frontend Intern", "86%"],
                    ["CRED", "React Dev", "82%"],
                    ["Groww", "SDE Intern", "79%"],
                  ].map(([company, role, match]) => (
                    <div key={company} className="rounded-[14px] border border-white/70 bg-white p-3 sm:p-4 shadow-[0_16px_38px_rgba(3,18,62,0.22)]">
                      <p className="text-sm font-bold text-[#102a7a]" >{company}</p>
                      <p className="mt-0.5 sm:mt-1 text-xs font-semibold text-[#5b6fb3]" >{role}</p>
                      <p className="mt-2 sm:mt-3 text-base sm:text-lg font-extrabold text-[#2563eb]" >{match}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid gap-7">
              {[
                ["Resume Strength", "AI-backed resume score helps companies understand candidate quality faster.", ClipboardCheck],
                ["Project Proof", "Verified builds show real implementation ability beyond certificate claims.", FolderKanban],
                ["Interview Readiness", "Mock rounds and feedback make recruiter confidence easier to measure.", MessagesSquare],
                ["DSA Consistency", "Streaks and practice history reveal problem-solving discipline over time.", BadgeCheck],
              ].map(([title, detail, Icon], index) => {
                const SignalIcon = Icon as typeof BadgeCheck;
                return (
                  <motion.div
                    key={title as string}
                    initial={{ opacity: 0, x: 52, y: 28, scale: 0.96 }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.45 }}
                    transition={{ duration: 0.58, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4 rounded-[22px] border border-[#dbeafe] bg-[#f0f7ff] p-6 shadow-[0_14px_34px_rgba(37,99,235,0.12)]"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[10px] bg-[#6ea0ff] text-white shadow-[0_10px_24px_rgba(37,99,235,0.20)]">
                      <SignalIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#102a7a]" >{title as string}</h3>
                      <p className="mt-2 text-base font-medium leading-7 text-[#5b6fb3]" >{detail as string}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="relative z-10 overflow-hidden border-t border-white/10 bg-[#fbfcff] px-6 py-24 [.light-theme_&]:border-black/10 lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#dbeafe]/70 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal className="self-center">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2563eb]" >COMMUNITY TRUST</p>
            <h2 className="max-w-2xl text-[clamp(40px,4.5vw,56px)] font-bold tracking-tight leading-[1.05] text-[#0f172a]" >
              Thousands already trust the <span className="text-[#102a7a]">voice behind SkillWyn.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] font-medium leading-[1.7] text-slate-500" >
              CodeWithYash isn't just an audience—it's a community of serious developers. We learn DSA, build real projects, and crack top tech interviews together every single day.
            </p>

            <div className="mt-10 grid max-w-md gap-3 sm:grid-cols-2">
              {[
                ["30K+", "Developers"],
                ["100K+", "Monthly Reach"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[22px] border border-[#dbeafe] bg-white/80 p-5 shadow-[0_18px_45px_rgba(16,42,122,0.08)] backdrop-blur">
                  <p className="text-3xl font-black leading-none text-[#102a7a]" >{value}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#5b6fb3]" >{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {["DSA learners", "Resume reviews", "Project builders", "Interview prep"].map((item) => (
                <span key={item} className="rounded-full border border-[#dbeafe] bg-[#f0f7ff] px-4 py-2 text-xs font-bold text-[#102a7a]" >
                  {item}
                </span>
              ))}
            </div>

            <Link
              href="/get-started"
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#2563eb] px-6 py-4 text-sm font-black uppercase !text-white shadow-[0_18px_50px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
            >
              Build from student trust <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="relative min-h-[720px]">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#eef6ff_48%,transparent_72%)]" />

            <motion.div
              initial={{ opacity: 0, y: 32, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -4 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[4%] top-[12%] w-[220px] rounded-[30px] border border-[#9db9ff] bg-white/85 p-1.5 shadow-[0_24px_70px_rgba(36,74,165,0.18)]"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-[25px] bg-slate-100">
                <Image
                  src="/reel-google-interview.jpeg"
                  alt="CodeWithYash Google interview question reel"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 38, rotate: 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 4 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-[7%] top-[6%] w-[230px] rounded-[30px] border border-[#9db9ff] bg-white/85 p-1.5 shadow-[0_24px_70px_rgba(36,74,165,0.18)]"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-[25px] bg-slate-100">
                <Image
                  src="/reel-javascript-problem.jpeg"
                  alt="CodeWithYash JavaScript important problem reel"
                  fill
                  className="object-cover"
                  sizes="230px"
                />
              </div>
            </motion.div>

            <div className="absolute left-1/2 top-[27%] w-[360px] -translate-x-1/2 rounded-[32px] border border-[#dbeafe] bg-white/95 p-5 shadow-[0_38px_105px_rgba(36,74,165,0.18)] backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-white/12 bg-[radial-gradient(circle_at_30%_110%,#feda75_0%,#fa7e1e_26%,#d62976_52%,#962fbf_74%,#4f5bd5_100%)] shadow-[0_18px_45px_rgba(214,41,118,0.28)]">
                  <span className="relative block h-9 w-9 rounded-[10px] border-[3px] border-white">
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-white" />
                    <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-lg font-black text-[#111827]">codewithyash3</p>
                    <BadgeCheck className="h-4 w-4 shrink-0 text-[#93c5fd]" />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    {[
                      ["164", "posts"],
                      ["33.1K", "followers"],
                      ["0", "following"],
                    ].map(([value, label]) => (
                      <div key={label}>
                        <p className="text-sm font-black text-[#111827]">{value}</p>
                        <p className="text-[10px] font-semibold text-[#5b6fb3]">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-[#dbeafe] bg-[#f8fbff] p-4">
                <p className="text-xs font-black text-[#111827]">Skillwyn | Newato AI | Building Tech Products</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-[#5b6fb3]">
                  Teaching code • Launching Newato AI Soon • Building Skillwyn
                </p>
                <p className="mt-2 text-xs font-black text-[#2563eb]">labs.skillwyn.com</p>
              </div>

              <div className="mt-4 flex gap-3">
                {[
                  ["CY", "Achievement"],
                  ["HW", "Hardwork"],
                  ["YT", "YouTube"],
                ].map(([initial, label]) => (
                  <div key={label} className="min-w-0 flex-1 text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_110%,#feda75_0%,#fa7e1e_26%,#d62976_52%,#962fbf_74%,#4f5bd5_100%)] p-[2px] shadow-sm">
                      <span className="grid h-full w-full place-items-center rounded-full bg-white text-[10px] font-black text-[#244aa5]">
                        {initial}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[9px] font-bold text-[#5b6fb3]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute left-[28%] top-[4%] rounded-full border border-white/20 bg-[#244aa5] px-4 py-2 text-xs font-black !text-white shadow-[0_18px_48px_rgba(36,74,165,0.22)]">
              30K+ Developers
            </div>
            <div className="absolute right-[3%] top-[45%] rounded-full border border-white/20 bg-[#244aa5] px-4 py-2 text-xs font-black !text-white shadow-[0_18px_48px_rgba(36,74,165,0.22)]">
              100K+ Monthly Reach
            </div>
          </Reveal>
        </div>
      </section>



      <footer className="relative z-10 border-t border-[#dbeafe] bg-[#fbfcff] px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1.6fr]">
            <div>
              <span className="inline-flex items-center gap-3 pointer-events-none">
                <Image src="/skillwyn-logo.png" alt="SkillWyn" width={42} height={42} className="h-10 w-10 object-contain" />
                <span className="text-xl font-black text-[#102a7a]" >SkillWyn</span>
              </span>
              <p className="mt-5 max-w-md text-sm font-medium leading-7 text-[#5b6fb3]" >
                AI-powered roadmaps, resume help, mock interviews, resources, and project proof for career-focused developers.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["30K+ learners", "AI roadmaps", "Resume ready"].map((item) => (
                  <span key={item} className="rounded-full border border-[#dbeafe] bg-white px-3 py-2 text-xs font-bold text-[#102a7a]">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {[
                ["Platform", [["Roadmaps", "/roadmaps"], ["Resources", "/resources"], ["Resume Analyzer", "/resume"], ["Mock Interview", "/mock-interview"]]],
                ["Careers", [["DSA Prep", "/dsa"], ["Interview Questions", "/interview-questions"], ["Resume Builder", "/resume-builder"], ["Get Started", "/get-started"]]],
                ["Company", [["About", "/about"], ["Pricing", "/pricing"], ["Snap Code", "/snap-code"], ["Profile", "/profile"]]],
              ].map(([title, links]) => (
                <div key={title as string}>
                  <h3 className="text-xs font-black uppercase tracking-[0.16em] text-[#2563eb]" >{title as string}</h3>
                  <ul className="mt-5 space-y-3">
                    {(links as string[][]).map(([label, href]) => (
                      <li key={label}>
                        <span className="text-sm font-semibold text-[#5b6fb3] transition-colors hover:text-[#102a7a] pointer-events-none" >
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-[#dbeafe] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold text-[#5b6fb3]" >
              © {new Date().getFullYear()} SkillWyn. Built for students becoming job-ready developers.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                ["Instagram", "https://instagram.com/codewithyash3"],
                ["YouTube", "#"],
                ["LinkedIn", "#"],
              ].map(([label, href]) => (
                <span
                  key={label}
                  className="rounded-full border border-[#dbeafe] bg-white px-4 py-2 text-xs font-bold text-[#102a7a] transition-colors hover:border-[#2563eb] hover:text-[#2563eb] pointer-events-none"

                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
