import mongoose from 'mongoose';

const getMongoUri = (): string => {
    const rawValue = (process.env.DB_URI || process.env.MONGODB_URI || '').trim();
    if (!rawValue) {
        throw new Error('Please define the DB_URI environment variable inside .env');
    }

    // Guard against accidentally writing DB_URI=... inside the value itself.
    const sanitizedValue = rawValue.startsWith('DB_URI=') ? rawValue.slice('DB_URI='.length).trim() : rawValue;
    if (!sanitizedValue.startsWith('mongodb://') && !sanitizedValue.startsWith('mongodb+srv://')) {
        throw new Error('Invalid DB_URI format. It must start with mongodb:// or mongodb+srv://');
    }

    return sanitizedValue;
};

const DB_URI = getMongoUri();

if (!DB_URI) {
    throw new Error('Please define the DB_URI environment variable inside .env');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore
declare global {
    var mongoose: any; // This must be a var and not a let or const
}

let cached = global.mongoose;

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(DB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
