import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/models/User';
import { clearSessionCookie, SESSION_COOKIE_NAME, hashToken } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
        if (sessionCookie) {
            await User.updateOne(
                { sessionTokenHash: hashToken(sessionCookie) },
                { $set: { sessionTokenHash: null, sessionExpiresAt: null } }
            );
        }

        const response = NextResponse.json({ success: true });
        clearSessionCookie(response);
        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
