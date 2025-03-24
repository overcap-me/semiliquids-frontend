import { cookies } from "next/headers";
import { cookieOptions } from "@/app/auth/entities/session";
import { ROUTE_PATHS } from "@/shared/routes";
import { HTTPError } from "ky";
import { type NextRequest, NextResponse } from "next/server";
import { HttpStatus } from "./api/httpStatus";
import { AUTHORIZATION, FIELD_TOKEN, requester } from "./api/requestInstance";

const AUTH_ROUTES = [
  ROUTE_PATHS.AUTH.LOGIN,
  ROUTE_PATHS.AUTH.REGISTER,
  ROUTE_PATHS.AUTH.RESET_PASSWORD,
  ROUTE_PATHS.AUTH.SET_PASSWORD,
  ROUTE_PATHS.AUTH.REGISTER_COMPANY,
];

const PUBLIC_ROUTES = [
  ROUTE_PATHS.PAGES.DISCLAIMERS,
  ROUTE_PATHS.PAGES.PRIVACY,
  ROUTE_PATHS.PAGES.TERMS_OF_USE
];

const isAuthorized = async (token?: string) => {
  try {
    return await requester.base.get("user/me", {
      headers: {
        [AUTHORIZATION]: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      return error.response;
    }
  }
};

const serviceLinkednIn = async (code: string) => {
  try {
    return await requester.base
      .get(`auth/linkedin/callback?code=${code}`)
      .json();
  } catch (error) {
    if (error instanceof HTTPError) {
      return error.response;
    }
  }
};

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const cookie = request.cookies.get(FIELD_TOKEN)?.value;

  if (!cookie && pathname.includes(ROUTE_PATHS.AUTH.INTEGRATION.LINKEDIN)) {
    const code = searchParams.get("code");
    const _responseLinkedIn = await serviceLinkednIn(code);

    const _next = NextResponse.redirect(
      new URL(ROUTE_PATHS.INDEX.BASE, request.url),
    );

    if (_responseLinkedIn?.provider_id) {
      return NextResponse.redirect(new URL(`${ROUTE_PATHS.AUTH.REGISTER_COMPANY}?provider_id=${_responseLinkedIn?.provider_id}`, request.url));
    }

    _next.cookies.set(
      FIELD_TOKEN,
      _responseLinkedIn?.access_token,
      cookieOptions,
    );

    return _next;
  }

  if (!cookie && !AUTH_ROUTES.some((route) => pathname.startsWith(route)) && !PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(ROUTE_PATHS.AUTH.LOGIN, request.url));
  }

  if (!AUTH_ROUTES.some((route) => pathname.startsWith(route)) && !PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    const me = await isAuthorized(cookie || cookies().get(FIELD_TOKEN)?.value);

    if ([HttpStatus.Unauthorized].includes(me.status)) {
      const _next = NextResponse.redirect(
        new URL(ROUTE_PATHS.AUTH.LOGIN, request.url),
      );
      _next.cookies.delete(FIELD_TOKEN);
      return _next;
    }

    return NextResponse.next({
      request: {},
    });
  }

  if (cookie && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(ROUTE_PATHS.INDEX.BASE, request.url));
  }

  return NextResponse.next({
    request: {},
  });
}

export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.ico).*)", // Apply to all routes except Next.js system routes
  ],
};
