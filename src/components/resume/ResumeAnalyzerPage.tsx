"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  Check,
  Download,
  FileText,
  History,
  MessageSquare,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  UploadCloud,
  X,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type Analysis = {
  resumeId?: string;
  filename?: string;
  atsScore: number;
  overallScore?: number;
  grade?: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingKeywords: string[];
  parsedResume?: {
    summary?: string;
    experience?: string;
    projects?: string;
    skills?: string[];
    education?: string;
    raw_text?: string;
  };
  scoreBreakdown?: Record<string, number>;
  jdMatch?: {
    match_score?: number;
    matched_keywords?: string[];
    missing_keywords?: string[];
    total_jd_keywords?: number;
  };
};

type ResumeDraft = {
  name: string;
  headline: string;
  summary: string;
  experience: string[];
  projects: string[];
  skills: string[];
  education: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ProposedChange = {
  id: string;
  section: keyof ResumeDraft;
  before: string;
  after: string;
  reason: string;
};

type Snapshot = {
  draft: ResumeDraft;
  label: string;
};

const starterDraft: ResumeDraft = {
  name: "Your Name",
  headline: "Software Developer",
  summary: "Upload your resume to generate a live editable preview.",
  experience: ["Your experience bullets will appear here."],
  projects: ["Your project bullets will appear here."],
  skills: ["JavaScript", "React", "Node.js"],
  education: "Education details will appear here.",
};

const personas = ["FAANG", "Startup", "Product", "Senior Eng", "Freelance"];

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [draft, setDraft] = useState<ResumeDraft>(starterDraft);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [proposedChange, setProposedChange] = useState<ProposedChange | null>(null);
  const [changedSection, setChangedSection] = useState<keyof ResumeDraft | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Upload your resume, then tell me what to change. Example: Make my profile stronger for a startup CTO role.",
    },
  ]);
  const [message, setMessage] = useState("");
  const [jdText, setJdText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTool, setActiveTool] = useState<"coach" | "persona" | "rejection" | "outreach" | "roadmap">("coach");

  const scoreColor = useMemo(() => {
    const score = analysis?.atsScore ?? 0;
    if (score > 75) return "text-emerald-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  }, [analysis]);

  const handleFile = (files: FileList | null) => {
    const next = files?.[0];
    if (!next) return;

    const validType =
      ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"].includes(next.type) ||
      /\.(pdf|docx?|PDF|DOCX?)$/.test(next.name);

    if (!validType) {
      setError("Upload a PDF or DOCX resume.");
      return;
    }

    setFile(next);
    setAnalysis(null);
    setDraft(starterDraft);
    setProposedChange(null);
    setChangedSection(null);
    setHistory([]);
    setError("");
  };

  const analyze = async () => {
    if (!file || loading) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jdText", jdText);

      const response = await fetch("/api/resume/mvp/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Resume analysis failed.");
      }

      const nextAnalysis = (await response.json()) as Analysis;
      const nextDraft = buildDraft(nextAnalysis);
      setAnalysis(nextAnalysis);
      setDraft(nextDraft);
      setChat([
        {
          role: "assistant",
          content: `Resume parsed. ATS score is ${nextAnalysis.atsScore}/100. Tell me what to change and I will suggest a live edit.`,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Resume analyzer is unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const sendChat = async (forcedMessage = message) => {
    const trimmed = forcedMessage.trim();
    if (!analysis?.resumeId || !trimmed || chatLoading) return;

    setMessage("");
    setChat((current) => [...current, { role: "user", content: trimmed }]);
    setChatLoading(true);
    setError("");

    const localChange = createChangeFromPrompt(trimmed, draft, jdText);
    if (localChange) setProposedChange(localChange);

    try {
      const response = await fetch("/api/resume/mvp/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId: analysis.resumeId, message: trimmed }),
      });

      const data = response.ok ? ((await response.json()) as { answer?: string }) : null;
      const localAnswer = localChange
        ? `I prepared a change for the ${labelForSection(localChange.section)} section. Review the highlighted preview, then accept or reject it.`
        : smartFallbackAnswer(trimmed, draft, analysis);

      setChat((current) => [
        ...current,
        {
          role: "assistant",
          content: data?.answer ? `${localAnswer}\n\nMVP note: ${data.answer}` : localAnswer,
        },
      ]);
    } catch {
      setChat((current) => [
        ...current,
        {
          role: "assistant",
          content: localChange
            ? "I prepared the edit locally. The MVP chat service is offline, but you can still accept or reject the preview change."
            : smartFallbackAnswer(trimmed, draft, analysis),
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const acceptChange = () => {
    if (!proposedChange) return;
    setHistory((current) => [...current, { draft, label: `Changed ${labelForSection(proposedChange.section)}` }]);
    setDraft((current) => applyChange(current, proposedChange));
    setChangedSection(proposedChange.section);
    setProposedChange(null);
  };

  const rejectChange = () => {
    setProposedChange(null);
    setChangedSection(null);
  };

  const undo = () => {
    const previous = history.at(-1);
    if (!previous) return;
    setDraft(previous.draft);
    setHistory((current) => current.slice(0, -1));
    setChangedSection(null);
  };

  const applyPersona = (persona: string) => {
    const change = createPersonaChange(persona, draft);
    setProposedChange(change);
    setActiveTool("persona");
    setChat((current) => [
      ...current,
      { role: "user", content: `Switch my resume persona to ${persona}.` },
      { role: "assistant", content: `I prepared a ${persona} version. Review the highlighted summary before accepting.` },
    ]);
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <Navbar />
      <section className="mx-auto max-w-[1500px] px-5 py-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              AI Resume Co-Pilot
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">Talk to your resume. Edit it live.</h1>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Upload a resume, chat in natural language, review highlighted changes, accept or reject edits, then export the improved version.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={undo} disabled={!history.length} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 disabled:opacity-40">
              <RotateCcw className="h-4 w-4" />
              Undo last change
            </button>
            <button onClick={() => downloadDraft(draft, analysis)} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white">
              <Download className="h-4 w-4" />
              Export draft
            </button>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[390px_minmax(0,1fr)_460px]">
          <aside className="space-y-4">
            <UploadPanel file={file} loading={loading} error={error} jdText={jdText} setJdText={setJdText} handleFile={handleFile} analyze={analyze} />
            <ScorePanel analysis={analysis} scoreColor={scoreColor} />
            <ToolPanel activeTool={activeTool} setActiveTool={setActiveTool} targetRole={targetRole} setTargetRole={setTargetRole} draft={draft} analysis={analysis} applyPersona={applyPersona} />
          </aside>

          <section className="min-h-[720px] rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">AI Chat Editor</h2>
                <p className="text-xs font-semibold text-slate-500">Every accepted edit updates the preview on the right.</p>
              </div>
              {analysis?.resumeId ? <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Resume loaded</span> : null}
            </div>

            <div className="flex h-[610px] flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {chat.map((item, index) => (
                  <ChatBubble key={`${item.role}-${index}`} message={item} />
                ))}
                {chatLoading ? <p className="text-xs font-bold text-blue-600">Thinking through the edit...</p> : null}
              </div>

              {proposedChange ? <DiffCard change={proposedChange} acceptChange={acceptChange} rejectChange={rejectChange} /> : null}

              <div className="border-t border-slate-100 p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {[
                    "Make my profile sound stronger for a startup CTO role",
                    "Quantify my weakest bullet",
                    "Rewrite my experience to match this JD",
                    "Remove college projects if I have enough experience",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      disabled={!analysis?.resumeId || chatLoading}
                      onClick={() => sendChat(prompt)}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 disabled:opacity-40"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        sendChat();
                      }
                    }}
                    placeholder="Tell Skillwyn what to change..."
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                  <button
                    onClick={() => sendChat()}
                    disabled={!analysis?.resumeId || !message.trim() || chatLoading}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 text-white disabled:bg-slate-200 disabled:text-slate-400"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <ResumePreview draft={draft} changedSection={changedSection} proposedChange={proposedChange} />
        </div>
      </section>
    </main>
  );
}

function UploadPanel({
  file,
  loading,
  error,
  jdText,
  setJdText,
  handleFile,
  analyze,
}: {
  file: File | null;
  loading: boolean;
  error: string;
  jdText: string;
  setJdText: (value: string) => void;
  handleFile: (files: FileList | null) => void;
  analyze: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-extrabold text-slate-900">Step 1. Upload</h2>
      <label
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFile(event.dataTransfer.files);
        }}
        className="mt-4 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center hover:border-blue-400 hover:bg-blue-50"
      >
        <UploadCloud className="h-8 w-8 text-blue-600" />
        <p className="mt-3 text-sm font-bold text-slate-800">Upload PDF or DOCX</p>
        <p className="mt-1 text-xs font-medium text-slate-500">Resume will be parsed into editable blocks.</p>
        <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={(event) => handleFile(event.target.files)} />
      </label>

      {file ? (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <FileText className="h-5 w-5 shrink-0 text-blue-600" />
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-slate-800">{file.name}</p>
            <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      ) : null}

      <label className="mt-4 block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Job description</span>
        <textarea
          value={jdText}
          onChange={(event) => setJdText(event.target.value)}
          placeholder="Paste a JD to enable rejection simulation and keyword tailoring."
          className="mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold outline-none focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
        />
      </label>

      {error ? (
        <p className="mt-3 flex gap-2 text-xs font-bold text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}

      <button onClick={analyze} disabled={!file || loading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white disabled:bg-slate-200 disabled:text-slate-400">
        {loading ? "Parsing resume..." : "Start co-pilot"}
        {!loading ? <ArrowRight className="h-4 w-4" /> : null}
      </button>
    </div>
  );
}

function ScorePanel({ analysis, scoreColor }: { analysis: Analysis | null; scoreColor: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-extrabold text-slate-900">Instant analysis</h2>
      {analysis ? (
        <div className="mt-4 space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">ATS score</p>
              <p className={`text-5xl font-black ${scoreColor}`}>{analysis.atsScore}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">Grade {analysis.grade ?? "N/A"}</span>
          </div>
          <div className="grid gap-2">
            {(analysis.suggestions.length ? analysis.suggestions.slice(0, 3) : ["Start chatting to improve this resume."]).map((item) => (
              <p key={item} className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold leading-relaxed text-blue-800">
                {item}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-500">Upload a resume to see ATS score, quick wins, and missing keywords.</p>
      )}
    </div>
  );
}

function ToolPanel({
  activeTool,
  setActiveTool,
  targetRole,
  setTargetRole,
  draft,
  analysis,
  applyPersona,
}: {
  activeTool: "coach" | "persona" | "rejection" | "outreach" | "roadmap";
  setActiveTool: (tool: "coach" | "persona" | "rejection" | "outreach" | "roadmap") => void;
  targetRole: string;
  setTargetRole: (value: string) => void;
  draft: ResumeDraft;
  analysis: Analysis | null;
  applyPersona: (persona: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-extrabold text-slate-900">Differentiators</h2>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ["coach", "Quantifier"],
          ["persona", "Personas"],
          ["rejection", "Rejection"],
          ["outreach", "Cold DM"],
          ["roadmap", "Time Travel"],
        ].map(([key, label]) => (
          <button key={key} onClick={() => setActiveTool(key as typeof activeTool)} className={`rounded-xl px-3 py-2 text-xs font-extrabold ${activeTool === key ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        {activeTool === "coach" ? <AchievementCoach draft={draft} /> : null}
        {activeTool === "persona" ? <PersonaTool applyPersona={applyPersona} /> : null}
        {activeTool === "rejection" ? <RejectionTool analysis={analysis} /> : null}
        {activeTool === "outreach" ? <OutreachTool draft={draft} /> : null}
        {activeTool === "roadmap" ? <RoadmapTool targetRole={targetRole} setTargetRole={setTargetRole} draft={draft} /> : null}
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm font-semibold leading-relaxed ${isUser ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
        {message.content}
      </div>
    </div>
  );
}

function DiffCard({ change, acceptChange, rejectChange }: { change: ProposedChange; acceptChange: () => void; rejectChange: () => void }) {
  return (
    <div className="mx-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-amber-700">Suggested change: {labelForSection(change.section)}</p>
          <p className="mt-1 text-xs font-semibold text-slate-600">{change.reason}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={acceptChange} className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white">
            <Check className="h-3.5 w-3.5" />
            Accept
          </button>
          <button onClick={rejectChange} className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700">
            <X className="h-3.5 w-3.5" />
            Reject
          </button>
        </div>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-white p-3">
          <p className="text-[10px] font-black uppercase tracking-wider text-red-500">Before</p>
          <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-700">{change.before}</p>
        </div>
        <div className="rounded-xl bg-white p-3 ring-2 ring-amber-300">
          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">After</p>
          <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-700">{change.after}</p>
        </div>
      </div>
    </div>
  );
}

function ResumePreview({ draft, changedSection, proposedChange }: { draft: ResumeDraft; changedSection: keyof ResumeDraft | null; proposedChange: ProposedChange | null }) {
  const previewDraft = proposedChange ? applyChange(draft, proposedChange) : draft;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900">Live Resume Preview</h2>
          <p className="text-xs font-semibold text-slate-500">Yellow blocks show suggested or accepted edits.</p>
        </div>
        <FileText className="h-5 w-5 text-slate-500" />
      </div>

      <div className="min-h-[650px] rounded-xl bg-white px-8 py-8 shadow-sm">
        <header className="border-b border-slate-200 pb-4 text-center">
          <h3 className="text-2xl font-black tracking-tight text-slate-950">{previewDraft.name}</h3>
          <p className="mt-1 text-sm font-bold text-blue-700">{previewDraft.headline}</p>
        </header>
        <PreviewSection title="Summary" section="summary" current={changedSection} proposed={proposedChange?.section}>
          <p>{previewDraft.summary}</p>
        </PreviewSection>
        <PreviewSection title="Experience" section="experience" current={changedSection} proposed={proposedChange?.section}>
          <BulletList items={previewDraft.experience} />
        </PreviewSection>
        <PreviewSection title="Projects" section="projects" current={changedSection} proposed={proposedChange?.section}>
          <BulletList items={previewDraft.projects} />
        </PreviewSection>
        <PreviewSection title="Skills" section="skills" current={changedSection} proposed={proposedChange?.section}>
          <p>{previewDraft.skills.join(" | ")}</p>
        </PreviewSection>
        <PreviewSection title="Education" section="education" current={changedSection} proposed={proposedChange?.section}>
          <p>{previewDraft.education}</p>
        </PreviewSection>
      </div>
    </aside>
  );
}

function PreviewSection({ title, section, current, proposed, children }: { title: string; section: keyof ResumeDraft; current: keyof ResumeDraft | null; proposed?: keyof ResumeDraft; children: React.ReactNode }) {
  const highlighted = current === section || proposed === section;
  return (
    <section className={`mt-5 rounded-lg p-2 text-xs font-semibold leading-relaxed text-slate-700 ${highlighted ? "bg-amber-100 ring-2 ring-amber-300" : ""}`}>
      <h4 className="mb-2 border-b border-slate-200 pb-1 text-[11px] font-black uppercase tracking-wider text-slate-900">{title}</h4>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item} className="pl-2">
          - {item}
        </li>
      ))}
    </ul>
  );
}

function AchievementCoach({ draft }: { draft: ResumeDraft }) {
  const weakBullet = [...draft.experience, ...draft.projects].find((item) => !/\d|%|users|revenue|latency|calls|requests/i.test(item));
  return (
    <div>
      <div className="flex items-center gap-2 text-slate-900">
        <Target className="h-4 w-4 text-blue-600" />
        <h3 className="text-xs font-black uppercase tracking-wider">Achievement Quantifier</h3>
      </div>
      <p className="mt-3 text-xs font-semibold leading-relaxed text-slate-600">
        Weak bullet found: {weakBullet ?? "No obvious vague bullet found."}
      </p>
      <p className="mt-3 rounded-lg bg-white p-3 text-xs font-semibold leading-relaxed text-slate-700">
        Ask: "Quantify my weakest bullet" and the chat will turn vague impact into a measurable statement.
      </p>
    </div>
  );
}

function PersonaTool({ applyPersona }: { applyPersona: (persona: string) => void }) {
  return (
    <div>
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Resume Persona Switcher</h3>
      <p className="mt-2 text-xs font-semibold text-slate-600">Generate tailored versions without changing facts.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {personas.map((persona) => (
          <button key={persona} onClick={() => applyPersona(persona)} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
            {persona}
          </button>
        ))}
      </div>
    </div>
  );
}

function RejectionTool({ analysis }: { analysis: Analysis | null }) {
  return (
    <div>
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Why You Got Rejected</h3>
      <div className="mt-3 space-y-2 text-xs font-semibold leading-relaxed text-slate-700">
        <p className="rounded-lg bg-white p-3">ATS round: {analysis?.missingKeywords.length ? `Missing ${analysis.missingKeywords.slice(0, 4).join(", ")}.` : "Paste a JD before upload for keyword simulation."}</p>
        <p className="rounded-lg bg-white p-3">Recruiter scan: {analysis?.weaknesses[0] ?? "Impact and role framing will be reviewed after upload."}</p>
      </div>
    </div>
  );
}

function OutreachTool({ draft }: { draft: ResumeDraft }) {
  return (
    <div>
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Cold DM Generator</h3>
      <p className="mt-3 rounded-lg bg-white p-3 text-xs font-semibold leading-relaxed text-slate-700">
        Hi, I am {draft.name}. I have worked on {draft.projects[0]?.slice(0, 70) ?? "developer projects"}. I would love to learn if your team is hiring for roles where I can contribute.
      </p>
      <p className="mt-2 rounded-lg bg-white p-3 text-xs font-semibold leading-relaxed text-slate-700">
        Subject: Developer profile for your engineering team
      </p>
    </div>
  );
}

function RoadmapTool({ targetRole, setTargetRole, draft }: { targetRole: string; setTargetRole: (value: string) => void; draft: ResumeDraft }) {
  return (
    <div>
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Resume Time Travel</h3>
      <input value={targetRole} onChange={(event) => setTargetRole(event.target.value)} placeholder="Target: Google SWE in 12 months" className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold outline-none" />
      <div className="mt-3 space-y-2 text-xs font-semibold text-slate-700">
        <p className="rounded-lg bg-white p-3">Month 1-3: Add one system design project beyond {draft.projects[0]?.slice(0, 40) ?? "current projects"}.</p>
        <p className="rounded-lg bg-white p-3">Month 4-6: Add open-source proof and stronger metrics.</p>
        <p className="rounded-lg bg-white p-3">Month 7-12: Complete target-role DSA and mock interview track.</p>
      </div>
    </div>
  );
}

function buildDraft(analysis: Analysis): ResumeDraft {
  const parsed = analysis.parsedResume;
  const raw = parsed?.raw_text ?? "";
  const firstLine = raw.split(/\r?\n/).map((line) => line.trim()).find(Boolean);

  return {
    name: firstLine && firstLine.length < 50 ? firstLine : "Your Name",
    headline: inferHeadline(parsed?.skills ?? []),
    summary: parsed?.summary?.trim() || analysis.strengths[0] || "Developer with hands-on project experience and a growing technical portfolio.",
    experience: splitLines(parsed?.experience).length ? splitLines(parsed?.experience) : analysis.strengths.slice(0, 3),
    projects: splitLines(parsed?.projects).length ? splitLines(parsed?.projects) : ["Built practical projects using core engineering skills."],
    skills: parsed?.skills?.length ? parsed.skills.slice(0, 18) : ["JavaScript", "React", "Node.js"],
    education: parsed?.education?.trim() || "Education details not detected.",
  };
}

function inferHeadline(skills: string[]) {
  const text = skills.join(" ").toLowerCase();
  if (text.includes("react") || text.includes("next")) return "Frontend Developer";
  if (text.includes("node") || text.includes("python") || text.includes("java")) return "Backend Developer";
  return "Software Developer";
}

function splitLines(value?: string) {
  return (value ?? "")
    .split(/\r?\n|(?<=\.)\s+/)
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 6);
}

function createChangeFromPrompt(prompt: string, draft: ResumeDraft, jdText: string): ProposedChange | null {
  const lower = prompt.toLowerCase();

  const replaceMatch = prompt.match(/change\s+(.+?)\s+to\s+(.+?)(?:\s+everywhere|$)/i);
  if (replaceMatch) {
    const from = replaceMatch[1].trim();
    const to = replaceMatch[2].trim();
    return {
      id: crypto.randomUUID(),
      section: "summary",
      before: draft.summary,
      after: replaceEverywhereText(draft.summary, from, to),
      reason: `Context-aware replacement prepared for "${from}" to "${to}".`,
    };
  }

  if (lower.includes("startup") || lower.includes("aggressive") || lower.includes("cto")) {
    return {
      id: crypto.randomUUID(),
      section: "summary",
      before: draft.summary,
      after: `Impact-focused ${draft.headline.toLowerCase()} with hands-on ownership across product, engineering, and delivery. Builds fast, learns faster, and turns ambiguous problems into shipped outcomes with measurable business value.`,
      reason: "Reframes the summary for founder/CTO-style scanning: ownership, speed, and outcomes.",
    };
  }

  if (lower.includes("quantify") || lower.includes("weakest bullet") || lower.includes("achievement")) {
    const before = draft.experience[0] ?? draft.projects[0] ?? draft.summary;
    return {
      id: crypto.randomUUID(),
      section: draft.experience.length ? "experience" : "projects",
      before,
      after: `${before.replace(/\.$/, "")}, improving delivery quality by roughly 30% and creating clearer impact for end users.`,
      reason: "Adds measurable impact so the bullet is easier for recruiters and ATS systems to rank.",
    };
  }

  if (lower.includes("match this jd") || lower.includes("jd") || lower.includes("keyword")) {
    const keywords = extractKeywords(jdText).slice(0, 5);
    const before = draft.experience[0] ?? draft.summary;
    return {
      id: crypto.randomUUID(),
      section: "experience",
      before,
      after: `${before.replace(/\.$/, "")}. Applied ${keywords.length ? keywords.join(", ") : "role-relevant engineering practices"} to deliver maintainable, production-ready features.`,
      reason: "Weaves JD keywords naturally into an existing experience block.",
    };
  }

  if (lower.includes("remove") && lower.includes("college")) {
    const before = draft.projects.join("\n");
    const filtered = draft.projects.filter((project) => !/college|student|academic|semester|minor|major/i.test(project));
    return {
      id: crypto.randomUUID(),
      section: "projects",
      before,
      after: (filtered.length ? filtered : draft.projects.slice(0, 1)).join("\n"),
      reason: "Removes lower-signal college project mentions while preserving stronger project proof.",
    };
  }

  if (lower.includes("rewrite") && lower.includes("experience")) {
    const before = draft.experience[0] ?? draft.summary;
    return {
      id: crypto.randomUUID(),
      section: "experience",
      before,
      after: `${before.replace(/\.$/, "")}, owning implementation from requirement breakdown to release and improving clarity for cross-functional stakeholders.`,
      reason: "Rewrites experience with ownership and delivery language.",
    };
  }

  return null;
}

function createPersonaChange(persona: string, draft: ResumeDraft): ProposedChange {
  const map: Record<string, string> = {
    FAANG: `Structured ${draft.headline.toLowerCase()} with strong fundamentals, scalable systems thinking, and a track record of clean execution across projects and production-style workflows.`,
    Startup: `Builder-minded ${draft.headline.toLowerCase()} who moves quickly from ambiguity to shipped features, owns outcomes, and communicates tradeoffs clearly in fast-changing teams.`,
    Product: `Product-aware ${draft.headline.toLowerCase()} who connects user problems with technical execution, prioritizing measurable outcomes, usability, and cross-functional clarity.`,
    "Senior Eng": `Engineering-focused problem solver with ownership across design, implementation, debugging, and delivery, ready to mentor peers and raise technical quality.`,
    Freelance: `Client-focused developer who translates business needs into reliable web solutions, communicates clearly, and delivers practical outcomes with strong execution discipline.`,
  };

  return {
    id: crypto.randomUUID(),
    section: "summary",
    before: draft.summary,
    after: map[persona] ?? draft.summary,
    reason: `Creates a ${persona} persona while preserving the same facts.`,
  };
}

function applyChange(draft: ResumeDraft, change: ProposedChange): ResumeDraft {
  if (change.section === "experience" || change.section === "projects") {
    return {
      ...draft,
      [change.section]: change.after.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
    };
  }

  if (change.section === "skills") {
    return {
      ...draft,
      skills: change.after.split(/,|\|/).map((item) => item.trim()).filter(Boolean),
    };
  }

  return {
    ...draft,
    [change.section]: change.after,
  };
}

function replaceEverywhereText(text: string, from: string, to: string) {
  return text.replace(new RegExp(escapeRegExp(from), "gi"), to);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractKeywords(text: string) {
  const stop = new Set(["the", "and", "for", "with", "from", "that", "this", "your", "will", "are", "you", "our"]);
  return Array.from(new Set(text.toLowerCase().match(/\b[a-z][a-z0-9.+#-]{2,}\b/g) ?? [])).filter((word) => !stop.has(word));
}

function smartFallbackAnswer(prompt: string, draft: ResumeDraft, analysis: Analysis) {
  if (prompt.toLowerCase().includes("summary")) return `Your summary should lead with role, proof, and outcome. Current headline: ${draft.headline}. Try adding one measurable project or business result.`;
  if (prompt.toLowerCase().includes("ats")) return `ATS score is ${analysis.atsScore}/100. Fix the highest-impact missing keywords first: ${analysis.missingKeywords.slice(0, 5).join(", ") || "no major gaps found"}.`;
  return "I can rewrite sections, quantify bullets, switch personas, simulate rejection reasons, or generate outreach.";
}

function labelForSection(section: keyof ResumeDraft) {
  return section === "headline" ? "headline" : section;
}

function downloadDraft(draft: ResumeDraft, analysis: Analysis | null) {
  const blob = new Blob([JSON.stringify({ draft, analysis }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "skillwyn-resume-draft.json";
  link.click();
  URL.revokeObjectURL(url);
}
