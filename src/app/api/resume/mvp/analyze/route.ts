import { NextResponse } from "next/server";

type MvpResume = {
  summary?: string;
  experience?: string;
  projects?: string;
  skills?: string[];
  education?: string;
  raw_text?: string;
};

type MvpAtsReport = {
  score?: number;
  issues?: string[];
  warnings?: string[];
  passed?: string[];
};

type MvpScore = {
  overall_score?: number;
  breakdown?: Record<string, number>;
  grade?: string;
  suggestions?: string[];
};

type MvpMatch = {
  match_score?: number;
  matched_keywords?: string[];
  missing_keywords?: string[];
  total_jd_keywords?: number;
};

const MVP_API_URL = process.env.RESUME_MVP_API_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const jdText = formData.get("jdText");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
  }

  const uploadBody = new FormData();
  uploadBody.append("file", file, file.name);

  try {
    const uploadResponse = await fetch(`${MVP_API_URL}/upload`, {
      method: "POST",
      body: uploadBody,
    });

    if (!uploadResponse.ok) {
      return NextResponse.json(
        { error: await readError(uploadResponse, "Resume MVP upload failed") },
        { status: uploadResponse.status },
      );
    }

    const upload = (await uploadResponse.json()) as {
      resume_id: string;
      filename: string;
      resume: MvpResume;
    };

    const resumeIdBody = JSON.stringify({ resume_id: upload.resume_id });
    const [atsResponse, scoreResponse] = await Promise.all([
      fetch(`${MVP_API_URL}/ats_analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: resumeIdBody,
      }),
      fetch(`${MVP_API_URL}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: resumeIdBody,
      }),
    ]);

    if (!atsResponse.ok || !scoreResponse.ok) {
      return NextResponse.json(
        { error: "Resume MVP analysis failed after upload" },
        { status: atsResponse.ok ? scoreResponse.status : atsResponse.status },
      );
    }

    const atsReport = (await atsResponse.json()) as MvpAtsReport;
    const score = (await scoreResponse.json()) as MvpScore;
    let jdMatch: MvpMatch | undefined;

    if (typeof jdText === "string" && jdText.trim()) {
      const matchResponse = await fetch(`${MVP_API_URL}/match_jd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_id: upload.resume_id, jd_text: jdText }),
      });

      if (matchResponse.ok) {
        jdMatch = (await matchResponse.json()) as MvpMatch;
      }
    }

    return NextResponse.json(toUiAnalysis(upload, atsReport, score, jdMatch));
  } catch {
    return NextResponse.json(
      {
        error:
          "Resume MVP service is not reachable. Start it with: uvicorn resume_mvp.api.app:app --reload --port 8000",
      },
      { status: 503 },
    );
  }
}

function toUiAnalysis(
  upload: { resume_id: string; filename: string; resume: MvpResume },
  atsReport: MvpAtsReport,
  score: MvpScore,
  jdMatch?: MvpMatch,
) {
  const missingKeywords = jdMatch?.missing_keywords ?? inferMissingKeywords(upload.resume);
  const issues = cleanList(atsReport.issues);
  const warnings = cleanList(atsReport.warnings);
  const passed = cleanList(atsReport.passed);
  const suggestions = cleanList(score.suggestions);

  return {
    resumeId: upload.resume_id,
    filename: upload.filename,
    atsScore: Math.round(atsReport.score ?? score.overall_score ?? 0),
    overallScore: Math.round(score.overall_score ?? atsReport.score ?? 0),
    grade: score.grade ?? "N/A",
    strengths: passed.slice(0, 4).length ? passed.slice(0, 4) : ["Resume parsed successfully"],
    weaknesses: [...issues, ...warnings].slice(0, 5),
    suggestions: suggestions.length ? suggestions : ["Add measurable impact, stronger action verbs, and role keywords."],
    missingKeywords,
    actionVerbs: {
      weak: ["worked", "helped", "handled"],
      strong: ["achieved", "led", "implemented", "optimized", "launched", "reduced"],
    },
    evidence: [
      ...passed.slice(0, 4).map((issue) => ({ issue, impact: 5 })),
      ...issues.slice(0, 4).map((issue) => ({ issue, impact: -8 })),
      ...warnings.slice(0, 4).map((issue) => ({ issue, impact: -4 })),
    ],
    atsReport: {
      ...atsReport,
      issues,
      warnings,
      passed,
    },
    parsedResume: upload.resume,
    scoreBreakdown: score.breakdown ?? {},
    jdMatch,
    roadmap: buildRoadmap(suggestions, missingKeywords),
  };
}

function cleanList(items?: string[]) {
  return (items ?? [])
    .map((item) =>
      item
        .replaceAll("âœ“", "Pass:")
        .replaceAll("âœ—", "Fix:")
        .replaceAll("âš ", "Warning:")
        .replaceAll("â€¢", "-")
        .trim(),
    )
    .filter(Boolean);
}

function inferMissingKeywords(resume: MvpResume) {
  const text = `${resume.raw_text ?? ""}`.toLowerCase();
  return ["achieved", "led", "implemented", "optimized", "reduced", "launched"].filter(
    (keyword) => !text.includes(keyword),
  );
}

function buildRoadmap(suggestions: string[], missingKeywords: string[]) {
  const firstKeyword = missingKeywords[0] ? `Add truthful evidence for ${missingKeywords.slice(0, 3).join(", ")}.` : "";
  return [
    suggestions[0] ?? "Add missing resume sections and recruiter-ready proof.",
    firstKeyword || "Rewrite 3 bullets with quantified outcomes.",
    "Check ATS warnings and simplify formatting.",
    "Match the final version against a target job description.",
  ];
}

async function readError(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as { detail?: string; error?: string };
    return body.detail ?? body.error ?? fallback;
  } catch {
    return fallback;
  }
}
