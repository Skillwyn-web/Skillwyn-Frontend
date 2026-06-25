"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  ArrowRight,
  Brain,
  Check,
  ChevronDown,
  Clock,
  Code2,
  FileText,
  FolderGit2,
  LayoutDashboard,
  Lightbulb,
  MessageSquare,
  Mic,
  Shield,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DsaProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  pattern: string;
  visualLogic: string;
  code: string;
}

interface DsaTopic {
  name: string;
  count: number;
  problems: DsaProblem[];
}

interface Project {
  title: string;
  problem: string;
  stack: string[];
  impact: string;
  outcomes: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const dsaTopics: DsaTopic[] = [
  {
    name: "Arrays & Hashing",
    count: 12,
    problems: [
      {
        id: "arr-1",
        title: "Two Sum: Optimal Pattern",
        difficulty: "Easy",
        pattern: "Hash Map / Complement Tracking",
        visualLogic:
          "For each number, check if (target − num) exists in the map. If yes, return both indices. Otherwise store num → index.",
        code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in seen:
            return [seen[comp], i]
        seen[num] = i`,
      },
      {
        id: "arr-2",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        pattern: "Set Filtering & Boundary Check",
        visualLogic:
          "Insert all elements into a Set. For each num where (num−1) is absent, walk forward counting the streak. Track global max.",
        code: `def longestConsecutive(nums):
    s = set(nums)
    best = 0
    for n in s:
        if n - 1 not in s:
            cur, streak = n, 1
            while cur + 1 in s:
                cur += 1; streak += 1
            best = max(best, streak)
    return best`,
      },
    ],
  },
  {
    name: "Two Pointers",
    count: 8,
    problems: [
      {
        id: "ptr-1",
        title: "Container With Most Water",
        difficulty: "Medium",
        pattern: "Greedy Boundary Shifting",
        visualLogic:
          "Place left at 0, right at end. Area = min(h[l], h[r]) × (r−l). Shift the pointer with the smaller height inward.",
        code: `def maxArea(height):
    l, r = 0, len(height) - 1
    best = 0
    while l < r:
        best = max(best, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]: l += 1
        else: r -= 1
    return best`,
      },
    ],
  },
  {
    name: "Dynamic Programming",
    count: 10,
    problems: [
      {
        id: "dp-1",
        title: "Coin Change: Tabulation",
        difficulty: "Medium",
        pattern: "Bottom-Up DP",
        visualLogic:
          "dp[0]=0, rest = ∞. For each coin, update dp[i] = min(dp[i], dp[i−coin]+1) for all valid sub-targets.",
        code: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      },
    ],
  },
  {
    name: "Trees & Graphs",
    count: 10,
    problems: [
      {
        id: "tree-1",
        title: "Number of Islands",
        difficulty: "Medium",
        pattern: "DFS Grid Traversal",
        visualLogic:
          "When a '1' is found, DFS floods all connected '1's to '0' (marks visited) and increments the island count.",
        code: `def numIslands(grid):
    count = 0
    def dfs(r, c):
        if not (0 <= r < len(grid) and 0 <= c < len(grid[0])): return
        if grid[r][c] != '1': return
        grid[r][c] = '0'
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r+dr, c+dc)
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                dfs(r, c); count += 1
    return count`,
      },
    ],
  },
  {
    name: "Sliding Window",
    count: 10,
    problems: [
      {
        id: "sw-1",
        title: "Longest Substring Without Repeat",
        difficulty: "Medium",
        pattern: "Variable-Width Sliding Window",
        visualLogic:
          "Expand right, shrink left when a duplicate enters the window. Track the max window size seen.",
        code: `def lengthOfLongestSubstring(s):
    seen = {}; l = best = 0
    for r, ch in enumerate(s):
        if ch in seen and seen[ch] >= l:
            l = seen[ch] + 1
        seen[ch] = r
        best = max(best, r - l + 1)
    return best`,
      },
    ],
  },
];

const projects: any[] = [
  {
    title: "Industry Blueprint 01",
    problem: "Real-world backend & cloud infrastructure architecture.",
    stack: ["Backend", "Cloud Services", "Containerization", "Monitoring"],
    impact:
      "Engineered a highly scalable architecture that significantly improved system processing capabilities and monitoring visibility.",
    outcomes: [
      "Role-Based Access Control (RBAC) middleware",
      "Real-time secure webhook integrations",
      "Dockerised microservice architecture",
    ],
    image: "/images/uploaded_media_1782322294695.jpg"
  },
  {
    title: "Industry Blueprint 02",
    problem: "Advanced AI data processing and automated workflow pipeline.",
    stack: ["Python", "Machine Learning", "NLP", "APIs"],
    impact:
      "Built an intelligent data processing pipeline that automated manual workflows and delivered high-accuracy analytical metrics.",
    outcomes: [
      "Fine-tuned entity recognition models",
      "Advanced compliance scoring & keyword matching",
      "High-performance REST API endpoints",
    ],
    image: "/images/project_blueprint_02_1782319342234.png"
  },
  {
    title: "Industry Blueprint 03",
    problem: "Production-grade full-stack web app with real-time features.",
    stack: ["React", "Next.js", "WebSockets", "Node.js"],
    impact:
      "Developed a production-ready interface with real-time data streaming, advanced state management, and optimized rendering.",
    outcomes: [
      "Live metric streaming via WebSockets",
      "Modern dark theme with glassmorphism UI",
      "Advanced rendering performance layer",
    ],
    image: "/images/project_blueprint_03_1782319403796.png"
  },
];

const faqs = [
  {
    q: "What exactly do I get after enrolling?",
    a: "The complete follower launch reward: Top 50 most-asked DSA problems (statement + flowchart + pseudocode + optimal code + complexity), 3 industry-level project blueprints, 2 live batch sessions, and 1 month of SkillWyn premium access.",
  },
  {
    q: "Are the projects just clone projects?",
    a: "No. Each project solves a real business problem with real architecture. You get blueprints, implementation notes, and ready-to-use resume bullets designed to stand out in interviews.",
  },
  {
    q: "What happens in the two live sessions?",
    a: "Session 1 covers coding roadmap, career doubts, DSA clarity, resume review, and internship strategy. Session 2 covers freelancing, client communication, industry workflows, SEO basics, and how software businesses actually operate.",
  },
  {
    q: "What does the 1-month SkillWyn access include?",
    a: "Early access to AI Resume Analyzer with resume chat, AI Mock Interviews, Premium DSA Sheets, and upcoming AI tools as they launch. It is your head-start on the full platform.",
  },
  {
    q: "Is there a refund policy?",
    a: "Given the digital nature of the content, refunds are not offered after delivery. If you have concerns before purchasing, reach out on Instagram @codewithyash3.",
  },
];

// ─── Utility Components ───────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
      {children}
    </span>
  );
}

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-tight text-slate-900 ${className}`}
      
    >
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="mx-auto my-24 h-px w-full max-w-7xl bg-slate-100" />;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Countdown Timer ──────────────────────────────────────────────────────────

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const getTarget = () => {
      const now = new Date();
      let days = 6 - now.getDay();
      if (days < 0) days += 7;
      const t = new Date();
      t.setDate(now.getDate() + days);
      t.setHours(19, 0, 0, 0);
      if (t.getTime() < now.getTime()) t.setDate(t.getDate() + 7);
      return t.getTime();
    };
    const target = getTarget();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const units = [
    { label: "Days", value: timeLeft.d },
    { label: "Hours", value: timeLeft.h },
    { label: "Mins", value: timeLeft.m },
    { label: "Secs", value: timeLeft.s },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#ffffff]/80">
        Closes in
      </span>
      {units.map(({ label, value }, i) => (
        <span key={label} className="flex items-baseline gap-1">
          {i > 0 && (
            <span className="text-sm font-light text-[#ffffff]/50">:</span>
          )}
          <span className="font-mono text-sm font-bold tabular-nums text-[#ffffff]">
            {String(value).padStart(2, "0")}
          </span>
          <span className="hidden text-[10px] font-medium text-[#ffffff]/60 sm:inline">
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}

// ─── DSA Dashboard Mockup ─────────────────────────────────────────────────────

function DsaDashboard() {
  const [activeTopic, setActiveTopic] = useState(0);
  const [activeProblem, setActiveProblem] = useState(0);

  useEffect(() => setActiveProblem(0), [activeTopic]);

  const topic = dsaTopics[activeTopic];
  const problem = topic.problems[activeProblem];

  const diffColor =
    problem.difficulty === "Easy"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-amber-50 text-amber-600";

  return (
    <div className="mx-auto w-full max-w-4xl perspective-[2000px]">
      {/* Laptop Screen / Bezel */}
      <div className="relative overflow-hidden rounded-t-[1.25rem] border-[10px] border-[#0f172a] bg-[#0f172a] shadow-[0_28px_80px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 transition-transform duration-500 hover:rotate-x-[2deg]">
        
        {/* Camera Notch */}
        <div className="absolute left-1/2 top-0 z-20 flex h-4 w-24 -translate-x-1/2 items-center justify-center rounded-b-xl bg-[#0f172a]">
          <div className="h-1.5 w-1.5 rounded-full bg-[#030712] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
        </div>

        {/* Screen Content */}
        <div className="overflow-hidden rounded-lg bg-white">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-sm" />
                <div className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-sm" />
                <div className="h-3 w-3 rounded-full bg-[#27c93f] shadow-sm" />
              </div>
              <span className="ml-4 font-mono text-[11px] font-medium text-slate-500">
                SkillWyn · DSA Vault
              </span>
            </div>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#102a7a]">
              50 Problems
            </span>
          </div>

          <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[170px_1fr]">
            {/* Sidebar */}
            <div className="border-r border-slate-100 bg-slate-50/60 p-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Topics
              </p>
              <div className="space-y-1">
                {dsaTopics.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => setActiveTopic(i)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-semibold transition-colors ${
                      activeTopic === i
                        ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50"
                        : "text-slate-500 hover:bg-white/60"
                    }`}
                  >
                    <span className="truncate">{t.name}</span>
                    <span className="ml-1 shrink-0 text-[10px] text-slate-400">
                      {t.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Panel */}
            <div className="h-[380px] overflow-y-auto scrollbar-hide p-5">
              {/* Problem tabs */}
              <div className="flex gap-2 overflow-x-auto pb-3">
                {topic.problems.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProblem(i)}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-[11px] font-semibold transition-all ${
                      activeProblem === i
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {p.title.split("-")[0].trim()}
                  </button>
                ))}
              </div>

              {/* Pattern + difficulty */}
              <div className="mt-4 flex items-center justify-between">
                <div className="rounded-lg bg-blue-50 px-3 py-2">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#102a7a]">
                    Pattern
                  </p>
                  <p className="text-sm font-bold text-[#102a7a]">
                    {problem.pattern}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${diffColor}`}
                >
                  {problem.difficulty}
                </span>
              </div>

              {/* Visual Logic */}
              <div className="mt-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Intuition
                </p>
                <p className="rounded-lg border border-slate-100 bg-slate-50 p-3.5 font-mono text-xs leading-relaxed text-slate-600">
                  {problem.visualLogic}
                </p>
              </div>

              {/* Code */}
              <div className="mt-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Optimal Solution
                </p>
                <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-[11px] leading-relaxed text-slate-200 shadow-inner">
                  <code>{problem.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Laptop Base / Keyboard Deck Edge */}
      <div className="relative mx-auto h-6 w-[104%] -translate-x-[2%] rounded-b-[20px] rounded-t-sm bg-gradient-to-b from-[#e2e4e9] to-[#b3b7c3] shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-t border-[#f1f3f5]">
        <div className="absolute left-1/2 top-0 h-2 w-32 -translate-x-1/2 rounded-b-lg bg-[#c8cbd2] shadow-inner" />
      </div>
    </div>
  );
}

// ─── Project layout is now directly in Section 4 ─────────────────────────────

// ─── Premium Tool Card ────────────────────────────────────────────────────────

function ToolCard({
  icon: Icon,
  title,
  desc,
  badge,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  badge?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-50 text-slate-500 transition-colors group-hover:bg-blue-50 group-hover:text-[#102a7a]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-semibold text-slate-800">{title}</p>
            {badge && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#102a7a]">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({
  faq,
  index,
  open,
  toggle,
}: {
  faq: { q: string; a: string };
  index: number;
  open: boolean;
  toggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-[14px] font-semibold text-slate-800">{faq.q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="border-t border-slate-100 px-6 py-4 text-[13px] leading-relaxed text-slate-500">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// ─── Main Component ───────────────────────────────────────────────────────────

export default function BootcampLaunchLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");

  const handleCheckout = async () => {
    if (!email) {
      alert("Please enter your email to get the Notion link.");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const order = await res.json();

      if (order.error) {
        alert("Error creating order");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: order.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "SkillWyn",
        description: "The Algorithmic Vault",
        order_id: order.id,
        handler: function (response: any) {
          alert("Payment Successful! The Notion link has been sent to " + email);
        },
        prefill: {
          name: "SkillWyn Learner",
          email: email,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert("Payment failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f5] text-[#111111] selection:bg-[#2563eb]/20 selection:text-[#102a7a]">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Navbar />

      {/* ─── SECTION 1 · HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1d4ed8] via-[#0b1f61] to-[#020a24] pb-24 pt-10 lg:pt-14">
        {/* Glows to match the Guidix style */}
        <div className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#60a5fa]/40 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 h-[500px] w-[500px] rounded-full bg-[#3b82f6]/20 blur-[100px]" />
        
        {/* Floating Stars / Particles (Simulated with absolute divs) */}
        <div className="absolute left-[10%] top-[20%] h-1.5 w-1.5 rounded-full bg-[#ffffff]/60 blur-[1px]" />
        <div className="absolute right-[20%] top-[15%] h-2 w-2 rounded-full bg-[#ffffff]/40 blur-[2px]" />
        <div className="absolute left-[80%] top-[40%] h-1 w-1 rounded-full bg-[#ffffff]/80" />
        <div className="absolute left-[15%] top-[60%] h-2.5 w-2.5 rounded-full bg-[#ffffff]/30 blur-[2px]" />
        <div className="absolute left-[30%] top-[80%] h-1.5 w-1.5 rounded-full bg-[#bfdbfe]/50 blur-[1px]" />
        
        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Headline */}
            <h1
              className="mx-auto max-w-5xl text-[clamp(32px,5vw,56px)] font-bold leading-[1.12] tracking-tight text-[#ffffff]"
            >
              Master DSA & Build Real Projects in
              <br />
              <span className="text-[#ffffff]">The Algorithmic Vault.</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.7] text-[#ffffff]/90">
              DSA mastery, industry-level projects, live mentorship, and premium AI
              tools in one launch bundle built for serious coding careers.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ffffff] px-8 py-3.5 text-[15px] font-bold tracking-wide text-[#102a7a] shadow-[0_8px_30px_rgba(255,255,255,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-[0_12px_36px_rgba(255,255,255,0.25)]"
              >
                Claim Launch Access
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#included"
                className="inline-flex items-center gap-2 rounded-full border border-[#ffffff]/20 bg-[#ffffff]/10 px-8 py-3.5 text-[15px] font-semibold tracking-wide text-[#ffffff] transition-all hover:bg-[#ffffff]/20"
              >
                View Everything Included
              </a>
            </div>

          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mx-auto mt-16 grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl border border-[#ffffff]/40 bg-[#ffffff]/10 shadow-[0_8px_32px_rgba(255,255,255,0.1)] backdrop-blur-md sm:grid-cols-4"
          >
            {/* Subtle inner highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[#ffffff]/20" />
            
            {[
              { value: "50", label: "DSA Problems" },
              { value: "3", label: "Real Projects" },
              { value: "2", label: "Live Sessions" },
              { value: "1 mo", label: "AI Access" },
            ].map(({ value, label }, i) => (
              <div 
                key={label} 
                className={`relative px-6 py-6 text-center ${
                  i < 3 ? "border-[#ffffff]/20 max-sm:border-b sm:border-r" : ""
                } ${i % 2 === 0 ? "max-sm:border-r" : ""}`}
              >
                <p className="text-[26px] font-bold tracking-tight text-[#ffffff] drop-shadow-md">
                  {value}
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#ffffff]/80">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 2 · WHAT'S INCLUDED ──────────────────────────────────── */}
      <section id="included" className="relative border-t border-slate-100 bg-[#f8f8f5] py-24 overflow-hidden">
        {/* Soft background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[400px] w-[800px] rounded-full bg-blue-400/5 blur-[100px]" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">
          <Reveal className="mb-16 text-center">
            <SectionBadge>What's included</SectionBadge>
            <SectionHeading className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Everything You Need To Start{" "}
              <span className="text-[#102a7a]">
                Your Coding Career
              </span>
            </SectionHeading>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-500">
              Four high-impact deliverables, carefully curated to close the gap
              between college and industry. No more endless tutorial loops, just action.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {[
              {
                icon: Code2,
                title: "Top 50 DSA Problems",
                desc: "Every question that actually shows up in tech interviews, not 450 random problems.",
                outcomes: [
                  "Problem statement & interview-style intuition",
                  "Flowchart → Pseudocode → Optimal code",
                  "Time & space complexity for every solution",
                ],
                delay: 0,
              },
              {
                icon: FolderGit2,
                title: "3 Industry Projects",
                desc: "Resume-worthy blueprints built around real business problems, not clone tutorials.",
                outcomes: [
                  "Real-world architecture & implementation",
                  "ATS-ready resume bullet per project",
                  "Technologies used in actual company stacks",
                ],
                delay: 0.05,
              },
              {
                icon: Users,
                title: "2 Live Group Sessions",
                desc: "Batch-wise live guidance covering career clarity, DSA doubts, freelancing & more.",
                outcomes: [
                  "Session 1: Roadmap, career, internship & DSA",
                  "Session 2: Freelancing, client work & SEO",
                  "Live Q&A with the creator",
                ],
                delay: 0.1,
              },
              {
                icon: Sparkles,
                title: "1 Month SkillWyn Premium",
                desc: "Early access to the full SkillWyn AI platform before it opens to the public.",
                outcomes: [
                  "AI Resume Analyzer + Resume Chat",
                  "AI Mock Interviews",
                  "Premium DSA Sheets & upcoming tools",
                ],
                delay: 0.15,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={card.delay}>
                  <div className="group relative overflow-hidden rounded-[1.5rem] border border-blue-100/70 bg-[#fbfdff] p-7 shadow-[0_12px_34px_rgba(15,23,42,0.055)] flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-[#102a7a]">
                            <Icon className="h-5 w-5" />
                            <h3 className="text-[23px] font-bold leading-tight tracking-[-0.03em] text-[#102a7a]">
                              {card.title}
                            </h3>
                          </div>
                          <p className="mt-3 max-w-[95%] text-[13px] font-semibold leading-snug text-[#001447]/80">
                            {card.desc}
                          </p>
                        </div>
                        <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-[#c7d4e8] bg-white text-[#0f172a] shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#2563eb] group-hover:shadow-[0_14px_36px_rgba(37,99,235,0.18)]">
                          <ArrowRight className="h-4 w-4 -rotate-45 transition-all duration-300 ease-in group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:opacity-0" strokeWidth={2.5} />
                          <ArrowRight className="absolute h-4 w-4 -translate-x-5 translate-y-5 -rotate-45 opacity-0 transition-all delay-150 duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <ul className="space-y-3">
                        {card.outcomes.map((o) => (
                          <li
                            key={o}
                            className="flex items-start gap-3 text-[14px] font-medium text-[#001447]/70"
                          >
                            <div className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#dbeafe]">
                              <Check className="h-2.5 w-2.5 text-[#102a7a]" strokeWidth={3} />
                            </div>
                            <span className="leading-snug">{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 · DSA PACK ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center">
            <div>
              <SectionBadge>DSA Pack</SectionBadge>
              <SectionHeading className="mt-4">
                The 50 DSA Problems That Actually Matter
              </SectionHeading>
              <p className="mt-5 text-[16px] leading-relaxed text-slate-600">
                Not a random 450-problem list. Every question is hand-picked from
                real interview rounds, with full breakdown so you understand the
                pattern, not just the answer.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Flowchart-style solving path",
                  "Interview intuition in plain language",
                  "Pseudocode before implementation",
                  "Optimal solution + complexity analysis",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-slate-800">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                      <Check className="h-3 w-3 text-[#102a7a]" strokeWidth={3} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* wrapper to prevent motion leak */}
              <div>
                <DsaDashboard />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 4 · PROJECTS ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            {/* Left Side: Image / Mockup */}
            <div className="order-2 lg:order-1 w-full perspective-[2000px]">
              {/* Laptop Screen / Bezel */}
              <div className="relative overflow-hidden rounded-t-[1.25rem] border-[10px] border-[#0f172a] bg-[#0f172a] shadow-[0_28px_80px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 transition-transform duration-500 hover:rotate-x-[2deg]">
                
                {/* Camera Notch */}
                <div className="absolute left-1/2 top-0 z-20 flex h-4 w-24 -translate-x-1/2 items-center justify-center rounded-b-xl bg-[#0f172a]">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#030712] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                </div>

                {/* Screen Content */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white">
                  <img
                    src={projects[0].image}
                    alt={projects[0].title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Laptop Base / Keyboard Deck Edge */}
              <div className="relative mx-auto h-5 sm:h-6 w-[104%] -translate-x-[2%] rounded-b-[20px] rounded-t-sm bg-gradient-to-b from-[#e2e4e9] to-[#b3b7c3] shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-t border-[#f1f3f5]">
                <div className="absolute left-1/2 top-0 h-1.5 sm:h-2 w-24 sm:w-32 -translate-x-1/2 rounded-b-lg bg-[#c8cbd2] shadow-inner" />
              </div>
            </div>

            {/* Right Side: Text & Content */}
            <div className="order-1 lg:order-2 lg:pl-12 xl:pl-16">
              <SectionBadge>Industry Projects</SectionBadge>
              <SectionHeading className="mt-4">
                Projects That Make Recruiters Stop Scrolling
              </SectionHeading>
              <p className="mt-5 text-[16px] leading-relaxed text-slate-600">
                A massive real-world blueprint designed to solve actual business
                problems, not clone tutorials that look the same on every resume.
              </p>

              {/* Stack tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {projects[0].stack.map((s: string) => (
                  <span
                    key={s}
                    className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#102a7a]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Resume impact */}
              <div className="mt-6 rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#102a7a]">
                  Resume Impact
                </p>
                <p className="text-[13px] leading-relaxed text-slate-700">
                  {projects[0].impact}
                </p>
              </div>

              {/* Outcomes */}
              <ul className="mt-6 space-y-3">
                {projects[0].outcomes.map((o: string) => (
                  <li key={o} className="flex items-center gap-3 text-[14px] font-medium text-slate-700">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                      <Check className="h-3 w-3 text-[#102a7a]" strokeWidth={3} />
                    </div>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 5 · LIVE SESSIONS ────────────────────────────────────── */}
      <section className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mb-12 text-center">
            <SectionBadge>Live Sessions</SectionBadge>
            <SectionHeading className="mt-4">
              Live Sessions Beyond Coding
            </SectionHeading>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-500">
              Two batch-wise sessions that cover not just how to code, but how to
              build a career and income from it.
            </p>
          </Reveal>

          {/* Session 1: Text Left, Image Right */}
          <Reveal className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            {/* Left Side: Session 1 Text */}
            <div className="order-2 lg:order-1 lg:pr-8 xl:pr-12">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">
                    <Terminal className="h-5 w-5 text-[#102a7a]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#102a7a]">
                      Session 1
                    </span>
                    <h3 className="text-[17px] font-semibold text-slate-900">
                      Career + Coding
                    </h3>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative space-y-6 pl-4 mt-8">
                  <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-100" />
                  {[
                    {
                      title: "Coding roadmap clarity",
                      out: "Leave knowing exactly what to learn and in what order",
                    },
                    {
                      title: "Career & internship guidance",
                      out: "How to apply, get shortlisted, and prepare smart",
                    },
                    {
                      title: "DSA + resume doubts",
                      out: "Your specific blockers solved live",
                    },
                  ].map((item, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[17px] top-[5px] h-2 w-2 rounded-full border-2 border-blue-500 bg-white" />
                      <p className="text-[14px] font-semibold text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[13px] text-slate-500">
                        {item.out}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Image / Mockup */}
            <div className="order-1 lg:order-2 w-full perspective-[2000px]">
              <div className="relative overflow-hidden rounded-[1.25rem] shadow-[0_20px_60px_rgba(16,42,122,0.15)] ring-1 ring-slate-900/5 transition-transform duration-500 hover:rotate-x-[2deg]">
                <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden bg-white">
                  <img
                    src="/images/career_coding_new.png"
                    alt="Live Sessions"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Session 2: Image Left, Text Right */}
          <Reveal className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            {/* Left Side: Image / Mockup */}
            <div className="order-1 lg:order-1 w-full perspective-[2000px]">
              <div className="relative overflow-hidden rounded-[1.25rem] shadow-[0_20px_60px_rgba(16,42,122,0.15)] ring-1 ring-slate-900/5 transition-transform duration-500 hover:rotate-y-[2deg]">
                <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden bg-white">
                  <img
                    src="/images/freelance_industry_new.png"
                    alt="Freelancing Session"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Session 2 Text */}
            <div className="order-2 lg:order-2 lg:pl-8 xl:pl-12">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">
                    <Zap className="h-5 w-5 text-[#102a7a]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#102a7a]">
                      Session 2
                    </span>
                    <h3 className="text-[17px] font-semibold text-slate-900">
                      Freelancing + Industry
                    </h3>
                  </div>
                </div>

                <div className="relative space-y-6 pl-4 mt-8">
                  <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-100" />
                  {[
                    {
                      title: "Coding in real life",
                      out: "How actual software products are planned, built and shipped",
                    },
                    {
                      title: "Freelancing starter blueprint",
                      out: "Pick a service, find clients, price your work, step by step",
                    },
                    {
                      title: "Industry signing & workflow",
                      out: "Scope, proposals, milestones, handover, the full client cycle",
                    },
                  ].map((item, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[17px] top-[5px] h-2 w-2 rounded-full border-2 border-blue-500 bg-white" />
                      <p className="text-[14px] font-semibold text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[13px] text-slate-500">
                        {item.out}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 6 · PREMIUM ACCESS ──────────────────────────────────── */}
      <section className="bg-slate-50 pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="mb-14 text-center">
            <SectionBadge>SkillWyn Premium</SectionBadge>
            <SectionHeading className="mt-4 text-[32px] md:text-[36px]">
              Early Access To SkillWyn Premium
            </SectionHeading>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate-500">
              Get 1 month free access to the full AI platform before it opens
              to the public.
            </p>
            <span className="mt-4 inline-block rounded-full bg-emerald-100/50 px-4 py-1.5 text-[12px] font-semibold text-emerald-700">
              ✓ Included free for 1 month
            </span>
          </Reveal>

          {/* 4 Premium Features Split Layout */}
          <div className="mx-auto mt-20 flex max-w-6xl flex-col gap-24">
            
            {/* Feature 1: Resume Analyzer (Text Left, Image Right) */}
            <Reveal className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              {/* Left Side: Text */}
              <div className="order-2 lg:order-1 lg:pr-8">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50">
                      <FileText className="h-5 w-5 text-[#102a7a]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#102a7a]">
                        Premium Feature
                      </span>
                      <h3 className="text-[17px] font-semibold text-slate-900">
                        AI Resume Analyzer
                      </h3>
                    </div>
                  </div>
                  <p className="mb-8 text-[14px] leading-[1.6] text-slate-500">
                    Upload your resume, get your ATS score, discover missing keywords, and get specific actionable fix suggestions to ensure you pass screening.
                  </p>

                  {/* Timeline */}
                  <div className="relative space-y-6 pl-4">
                    <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-100" />
                    {[
                      {
                        title: "ATS Friendly Formatting",
                        out: "Ensures your resume gets parsed correctly",
                      },
                      {
                        title: "Keyword Gap Analysis",
                        out: "Find exactly what you are missing for the role",
                      },
                      {
                        title: "Instant Rewrites",
                        out: "Get better phrasing for your bullet points instantly",
                      },
                    ].map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[17px] top-[5px] h-2 w-2 rounded-full border-2 border-blue-500 bg-white" />
                        <p className="text-[14px] font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[13px] text-slate-500">
                          {item.out}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Mockup */}
              <div className="order-1 lg:order-2 w-full perspective-[2000px]">
                <div className="relative overflow-hidden rounded-t-[1.25rem] border-[10px] border-[#0f172a] bg-[#0f172a] shadow-[0_28px_80px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 transition-transform duration-500 hover:rotate-x-[2deg]">
                  <div className="absolute left-1/2 top-0 z-20 flex h-4 w-24 -translate-x-1/2 items-center justify-center rounded-b-xl bg-[#0f172a]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#030712] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                  </div>
                  <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-lg bg-white">
                    <img
                      src="/images/ui_resume_analyzer_1782328528478.png"
                      alt="AI Resume Analyzer Dashboard"
                      className="h-full w-full scale-[1.15] object-cover"
                    />
                  </div>
                </div>

                <div className="relative mx-auto h-5 sm:h-6 w-[104%] -translate-x-[2%] rounded-b-[20px] rounded-t-sm bg-gradient-to-b from-[#e2e4e9] to-[#b3b7c3] shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-t border-[#f1f3f5]">
                  <div className="absolute left-1/2 top-0 h-1.5 sm:h-2 w-24 sm:w-32 -translate-x-1/2 rounded-b-lg bg-[#c8cbd2] shadow-inner" />
                </div>
              </div>
            </Reveal>

            {/* Feature 2: Resume Chat (Image Left, Text Right) */}
            <Reveal delay={0.05} className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              {/* Left Side: Mockup */}
              <div className="order-1 lg:order-1 w-full perspective-[2000px]">
                <div className="relative overflow-hidden rounded-t-[1.25rem] border-[10px] border-[#0f172a] bg-[#0f172a] shadow-[0_28px_80px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 transition-transform duration-500 hover:rotate-x-[2deg]">
                  <div className="absolute left-1/2 top-0 z-20 flex h-4 w-24 -translate-x-1/2 items-center justify-center rounded-b-xl bg-[#0f172a]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#030712] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                  </div>
                  <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-lg bg-white">
                    <img
                      src="/images/ui_resume_chat_1782328539418.png"
                      alt="Resume Chat Interface"
                      className="h-full w-full scale-[1.15] object-cover"
                    />
                  </div>
                </div>

                <div className="relative mx-auto h-5 sm:h-6 w-[104%] -translate-x-[2%] rounded-b-[20px] rounded-t-sm bg-gradient-to-b from-[#e2e4e9] to-[#b3b7c3] shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-t border-[#f1f3f5]">
                  <div className="absolute left-1/2 top-0 h-1.5 sm:h-2 w-24 sm:w-32 -translate-x-1/2 rounded-b-lg bg-[#c8cbd2] shadow-inner" />
                </div>
              </div>

              {/* Right Side: Text */}
              <div className="order-2 lg:order-2 lg:pl-8">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-50">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">
                        Premium Feature
                      </span>
                      <h3 className="text-[17px] font-semibold text-slate-900">
                        Resume Chat
                      </h3>
                    </div>
                  </div>
                  <p className="mb-8 text-[14px] leading-[1.6] text-slate-500">
                    Chat directly with your resume. Treat it like a personal career advisor: ask what to improve, how to align with a specific job, and rewrite bullets interactively.
                  </p>

                  <div className="relative space-y-6 pl-4">
                    <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-100" />
                    {[
                      {
                        title: "Interactive Feedback",
                        out: "Ask specific questions about your experience",
                      },
                      {
                        title: "Tailored to Job Descriptions",
                        out: "Paste a JD and ask exactly how you stack up",
                      },
                      {
                        title: "Dynamic Bullet Generation",
                        out: "Create impact-driven bullets in seconds",
                      },
                    ].map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[17px] top-[5px] h-2 w-2 rounded-full border-2 border-purple-500 bg-white" />
                        <p className="text-[14px] font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[13px] text-slate-500">
                          {item.out}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Feature 3: AI Mock Interviews (Text Left, Image Right) */}
            <Reveal delay={0.1} className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              {/* Left Side: Text */}
              <div className="order-2 lg:order-1 lg:pr-8">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50">
                      <Mic className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                        Premium Feature
                      </span>
                      <h3 className="text-[17px] font-semibold text-slate-900">
                        AI Mock Interviews
                      </h3>
                    </div>
                  </div>
                  <p className="mb-8 text-[14px] leading-[1.6] text-slate-500">
                    Practice technical and behavioral rounds with AI voice feedback before your real interview call. Get over your nervousness in a safe environment.
                  </p>

                  {/* Timeline */}
                  <div className="relative space-y-6 pl-4">
                    <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-100" />
                    {[
                      {
                        title: "Real-time Voice AI",
                        out: "Speak naturally, get instant intelligent responses",
                      },
                      {
                        title: "Role-specific Questions",
                        out: "Frontend, Backend, SDE, and Data Science focuses",
                      },
                      {
                        title: "Detailed Feedback",
                        out: "Actionable advice on communication and correctness",
                      },
                    ].map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[17px] top-[5px] h-2 w-2 rounded-full border-2 border-emerald-500 bg-white" />
                        <p className="text-[14px] font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[13px] text-slate-500">
                          {item.out}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Mockup */}
              <div className="order-1 lg:order-2 w-full perspective-[2000px]">
                <div className="relative overflow-hidden rounded-t-[1.25rem] border-[10px] border-[#0f172a] bg-[#0f172a] shadow-[0_28px_80px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 transition-transform duration-500 hover:rotate-x-[2deg]">
                  <div className="absolute left-1/2 top-0 z-20 flex h-4 w-24 -translate-x-1/2 items-center justify-center rounded-b-xl bg-[#0f172a]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#030712] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                  </div>
                  <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-lg bg-white">
                    <img
                      src="/images/ui_mock_interviews_1782328554065.png"
                      alt="AI Mock Interviews Dashboard"
                      className="h-full w-full scale-[1.15] object-cover"
                    />
                  </div>
                </div>

                <div className="relative mx-auto h-5 sm:h-6 w-[104%] -translate-x-[2%] rounded-b-[20px] rounded-t-sm bg-gradient-to-b from-[#e2e4e9] to-[#b3b7c3] shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-t border-[#f1f3f5]">
                  <div className="absolute left-1/2 top-0 h-1.5 sm:h-2 w-24 sm:w-32 -translate-x-1/2 rounded-b-lg bg-[#c8cbd2] shadow-inner" />
                </div>
              </div>
            </Reveal>

            {/* Feature 4: Premium DSA Sheets (Image Left, Text Right) */}
            <Reveal delay={0.15} className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              {/* Left Side: Mockup */}
              <div className="order-1 lg:order-1 w-full perspective-[2000px]">
                <div className="relative overflow-hidden rounded-t-[1.25rem] border-[10px] border-[#0f172a] bg-[#0f172a] shadow-[0_28px_80px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 transition-transform duration-500 hover:rotate-x-[2deg]">
                  <div className="absolute left-1/2 top-0 z-20 flex h-4 w-24 -translate-x-1/2 items-center justify-center rounded-b-xl bg-[#0f172a]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#030712] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                  </div>
                  <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-lg bg-white">
                    <img
                      src="/images/ui_dsa_sheets_1782328565968.png"
                      alt="Premium DSA Sheets Dashboard"
                      className="h-full w-full scale-[1.15] object-cover"
                    />
                  </div>
                </div>

                <div className="relative mx-auto h-5 sm:h-6 w-[104%] -translate-x-[2%] rounded-b-[20px] rounded-t-sm bg-gradient-to-b from-[#e2e4e9] to-[#b3b7c3] shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-t border-[#f1f3f5]">
                  <div className="absolute left-1/2 top-0 h-1.5 sm:h-2 w-24 sm:w-32 -translate-x-1/2 rounded-b-lg bg-[#c8cbd2] shadow-inner" />
                </div>
              </div>

              {/* Right Side: Text */}
              <div className="order-2 lg:order-2 lg:pl-8">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50">
                      <Brain className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                        Premium Feature
                      </span>
                      <h3 className="text-[17px] font-semibold text-slate-900">
                        Premium DSA Sheets
                      </h3>
                    </div>
                  </div>
                  <p className="mb-8 text-[14px] leading-[1.6] text-slate-500">
                    Curated, topic-wise sheets built for interview prep, not dumped lists. Master the underlying logic rather than memorizing random solutions.
                  </p>

                  <div className="relative space-y-6 pl-4">
                    <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-100" />
                    {[
                      {
                        title: "Pattern-based Learning",
                        out: "Master 15 patterns instead of 500 random problems",
                      },
                      {
                        title: "Visual Intuition",
                        out: "Understand the 'why' before looking at the code",
                      },
                      {
                        title: "Optimal Solutions",
                        out: "Clean, production-ready code you can actually write in interviews",
                      },
                    ].map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[17px] top-[5px] h-2 w-2 rounded-full border-2 border-indigo-500 bg-white" />
                        <p className="text-[14px] font-semibold text-slate-800">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[13px] text-slate-500">
                          {item.out}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="relative z-10 py-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-[#111827] leading-tight">
              Unlock The <span className="text-[#102a7a]">Algorithmic Vault</span>
            </h2>
            <p className="mt-4 text-base font-medium text-[#5b6fb3]">
              Everything you need to crack top product companies.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-[2rem] bg-[#102a7a] shadow-[0_24px_80px_rgba(16,42,122,0.2)] md:grid-cols-[1.2fr_1fr]">
              
              {/* Left Side: Pricing & Features */}
              <div className="flex flex-col justify-center p-8 text-left md:p-12">
                <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-[12px] font-bold uppercase tracking-widest !text-[#93c5fd] ring-1 ring-inset ring-blue-500/30">
                  <Sparkles className="h-3.5 w-3.5 !text-[#93c5fd]" />
                  <span className="!text-[#93c5fd]">Limited Offer</span>
                </div>
                
                <div className="flex items-baseline gap-x-2">
                  <span className="text-3xl font-semibold !text-white opacity-80">₹</span>
                  <span className="text-5xl font-bold tracking-tight !text-white">159</span>
                  <span className="ml-2 text-xl font-medium !text-white line-through decoration-white/70 decoration-1">₹1500</span>
                </div>
                <p className="mt-2 text-[13px] font-medium !text-[#93c5fd]">
                  Valid for the first 30 learners only.
                </p>
                
                <div className="my-8 h-px w-full bg-white/10" />
                
                <ul className="space-y-4 text-[14px] font-medium">
                  <li className="flex items-center gap-x-3 !text-white"><Check className="h-4 w-4 shrink-0 !text-[#93c5fd]" /> <span className="!text-white">Full access to 50+ Premium DSA questions</span></li>
                  <li className="flex items-center gap-x-3 !text-white"><Check className="h-4 w-4 shrink-0 !text-[#93c5fd]" /> <span className="!text-white">3 Enterprise-grade Project Blueprints</span></li>
                  <li className="flex items-center gap-x-3 !text-white"><Check className="h-4 w-4 shrink-0 !text-[#93c5fd]" /> <span className="!text-white">Exclusive Live Doubt-Clearing Session</span></li>
                  <li className="flex items-center gap-x-3 !text-white"><Check className="h-4 w-4 shrink-0 !text-[#93c5fd]" /> <span className="!text-white">1-Month Free Access to Premium AI Features</span></li>
                </ul>
              </div>

              {/* Right Side: Checkout Action */}
              <div className="flex flex-col justify-center bg-[#fdfbf7] p-8 md:p-12">
                <h3 className="mb-2 text-xl font-bold !text-slate-900">Ready to start?</h3>
                <p className="mb-8 text-[14px] leading-relaxed !text-slate-500">
                  Enter your email below. After secure payment, you will instantly receive the Notion Vault link in your inbox.
                </p>
                
                <div className="mt-2">
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 w-full rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-[#102a7a] placeholder-slate-400 shadow-sm outline-none transition-all focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
                  />
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="group cursor-pointer relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#2563eb] px-6 py-4 text-[14px] font-bold tracking-wide !text-white shadow-[0_12px_24px_rgba(37,99,235,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#1d4ed8] disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : "Enroll & Get Access"}
                    {!isProcessing && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </button>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>



      {/* ─── FAQs ─────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="mb-12 text-center">
            <SectionBadge>FAQ</SectionBadge>
            <SectionHeading className="mt-4">
              Frequently Asked Questions
            </SectionHeading>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                open={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-[#dbeafe] bg-[#fbfcff] px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1.6fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <Image src="/skillwyn-logo.png" alt="SkillWyn" width={42} height={42} className="h-10 w-10 object-contain" />
                <span className="text-xl font-black text-[#102a7a]" >SkillWyn</span>
              </Link>
              <p className="mt-5 max-w-md text-sm font-medium leading-7 text-[#5b6fb3]" >
                AI-powered roadmaps, resume help, mock interviews, resources, and project proof for career-focused developers.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["35K+ learners", "AI roadmaps", "Resume ready"].map((item) => (
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
                        <Link href={href} className="text-sm font-semibold text-[#5b6fb3] transition-colors hover:text-[#102a7a]" >
                          {label}
                        </Link>
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
                <a
                  key={label}
                  href={href}
                  className="rounded-full border border-[#dbeafe] bg-white px-4 py-2 text-xs font-bold text-[#102a7a] transition-colors hover:border-[#2563eb] hover:text-[#2563eb]"
                  
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
