import { NextResponse } from "next/server";

// Auth state is held in the Firebase client SDK and is not available to
// proxy without a server-side session cookie. Client routes handle
// signed-in/out redirects (see `/signin` and protected pages). This
// proxy is intentionally a no-op until session cookies are wired up.
export default function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};