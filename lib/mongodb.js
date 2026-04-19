// lib/mongodb.js
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Stel MONGO_URI in je .env.local in');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  cached.promise = mongoose.connect(MONGO_URI);
  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectDB;