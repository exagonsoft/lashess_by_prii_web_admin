import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
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
  await Tool.findByIdAndUpdate(id, body);
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
  await Tool.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
