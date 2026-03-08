import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/models/User';
import { SESSION_COOKIE_NAME, hashToken } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
        if (!sessionCookie) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await User.findOne({
            sessionTokenHash: hashToken(sessionCookie),
            sessionExpiresAt: { $gt: new Date() },
        });

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        return NextResponse.json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        });
    } catch (error) {
        console.error('Get current user error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
