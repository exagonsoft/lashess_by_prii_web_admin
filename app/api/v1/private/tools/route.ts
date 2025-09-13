import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/settings/mongoose";
import Tool from "@/lib/models/tool";
import { requireAdmin } from "@/lib/utils/requireAdmin";

export async function GET(req: Request) {
  const auth = await requireAdmin(req);
  if (auth) return auth;
  await connectToDatabase();
  const tools = await Tool.find().sort({ name: 1 }).lean();
  return NextResponse.json(
    tools.map((t) => ({
      id: String(t._id),
      name: t.name,
      sku: t.sku || "",
      stock: t.stock || 0,
      unit: t.unit || "pcs",
      type: t.type || "",
      active: !!t.active,
    }))
  );
}

export async function POST(req: Request) {
  const auth = await requireAdmin(req);
  if (auth) return auth;
  await connectToDatabase();
  const body = await req.json();
  const tool = await Tool.create(body);
  return NextResponse.json({ id: String(tool._id) });
}
