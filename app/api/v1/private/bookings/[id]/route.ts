import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Booking from "@/lib/models/booking";
import Tool from "@/lib/models/tool";
import { requireAdmin } from "@/lib/utils/requireAdmin";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(req);
  if (auth) return auth;
  await connectToDatabase();
  const body = await req.json();
  const id = (await params).id;

  // Update booking
  const booking = await Booking.findById(id);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const prevStatus = booking.status as string;
  if (body.price !== undefined) booking.price = body.price;
  if (body.notes !== undefined) booking.notes = body.notes;
  if (Array.isArray(body.toolsUsed)) booking.toolsUsed = body.toolsUsed;
  if (body.status) booking.status = body.status;

  await booking.save();

  // If processed, decrement inventory based on toolsUsed
  if (prevStatus !== "processed" && booking.status === "processed" && Array.isArray(booking.toolsUsed)) {
    for (const u of booking.toolsUsed as Array<{ toolId: string; quantity: number }>) {
      if (!u.toolId || !u.quantity) continue;
      const tool = await Tool.findById(u.toolId);
      if (!tool) continue;
      tool.stock = Math.max(0, (tool.stock || 0) - Math.abs(u.quantity));
      await tool.save();
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

  // Soft-cancel: mark status as canceled
  const b = await Booking.findById(id);
  if (!b) return NextResponse.json({ error: "Not found" }, { status: 404 });
  b.status = "canceled";
  await b.save();
  return NextResponse.json({ ok: true });
}
