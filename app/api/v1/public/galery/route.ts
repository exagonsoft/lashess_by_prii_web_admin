import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Gallery from "@/lib/models/gallery";

export async function GET() {
  try {
    await connectToDatabase();
    const gallery = await Gallery.find({ published: true }).sort({ order: 1 });
    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
