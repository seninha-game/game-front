import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = validateAuth(request);
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const authCookie = request.cookies.get("auth_token")?.value;
  const userIdCookie = request.cookies.get("userId")?.value;

  const userId = searchParams.get("userId");

  if (token && userId) {
    const response = NextResponse.next();
    const authToken = token.replace("Bearer ", "");

    response.cookies.set("auth_token", authToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    response.cookies.set("userId", userId, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  } else if (authCookie && userIdCookie) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("https://coringagames.com", request.url));
  }
}

const validateAuth = (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Redirect to login or return unauthorized
    return null;
    // Or return unauthorized
    // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return authHeader;
};

//const getUserBalance = async (request: NextRequest) {
//}

// Configure which paths to protect
export const config = {
  matcher: "/bilhetes/:path*",
};
