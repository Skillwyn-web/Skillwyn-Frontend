import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db/connect';
import User from '@/lib/models/User';
import { generateSessionToken, hashToken, sessionExpiryDate, setSessionCookie } from '@/lib/auth/session';

const verifyPassword = (storedPassword: string, candidatePassword: string): boolean => {
    // Backward-compatible: support legacy plaintext users while migrating.
    if (!storedPassword.includes(':')) {
        return storedPassword === candidatePassword;
    }

    const [salt, hash] = storedPassword.split(':');
    const candidateHash = crypto.scryptSync(candidatePassword, salt, 64).toString('hex');
    const hashBuffer = Buffer.from(hash, 'hex');
    const candidateBuffer = Buffer.from(candidateHash, 'hex');

    if (hashBuffer.length !== candidateBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(hashBuffer, candidateBuffer);
};

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return NextResponse.json({ error: 'Account not found. Please sign up first.' }, { status: 404 });
        }

        if (!verifyPassword(user.password, String(password))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
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
            avatar: user.avatar
        });

        setSessionCookie(response, sessionToken, expiresAt);
        return response;

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
