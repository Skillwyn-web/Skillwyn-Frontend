import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import { GOOGLE_NEXT_COOKIE, GOOGLE_STATE_COOKIE, googleRedirectUri } from "@/lib/auth/googleOAuth";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_CLIENT_ID in .env" },
      { status: 500 },
    );
  }

  const state = crypto.randomBytes(24).toString("hex");
  const next = sanitizeNextPath(request.nextUrl.searchParams.get("next"));
  const redirectUri = googleRedirectUri(request);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "select_account",
  });

  const response = NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  response.cookies.set({
    name: GOOGLE_STATE_COOKIE,
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });
  response.cookies.set({
    name: GOOGLE_NEXT_COOKIE,
    value: next,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}

function sanitizeNextPath(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}
