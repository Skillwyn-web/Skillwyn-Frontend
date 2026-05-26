import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String, default: null },
    authProvider: { type: String, enum: ['credentials', 'google'], default: 'credentials' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String },
    sessionTokenHash: { type: String, default: null, select: false },
    sessionExpiresAt: { type: Date, default: null, select: false },
    createdAt: { type: Date, default: Date.now }
});

const User = models.User || model('User', UserSchema);

export default User;
