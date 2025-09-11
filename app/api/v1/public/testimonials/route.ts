import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Review from "@/lib/models/review";

export async function GET() {
  try {
    await connectToDatabase();
    const reviews = await Review.find({ published: true }).sort({ createdAt: -1 }).limit(10);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
