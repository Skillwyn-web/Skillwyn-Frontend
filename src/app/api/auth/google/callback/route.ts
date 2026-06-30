import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
import connectDB from "@/lib/db/connect";
import User from "@/lib/models/User";
import { generateSessionToken, hashToken, sessionExpiryDate, setSessionCookie } from "@/lib/auth/session";
import { GOOGLE_NEXT_COOKIE, GOOGLE_STATE_COOKIE, googleRedirectUri } from "@/lib/auth/googleOAuth";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  sub: string;
  email: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get(GOOGLE_STATE_COOKIE)?.value;
  const nextPath = request.cookies.get(GOOGLE_NEXT_COOKIE)?.value || "/";

  if (!code || !state || !storedState || state !== storedState) {
    return redirectWithError(request, "google_state_failed");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return redirectWithError(request, "google_env_missing");
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: googleRedirectUri(request),
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json() as GoogleTokenResponse;
    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Google token exchange failed:", tokenData);
      return redirectWithError(request, "google_token_failed");
    }

    const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleProfile = await profileResponse.json() as GoogleUserInfo;
    if (!profileResponse.ok || !googleProfile.email || !googleProfile.sub) {
      console.error("Google profile fetch failed:", googleProfile);
      return redirectWithError(request, "google_profile_failed");
    }

    await connectDB();

    const email = googleProfile.email.trim().toLowerCase();
    let user = await User.findOne({ email }).select("+sessionTokenHash +sessionExpiresAt");

    if (!user) {
      user = await User.create({
        name: googleProfile.name || email.split("@")[0],
        email,
        password: oauthPassword(),
        googleId: googleProfile.sub,
        authProvider: "google",
        role: "user",
        avatar: googleProfile.picture,
      });
    } else {
      user.googleId = googleProfile.sub;
      user.authProvider = user.authProvider || "google";
      user.avatar = googleProfile.picture || user.avatar;
      user.name = user.name || googleProfile.name || email.split("@")[0];
    }

    const sessionToken = generateSessionToken();
    const expiresAt = sessionExpiryDate();
    user.sessionTokenHash = hashToken(sessionToken);
    user.sessionExpiresAt = expiresAt;
    await user.save();

    const clientUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    const response = NextResponse.redirect(new URL(safeNext(nextPath), request.nextUrl.origin));
    setSessionCookie(response, sessionToken, expiresAt);
    response.cookies.set({
      name: "skillwyn_client_user",
      value: encodeURIComponent(JSON.stringify(clientUser)),
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.delete(GOOGLE_STATE_COOKIE);
    response.cookies.delete(GOOGLE_NEXT_COOKIE);
    return response;
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return redirectWithError(request, "google_callback_failed");
  }
}

function oauthPassword() {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(crypto.randomBytes(32).toString("hex"), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function safeNext(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function redirectWithError(request: NextRequest, error: string) {
  const url = new URL("/login", request.nextUrl.origin);
  url.searchParams.set("error", error);
  const response = NextResponse.redirect(url);
  response.cookies.delete(GOOGLE_STATE_COOKIE);
  response.cookies.delete(GOOGLE_NEXT_COOKIE);
  return response;
}
