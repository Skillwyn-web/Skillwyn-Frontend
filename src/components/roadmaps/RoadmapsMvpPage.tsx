"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, Code2, Layers3, Server, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type Role = "Frontend" | "Backend" | "Fullstack" | "DSA-only" | "AI/ML";

const roles: { label: Role; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "Frontend", icon: Code2 },
  { label: "Backend", icon: Server },
  { label: "Fullstack", icon: Layers3 },
  { label: "DSA-only", icon: Sparkles },
  { label: "AI/ML", icon: Brain },
];

const frontendPhases = [
  { title: "Phase 1 — Foundations (4 weeks)", topics: ["HTML/CSS basics", "Flexbox/Grid", "JS fundamentals", "DOM", "Git basics"] },
  { title: "Phase 2 — React Projects (5 weeks)", topics: ["React", "State management", "React Router", "REST APIs", "Tailwind"] },
  { title: "Phase 3 — Job Ready (6 weeks)", topics: ["Next.js", "Performance", "Testing basics", "DSA (Blind 75)", "System Design intro"] },
];

export default function RoadmapsMvpPage() {
  const [role, setRole] = useState<Role>("Frontend");
  const [open, setOpen] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("skillwyn_frontend_roadmap");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("skillwyn_frontend_roadmap", JSON.stringify(checked));
  }, [checked]);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563eb]">Roadmaps</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">Your exact path to getting hired.</h1>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-5">
          {roles.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setRole(label)}
              className={`rounded-2xl border p-4 text-left transition ${
                role === label ? "border-teal-400 bg-teal-50 text-teal-700" : "border-slate-200 bg-white hover:border-teal-200"
              }`}
            >
              <Icon className="mb-4 h-5 w-5" />
              <span className="font-bold">{label}</span>
            </button>
          ))}
        </div>

        {role === "Frontend" ? (
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {frontendPhases.map((phase, phaseIndex) => {
              const done = phase.topics.filter((topic) => checked[topic]).length;
              return (
                <div key={phase.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <button onClick={() => setOpen(open === phaseIndex ? -1 : phaseIndex)} className="flex w-full items-center justify-between text-left">
                    <div>
                      <h2 className="text-xl font-bold">{phase.title}</h2>
                      <p className="mt-1 text-sm text-[#5b6fb3]">{done}/{phase.topics.length} topics done</p>
                    </div>
                    <span className="text-2xl text-[#2563eb]">{open === phaseIndex ? "−" : "+"}</span>
                  </button>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full bg-teal-500" style={{ width: `${(done / phase.topics.length) * 100}%` }} />
                  </div>
                  {open === phaseIndex ? (
                    <div className="mt-5 grid gap-3">
                      {phase.topics.map((topic) => (
                        <label key={topic} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold">
                          <input
                            type="checkbox"
                            checked={Boolean(checked[topic])}
                            onChange={(event) => setChecked((prev) => ({ ...prev, [topic]: event.target.checked }))}
                            className="h-4 w-4 accent-teal-500"
                          />
                          {topic}
                        </label>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <h2 className="text-2xl font-bold">Coming soon — be the first to know</h2>
            <p className="mt-2 text-[#5b6fb3]">We are building the {role} roadmap next.</p>
            <form
              className="mt-5 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                setToast("We'll notify you!");
                setEmail("");
              }}
            >
              <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#2563eb]" />
              <button className="rounded-xl bg-[#2563eb] px-5 py-3 font-bold text-white">Notify</button>
            </form>
            {toast ? <p className="mt-3 text-sm font-semibold text-emerald-600">{toast}</p> : null}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/dsa" className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 font-bold text-white">
            Start Learning → Go to DSA Revision <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
