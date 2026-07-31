import { NextRequest, NextResponse } from "next/server";
import { canRoleAccessPath, isProtectedPath, loginPathFor, requiresMfa, roleHome, UniCuroRole } from "@/lib/access-control";

function getRole(request: NextRequest): UniCuroRole | null {
  const value = request.cookies.get("unicuro_role")?.value;
  if (value === "STUDENT" || value === "MERCHANT" || value === "ADMIN" || value === "SUPER_ADMIN") return value;
  return null;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!isProtectedPath(path)) return NextResponse.next();

  const role = getRole(request);
  if (!role) {
    const url = new URL(loginPathFor(path), request.url);
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (!canRoleAccessPath(role, path)) {
    return NextResponse.redirect(new URL(roleHome[role], request.url));
  }

  if (requiresMfa(role) && request.cookies.get("unicuro_mfa")?.value !== "true") {
    const url = new URL(role === "SUPER_ADMIN" ? "/login/super-admin" : "/login", request.url);
    url.searchParams.set("mfa", "required");
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  return res;
}

export const config = { matcher: ["/onboarding/:path*", "/student/:path*", "/admin/:path*", "/super-admin/:path*", "/support/:path*"] };
