type EvidenceItem = {
  issue: string;
  impact: number;
};

type Probability = {
  value: number;
  confidenceInterval: [number, number];
};

export type ResumeAnalysisResult = {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  missingKeywords: string[];
  actionVerbs: { weak: string[]; strong: string[] };
  evidence: EvidenceItem[];
  interviewProbability: {
    startup: Probability;
    serviceCompany: Probability;
    productCompany: Probability;
  };
  topCandidateComparison: {
    you: { projects: number; skills: number };
    topCandidates: { projects: number; skills: number };
  };
  roadmap: string[];
  recruiterEyeTracking: {
    seen: string[];
    ignored: string[];
  };
};

const ROLE_SKILLS = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node.js",
  "express",
  "mongodb",
  "postgresql",
  "sql",
  "docker",
  "aws",
  "git",
  "api",
  "testing",
  "ci/cd",
];

const STRONG_VERBS = ["built", "created", "improved", "optimized", "reduced", "increased", "launched", "designed", "delivered", "automated"];
const WEAK_VERBS = ["worked", "helped", "handled", "responsible", "made", "did", "learned"];
const SECTION_KEYWORDS = ["experience", "projects", "skills", "education"];
const TOP_CANDIDATE = { projects: 5, skills: 15 };

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const countMatches = (text: string, terms: string[]) =>
  terms.filter((term) => new RegExp(`(^|[^a-z0-9+#.])${escapeRegex(term)}([^a-z0-9+#.]|$)`, "i").test(text));

