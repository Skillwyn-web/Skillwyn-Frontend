import mongoose, { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
    snapId: { type: Schema.Types.ObjectId, ref: 'Snap', required: true },
    text: { type: String, required: true },
    author: { type: String, default: 'You' },
    avatar: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
