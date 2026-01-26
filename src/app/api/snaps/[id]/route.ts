import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import Snap from '@/lib/models/Snap';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        const { action } = body;

        if (!id) {
            return NextResponse.json({ error: 'Snap ID required' }, { status: 400 });
        }

        const snap = await Snap.findById(id);
        if (!snap) {
            return NextResponse.json({ error: 'Snap not found' }, { status: 404 });
        }

        let updatedSnap;

        switch (action) {
            case 'like':
                updatedSnap = await Snap.findByIdAndUpdate(
                    id,
                    { $inc: { likes: 1 } },
                    { new: true }
                );
                break;

            case 'unlike':
                updatedSnap = await Snap.findByIdAndUpdate(
                    id,
                    { $inc: { likes: -1 } },
                    { new: true }
                );
                break;

            case 'share':
                updatedSnap = await Snap.findByIdAndUpdate(
                    id,
                    { $inc: { shares: 1 } },
                    { new: true }
                );
                break;

            case 'save':
                updatedSnap = await Snap.findByIdAndUpdate(
                    id,
                    { $inc: { saves: 1 } },
                    { new: true }
                );
                break;

            case 'comment':
                // Just increment comment count for now
                updatedSnap = await Snap.findByIdAndUpdate(
                    id,
                    { $inc: { comments: 1 } },
                    { new: true }
                );
                break;

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({
            id: updatedSnap._id.toString(),
            likes: updatedSnap.likes,
            shares: updatedSnap.shares,
            comments: updatedSnap.comments,
            saves: updatedSnap.saves || 0
        });

    } catch (error) {
        console.error('Interaction Error:', error);
        return NextResponse.json({ error: 'Failed to update interaction' }, { status: 500 });
    }
}
