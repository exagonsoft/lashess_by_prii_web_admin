import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Feature from "@/lib/models/feature";

export async function GET() {
  try {
    await connectToDatabase();
    const features = await Feature.find({ published: true }).sort({ order: 1 });
    return NextResponse.json(features);
  } catch (error) {
    console.error("Error fetching features:", error);
    return NextResponse.json({ error: "Failed to fetch features" }, { status: 500 });
  }
}
