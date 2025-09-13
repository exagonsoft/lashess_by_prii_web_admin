import mongoose from "mongoose";
import { systemSecrets } from "./systemSecrets";

const MONGODB_URI = systemSecrets.mongoUri;

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: systemSecrets.mongoDb,
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
