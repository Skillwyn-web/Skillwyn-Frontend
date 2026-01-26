import mongoose, { Schema, model, models } from 'mongoose';

const SnapSchema = new Schema({
    videoUrl: { type: String, required: true },
    caption: { type: String, default: '' },
    author: {
        name: { type: String, default: 'You' },
        username: { type: String, default: '@you' },
        avatar: { type: String, default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You' }
    },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Prevent model recompilation error in development
const Snap = models.Snap || model('Snap', SnapSchema);

export default Snap;
