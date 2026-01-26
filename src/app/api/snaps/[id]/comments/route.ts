import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Comment from '@/lib/models/Comment';
import Snap from '@/lib/models/Snap';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const comments = await Comment.find({ snapId: id }).sort({ createdAt: -1 });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        const { text, authorName } = body;

        const comment = await Comment.create({
            snapId: id,
            text,
            author: authorName || 'You',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName || 'You'}`
        });

        // Update snap comment count
        await Snap.findByIdAndUpdate(id, { $inc: { comments: 1 } });

        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
    }
}
