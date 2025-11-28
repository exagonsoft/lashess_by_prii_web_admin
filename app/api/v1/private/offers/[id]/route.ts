// app/api/v1/private/offers/[id]/route.ts
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

  const existing = await Offer.findById(id);
  if (!existing) {
    return NextResponse.json(
      { ok: false, error: "Offer not found" },
      { status: 404 }
    );
  }
  await Offer.findByIdAndUpdate(id, body);

  // ✅ Prepare notification
  let title: string | null = null;
  let message: string | null = null;

  // Active changed
  if (typeof body.active !== "undefined" && body.active !== existing.active) {
    if (body.active) {
      title = "✨ ¡Nueva oferta disponible!";
      message = `Descubre ahora ${body.title}`;
    } else {
      title = "⚠️ Oferta finalizada";
      message = `La oferta ${body.title} ya no está disponible`;
    }
  }

  // Discount changed
  if (
    body.type === "discount" &&
    typeof body.discount !== "undefined" &&
    body.discount !== existing.discount
  ) {
    title = "🔥 ¡Descuento actualizado!";
    message = `${body.discount}% OFF en ${body.title}`;
  }

  // End date changed
  if (
    body.type === "date" &&
    typeof body.endsAt !== "undefined" &&
    new Date(body.endsAt).getTime() !== existing.endsAt?.getTime()
  ) {
    const newDate = new Date(body.endsAt).toLocaleDateString("es-ES");
    const oldDate = existing.endsAt
      ? existing.endsAt.toLocaleDateString("es-ES")
      : null;

    if (oldDate && newDate > oldDate) {
      title = "⏰ ¡Ampliamos la fecha!";
      message = `Aprovecha ${body.title} hasta el ${newDate}`;
    } else {
      title = "⚡ Oferta por tiempo limitado";
      message = `${body.title} finaliza el ${newDate}`;
    }
  }

  // Send if we have a message
  if (title && message) {
    try {
      await sendTopicNotification("offers", title, message, {
        route: `/offer-details/${id}`,
      });
    } catch (err) {
      console.error("❌ Error sending update notification:", err);
    }
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
