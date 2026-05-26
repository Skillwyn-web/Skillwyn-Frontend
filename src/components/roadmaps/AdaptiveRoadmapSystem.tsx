"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  GraduationCap,
  Hammer,
  LineChart,
  Lock,
  MessageSquareText,
  Rocket,
  Shield,
  Sparkles,
  Swords,
  Target,
  Zap,
} from "lucide-react";

type Profile = {
  track: string;
  level: string;
  goal: string;
  time: string;
  style: string;
  experience: string;
  deadline: string;
};

type Mission = {
  title: string;
  type: "core" | "project" | "boss" | "career";
  difficulty: "Easy" | "Medium" | "Hard" | "Boss";
  xp: number;
  hours: number;
  skills: string[];
  portfolio: string;
  status: "locked" | "active" | "done";
};

type Roadmap = {
  title: string;
  timeline: string;
  readiness: {
    job: number;
    freelance: number;
    interview: number;
    startup: number;
  };
  worlds: {
    name: string;
    icon: React.ElementType;
    theme: string;
    missions: Mission[];
  }[];
  career: {
    label: string;
    demand: string;
    salary: string;
    freelance: string;
    interview: string;
  }[];
};

const questions: {
  key: keyof Profile;
  title: string;
  subtitle: string;
  options: string[];
}[] = [
  {
    key: "track",
    title: "Which career track do you want?",
    subtitle: "Choose the domain first so the AI can build the right learning world, projects, and hiring proof.",
    options: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "AI Engineer",
      "Data Analyst",
      "Data Scientist",
      "DevOps Engineer",
      "Cybersecurity",
      "Mobile App Developer",
      "SaaS Founder",
      "DSA / Interview Prep",
    ],
  },
  {
    key: "level",
    title: "What is your current level?",
    subtitle: "SkillWyn calibrates depth, speed, and mission difficulty from here.",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    key: "goal",
    title: "Choose your primary outcome.",
    subtitle: "This decides whether the path leans toward jobs, freelance, startup, or specialization.",
    options: ["Get Job", "Freelancing", "Build Startup", "Internship", "Placement Prep", "Switch Career"],
  },
  {
    key: "time",
    title: "How much time can you give?",
    subtitle: "The AI converts this into daily targets and weekly missions.",
    options: ["1 hr/day", "2 hrs/day", "4 hrs/day", "weekends only"],
  },
  {
    key: "style",
    title: "Preferred learning style?",
    subtitle: "The roadmap adapts content order and mission type around your brain.",
    options: ["Visual", "Project Based", "Theory First", "Challenge Based"],
  },
  {
    key: "experience",
    title: "Which profile fits you?",
    subtitle: "Different learners need different proof, pacing, and career signals.",
    options: ["Student", "Working Professional", "Career Switcher", "Founder"],
  },
  {
    key: "deadline",
    title: "What is your deadline goal?",
    subtitle: "Pick one. You can edit it later as the roadmap adapts.",
    options: ["Job in 3 months", "Freelance in 60 days", "Build SaaS ASAP", "No deadline"],
  },
];

const baseProfile: Profile = {
  track: "Fullstack Developer",
  level: "Beginner",
  goal: "Get Job",
  time: "2 hrs/day",
  style: "Project Based",
  experience: "Student",
  deadline: "Job in 3 months",
};

function estimateTimeline(profile: Profile) {
  const fast = profile.time === "4 hrs/day";
  const slow = profile.time === "1 hr/day" || profile.time === "weekends only";
  const intense = profile.deadline.includes("60") || profile.deadline.includes("ASAP");
  if (fast || intense) return "8-10 weeks";
  if (slow) return "18-24 weeks";
  return "12-16 weeks";
}

