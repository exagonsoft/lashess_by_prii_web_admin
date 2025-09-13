/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Booking from "@/lib/models/booking";
import { requireAdmin } from "@/lib/utils/requireAdmin";

export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if (auth) return auth;
  await connectToDatabase();
  const bookings = await Booking.find().sort({ scheduledAt: -1 }).lean();
  return NextResponse.json(
    bookings.map((b) => ({
      id: String(b._id),
      serviceId: b.serviceId ? String(b.serviceId) : undefined,
      customerName: b.customerName,
      customerEmail: b.customerEmail,
      serviceName: b.serviceName,
      stylistName: b.stylistName,
      scheduledAt: new Date(b.scheduledAt).toISOString(),
      status: b.status,
      price: b.price,
      toolsUsed: (b.toolsUsed || []).map((u: any) => ({
        toolId: String(u.toolId),
        name: u.name,
        quantity: u.quantity,
        unit: u.unit,
      })),
      notes: b.notes,
    }))
  );
}

export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if (auth) return auth;
  await connectToDatabase();
  const body = await req.json();
  const created = await Booking.create(body);
  return NextResponse.json({ id: String(created._id) });
}
