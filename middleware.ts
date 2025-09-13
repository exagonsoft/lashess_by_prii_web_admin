import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        // Origin values must not include path or trailing slash
        "https://www.lashees-by-prii.exagon-soft.com",
      ]
    : ["http://localhost:3000"];

export async function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";
  const pathname = req.nextUrl.pathname;
  const cookieToken = req.cookies.get("admin_token")?.value || null;

  // CORS for API routes
  const isAllowed = allowedOrigins.includes(origin);
  if (pathname.startsWith("/api/")) {
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

  // Auth page: redirect to /admin if already logged
  if (pathname === "/auth") {
    if (cookieToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Guard admin area
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!cookieToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    // Optional: verify cookie signature if jose is installed and secret is set.
    // For now, presence-only check keeps Edge bundle small and avoids deps.
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/admin",
    "/admin/:path*",
    "/auth",
  ],
};
