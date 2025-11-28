import offer from "@/lib/models/offer";
import { connectToDatabase } from "@/lib/settings/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const items = (await offer.find().sort({ order: 1, createdAt: -1 }).lean()) as unknown as Array<{
    _id: unknown;
    title: string;
    description?: string;
    imageUrl?: string;
    active: boolean;
    order: number;
    type?: string; // ✅ new
    discount?: number; // ✅ new
    startsAt?: Date;
    endsAt?: Date;
  }>;
  return NextResponse.json(
    items.map((o) => ({
      id: String(o._id),
      title: o.title,
      description: o.description || "",
      imageUrl: o.imageUrl || "",
      active: Boolean(o.active),
      order: o.order,
      startsAt: o.startsAt ? new Date(o.startsAt).toISOString() : undefined,
      endsAt: o.endsAt ? new Date(o.endsAt).toISOString() : undefined,
    }))
  );
}