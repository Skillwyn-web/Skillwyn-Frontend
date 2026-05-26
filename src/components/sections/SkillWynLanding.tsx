"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FileText,
  Map,
  MessageSquareText,
  Play,
  Sparkles,
  Swords,
  Trophy,
  UserRound,
  UserRoundCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/layout/ThemeToggle";

const journey = [
  { label: "Roadmap", text: "AI maps your exact role path", icon: Map },
  { label: "Resume", text: "Projects become ATS-ready proof", icon: FileText },
  { label: "Placement", text: "Profile lands in hiring shortlists", icon: BriefcaseBusiness },
];

const mvpFeatures = [
  {
    title: "Interactive AI Roadmaps",
    text: "Role-based paths for DSA, frontend, backend, full-stack and interview readiness.",
    icon: Map,
  },
  {
    title: "DSA Sheets & Materials",
    text: "Curated sheets, topic notes, resources, and top-company preparation packs.",
    icon: BookOpen,
  },
  {
    title: "AI Resume Builder",
    text: "Convert projects and skills into clean ATS bullets with a stronger hiring narrative.",
    icon: FileText,
  },
  {
    title: "AI Mock Interviews",
    text: "Practice technical, HR, and system-design rounds with structured feedback.",
    icon: MessageSquareText,
  },
  {
    title: "SkillWyn Profile",
    text: "Each student gets a verified public profile with score, rank, and proof of work.",
    icon: BadgeCheck,
  },
  {
    title: "Live Battles & Contests",
    text: "Coding battles, leaderboard pressure, global ranking, and competitive growth loops.",
    icon: Swords,
  },
];

const scoreMetrics = [
  { label: "DSA consistency", value: "31%" },
  { label: "Project proof", value: "24%" },
  { label: "Resume strength", value: "18%" },
  { label: "Interview readiness", value: "27%" },
];

