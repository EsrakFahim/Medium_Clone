import { NextResponse } from "next/server";

export function middleware(request) {
      const accessToken = request.cookies.get("accessToken");
      console.log("accessToken", accessToken);

      if (!accessToken) {
            // Redirect to login if accessToken is missing
            return NextResponse.redirect(new URL("/login", request.url));
      }

      // Decode JWT token to extract user role
      const payload = JSON.parse(
            Buffer.from(accessToken.split(".")[1], "base64").toString()
      );

      const { role } = payload;

      // Protect '/profile' route: Only admin can access
      if (request.nextUrl.pathname.startsWith("/profile") && role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      return NextResponse.next(); // Allow access if token and role are valid
}

export const config = {
      matcher: ["/profile/:path*", "/main/:path*"],
};
