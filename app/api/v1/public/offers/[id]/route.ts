import offer from "@/lib/models/offer";
import { connectToDatabase } from "@/lib/settings/mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const id = (await params).id;

  const existing = await offer.findById(id);
  if (!existing) {
    return NextResponse.json(
      { ok: false, error: "Offer not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true, offer: existing });
}
