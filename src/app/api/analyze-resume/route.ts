import { NextResponse } from "next/server";

const systemPrompt =
  'You are a resume reviewer for tech roles in India. Analyze the resume and respond ONLY in this JSON format: { atsScore: number (0-100), strengths: string[], weaknesses: string[], suggestions: string[], missingKeywords: string[], actionVerbs: { weak: string[], strong: string[] } }';

export async function POST(request: Request) {
  const { text } = (await request.json()) as { text?: string };

  if (!text) {
    return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(demoAnalysis());
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text.slice(0, 14000) },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(demoAnalysis());
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  try {
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json(demoAnalysis());
  }
}

function demoAnalysis() {
  return {
    atsScore: 72,
    strengths: ["Relevant technical projects", "Readable skills section", "Good internship orientation"],
    weaknesses: ["Impact metrics are limited", "Some bullets lack action verbs", "Missing role-specific keywords"],
    suggestions: ["Add measurable project outcomes", "Rewrite bullets using action + impact", "Add keywords from target job descriptions"],
    missingKeywords: ["Next.js", "REST APIs", "Testing", "Performance", "SQL"],
    actionVerbs: { weak: ["Worked", "Made", "Helped"], strong: ["Built", "Optimized", "Delivered"] },
  };
}
