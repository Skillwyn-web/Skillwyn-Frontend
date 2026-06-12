"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Download, Lightbulb, UploadCloud } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type Analysis = {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingKeywords: string[];
  actionVerbs: { weak: string[]; strong: string[] };
};

const fallbackAnalysis: Analysis = {
  atsScore: 72,
  strengths: ["Clear technical skills section", "Good project-first structure", "Relevant frontend keywords present"],
  weaknesses: ["Impact metrics are missing", "Some bullet points start with weak verbs", "ATS keywords can be expanded"],
  suggestions: ["Rewrite bullets with outcome + metric", "Add role-specific keywords near projects", "Keep resume to one page for internships"],
  missingKeywords: ["Next.js", "REST APIs", "Testing", "Performance", "GitHub"],
  actionVerbs: { weak: ["Worked", "Made", "Helped"], strong: ["Built", "Optimized", "Delivered", "Automated"] },
};

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("");
  const [error, setError] = useState("");
  const used = typeof window !== "undefined" && window.sessionStorage.getItem("skillwyn_resume_used") === "true";

  const scoreColor = useMemo(() => {
    const score = analysis?.atsScore ?? 0;
    if (score > 75) return "#10b981";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  }, [analysis]);

  const handleDrop = (files: FileList | null) => {
    const next = files?.[0];
    if (!next) return;
    if (next.type !== "application/pdf") {
      setError("Please upload a PDF resume.");
      return;
    }
    setError("");
    setFile(next);
  };

  const analyze = async () => {
    if (!file || loading) return;
    if (window.sessionStorage.getItem("skillwyn_resume_used") === "true") {
      setError("MVP limit reached: one analysis per session.");
      return;
    }
    setLoading(true);
    setError("");
    setStage("Reading your resume...");
    try {
      const text = await extractPdfText(file);
      setStage("Running AI analysis...");
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error("Analysis API unavailable");
      const data = (await response.json()) as Analysis;
      setAnalysis(data);
      window.sessionStorage.setItem("skillwyn_resume_used", "true");
    } catch (err) {
      setError("Using demo analysis because live PDF/AI analysis is unavailable in this environment.");
      setAnalysis(fallbackAnalysis);
    } finally {
      setLoading(false);
      setStage("");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563eb]">AI Resume Analyzer</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Make your resume hiring-ready.</h1>
          <p className="mt-3 max-w-2xl text-[#5b6fb3]">Upload a PDF resume and get ATS score, missing keywords, and action-focused fixes for tech roles in India.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleDrop(event.dataTransfer.files);
              }}
              className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-[#2563eb] hover:bg-[#eff6ff]"
            >
              <UploadCloud className="h-10 w-10 text-[#2563eb]" />
              <p className="mt-4 font-bold">Drag & drop PDF resume</p>
              <p className="mt-2 text-sm text-[#5b6fb3]">or click to browse</p>
              <input type="file" accept="application/pdf" className="hidden" onChange={(event) => handleDrop(event.target.files)} />
            </label>
            {file ? (
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
                <p className="font-bold">{file.name}</p>
                <p className="text-[#5b6fb3]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : null}
            {error ? <p className="mt-3 text-sm font-semibold text-amber-600">{error}</p> : null}
            <button
              disabled={!file || loading || used}
              onClick={analyze}
              className="mt-5 w-full rounded-xl bg-[#2563eb] px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? stage : used ? "Session Limit Reached" : "Analyze Resume"}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {loading ? <Skeleton stage={stage} /> : analysis ? <Results analysis={analysis} color={scoreColor} /> : <EmptyState />}
          </div>
        </div>
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center text-center">
      <Lightbulb className="h-10 w-10 text-[#2563eb]" />
      <h2 className="mt-4 text-2xl font-bold">Your analysis appears here</h2>
      <p className="mt-2 max-w-md text-[#5b6fb3]">ATS score, strengths, issues, suggestions, missing keywords, and action verbs.</p>
    </div>
  );
}

function Skeleton({ stage }: { stage: string }) {
  return (
    <div className="space-y-4">
      <p className="font-bold text-[#2563eb]">{stage}</p>
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="h-20 animate-pulse rounded-xl bg-slate-100" />
      ))}
    </div>
  );
}

function Results({ analysis, color }: { analysis: Analysis; color: string }) {
  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 md:flex-row md:items-center">
        <ScoreRing score={analysis.atsScore} color={color} />
        <div>
          <h2 className="text-2xl font-bold">ATS Score</h2>
          <p className="mt-2 text-[#5b6fb3]">Green &gt; 75, amber 50-75, red &lt; 50.</p>
          <button onClick={() => downloadReport(analysis)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-bold text-white">
            <Download className="h-4 w-4" /> Download Analysis Report
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card title="Strengths" icon={<CheckCircle2 className="h-5 w-5" />} color="emerald" items={analysis.strengths} />
        <Card title="Issues found" icon={<AlertCircle className="h-5 w-5" />} color="red" items={analysis.weaknesses} />
        <Card title="AI Suggestions" icon={<Lightbulb className="h-5 w-5" />} color="purple" items={analysis.suggestions} />
      </div>
      <div className="mt-6">
        <h3 className="font-bold">Missing keywords</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {analysis.missingKeywords.map((keyword) => (
            <span key={keyword} className="rounded-full bg-[#eff6ff] px-3 py-1 text-sm font-semibold text-[#2563eb]">{keyword}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const circumference = 2 * Math.PI * 44;
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="44" stroke="#e2e8f0" strokeWidth="9" fill="none" />
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (score / 100) * circumference}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-3xl font-bold">{score}</div>
    </div>
  );
}

function Card({ title, icon, color, items }: { title: string; icon: React.ReactNode; color: "emerald" | "red" | "purple"; items: string[] }) {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
  }[color];
  return (
    <div className={`rounded-2xl p-4 ${styles}`}>
      <div className="flex items-center gap-2 font-bold">{icon}{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

async function extractPdfText(file: File) {
  try {
    const importer = new Function("url", "return import(url)") as (url: string) => Promise<any>;
    const pdfjs = await importer("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/+esm");
    pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: buffer }).promise;
    let text = "";
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      text += content.items.map((item: { str?: string }) => item.str ?? "").join(" ");
    }
    return text;
  } catch {
    return `Resume file: ${file.name}. PDF text extraction unavailable.`;
  }
}

async function downloadReport(analysis: Analysis) {
  try {
    const importer = new Function("url", "return import(url)") as (url: string) => Promise<any>;
    const { jsPDF } = await importer("https://cdn.jsdelivr.net/npm/jspdf@2.5.2/+esm");
    const doc = new jsPDF();
    doc.text("SkillWyn Resume Analysis", 14, 18);
    doc.text(`ATS Score: ${analysis.atsScore}`, 14, 30);
    doc.text(`Strengths: ${analysis.strengths.join(", ")}`, 14, 44, { maxWidth: 180 });
    doc.text(`Issues: ${analysis.weaknesses.join(", ")}`, 14, 66, { maxWidth: 180 });
    doc.text(`Suggestions: ${analysis.suggestions.join(", ")}`, 14, 88, { maxWidth: 180 });
    doc.save("skillwyn-resume-analysis.pdf");
  } catch {
    const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "skillwyn-resume-analysis.json";
    link.click();
    URL.revokeObjectURL(url);
  }
}
