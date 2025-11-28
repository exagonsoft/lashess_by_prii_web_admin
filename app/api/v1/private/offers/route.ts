import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Offer from "@/lib/models/offer";
import { requireAdmin } from "@/lib/utils/requireAdmin";
import { sendTopicNotification } from "@/lib/settings/firebaseAdmin";

export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if (auth) return auth;
  await connectToDatabase();
  const items = (await Offer.find()
    .sort({ order: 1, createdAt: -1 })
    .lean()) as unknown as Array<{
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
      type: o.type || "generic", // ✅ return type
      discount: o.discount ?? null,
      startsAt: o.startsAt ? new Date(o.startsAt).toISOString() : undefined,
      endsAt: o.endsAt ? new Date(o.endsAt).toISOString() : undefined,
    }))
  );
}

export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if (auth) return auth;
  

  await connectToDatabase();
  const body = await req.json();
  const created = await Offer.create(body);

  try {
    // 🎉 Send push to all subscribed to "offers" topic
    await sendTopicNotification(
      "offers",
      "🎉 Nueva oferta disponible",
      body.title || "Revisa las últimas promociones",
      { route: `/offer-details/${created._id}` }
    );
  } catch (err) {
    console.error("❌ Error sending push notification:", err);
  }

  return NextResponse.json({ id: String(created._id) });
}
