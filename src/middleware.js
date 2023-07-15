import { NextResponse } from "next/server";
export async function middleware(req) {
  // it is compulsary line
  if (req.nextUrl.pathname.startsWith("/_next/")) {
    return true;
  }
  const path = req.nextUrl.pathname;
  const isPublicPath =
    path === "/login" || path === "/verifyemail" || path === "/signup";
  const token = req.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  matcher: ["/profile/:path*", "/logout", "/login", "/signup", "/verifyemail"],
};
// See "Matching Paths" below to learn more
