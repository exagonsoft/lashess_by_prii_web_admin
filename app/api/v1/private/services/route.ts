import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Service from "@/lib/models/service";

export async function GET() {
  await connectToDatabase();
  const services = await Service.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(
    services.map((s) => ({
      id: String(s._id),
      name: s.name,
      price: s.price,
      durationMin: s.durationMin,
      active: s.active,
      imageUrl: s.imageUrl,
      order: s.order,
    }))
  );
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const service = await Service.create(body);
  return NextResponse.json({ id: String(service._id) });
}
