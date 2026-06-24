import { NextResponse } from "next/server";

const MVP_API_URL = process.env.RESUME_MVP_API_URL ?? "http://127.0.0.1:8000";

export async function POST(request: Request) {
  const body = (await request.json()) as { resumeId?: string; message?: string };

  if (!body.resumeId || !body.message?.trim()) {
    return NextResponse.json({ error: "resumeId and message are required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${MVP_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume_id: body.resumeId,
        message: body.message,
      }),
    });

    if (!response.ok) {
      const error = await readError(response);
      return NextResponse.json({ error }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { error: "Resume MVP chat service is not reachable. Make sure port 8000 is running." },
      { status: 503 },
    );
  }
}

async function readError(response: Response) {
  try {
    const body = (await response.json()) as { detail?: string; error?: string };
    return body.detail ?? body.error ?? "Resume MVP chat failed";
  } catch {
    return "Resume MVP chat failed";
  }
}
