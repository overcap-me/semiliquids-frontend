import ky from "ky";
import type { Options } from "ky";
import { cookies } from "next/headers";

export const AUTHORIZATION = "Authorization";
export const FIELD_TOKEN = "token";

class RequestInstance {
  get base() {
    return ky.create({
      prefixUrl: process.env.NEXT_PUBLIC_BASE_HOST,
      retry: 1,
      throwHttpErrors: true,
      headers: {
        Accept: "application/json",
      },
      hooks: {
        beforeRequest: [
          (request) => {
            const cookie = cookies().get(FIELD_TOKEN);
            if (cookie?.value) {
              request.headers.set(AUTHORIZATION, `Bearer ${cookie?.value}`);
            }
          },
        ],
      },
    });
  }

  async get<T>(url: string, options?: Options) {
    return await this.base.get<T>(url, options).json();
  }

  async post<T>(url: string, body?: unknown) {
    return await this.base.post<T>(url, { json: body }).json();
  }

  put() { }

  async delete<T>(url: string, body?: unknown) {
    return await this.base.delete<T>(url, { json: body }).json();
  }
}
export const requester = new RequestInstance();
