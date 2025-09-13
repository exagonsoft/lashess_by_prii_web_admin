import { NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/settings/firebaseAdmin";

export async function requireAdmin(req: Request): Promise<null | Response> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const decoded = await verifyIdToken(token);
  if (!decoded /* || (decoded as any).role !== 'admin' */) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

