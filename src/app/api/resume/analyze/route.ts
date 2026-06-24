import { NextResponse } from "next/server";
import { analyzeResumeText } from "@/lib/resume/deterministicResumeAnalysis";

export async function POST(request: Request) {
  const { text } = (await request.json()) as { text?: string };

  if (!text?.trim()) {
    return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
  }

  return NextResponse.json(analyzeResumeText(text));
}
