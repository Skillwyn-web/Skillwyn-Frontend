"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Code2,
  FileText,
  Flame,
  GraduationCap,
  LogOut,
  Medal,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

const proofCards = [
  { label: "Roadmap", value: "Fullstack AI Path", meta: "12 active missions", icon: Target },
  { label: "DSA", value: "124 solved", meta: "Top weak topic: DP", icon: Code2 },
  { label: "Resume", value: "78% ATS", meta: "3 project bullets ready", icon: FileText },
  { label: "Mock Interview", value: "B+ signal", meta: "Communication improving", icon: Bot },
];

const timeline = [
  ["Today", "Complete Graph BFS mission", "Roadmap"],
  ["Next", "Solve 8 DP pattern questions", "DSA"],
  ["This week", "Ship portfolio proof project", "Projects"],
  ["After that", "Unlock company mock interview", "Placement"],
];

export default function SkillWynProfile() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white" />
      </section>
    );
  }

  if (!user) {
    router.replace("/login?next=/profile");
    return null;
  }

  const initials = (user.name || user.email).slice(0, 2).toUpperCase();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] px-4 pb-20 pt-32 text-white">
      <div className="pointer-events-none absolute inset-0 page-grid opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="border border-white/10 bg-[#151515] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.45)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden border border-white/10 bg-[#222] text-2xl font-black">
                  {user.avatar ? (
                    // Google avatars come from dynamic hosts; plain img avoids Next image host config crashes.
                    <img src={user.avatar} alt={user.name || "SkillWyn user"} className="h-full w-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <p className="font-jetbrains text-[10px] uppercase text-white/38">SkillWyn Profile</p>
                  <h1 className="mt-2 text-4xl font-semibold tracking-[-0.055em] text-white">{user.name || "SkillWyn Learner"}</h1>
                  <p className="mt-2 text-sm font-semibold text-white/42">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-xs font-black uppercase text-white/52 transition-colors hover:border-white/30 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-px border border-white/10 bg-white/10">
              {[
                ["Score", "842"],
                ["Rank", "#128"],
                ["Streak", "7d"],
              ].map(([label, value]) => (
                <div key={label} className="bg-black p-4">
                  <p className="font-jetbrains text-[10px] uppercase text-white/34">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-white/10 bg-[#202020] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase text-white/38">Hire-ready score</p>
                  <p className="mt-2 text-5xl font-semibold tracking-[-0.05em]">76%</p>
                </div>
                <ShieldCheck className="h-8 w-8 text-white/58" />
              </div>
              <div className="mt-5 h-1.5 bg-white/10">
                <div className="h-full w-[76%] bg-white" />
              </div>
              <p className="mt-4 text-sm font-medium leading-6 text-white/46">
                This profile becomes your public proof: roadmap progress, DSA consistency, projects, resume readiness, and interview performance.
              </p>
            </div>
          </section>

          <section className="grid gap-6">
            <div className="border border-white/10 bg-[#151515] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="font-jetbrains text-[10px] uppercase text-white/38">Career OS</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">Your next best actions</h2>
                </div>
                <Sparkles className="h-5 w-5 text-white/50" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {proofCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.label} href={item.label === "DSA" ? "/dsa" : item.label === "Roadmap" ? "/roadmaps" : "#"} className="group border border-white/10 bg-[#202020] p-4 transition-colors hover:border-white/28">
                      <Icon className="h-5 w-5 text-white/62" />
                      <p className="mt-5 text-[10px] font-black uppercase text-white/38">{item.label}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{item.value}</h3>
                      <p className="mt-2 text-sm font-medium text-white/44">{item.meta}</p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[1fr_0.8fr]">
              <div className="border border-white/10 bg-[#151515] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <Flame className="h-5 w-5 text-white/60" />
                  <h2 className="text-2xl font-semibold">Personal sprint</h2>
                </div>
                <div className="space-y-3">
                  {timeline.map(([time, task, type]) => (
                    <div key={task} className="grid grid-cols-[5rem_1fr] gap-4 border border-white/10 bg-[#202020] p-4">
                      <span className="text-xs font-black uppercase text-white/40">{time}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{task}</p>
                        <p className="mt-1 text-[10px] font-black uppercase text-white/34">{type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 bg-white p-6 text-black">
                <Trophy className="h-7 w-7" />
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Public profile preview</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-black/58">
                  Share this profile with companies to show verified SkillWyn score, rank, projects, interview reports, and learning consistency.
                </p>
                <button className="mt-6 inline-flex items-center gap-2 bg-black px-4 py-3 text-xs font-black uppercase text-white">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            [GraduationCap, "Learning level", "Intermediate"],
            [Medal, "Global rank", "Top 12%"],
            [BriefcaseBusiness, "Placement status", "Building proof"],
            [BarChart3, "Consistency", "Strong"],
          ].map(([Icon, label, value]) => (
            <div key={label as string} className="border border-white/10 bg-[#151515] p-5">
              <Icon className="h-5 w-5 text-white/58" />
              <p className="mt-5 text-[10px] font-black uppercase text-white/36">{label as string}</p>
              <p className="mt-2 text-xl font-semibold text-white">{value as string}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/roadmaps" className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-xs font-black uppercase text-black">
            Continue Roadmap <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/dsa" className="inline-flex items-center justify-center gap-2 border border-white/12 px-5 py-3 text-xs font-black uppercase text-white/64 transition-colors hover:border-white/30 hover:text-white">
            Open DSA Hub
          </Link>
        </div>
      </div>
    </section>
  );
}
