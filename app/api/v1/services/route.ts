import { NextRequest, NextResponse } from "next/server";
import { listServices, createService } from "@/lib/servicesRepo";

export async function GET() {
  const services = await listServices();
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const created = await createService(body);
  return NextResponse.json(created, { status: 201 });
}
