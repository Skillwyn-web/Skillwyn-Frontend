import { NextRequest } from "next/server";

export const GOOGLE_STATE_COOKIE = "skillwyn_google_oauth_state";
export const GOOGLE_NEXT_COOKIE = "skillwyn_google_oauth_next";

export function googleRedirectUri(request: NextRequest) {
  return process.env.GOOGLE_REDIRECT_URI || `${request.nextUrl.origin}/api/auth/google/callback`;
}
