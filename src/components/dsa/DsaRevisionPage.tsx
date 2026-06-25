"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock3, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type TopicKey = "Arrays" | "Strings" | "LinkedList" | "Trees" | "DP" | "Graphs" | "Sorting" | "Searching";
type Difficulty = "easy" | "medium" | "hard";
type Mode = "learn" | "practice" | "test";

type Question = {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  difficulty: Difficulty;
};

type TopicData = {
  summary: string[];
  formula: string;
  patterns: string[];
  questions: Question[];
  quiz: {
    question: string;
    options: string[];
    answer: number;
  }[];
};

const topics: TopicKey[] = ["Arrays", "Strings", "LinkedList", "Trees", "DP", "Graphs", "Sorting", "Searching"];

const topicData: Record<TopicKey, TopicData> = {
  Arrays: makeTopic("Arrays", "Prefix sums, two pointers, sliding windows, and hashing solve most array patterns.", "prefix[i] = prefix[i - 1] + arr[i]"),
  Strings: makeTopic("Strings", "Frequency maps, two pointers, tries, and rolling windows are the core string weapons.", "charCount[s[i]]++"),
  LinkedList: makeTopic("LinkedList", "Fast/slow pointers, dummy nodes, and pointer reversal keep linked list problems clean.", "prev -> curr -> next"),
  Trees: makeTopic("Trees", "DFS recursion, BFS levels, and subtree returns are the foundation for tree questions.", "height = 1 + max(left, right)"),
  DP: makeTopic("DP", "Define state, transition, base case, then optimize from recursion to tabulation.", "dp[i] = best previous state + choice"),
  Graphs: makeTopic("Graphs", "BFS, DFS, visited sets, topological order, and DSU cover most graph interviews.", "visited.add(node)"),
  Sorting: makeTopic("Sorting", "Sort to reveal order, greediness, intervals, duplicates, and binary-searchable structure.", "O(n log n) comparison sorting"),
  Searching: makeTopic("Searching", "Binary search over indexes, answers, and monotonic predicates.", "while (low <= high)"),
};

function makeTopic(name: TopicKey, concept: string, formula: string): TopicData {
  const baseQuestions: Question[] = [
    {
      id: `${name}-1`,
      question: `What is the first pattern you should check in ${name} problems?`,
      answer: "Look for constraints, ordering, repeated work, and whether a known pattern fits.",
      explanation: "Pattern recognition starts from constraints and structure before writing code.",
      difficulty: "easy",
    },
    {
      id: `${name}-2`,
      question: `How do you reduce brute force in ${name}?`,
      answer: "Cache repeated work, sort when order helps, or maintain state while scanning.",
      explanation: "Most optimizations remove nested recomputation.",
      difficulty: "medium",
    },
    {
      id: `${name}-3`,
      question: `When should you choose iteration over recursion in ${name}?`,
      answer: "Use iteration when state is linear and recursion adds stack risk or complexity.",
      explanation: "Interview code should be clear, bounded, and easy to dry run.",
      difficulty: "medium",
    },
    {
      id: `${name}-4`,
      question: `What edge cases matter most for ${name}?`,
      answer: "Empty input, single item, duplicates, extremes, and already optimal cases.",
      explanation: "Most wrong submissions fail around small or degenerate inputs.",
      difficulty: "easy",
    },
    {
      id: `${name}-5`,
      question: `How do you explain your ${name} solution in an interview?`,
      answer: "State the pattern, invariant, complexity, and why the edge cases are handled.",
      explanation: "A strong explanation is often as important as the final code.",
      difficulty: "hard",
    },
  ];

  return {
    summary: [
      concept,
      "Start with brute force, then name the repeated work or invariant.",
      "Always finish with time complexity, space complexity, and edge cases.",
    ],
    formula,
    patterns: ["State the invariant before coding", "Dry run on a tiny input", "Track edge cases explicitly"],
    questions: baseQuestions,
    quiz: [
      {
        question: `Which habit improves ${name} revision the fastest?`,
        options: ["Memorize code only", "Name the pattern and invariant", "Skip dry runs", "Ignore constraints"],
        answer: 1,
      },
      {
        question: `What should you mention after solving a ${name} problem?`,
        options: ["Only final answer", "Time and space complexity", "Company name", "Editor theme"],
        answer: 1,
      },
      {
        question: `Which case should be tested in ${name}?`,
        options: ["Only average input", "Empty/single input", "Only huge input", "No input"],
        answer: 1,
      },
    ],
  };
}

