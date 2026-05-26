import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db/connect";
import User from "@/lib/models/User";
import { generateSessionToken, hashToken, sessionExpiryDate, setSessionCookie } from "@/lib/auth/session";

const demoPassword = () => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(crypto.randomBytes(24).toString("hex"), salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { provider } = await request.json();
    const normalizedProvider = provider === "github" ? "github" : "google";
    const email = `demo.${normalizedProvider}@skillwyn.local`;
    const name = normalizedProvider === "github" ? "GitHub Learner" : "Google Learner";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: demoPassword(),
        role: "user",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      });
    }

    const sessionToken = generateSessionToken();
    const expiresAt = sessionExpiryDate();
    user.sessionTokenHash = hashToken(sessionToken);
    user.sessionExpiresAt = expiresAt;
    await user.save();

    const response = NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });

    setSessionCookie(response, sessionToken, expiresAt);
    return response;
  } catch (error) {
    console.error("Social demo login error:", error);
    return NextResponse.json({ error: "Social login failed" }, { status: 500 });
  }
}
