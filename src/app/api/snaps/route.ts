import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Snap from '@/lib/models/Snap';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        await connectDB();
        const snaps = await Snap.find().sort({ createdAt: 1 });
        // Convert _id to id
        const formattedSnaps = snaps.map((snap: any) => ({
            id: snap._id.toString(),
            videoUrl: snap.videoUrl,
            caption: snap.caption,
            author: snap.author,
            likes: snap.likes,
            comments: snap.comments,
            shares: snap.shares
        }));
        return NextResponse.json(formattedSnaps);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Failed to fetch snaps' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const caption = formData.get('caption') as string;
        const authorName = formData.get('authorName') as string || 'You';

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Save file locally (not recommended for Vercel, but works for local/VPS)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure unique filename
        // Sanitize filename to remove any non-alphanumeric chars except dots and dashes
        const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${Date.now()}-${sanitizedFilename}`;
        const uploadDir = join(process.cwd(), 'public/uploads');

        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore error if it exists, or let it throw if permission issue
        }

        const filepath = join(uploadDir, filename);

        try {
            await writeFile(filepath, buffer);
        } catch (err) {
            console.error("File write error:", err);
            return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
        }

        const videoUrl = `/uploads/${filename}`;

        const newSnap = await Snap.create({
            videoUrl,
            caption,
            author: {
                name: authorName,
                username: `@${authorName.toLowerCase().replace(/\s/g, '')}`,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`
            }
        });

        return NextResponse.json({
            id: newSnap._id.toString(),
            videoUrl: newSnap.videoUrl,
            caption: newSnap.caption,
            author: newSnap.author,
            likes: newSnap.likes,
            comments: newSnap.comments,
            shares: newSnap.shares
        });

    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Failed to upload snap' }, { status: 500 });
    }
}
