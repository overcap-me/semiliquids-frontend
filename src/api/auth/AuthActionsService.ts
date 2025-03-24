import { HTTPError } from "ky";
import { requester } from "../requestInstance";

class AuthActionsService {
  async register(body: unknown) {
    try {
      return await requester.base.post("auth/sign-up", { json: body });
    } catch (error) {
      if (error instanceof HTTPError) {
        return error?.response;
      }
    }
  }

  async login(body: unknown) {
    try {
      return await requester.base.post("auth/sign-in", { json: body });
    } catch (error) {
      if (error instanceof HTTPError) {
        return error?.response;
      }
    }
  }

  async logout() {
    try {
      return await requester.post("auth/logout");
    } catch (error) {
      if (error instanceof HTTPError) {
        return error?.response;
      }
    }
  }

  async forgotPassword(body: { email: string }) {
    try {
      return await requester.base.post("auth/forgot-password", { json: body });
    } catch (error) {
      if (error instanceof HTTPError) {
        return error?.response;
      }
    }
  }

  async setNewPassword(token: string, body: unknown) {
    try {
      return await requester.base.post(`auth/forgot-password/${token}`, {
        json: body,
      });
    } catch (error) {
      if (error instanceof HTTPError) {
        return error?.response;
      }
    }
  }

  async resetPassword(id: string) {}

  async getUrlOfLinkedinRedirect() {
    try {
      return await requester.base.get("auth/linkedin/redirect");
    } catch (error) {
      if (error instanceof HTTPError) {
        return error.response;
      }
    }
  }

  // Write the implementation for the following methods
  async linkedinProfile(body: unknown) {
    try {
      return await requester.base.post("auth/linkedin/profile", { json: body });
    } catch (error) {}
  }
}

export const AuthActionsServiceInstance = new AuthActionsService();
