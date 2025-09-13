import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Gallery from "@/lib/models/gallery";
import { requireAdmin } from "@/lib/utils/requireAdmin";

export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if (auth) return auth;
  await connectToDatabase();
  const items = (await Gallery.find().sort({ order: 1, createdAt: -1 }).lean()) as unknown as Array<{
    _id: unknown;
    imageUrl: string;
    alt: string;
    order: number;
    published: boolean;
  }>;
  return NextResponse.json(
    items.map((g) => ({
      id: String(g._id),
      imageUrl: g.imageUrl,
      alt: g.alt,
      order: g.order,
      published: Boolean(g.published),
    }))
  );
}

export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if (auth) return auth;
  await connectToDatabase();
  const body = await req.json();
  const created = await Gallery.create(body);
  return NextResponse.json({ id: String(created._id) });
}
