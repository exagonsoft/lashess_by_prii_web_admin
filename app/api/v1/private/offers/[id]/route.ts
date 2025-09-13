import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Offer from "@/lib/models/offer";
import { requireAdmin } from "@/lib/utils/requireAdmin";
import { sendTopicNotification } from "@/lib/settings/firebaseAdmin";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if (auth) return auth;

  await connectToDatabase();
  const id = (await params).id;
  const body = await req.json();

  await Offer.findByIdAndUpdate(id, body);

  try {
    await sendTopicNotification(
      "offers",
      "✏️ Oferta actualizada",
      body.title || "Una oferta fue modificada",
      { route: `/offers/${id}` }
    );
  } catch (err) {
    console.error("❌ Error sending update notification:", err);
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if (auth) return auth;

  await connectToDatabase();
  const id = (await params).id;

  const deleted = await Offer.findByIdAndDelete(id);

  try {
    if (deleted) {
      await sendTopicNotification(
        "offers",
        "🗑️ Oferta eliminada",
        deleted.title || "Una oferta fue eliminada"
      );
    }
  } catch (err) {
    console.error("❌ Error sending delete notification:", err);
  }

  return NextResponse.json({ ok: true });
}