export function analyzeResumeText(text: string): ResumeAnalysisResult {
  const normalized = text.replace(/\s+/g, " ").trim();
  const lower = normalized.toLowerCase();
  const words = normalized.split(/\s+/).filter(Boolean);
  const bullets = normalized.split(/(?:\n|•|\u2022| - )/).map((line) => line.trim()).filter((line) => line.length > 18);

  const matchedSkills = countMatches(lower, ROLE_SKILLS);
  const missingKeywords = ROLE_SKILLS.filter((skill) => !matchedSkills.includes(skill)).slice(0, 8);
  const presentSections = SECTION_KEYWORDS.filter((section) => lower.includes(section));
  const quantifiedBullets = bullets.filter((line) => /\d|%|\+|x\b|users?|clients?|revenue|latency|performance|rank/i.test(line));
  const strongVerbHits = countMatches(lower, STRONG_VERBS);
  const weakVerbHits = countMatches(lower, WEAK_VERBS);
  const projectMentions = Math.max((lower.match(/project|github|deployed|portfolio|clone/g) ?? []).length, lower.includes("projects") ? 2 : 0);
  const hasLinks = /github\.com|linkedin\.com|https?:\/\//i.test(normalized);
  const hasContact = /@|\+?\d[\d\s-]{8,}/.test(normalized);
  const lengthScore = words.length >= 260 && words.length <= 850 ? 14 : words.length > 150 ? 9 : 4;
  const keywordScore = (matchedSkills.length / ROLE_SKILLS.length) * 24;
  const sectionScore = (presentSections.length / SECTION_KEYWORDS.length) * 16;
  const impactScore = bullets.length ? (quantifiedBullets.length / bullets.length) * 18 : 0;
  const verbScore = Math.min(strongVerbHits.length * 2.4, 12) - Math.min(weakVerbHits.length * 1.4, 7);
  const projectScore = Math.min(projectMentions * 3.5, 14);
  const hygieneScore = (hasLinks ? 5 : 0) + (hasContact ? 4 : 0);
  const atsScore = clamp(18 + lengthScore + keywordScore + sectionScore + impactScore + verbScore + projectScore + hygieneScore);

  const evidence: EvidenceItem[] = [];
  if (matchedSkills.length >= 6) evidence.push({ issue: "Strong role skill coverage", impact: 10 });
  else evidence.push({ issue: "Low role keyword coverage", impact: -12 });
  if (quantifiedBullets.length >= 3) evidence.push({ issue: "Good quantified achievements", impact: 9 });
  else evidence.push({ issue: "No quantified achievements", impact: -12 });
  if (projectMentions >= 3) evidence.push({ issue: "Projects are visible to recruiters", impact: 8 });
  else evidence.push({ issue: "Project depth is not clear", impact: -10 });
  if (presentSections.length < SECTION_KEYWORDS.length) evidence.push({ issue: "Important resume sections are missing or unclear", impact: -8 });
  if (!hasLinks) evidence.push({ issue: "Portfolio, GitHub, or LinkedIn link is missing", impact: -6 });
  if (weakVerbHits.length > 1) evidence.push({ issue: "Some bullets use weak action verbs", impact: -5 });

  const strengths = evidence.filter((item) => item.impact > 0).map((item) => item.issue);
  const weaknesses = evidence.filter((item) => item.impact < 0).map((item) => item.issue);
  const suggestions = [
    quantifiedBullets.length < 3 ? "Add numbers to project and internship bullets: users, speed, revenue, rank, or accuracy." : "Keep quantified bullets near the top of each role or project.",
    missingKeywords.length ? `Add relevant missing skills where truthful: ${missingKeywords.slice(0, 4).join(", ")}.` : "Skill coverage is healthy. Add proof through deployed links and outcomes.",
    projectMentions < 3 ? "Add 2-3 strong projects with tech stack, problem solved, metrics, and GitHub/demo links." : "Make every project show impact, tech ownership, and deployment proof.",
  ];

  const quality = atsScore / 100;
  const skillDepth = matchedSkills.length / ROLE_SKILLS.length;
  const projectDepth = Math.min(projectMentions / TOP_CANDIDATE.projects, 1);
  const impactDepth = bullets.length ? quantifiedBullets.length / bullets.length : 0;
  const startupProbability = clamp(32 + projectDepth * 26 + skillDepth * 22 + impactDepth * 16 + (hasLinks ? 8 : 0));
  const serviceProbability = clamp(48 + quality * 24 + sectionScore * 0.7 + (hasContact ? 7 : 0));
  const productProbability = clamp(22 + skillDepth * 28 + projectDepth * 20 + impactDepth * 18 + strongVerbHits.length * 1.5);
  const confidenceWidth = words.length > 240 ? 8 : 14;

  return {
    atsScore,
    strengths: strengths.length ? strengths : ["Resume has enough text to analyze"],
    weaknesses: weaknesses.length ? weaknesses : ["No major deterministic red flags found"],
    suggestions,
    missingKeywords,
    actionVerbs: {
      weak: weakVerbHits,
      strong: STRONG_VERBS.filter((verb) => !strongVerbHits.includes(verb)).slice(0, 8),
    },
    evidence,
    interviewProbability: {
      startup: { value: startupProbability, confidenceInterval: [clamp(startupProbability - confidenceWidth), clamp(startupProbability + confidenceWidth)] },
      serviceCompany: { value: serviceProbability, confidenceInterval: [clamp(serviceProbability - confidenceWidth), clamp(serviceProbability + confidenceWidth)] },
      productCompany: { value: productProbability, confidenceInterval: [clamp(productProbability - confidenceWidth), clamp(productProbability + confidenceWidth)] },
    },
    topCandidateComparison: {
      you: { projects: Math.min(projectMentions, 12), skills: matchedSkills.length },
      topCandidates: TOP_CANDIDATE,
    },
    roadmap: missingKeywords.slice(0, 6).map((skill, index) => `Week ${index + 1}: Learn ${skill} and add one resume proof point.`),
    recruiterEyeTracking: {
      seen: [hasContact ? "Contact details" : "", matchedSkills.length ? `Skills: ${matchedSkills.slice(0, 5).join(", ")}` : "", quantifiedBullets[0] ?? ""].filter(Boolean),
      ignored: [
        weakVerbHits.length ? `Weak verbs: ${weakVerbHits.join(", ")}` : "",
        missingKeywords.length ? `Missing role keywords: ${missingKeywords.slice(0, 4).join(", ")}` : "",
      ].filter(Boolean),
    },
  };
}
