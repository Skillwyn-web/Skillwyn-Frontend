import { NextRequest, NextResponse } from "next/server";
import { getDsaProfilePayload } from "@/lib/dsa/profileData";

export async function GET(request: NextRequest) {
  const profileId = request.nextUrl.searchParams.get("profileId") ?? undefined;
  const payload = getDsaProfilePayload(profileId);

  return NextResponse.json(payload);
}
