import { FIELD_TOKEN } from "@/api/requestInstance";
import { cookies } from "next/headers";

class SessionService {
  static getCookieOptions() {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      expires: expires,
      path: "/",
      sameSite: "Lax",
    };
  }

  add(token: string) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookies().set(FIELD_TOKEN, token, {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      expires: expires,
      path: "/",
      sameSite: "strict",
    });
  }

  get() {
    return cookies().get(FIELD_TOKEN);
  }

  check() {
    return cookies().has(FIELD_TOKEN);
  }

  delete() {
    return cookies().delete(FIELD_TOKEN);
  }
}

export const cookieOptions = SessionService.getCookieOptions();
export const SessionServiceInstance = new SessionService();
