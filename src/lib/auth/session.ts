import crypto from 'crypto';
import { NextResponse } from 'next/server';

export const SESSION_COOKIE_NAME = 'skillwyn_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export const generateSessionToken = (): string => crypto.randomBytes(48).toString('hex');

export const hashToken = (token: string): string => crypto.createHash('sha256').update(token).digest('hex');

export const sessionExpiryDate = (): Date => new Date(Date.now() + SESSION_TTL_MS);

export const setSessionCookie = (response: NextResponse, token: string, expiresAt: Date): void => {
    response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresAt,
    });
};

export const clearSessionCookie = (response: NextResponse): void => {
    response.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: '',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: new Date(0),
    });
};
