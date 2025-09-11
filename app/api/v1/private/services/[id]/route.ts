import { NextResponse } from "next/server";
import Service from "@/lib/models/service";
import {connectToDatabase} from "@/lib/settings/mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  await connectToDatabase();
  const service = await Service.findById(id);
  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(service);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  await connectToDatabase();
  const body = await req.json();
  const service = await Service.findByIdAndUpdate(id, body, { new: true });
  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(service);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  await connectToDatabase();
  const deleted = await Service.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
