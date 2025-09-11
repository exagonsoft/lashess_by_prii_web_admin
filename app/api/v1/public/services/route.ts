import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Service from "@/lib/models/service";

export async function GET() {
  await connectToDatabase();
  const services = await Service.find({ active: true }).sort({ order: 1 }).lean();

  return NextResponse.json(
    services.map((s) => ({
      id: String(s._id),
      name: s.name,
      price: s.price,
      durationMin: s.durationMin,
      imageUrl: s.imageUrl,
    }))
  );
}
