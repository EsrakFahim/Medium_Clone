import { NextResponse } from "next/server";

export function middleware(request) {
      console.log("Request URL:", request.url);

      const { pathname } = request.nextUrl;
      const authToken = request.cookies.get("accessToken")?.value;
      console.log("Access token:", authToken);

      // If user tries to access protected routes without being logged in, redirect to login with the intended path
      if (
            !authToken &&
            (pathname.startsWith("/profile") || pathname.startsWith("/write"))
      ) {
            console.log(
                  "Unauthorized access to profile, redirecting to login."
            );
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname); // Store the intended route in query
            return NextResponse.redirect(loginUrl);
      }

      // If logged-in user tries to access login, redirect to profile
      if (pathname === "/login" && authToken) {
            console.log(
                  "Logged-in user accessing login page, redirecting to profile."
            );
            return NextResponse.redirect(new URL("/profile", request.url));
      }

      // Allow other requests to pass through
      return NextResponse.next();
}

export const config = {
      matcher: ["/profile/:path*", "/login", "/write"],
};
