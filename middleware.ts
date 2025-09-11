import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://www.lashees-by-prii.exagon-soft.com/",
        "https://www.lashees-by-prii.exagon-soft.com/admin",
      ]
    : ["http://localhost:3000"];

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";

  // Restringir solo a origins permitidos
  const isAllowed = allowedOrigins.includes(origin);

  // Solo aplicamos CORS a rutas de API
  if (req.nextUrl.pathname.startsWith("/api/")) {
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    const res = NextResponse.next();
    res.headers.set(
      "Access-Control-Allow-Origin",
      isAllowed ? origin : allowedOrigins[0]
    );
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res;
  }

  return NextResponse.next();
}

// Solo en /api/*
export const config = {
  matcher: ["/api/:path*"],
};
