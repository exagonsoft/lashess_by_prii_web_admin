import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/settings/mongoose";
import Stilist from "@/lib/models/stylist";

// GET stylist by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  await connectToDatabase();
  const stylist = await Stilist.findById(id);
  if (!stylist) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(stylist);
}

// PUT update stylist
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const body = await req.json();
  await connectToDatabase();
  const stylist = await Stilist.findByIdAndUpdate(id, body, { new: true });
  if (!stylist) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(stylist);
}

// DELETE stylist
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  await connectToDatabase();
  const stylist = await Stilist.findByIdAndDelete(id);
  if (!stylist) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Deleted" });
}
