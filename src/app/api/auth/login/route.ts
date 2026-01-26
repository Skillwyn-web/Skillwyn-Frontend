import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import User from '@/lib/models/User';

export async function POST(request: Request) {
    try {
        await connectDB();
        const { email, password } = await request.json();

        // 1. Check if user exists
        let user = await User.findOne({ email });

        // For demo purposes, we will AUTO-CREATE the user if they don't exist
        // This is not standard for 'login', but useful if we don't have a signup page ready
        // and allows the user to easily create an account and then edit the role in DB.
        if (!user) {
            console.log('Creating new user in database:', email);
            user = await User.create({
                name: email.split('@')[0],
                email,
                password, // Note: In production you MUST hash passwords
                role: 'user', // Default role
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
            });
        } else {
            console.log('User found in database:', email);
            // Very simple password check (plaintext for this demo as per context)
            if (user.password !== password) {
                return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
            }
        }

        // Return user info including role
        return NextResponse.json({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        });

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
