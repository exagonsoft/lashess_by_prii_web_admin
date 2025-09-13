import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Offer from "@/lib/models/offer";
import { requireAdmin } from "@/lib/utils/requireAdmin";

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
  await Offer.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}

