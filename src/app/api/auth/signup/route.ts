import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db/connect';
import User from '@/lib/models/User';
import { generateSessionToken, hashToken, sessionExpiryDate, setSessionCookie } from '@/lib/auth/session';

const hashPassword = (password: string): string => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
};

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
        }

        if (typeof password !== 'string' || password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const user = await User.create({
            name: String(name).trim(),
            email: normalizedEmail,
            password: hashPassword(password),
            role: 'user',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(normalizedEmail)}`,
        });

        const sessionToken = generateSessionToken();
        const expiresAt = sessionExpiryDate();
        user.sessionTokenHash = hashToken(sessionToken);
        user.sessionExpiresAt = expiresAt;
        await user.save();

        const response = NextResponse.json(
            {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
            { status: 201 }
        );

        setSessionCookie(response, sessionToken, expiresAt);
        return response;
    } catch (error) {
        console.error('Signup Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
