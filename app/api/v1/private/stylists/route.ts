import { NextResponse } from "next/server";
import Stilist from "@/lib/models/stylist";
import { connectToDatabase } from "@/lib/settings/mongoose";

// GET all stylists
export async function GET() {
  await connectToDatabase();
  const stylists = await Stilist.find().sort({ createdAt: -1 });
  return NextResponse.json(stylists);
}

// POST create new stylist
export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const stylist = await Stilist.create(body);
  return NextResponse.json(stylist, { status: 201 });
}
