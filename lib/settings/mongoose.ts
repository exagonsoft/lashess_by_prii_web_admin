import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI env var in .env.local");
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "lasheesbypriidb",
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