function buildMissions(profile: Profile): Roadmap {
  const isFreelance = profile.goal === "Freelancing";
  const isStartup = profile.goal === "Build Startup" || profile.experience === "Founder" || profile.track === "SaaS Founder";
  const isAI = profile.track === "AI Engineer" || profile.track === "Data Scientist";
  const isData = profile.track === "Data Analyst" || profile.track === "Data Scientist";
  const isBackend = profile.track === "Backend Developer" || profile.track === "DevOps Engineer" || profile.track === "Fullstack Developer";
  const isSecurity = profile.track === "Cybersecurity";
  const isMobile = profile.track === "Mobile App Developer";
  const isDSA = profile.track === "DSA / Interview Prep";
  const projectBias = profile.style === "Project Based" || profile.style === "Challenge Based";

  const title =
    profile.goal === "Get Job"
      ? `${profile.track} Job-Ready Path`
      : `${profile.track} ${profile.goal} Path`;

  const coreStack = isAI
    ? ["Python", "APIs", "Prompting", "LLM Apps"]
    : isData
      ? ["SQL", "Python", "Dashboards", "Case Studies"]
    : isBackend
      ? ["Node.js", "Databases", "Auth", "APIs"]
      : isSecurity
        ? ["Networking", "Linux", "OWASP", "Threat Modeling"]
        : isMobile
          ? ["React Native", "Mobile UI", "APIs", "Publishing"]
          : isDSA
            ? ["Patterns", "Arrays", "Graphs", "Dynamic Programming"]
            : ["HTML/CSS", "JavaScript", "React", "Next.js"];

  const careerMissions = isFreelance
    ? [
        mission("Write a client proposal", "career", "Medium", 180, 2, ["Pricing", "Communication"], "Freelance proposal template", "active"),
        mission("Package your first gig", "career", "Hard", 240, 3, ["Portfolio", "Sales"], "Service page and pricing sheet", "locked"),
      ]
    : isStartup
      ? [
          mission("Design your SaaS MVP scope", "career", "Hard", 260, 4, ["Product Thinking", "MVP"], "1-page SaaS spec", "active"),
          mission("Add AI integration plan", "career", "Boss", 420, 6, ["AI APIs", "Architecture"], "AI feature blueprint", "locked"),
        ]
      : [
          mission("Create ATS resume bullets", "career", "Medium", 180, 2, ["Resume", "Positioning"], "ATS-ready resume section", "active"),
          mission("Mock interview sprint", "career", "Hard", 300, 4, ["Communication", "DSA"], "Interview readiness report", "locked"),
        ];

  return {
    title,
    timeline: estimateTimeline(profile),
    readiness: {
      job: isFreelance ? 64 : isStartup ? 58 : 76,
      freelance: isFreelance ? 82 : projectBias ? 68 : 52,
      interview: profile.level === "Advanced" ? 74 : profile.level === "Intermediate" ? 61 : 42,
      startup: isStartup ? 84 : isAI ? 66 : 48,
    },
    worlds: [
      {
        name: "Beginner Island",
        icon: GraduationCap,
        theme: "Foundation calibrated to your level",
        missions: [
          mission(`Master ${coreStack[0]} fundamentals`, "core", "Easy", 120, 2, [coreStack[0], "Basics"], "Clean notes and mini tasks", "done"),
          mission(`Build a ${projectBias ? "visual" : "concept"} fundamentals lab`, "project", "Medium", 180, 3, [coreStack[1], "Practice"], "Foundation mini project", "active"),
          mission("Daily consistency streak", "core", "Easy", 90, 1, ["Habit", "Focus"], "7-day streak proof", "active"),
        ],
      },
      {
        name: isBackend ? "Backend Labs" : isAI ? "AI Zone" : isData ? "Data Studio" : isSecurity ? "Cybersecurity Arena" : isMobile ? "Mobile Workshop" : isDSA ? "Interview Arena" : "Frontend City",
        icon: isAI ? Brain : isBackend ? Shield : isData ? BarChart3 : isSecurity ? Lock : isMobile ? MessageSquareText : isDSA ? Swords : Hammer,
        theme: "Core job skills and portfolio proof",
        missions: [
          mission(`Ship ${coreStack[2]} mission`, "project", "Hard", 320, 5, [coreStack[2], "Implementation"], "Production-grade module", "locked"),
          mission("API + auth checkpoint", "core", "Medium", 240, 4, ["APIs", "Authentication"], "Auth flow proof", "locked"),
          mission("Boss Mission: portfolio product", "boss", "Boss", 520, 8, ["Product", "Deployment"], "Deployed portfolio project", "locked"),
        ],
      },
      {
        name: isStartup ? "Startup Space" : isFreelance ? "Freelance Market" : "Interview Arena",
        icon: isStartup ? Rocket : isFreelance ? BriefcaseBusiness : Swords,
        theme: "Outcome readiness and career conversion",
        missions: careerMissions,
      },
    ],
    career: [
      {
        label: profile.track === "Data Analyst" ? "SQL + Dashboards" : profile.track === "Data Scientist" ? "ML + LLM Apps" : profile.track === "Backend Developer" ? "APIs + Databases" : profile.track,
        demand: "High",
        salary: "High fresher demand",
        freelance: "High",
        interview: "Very frequent",
      },
      {
        label: isAI ? "LLM Apps" : isBackend ? "Node APIs" : "DSA Patterns",
        demand: isAI ? "Exploding" : "High",
        salary: isAI ? "Premium" : "Strong",
        freelance: isAI || isBackend ? "High" : "Medium",
        interview: "Frequent",
      },
      {
        label: isStartup ? "SaaS MVP" : isFreelance ? "Client Delivery" : "Resume Signal",
        demand: "Practical",
        salary: "Outcome driven",
        freelance: isFreelance || isStartup ? "Very high" : "Medium",
        interview: "Portfolio-led",
      },
    ],
  };
}

function mission(
  title: string,
  type: Mission["type"],
  difficulty: Mission["difficulty"],
  xp: number,
  hours: number,
  skills: string[],
  portfolio: string,
  status: Mission["status"],
): Mission {
  return { title, type, difficulty, xp, hours, skills, portfolio, status };
}

export default function AdaptiveRoadmapSystem() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(baseProfile);
  const [generated, setGenerated] = useState(false);
  const [selectedWorld, setSelectedWorld] = useState(0);
  const [mentorInput, setMentorInput] = useState("");
  const [mentorMessages, setMentorMessages] = useState([
    "I am watching your pace, weak areas, skipped missions, and portfolio proof. Ask me what to focus on today.",
  ]);

  const roadmap = useMemo(() => buildMissions(profile), [profile]);
  const allMissions = roadmap.worlds.flatMap((world) => world.missions);
  const completed = allMissions.filter((item) => item.status === "done").length;
  const active = allMissions.filter((item) => item.status === "active").length;
  const xp = allMissions.reduce((sum, item) => sum + (item.status === "done" ? item.xp : 0), 420);
  const completion = Math.round((completed / allMissions.length) * 100);

  const choose = (key: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const next = () => {
    if (step === questions.length - 1) {
      setGenerated(true);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const mentorReply = () => {
    const text = mentorInput.trim();
    if (!text) return;
    setMentorMessages((prev) => [
      ...prev,
      text,
      `Based on your ${profile.track} track, ${profile.goal} goal, and ${profile.time} schedule, I would prioritize today's active mission, then add 20 minutes of weak-topic practice before moving forward.`,
    ]);
    setMentorInput("");
  };

  if (!generated) {
    const question = questions[step];
    return (
      <main className="page-shell relative min-h-screen overflow-hidden px-6 py-10 text-ink">
        <div className="absolute inset-0 page-grid opacity-35" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase text-white/48 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to SkillWyn
          </Link>

          <div className="mt-14 grid min-h-[70vh] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="mb-5 font-jetbrains text-[10px] uppercase text-white/38">Adaptive Roadmap Engine</p>
              <h1 className="text-5xl font-medium leading-[0.98] tracking-[-0.065em] text-white md:text-7xl">
                Build your AI-personalized career path.
              </h1>
              <p className="mt-7 max-w-xl text-base font-medium leading-8 text-white/48">
                SkillWyn generates missions, projects, interview prep, freelance readiness, startup readiness, and weekly learning targets around your real life.
              </p>
              <div className="mt-10 flex gap-3">
                {questions.map((item, index) => (
                  <div key={item.key} className={`h-1 flex-1 ${index <= step ? "bg-white" : "bg-white/12"}`} />
                ))}
              </div>
            </div>

            <motion.section
              key={question.key}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-white/10 bg-[#151515] p-6 text-white shadow-[0_40px_130px_rgba(0,0,0,0.55)] md:p-8"
            >
              <div className="mb-8 flex items-start justify-between gap-6">
                <div>
                  <p className="font-jetbrains text-[10px] uppercase text-white/38">Step {step + 1} / {questions.length}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white">{question.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-7 text-white/52">{question.subtitle}</p>
                </div>
                <Sparkles className="h-6 w-6 text-white/45" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => {
                  const selected = profile[question.key] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => choose(question.key, option)}
                      className={`group border p-4 text-left transition-all ${selected ? "border-white bg-white text-black" : "border-white/10 bg-[#202020] text-white/62 hover:border-white/28 hover:text-white"}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-black uppercase">{option}</span>
                        {selected ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 opacity-40 group-hover:opacity-100" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <button
                  onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                  className="text-xs font-black uppercase text-white/42 transition-colors hover:text-white"
                >
                  Previous
                </button>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 bg-white px-5 py-3 text-xs font-black uppercase text-black transition-transform hover:-translate-y-0.5"
                >
                  {step === questions.length - 1 ? "Generate Roadmap" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell relative min-h-screen overflow-hidden px-6 py-8 text-ink">
      <div className="absolute inset-0 page-grid opacity-30" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/" className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase text-white/42 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4" /> SkillWyn Home
            </Link>
            <p className="font-jetbrains text-[10px] uppercase text-white/36">Generated for {profile.experience} / {profile.time}</p>
            <h1 className="mt-3 text-5xl font-medium tracking-[-0.065em] text-white md:text-7xl">{roadmap.title}</h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/46">
              Timeline: {roadmap.timeline}. Adapts when you struggle, skip theory, finish faster, or unlock portfolio proof.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-px border border-white/10 bg-white/10 md:min-w-[420px]">
            {[
              ["XP", xp],
              ["Streak", "7 days"],
              ["Active", active],
            ].map(([label, value]) => (
              <div key={label} className="bg-black/70 p-4">
                <p className="font-jetbrains text-[10px] uppercase text-white/34">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-6 py-8 lg:grid-cols-[0.72fr_1.5fr_0.78fr]">
          <aside className="space-y-4">
            <Panel title="Analytics" icon={BarChart3}>
              <Metric label="Roadmap completion" value={`${completion}%`} />
              <Metric label="Learning speed" value={profile.time === "4 hrs/day" ? "Fast" : profile.time === "weekends only" ? "Focused" : "Steady"} />
              <Metric label="Weak area" value={profile.level === "Beginner" ? "JavaScript logic" : "System design"} />
              <Metric label="Strongest skill" value={profile.style === "Challenge Based" ? "Problem solving" : "Consistency"} />
            </Panel>

            <Panel title="Readiness" icon={Target}>
              <Readiness label="Job" value={roadmap.readiness.job} />
              <Readiness label="Freelance" value={roadmap.readiness.freelance} />
              <Readiness label="Interview" value={roadmap.readiness.interview} />
              <Readiness label="Startup" value={roadmap.readiness.startup} />
            </Panel>
          </aside>

          <section className="min-h-[680px] border border-black/10 bg-[#f4f1ea] p-5 text-[#101010] shadow-[0_40px_140px_rgba(0,0,0,0.45)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-jetbrains text-[10px] uppercase text-black/38">Roadmap World</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-black">{roadmap.worlds[selectedWorld].name}</h2>
              </div>
              <button
                onClick={() => setGenerated(false)}
                className="border border-black/12 px-4 py-2 text-xs font-black uppercase text-black/54 transition-colors hover:border-black/30 hover:text-black"
              >
                Recalibrate
              </button>
            </div>

            <div className="mb-8 grid gap-3 md:grid-cols-3">
              {roadmap.worlds.map((world, index) => {
                const Icon = world.icon;
                const activeWorld = selectedWorld === index;
                return (
                  <button
                    key={world.name}
                    onClick={() => setSelectedWorld(index)}
                    className={`border p-4 text-left transition-all ${activeWorld ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/62 hover:border-black/24 hover:text-black"}`}
                  >
                    <Icon className="mb-5 h-5 w-5" />
                    <p className="text-sm font-black uppercase">{world.name}</p>
                    <p className={`mt-2 text-xs font-semibold leading-5 ${activeWorld ? "text-white/58" : "text-black/42"}`}>{world.theme}</p>
                  </button>
                );
              })}
            </div>

            <div className="relative overflow-hidden border border-black/10 bg-[radial-gradient(circle_at_50%_30%,rgba(0,0,0,0.08),transparent_34%),#e9e4d8] p-6">
              <div className="absolute inset-0 opacity-30 page-grid" />
              <div className="relative grid gap-6 md:grid-cols-3">
                {roadmap.worlds[selectedWorld].missions.map((item, index) => (
                  <MissionCard key={item.title} mission={item} index={index} />
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <Panel title="Career Intel" icon={LineChart}>
              <div className="space-y-3">
                {roadmap.career.map((item) => (
                  <div key={item.label} className="border border-black/10 bg-white p-3">
                    <p className="text-sm font-black text-black">{item.label}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-bold uppercase text-black/42">
                      <span>Demand: {item.demand}</span>
                      <span>Freelance: {item.freelance}</span>
                      <span>Salary: {item.salary}</span>
                      <span>Interview: {item.interview}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="AI Mentor" icon={Bot}>
              <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
                {mentorMessages.map((message, index) => (
                  <div key={`${message}-${index}`} className={`border p-3 text-xs font-semibold leading-6 ${index % 2 ? "border-black bg-black text-white" : "border-black/10 bg-white text-black/58"}`}>
                    {message}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  value={mentorInput}
                  onChange={(event) => setMentorInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") mentorReply();
                  }}
                  placeholder="Ask today's focus..."
                  className="min-w-0 flex-1 border border-black/10 bg-white px-3 py-3 text-xs font-semibold text-black outline-none placeholder:text-black/28 focus:border-black/28"
                />
                <button onClick={mentorReply} className="bg-black px-3 text-white">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <section className="border border-black/10 bg-[#f4f1ea] p-4 text-[#101010] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-3">
        <h3 className="text-xs font-black uppercase text-black">{title}</h3>
        <Icon className="h-4 w-4 text-black/42" />
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between border-b border-black/8 py-3 last:border-b-0">
      <span className="text-xs font-bold uppercase text-black/42">{label}</span>
      <span className="text-sm font-semibold text-black">{value}</span>
    </div>
  );
}

function Readiness({ label, value }: { label: string; value: number }) {
  return (
    <div className="py-3">
      <div className="mb-2 flex justify-between">
        <span className="text-xs font-bold uppercase text-black/45">{label}</span>
        <span className="font-jetbrains text-xs text-black">{value}%</span>
      </div>
      <div className="h-1 bg-black/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-full bg-black"
        />
      </div>
    </div>
  );
}

function MissionCard({ mission, index }: { mission: Mission; index: number }) {
  const Icon = mission.status === "done" ? Check : mission.status === "locked" ? Lock : Zap;
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`relative border p-5 ${mission.status === "active" ? "border-black bg-black text-white shadow-[0_18px_50px_rgba(0,0,0,0.25)]" : mission.status === "done" ? "border-black/12 bg-white" : "border-black/10 bg-[#f8f6ef]"}`}
    >
      <div className="mb-8 flex items-center justify-between">
        <span className={`flex h-10 w-10 items-center justify-center border ${mission.status === "active" ? "border-white/15 bg-white text-black" : "border-black/10 bg-black text-white"}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span className={`text-[10px] font-black uppercase ${mission.status === "active" ? "text-white/45" : "text-black/40"}`}>{mission.difficulty}</span>
      </div>
      <p className={`text-lg font-semibold leading-tight ${mission.status === "active" ? "text-white" : "text-black"}`}>{mission.title}</p>
      <p className={`mt-4 text-xs font-semibold leading-6 ${mission.status === "active" ? "text-white/58" : "text-black/50"}`}>{mission.portfolio}</p>
      <div className={`mt-6 flex flex-wrap gap-2 text-[10px] font-black uppercase ${mission.status === "active" ? "text-white/52" : "text-black/42"}`}>
        {mission.skills.map((skill) => <span key={skill}>#{skill}</span>)}
      </div>
      <div className={`mt-8 flex items-center justify-between border-t pt-4 text-xs font-black uppercase ${mission.status === "active" ? "border-white/12 text-white/58" : "border-black/10 text-black/45"}`}>
        <span>{mission.xp} XP</span>
        <span>{mission.hours}h</span>
      </div>
    </motion.article>
  );
}
