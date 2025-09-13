/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { sendPushNotification } from "@/lib/settings/firebaseAdmin"; // adjust import path

export async function POST(req: NextRequest) {
  try {
    const { token, title, body, data } = await req.json();

    if (!token || !title || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await sendPushNotification(token, title, body, data);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
