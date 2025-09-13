import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/settings/firebaseAdmin";

export const runtime = "nodejs";

const cookieName = "admin_token";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const decoded = await verifyIdToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Optional: require admin role via custom claim
    // if ((decoded as any).role !== "admin") {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    const res = NextResponse.json({ ok: true });
    const nowSec = Math.floor(Date.now() / 1000);
    const expSec = typeof decoded.exp === "number" ? decoded.exp : nowSec + 60 * 60; // default 1h
    const maxAge = Math.max(0, expSec - nowSec);

    // Set cookie with the raw Firebase token (middleware checks presence)
    res.cookies.set(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const cookieName = "admin_token";
  const token = req.cookies.get(cookieName)?.value;
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });
  const decoded = await verifyIdToken(token);
  if (!decoded) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
