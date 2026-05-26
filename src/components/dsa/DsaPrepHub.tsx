"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { DsaProfilePayload } from "@/lib/dsa/profileData";
import {
  ArrowRight,
  BarChart3,
  Binary,
  BookOpenCheck,
  Brain,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Code2,
  FileQuestion,
  Flame,
  Layers3,
  ListChecks,
  Lock,
  Search,
  Sparkles,
  Swords,
  Target,
  Trophy,
} from "lucide-react";

export default function DsaPrepHub() {
  const [data, setData] = useState<DsaProfilePayload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProfileDsa() {
      try {
        const response = await fetch("/api/dsa/profile?profileId=skillwyn-demo-student", {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Unable to load DSA profile");
        const payload = await response.json() as DsaProfilePayload;
        if (active) setData(payload);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Unable to load DSA profile");
      }
    }

    void loadProfileDsa();
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <section className="min-h-screen bg-[#050505] px-4 pt-32 text-white">
        <div className="mx-auto max-w-3xl border border-white/10 bg-[#151515] p-8">
          <p className="text-xs font-black uppercase text-white/40">DSA backend error</p>
          <h1 className="mt-3 text-3xl font-semibold">Could not load profile DSA content.</h1>
          <p className="mt-3 text-sm font-semibold text-white/52">{error}</p>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="min-h-screen bg-[#050505] px-4 pt-32 text-white">
        <div className="mx-auto max-w-4xl border border-white/10 bg-[#151515] p-8">
          <div className="h-3 w-36 animate-pulse bg-white/12" />
          <div className="mt-8 h-16 max-w-2xl animate-pulse bg-white/10" />
          <div className="mt-5 h-4 max-w-xl animate-pulse bg-white/10" />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {[1, 2, 3].map((item) => <div key={item} className="h-28 animate-pulse bg-white/8" />)}
          </div>
        </div>
      </section>
    );
  }

  const { profile, stats, sheets, topics, companies, interviewQuestions, weeklySprint } = data;

  return (
    <section className="relative overflow-hidden bg-[#050505] text-ink">
      <div className="pointer-events-none absolute inset-0 page-grid opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-white/[0.055] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-32">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="theme-kicker mb-6">
              <Binary className="h-4 w-4" />
              DSA content engine
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-white md:text-7xl">
              {profile.name}&apos;s DSA system for {profile.roleTarget} roles.
            </h1>
            <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-white/56">
              Backend-generated plan for {profile.level.toLowerCase()} level, {profile.dailyTime}, and {profile.deadline.toLowerCase()}. SkillWyn adapts sheets, weak topics, company packs, and interview questions from one profile.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#sheets" className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-xs font-black uppercase text-black transition-transform hover:-translate-y-0.5">
                Start DSA Sheet <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#companies" className="inline-flex items-center justify-center gap-2 border border-white/14 px-5 py-3 text-xs font-black uppercase text-white/70 transition-colors hover:border-white/30 hover:text-white">
                Company Prep
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/10 bg-[#151515] p-5 shadow-[0_40px_140px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-jetbrains text-[10px] uppercase text-white/38">Today&apos;s AI sprint</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Interview Readiness OS</h2>
              </div>
              <Sparkles className="h-5 w-5 text-white/54" />
            </div>

            <div className="mt-5 grid gap-3">
              {[
                ["Pattern score", stats.patternScore, BarChart3],
                ["Problems solved", stats.solvedLabel, ListChecks],
                ["Company readiness", stats.companyReadiness, Building2],
              ].map(([label, value, Icon]) => (
                <div key={label as string} className="flex items-center justify-between border border-white/10 bg-[#202020] p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white text-black">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-black uppercase text-white/50">{label as string}</span>
                  </div>
                  <strong className="text-lg text-white">{value as string}</strong>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-white/10 bg-black p-4">
              <div className="flex items-center justify-between text-xs font-black uppercase text-white/48">
                <span>Next unlock</span>
                <span>{stats.nextUnlock}</span>
              </div>
              <div className="mt-4 h-1.5 bg-white/10">
                <div className="h-full bg-white" style={{ width: `${stats.overallProgress}%` }} />
              </div>
            </div>
          </motion.div>
        </div>

        <div id="sheets" className="mt-20 grid gap-5 lg:grid-cols-3">
          {sheets.map((sheet, index) => (
            <motion.article
              key={sheet.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group border border-white/10 bg-[#151515] p-6 transition-colors hover:border-white/24"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center border border-white/10 bg-[#232323]">
                  <BookOpenCheck className="h-5 w-5 text-white" />
                </span>
                <span className="border border-white/10 px-2 py-1 text-[10px] font-black uppercase text-white/45">{sheet.label}</span>
              </div>
              <h2 className="mt-7 text-2xl font-semibold text-white">{sheet.title}</h2>
              <p className="mt-2 text-sm font-medium text-white/46">{sheet.level}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-bold uppercase text-white/44">
                <span>{sheet.problems}</span>
                <span>{sheet.time}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {sheet.topics.map((topic) => (
                  <span key={topic} className="border border-white/10 bg-[#202020] px-2 py-1 text-[10px] font-bold uppercase text-white/48">
                    {topic}
                  </span>
                ))}
              </div>
              <div className="mt-7 h-1 bg-white/10">
                <div className="h-full bg-white" style={{ width: `${sheet.progress}%` }} />
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="border border-white/10 bg-[#151515] p-6">
            <div className="mb-6 flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-white/64" />
              <h2 className="text-3xl font-semibold text-white">Topic-wise mastery map</h2>
            </div>
            <div className="space-y-3">
              {topics.map((topic) => (
                <div key={topic.name} className="border border-white/10 bg-[#202020] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-white">{topic.name}</h3>
                      <p className="mt-1 text-xs font-semibold leading-5 text-white/46">{topic.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">{topic.count}</p>
                      <p className="text-[10px] font-black uppercase text-white/38">Problems</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex border border-white/10 px-2 py-1 text-[10px] font-black uppercase text-white/42">{topic.tag}</span>
                    <span className="inline-flex border border-white/10 px-2 py-1 text-[10px] font-black uppercase text-white/42">{topic.priority} priority</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="companies" className="border border-white/10 bg-[#151515] p-6">
            <div className="mb-6 flex items-center gap-3">
              <BriefcaseBusiness className="h-5 w-5 text-white/64" />
              <h2 className="text-3xl font-semibold text-white">Top company interview packs</h2>
            </div>
            <div className="grid gap-4">
              {companies.map((company) => (
                <article key={company.name} className="border border-white/10 bg-[#202020] p-5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{company.name}</h3>
                      <p className="mt-2 text-sm font-medium leading-6 text-white/48">{company.focus}</p>
                    </div>
                    <span className="border border-white/10 bg-black px-3 py-2 text-xs font-black text-white">{company.readiness}</span>
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {company.questions.map((question) => (
                      <div key={question} className="flex items-center gap-2 text-xs font-bold text-white/52">
                        <CheckCircle2 className="h-3.5 w-3.5 text-white/70" />
                        {question}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="border border-white/10 bg-[#151515] p-6">
            <div className="mb-6 flex items-center gap-3">
              <FileQuestion className="h-5 w-5 text-white/64" />
              <h2 className="text-3xl font-semibold text-white">Interview question bank</h2>
            </div>
            <div className="grid gap-3">
              {interviewQuestions.map((item) => (
                <article key={item.question} className="border border-white/10 bg-[#202020] p-4">
                  <span className="text-[10px] font-black uppercase text-white/38">{item.type}</span>
                  <h3 className="mt-2 text-base font-semibold text-white">{item.question}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-white/48">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="border border-white/10 bg-[#151515] p-6">
            <div className="mb-6 flex items-center gap-3">
              <Flame className="h-5 w-5 text-white/64" />
              <h2 className="text-3xl font-semibold text-white">7-day DSA sprint</h2>
            </div>
            <div className="space-y-3">
              {weeklySprint.map(({ day, topic, work, outcome }, index) => (
                <div key={day} className="grid grid-cols-[auto_1fr] gap-4 border border-white/10 bg-[#202020] p-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-white text-sm font-black text-black">{index + 1}</span>
                  <div>
                    <p className="text-sm font-black uppercase text-white">{day} · {topic}</p>
                    <p className="mt-1 text-xs font-bold uppercase text-white/42">{work}</p>
                    <p className="mt-2 text-sm font-medium text-white/52">{outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-20 grid gap-4 border border-white/10 bg-white p-6 text-black md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase text-black/45">Coming next</p>
            <h2 className="mt-2 text-3xl font-semibold">AI will generate your next DSA sheet from weak topics.</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-black/58">
              After every mock round, SkillWyn can rebalance your practice list using wrong submissions, skipped topics, speed, and target company.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-black uppercase">
            {[
              [Target, "Weak topic AI"],
              [Clock3, "Timed rounds"],
              [Swords, "Live battles"],
              [Trophy, "Rank score"],
              [Brain, "Hints"],
              [Search, "Company filter"],
              [Code2, "Code review"],
              [Lock, "Unlock bosses"],
            ].map(([Icon, label]) => (
              <span key={label as string} className="flex items-center gap-2 border border-black/10 px-3 py-2">
                <Icon className="h-4 w-4" />
                {label as string}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
