import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request) {
      console.log("Request URL:", request.url);

      const { pathname } = request.nextUrl;
      const authToken = request.cookies.get("accessToken")?.value;

      console.log("Access token:", authToken);

      if (!authToken && pathname !== "/login") {
            console.log("Unauthorized access, redirecting to login.");
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
      }

      if (authToken) {
            try {
                  console.log("Verifying token...");

                  // Perform token verification
                  const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_SERVER_URL_LOCAL}/api/v1/user/verify-token`,
                        {
                              headers: {
                                    Authorization: `Bearer ${authToken}`,
                              },
                              withCredentials: true,
                        }
                  );

                  console.log("Token verification response:", response.data);

                  const role = response.data?.data?.user?.role || "user";
                  console.log("User role:", role);

                  // Ensure we don't re-verify token unnecessarily
                  if (pathname === "/login") {
                        if (role === "admin") {
                              console.log("Redirecting to admin dashboard.");
                              return NextResponse.redirect(new URL("/admin", request.url));
                        }

                        if (role === "user") {
                              console.log("Redirecting to profile page.");
                              return NextResponse.redirect(new URL("/profile", request.url));
                        }
                  }

                  // Protect admin routes
                  if (pathname.startsWith("/admin") && role !== "admin") {
                        console.log("Access denied for non-admin user.");
                        return NextResponse.redirect(new URL("/unauthorized", request.url));
                  }
            } catch (error) {
                  console.error("Error verifying token:", error);
                  const unauthorizedUrl = new URL("/unauthorized", request.url);
                  return NextResponse.redirect(unauthorizedUrl);
            }
      }

      return NextResponse.next();
}

export const config = {
      matcher: ["/profile/:path*", "/admin/:path*", "/write", "/login"],
};