function PlacementEngine3D({ loading }: { loading: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -14, y: x * 18 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, x: 36 }}
      animate={{ opacity: loading ? 0 : 1, x: loading ? 36 : 0 }}
      transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      <div className="relative min-h-[640px] [perspective:1400px]">
        <motion.div
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="absolute inset-0 [transform-style:preserve-3d]"
        >
          <div className="absolute inset-x-3 top-8 h-[570px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018)_36%,rgba(0,0,0,0.82))] shadow-[0_70px_190px_rgba(0,0,0,0.78)] backdrop-blur-2xl [transform:translateZ(-80px)]" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 24 : 0 }}
            transition={{ duration: 0.65, delay: 0.62 }}
            className="absolute left-8 top-20 w-[360px] border border-white/12 bg-[#070707]/92 p-5 shadow-[0_42px_120px_rgba(0,0,0,0.62)] backdrop-blur-2xl [transform:translateZ(92px)_rotateY(8deg)]"
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <Image src="/skillwyn-logo.png" alt="SkillWyn profile" width={54} height={54} className="h-12 w-12 object-contain" />
                <div>
                  <p className="text-[10px] font-black uppercase text-white/36">Student Profile</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white">Aarav Sharma</h3>
                  <p className="mt-1 text-xs font-semibold text-white/38">Frontend Developer Track</p>
                </div>
              </div>
              <BadgeCheck className="h-5 w-5 text-white/58" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-px bg-white/10">
              {[
                ["Rank", "#184"],
                ["Score", "86%"],
                ["Streak", "21d"],
              ].map(([label, value]) => (
                <div key={label} className="bg-black/70 p-3">
                  <p className="text-[9px] font-black uppercase text-white/32">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {[
                { label: "AI Roadmap", value: "62% completed", icon: Map },
                { label: "DSA Sheet", value: "148 questions solved", icon: BookOpen },
                { label: "Resume", value: "ATS strong", icon: FileText },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 border border-white/10 bg-white/[0.025] p-3">
                    <Icon className="h-4 w-4 text-white/54" />
                    <div>
                      <p className="text-xs font-black uppercase text-white/70">{item.label}</p>
                      <p className="mt-1 text-xs font-semibold text-white/36">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 18 : 0 }}
            transition={{ duration: 0.65, delay: 0.86 }}
            className="absolute right-4 top-40 w-64 border border-white/12 bg-black/74 p-4 shadow-[0_32px_90px_rgba(0,0,0,0.58)] backdrop-blur-xl [transform:translateZ(126px)_rotateY(-10deg)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-black uppercase text-white">Opportunities</p>
              <Building2 className="h-4 w-4 text-white/48" />
            </div>
            <div className="space-y-2">
              {["Frontend Intern", "MERN Project Role", "Startup Shortlist"].map((job, index) => (
                <div key={job} className="border border-white/10 bg-white/[0.025] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-white/78">{job}</p>
                    <span className="font-jetbrains text-[9px] text-white/28">0{index + 1}</span>
                  </div>
                  <p className="mt-1 text-[10px] font-bold uppercase text-white/30">matched by SkillWyn score</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? -18 : 0 }}
            transition={{ duration: 0.65, delay: 1 }}
            className="absolute bottom-16 right-16 w-72 border border-white/12 bg-[#080808]/82 p-4 shadow-[0_32px_90px_rgba(0,0,0,0.52)] backdrop-blur-xl [transform:translateZ(108px)_rotateY(-4deg)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-jetbrains text-[10px] uppercase text-white/34">Career Roadmap</p>
                <p className="mt-2 text-sm font-semibold text-white">DSA → Project → Interview → Hire</p>
              </div>
              <BarChart3 className="h-5 w-5 text-white/48" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-1">
              {[86, 74, 58, 42].map((height, index) => (
                <div key={index} className="flex h-16 items-end bg-white/[0.035]">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: loading ? 0 : `${height}%` }}
                    transition={{ duration: 0.8, delay: 1.05 + index * 0.08 }}
                    className="w-full bg-white/75"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SkillWynLanding() {
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1850);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f5f5f0]">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303]"
          >
            <div className="relative flex flex-col items-center gap-7">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 180 }}
                transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
                className="h-px bg-gradient-to-r from-transparent via-white to-transparent"
              />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.15 }}
                className="flex items-center gap-4"
              >
                <Image
                  src="/skillwyn-logo.png"
                  alt="SkillWyn logo"
                  width={76}
                  height={76}
                  priority
                  className="h-16 w-16 object-contain md:h-20 md:w-20"
                />
                <span className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
                  SkillWyn
                </span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.85 }}
                className="font-jetbrains text-[10px] uppercase text-white/45"
              >
                launching learning engine
              </motion.p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-white/[0.055] blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black to-transparent" />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? -12 : 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-20 mx-auto px-6 pt-5 lg:px-10"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between border border-white/10 bg-black/42 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden">
              <Image
                src="/skillwyn-logo.png"
                alt="SkillWyn logo"
                width={40}
                height={40}
                priority
                className="h-10 w-10 object-contain"
              />
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.035em] text-white md:text-base">
              SkillWyn
            </span>
          </Link>

          <div className="hidden items-center rounded-full border border-white/8 bg-white/[0.025] px-2 py-1 text-[11px] font-bold uppercase text-white/46 md:flex">
            <Link className="rounded-full px-4 py-2 transition-colors hover:bg-white/[0.06] hover:text-white" href="#mvp">Platform</Link>
            <Link className="rounded-full px-4 py-2 transition-colors hover:bg-white/[0.06] hover:text-white" href="#score">Skill Score</Link>
            <Link className="rounded-full px-4 py-2 transition-colors hover:bg-white/[0.06] hover:text-white" href="#community">Community</Link>
            <Link className="rounded-full px-4 py-2 transition-colors hover:bg-white/[0.06] hover:text-white" href="/roadmaps">Roadmaps</Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {authLoading ? (
              <div className="hidden h-9 w-28 animate-pulse border border-white/10 bg-white/[0.04] sm:block" />
            ) : user ? (
              <Link
                href="/profile"
                className="flex max-w-[170px] items-center gap-2 border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-black uppercase text-white/72 transition-colors hover:border-white/30 hover:text-white"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden bg-white text-black">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name || "Profile"} className="h-full w-full object-cover" />
                  ) : (
                    <UserRound className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="truncate">{user.name || "Profile"}</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden px-4 py-2 text-xs font-bold uppercase text-white/48 transition-colors hover:text-white sm:inline-flex"
                >
                  Login
                </Link>
                <Link
                  href="/get-started"
                  className="border border-white/16 bg-white px-4 py-2 text-xs font-black uppercase text-black transition-colors hover:bg-white/88"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-16 px-6 pb-20 pt-10 lg:grid-cols-[1fr_0.82fr] lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? 26 : 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 inline-flex items-center gap-2 border border-white/12 bg-white/[0.035] px-3 py-2 text-[10px] font-black uppercase text-white/58 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <Sparkles className="h-3.5 w-3.5 text-white" />
            AI education for job-ready students
          </div>
          <h1 className="max-w-5xl text-[clamp(3.2rem,7.2vw,6.9rem)] font-medium leading-[0.96] tracking-[-0.07em] text-white">
            <span className="bg-gradient-to-r from-white via-white to-white/42 bg-clip-text text-transparent">
              One platform.
            </span>
            <br />
            Infinite careers.
          </h1>
          <p className="mt-8 max-w-xl text-[15px] font-medium leading-8 text-white/52 md:text-base">
            SkillWyn is your AI-powered career OS. Personalized roadmaps, DSA mastery, resume builder, mock interviews, and real scores in one place.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 bg-white px-6 py-4 text-sm font-black uppercase text-black shadow-[0_20px_70px_rgba(255,255,255,0.12)] transition-transform hover:-translate-y-0.5"
            >
              Launch journey <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/roadmaps"
              className="inline-flex items-center justify-center border border-white/14 px-6 py-4 text-sm font-black uppercase text-white/78 transition-colors hover:border-white/40 hover:text-white"
            >
              Explore paths
            </Link>
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex -space-x-3">
              {["Y", "A", "R", "P", "K"].map((item, index) => (
                <div
                  key={item}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br from-white to-white/45 text-xs font-black text-black shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  style={{ opacity: 1 - index * 0.06 }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white">Trusted by 30K+ students</p>
              <p className="mt-1 text-xs font-semibold text-white/36">From the CodeWithYash learning community</p>
            </div>
          </div>
        </motion.div>

        <PlacementEngine3D loading={loading} />
      </section>

      <section id="mvp" className="relative z-10 mx-auto max-w-7xl border-t border-white/10 px-6 py-24 [.light-theme_&]:border-black/10 lg:px-10">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 font-jetbrains text-[10px] uppercase text-white/38 [.light-theme_&]:text-black/45">Phase 01 MVP</p>
            <h2 className="max-w-xl text-4xl font-medium leading-[1.04] tracking-[-0.055em] text-white [.light-theme_&]:text-black md:text-5xl">
              The first version is built around outcomes, not lectures.
            </h2>
          </div>
          <p className="max-w-2xl self-end text-base font-medium leading-8 text-white/48 [.light-theme_&]:text-black/70 md:text-lg">
            SkillWyn starts with the core loop students actually need: discover the right path, practice the right questions, build visible proof, improve interview readiness, and share a hiring-ready score with companies.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 [.light-theme_&]:border-black/10 [.light-theme_&]:bg-black/10 md:grid-cols-2 lg:grid-cols-3">
          {mvpFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="group bg-[#060606] p-7 transition-colors hover:bg-[#0d0d0d] [.light-theme_&]:bg-white [.light-theme_&]:hover:bg-[#f8f6ef]">
                <div className="mb-10 flex h-11 w-11 items-center justify-center border border-white/12 bg-black [.light-theme_&]:border-black/10 [.light-theme_&]:bg-[#f4f1ea]">
                  <Icon className="h-5 w-5 text-white/75 [.light-theme_&]:text-black/70" />
                </div>
                <h3 className="text-xl font-semibold text-white [.light-theme_&]:text-black">{feature.title}</h3>
                <p className="mt-4 min-h-24 text-sm font-medium leading-7 text-white/46 [.light-theme_&]:text-black/58">{feature.text}</p>
                <div className="mt-8 h-px w-10 bg-white/18 transition-all group-hover:w-20 group-hover:bg-white [.light-theme_&]:bg-black/18 [.light-theme_&]:group-hover:bg-black" />
              </div>
            );
          })}
        </div>
      </section>

      <section id="score" className="relative z-10 mx-auto grid max-w-7xl gap-10 border-t border-white/10 px-6 py-24 lg:grid-cols-[1fr_0.95fr] lg:px-10">
        <div>
          <p className="mb-4 font-jetbrains text-[10px] uppercase text-white/38">What makes it different</p>
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.04] tracking-[-0.055em] text-white md:text-5xl">
            A score companies can understand before the first call.
          </h2>
          <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white/48">
            Students share a SkillWyn profile with global rank, contest history, roadmap progress, resume signal, mock interview performance, and project proof. Companies shortlist from visible skill, not empty certificates.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <Link href="/resume-builder" className="border border-white/12 px-4 py-4 text-sm font-bold uppercase text-white/72 transition-colors hover:border-white/38 hover:text-white">
              Resume Builder
            </Link>
            <Link href="/mock-interview" className="border border-white/12 px-4 py-4 text-sm font-bold uppercase text-white/72 transition-colors hover:border-white/38 hover:text-white">
              Mock Interview
            </Link>
            <Link href="/roadmaps" className="border border-white/12 px-4 py-4 text-sm font-bold uppercase text-white/72 transition-colors hover:border-white/38 hover:text-white">
              Roadmaps
            </Link>
          </div>
        </div>

        <div className="border border-white/12 bg-[#070707] p-5 shadow-[0_32px_120px_rgba(0,0,0,0.55)]">
          <div className="flex items-start justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-xs font-black uppercase text-white/42">SkillWyn Profile</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">Aarav Sharma</h3>
              <p className="mt-1 text-sm font-semibold text-white/38">Frontend + DSA Track</p>
            </div>
            <div className="text-right">
              <p className="font-jetbrains text-[10px] uppercase text-white/36">global rank</p>
              <p className="mt-2 text-3xl font-semibold text-white">#184</p>
            </div>
          </div>

          <div className="grid gap-px bg-white/10 md:grid-cols-2">
            {scoreMetrics.map((metric) => (
              <div key={metric.label} className="bg-[#090909] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase text-white/42">{metric.label}</p>
                  <p className="font-jetbrains text-sm text-white">{metric.value}</p>
                </div>
                <div className="mt-4 h-1 bg-white/10">
                  <div className="h-full bg-white" style={{ width: metric.value }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="border border-white/10 p-4">
              <Trophy className="mb-4 h-5 w-5 text-white/70" />
              <p className="text-2xl font-semibold text-white">92</p>
              <p className="mt-1 text-xs font-bold uppercase text-white/36">battle score</p>
            </div>
            <div className="border border-white/10 p-4">
              <UserRoundCheck className="mb-4 h-5 w-5 text-white/70" />
              <p className="text-2xl font-semibold text-white">86%</p>
              <p className="mt-1 text-xs font-bold uppercase text-white/36">hire-ready</p>
            </div>
            <div className="border border-white/10 p-4">
              <Building2 className="mb-4 h-5 w-5 text-white/70" />
              <p className="text-2xl font-semibold text-white">12</p>
              <p className="mt-1 text-xs font-bold uppercase text-white/36">matches</p>
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="relative z-10 mx-auto grid max-w-7xl gap-12 border-t border-white/10 px-6 py-24 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="border border-white/12 bg-[#070707] p-4">
          <div className="aspect-[4/5] border border-white/10 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.1),transparent_32%),#050505] p-6">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white text-black">
                    <Play className="h-5 w-5 fill-black" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">@codewithyash3</p>
                    <p className="text-xs font-semibold text-white/38">coding education community</p>
                  </div>
                </div>
                <p className="font-jetbrains text-[10px] uppercase text-white/30">instagram</p>
              </div>

              <div>
                <p className="text-[clamp(4rem,10vw,8rem)] font-semibold leading-none text-white">30K+</p>
                <p className="mt-4 max-w-sm text-lg font-medium leading-8 text-white/50">
                  learners already trust the CodeWithYash ecosystem for coding, DSA, and career direction.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-px bg-white/10">
                {["DSA", "Projects", "Career"].map((item) => (
                  <div key={item} className="bg-black p-3 text-center text-[10px] font-black uppercase text-white/48">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="self-center">
          <p className="mb-4 font-jetbrains text-[10px] uppercase text-white/38">Community advantage</p>
          <h2 className="max-w-2xl text-4xl font-medium leading-[1.04] tracking-[-0.055em] text-white md:text-5xl">
            Built on a real audience, not a cold-start course brand.
          </h2>
          <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white/48">
            The first phase can use CodeWithYash&apos;s 30K+ Instagram community to launch roadmaps, contests, live battles, interview resources, and early SkillWyn profiles with real student feedback.
          </p>
          <p className="mt-5 max-w-xl border-l border-white/18 pl-5 text-sm font-semibold leading-7 text-white/42">
            For the real Instagram visual, share your profile photo, screenshots, or 2-3 post images. I&apos;ll replace this premium placeholder with actual branded assets.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl border-t border-white/10 px-6 py-24 lg:px-10">
        <div className="grid gap-10 border border-white/12 bg-white/[0.025] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <p className="mb-4 font-jetbrains text-[10px] uppercase text-white/38">MVP promise</p>
            <h2 className="max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.055em] text-white md:text-5xl">
              From learning content to hiring signal in one platform.
            </h2>
          </div>
          <Link
            href="/get-started"
            className="inline-flex items-center justify-center gap-2 bg-white px-6 py-4 text-sm font-black uppercase text-black transition-transform hover:-translate-y-0.5"
          >
            Join early access <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