export default function DsaRevisionPage() {
  const [topic, setTopic] = useState<TopicKey>("Arrays");
  const [mode, setMode] = useState<Mode>("learn");
  const [progress, setProgress] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const saved = window.localStorage.getItem("skillwyn_dsa_progress");
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("skillwyn_dsa_progress", JSON.stringify(progress));
  }, [progress]);

  const done = progress[topic]?.length ?? 0;

  const markDone = (id: string) => {
    setProgress((prev) => {
      const set = new Set(prev[topic] ?? []);
      set.add(id);
      return { ...prev, [topic]: Array.from(set) };
    });
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <Navbar />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr] lg:px-10">
        <TopicSidebar active={topic} onChange={setTopic} progress={progress} />
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563eb]">DSA Revision</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{topic}</h1>
            </div>
            <div className="flex rounded-xl bg-slate-100 p-1">
              {(["learn", "practice", "test"] as Mode[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                    mode === item ? "bg-white text-[#2563eb] shadow-sm" : "text-slate-600 hover:text-[#2563eb]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {mode === "learn" && <LearnTab topic={topic} />}
          {mode === "practice" && (
            <PracticeTab topic={topic} done={done} onDone={markDone} completed={progress[topic] ?? []} />
          )}
          {mode === "test" && <TestTab topic={topic} onSwitchTopic={() => setTopic("Strings")} />}
        </div>
      </section>
    </main>
  );
}

function TopicSidebar({
  active,
  onChange,
  progress,
}: {
  active: TopicKey;
  onChange: (topic: TopicKey) => void;
  progress: Record<string, string[]>;
}) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-20 lg:h-fit">
      <p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Topics</p>
      {topics.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
            active === item ? "bg-[#eff6ff] text-[#2563eb]" : "text-slate-700 hover:bg-slate-50"
          }`}
        >
          <span>{item}</span>
          <span className="text-xs text-slate-400">{progress[item]?.length ?? 0}/5</span>
        </button>
      ))}
    </aside>
  );
}

function LearnTab({ topic }: { topic: TopicKey }) {
  const data = topicData[topic];
  return (
    <div className="grid gap-5">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-bold">Concept summary</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
          {data.summary.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl bg-white p-4 font-mono text-sm text-[#2563eb]">{data.formula}</div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Key patterns to remember</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {data.patterns.map((pattern) => (
            <div key={pattern} className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700">
              {pattern}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PracticeTab({
  topic,
  done,
  onDone,
  completed,
}: {
  topic: TopicKey;
  done: number;
  onDone: (id: string) => void;
  completed: string[];
}) {
  const [index, setIndex] = useState(0);
  const questions = topicData[topic].questions;
  const question = questions[index];

  useEffect(() => setIndex(0), [topic]);

  return (
    <div>
      <ProgressBar done={done} total={45} />
      <FlashCard question={question} />
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => {
            onDone(question.id);
            setIndex((index + 1) % questions.length);
          }}
          className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600"
        >
          Got it ✓
        </button>
        <button
          onClick={() => setIndex((index + 1) % questions.length)}
          className="rounded-xl bg-amber-100 px-5 py-3 text-sm font-bold text-amber-700 hover:bg-amber-200"
        >
          Review again ↺
        </button>
      </div>
      <p className="mt-3 text-xs text-[#5b6fb3]">Completed in this topic: {completed.length}/5 sample cards</p>
    </div>
  );
}

function ProgressBar({ done, total }: { done: number; total: number }) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold">
        <span>{done} / {total} done</span>
        <span>{Math.round((done / total) * 100)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${Math.min((done / total) * 100, 100)}%` }} />
      </div>
    </div>
  );
}

function FlashCard({ question }: { question: Question }) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => setFlipped(false), [question.id]);
  return (
    <button onClick={() => setFlipped((value) => !value)} className="block w-full text-left [perspective:1000px]">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45 }}
        className="relative min-h-[250px] rounded-2xl border border-slate-200 bg-white shadow-sm [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 p-6 [backface-visibility:hidden]">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-500">{question.difficulty}</span>
          <h2 className="mt-8 text-2xl font-bold leading-snug">{question.question}</h2>
          <p className="mt-8 text-sm text-[#5b6fb3]">Click card to reveal answer</p>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-[#eff6ff] p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h2 className="text-xl font-bold text-[#102a7a]">Answer</h2>
          <p className="mt-4 text-lg font-semibold">{question.answer}</p>
          <p className="mt-4 text-sm leading-6 text-[#5b6fb3]">{question.explanation}</p>
        </div>
      </motion.div>
    </button>
  );
}

function TestTab({ topic, onSwitchTopic }: { topic: TopicKey; onSwitchTopic: () => void }) {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const quiz = topicData[topic].quiz;
  const score = useMemo(() => quiz.filter((q, i) => q.answer === selected[i]).length, [quiz, selected]);

  if (submitted) {
    return <ScoreCard score={score} total={quiz.length} topic={topic} onRetry={() => { setSubmitted(false); setSelected({}); }} onSwitchTopic={onSwitchTopic} />;
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <QuizTimer />
      </div>
      <div className="space-y-5">
        {quiz.map((item, index) => (
          <div key={item.question} className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold">{index + 1}. {item.question}</h3>
            <div className="mt-4 grid gap-2">
              {item.options.map((option, optionIndex) => (
                <button
                  key={option}
                  onClick={() => setSelected((prev) => ({ ...prev, [index]: optionIndex }))}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    selected[index] === optionIndex ? "border-[#2563eb] bg-[#eff6ff] text-[#2563eb]" : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setSubmitted(true)} className="mt-5 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-bold text-white">
        Submit Test
      </button>
    </div>
  );
}

function QuizTimer() {
  const [seconds, setSeconds] = useState(15 * 60);
  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => Math.max(value - 1, 0)), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
      <Clock3 className="h-4 w-4 text-[#2563eb]" />
      {minutes}:{secs}
    </div>
  );
}

function ScoreCard({ score, total, topic, onRetry, onSwitchTopic }: { score: number; total: number; topic: TopicKey; onRetry: () => void; onSwitchTopic: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#eff6ff] p-6 text-center">
      <h2 className="text-3xl font-bold text-[#102a7a]">{score}/{total} - Strong on {topic}!</h2>
      <p className="mt-3 text-[#5b6fb3]">Breakdown: patterns strong, edge cases need one more revision pass.</p>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={onRetry} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#2563eb]">
          <RotateCcw className="h-4 w-4" /> Retry
        </button>
        <button onClick={onSwitchTopic} className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-bold text-white">
          Switch Topic <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
