import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/dashboard/career-progress",
  "/dashboard/documents",
  "/dashboard/settings",
  "/dashboard/tasks",
  "/dashboard/calendar",
  "/onboarding",
  "/ai",
  "/analytics",
  "/career",
  "/cv",
  "/jobs",
  "/messages",
  "/notifications",
  "/dashboard/notifications",
  "/dashboard/learning",
  "/dashboard/skills",
  "/dashboard/roadmap",
  "/dashboard/coach",
  "/dashboard/goals",
  "/admin",
];

const authPaths = [
  "/login",
  "/register",
  "/auth/login",
  "/auth/register",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("mr-ego-session");
  const isAuthenticated = sessionCookie?.value === "true";

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (authPaths.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
