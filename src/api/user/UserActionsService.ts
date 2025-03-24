import { UserTags } from "@/api/user/tags";
import { requester } from "../requestInstance";
import { safeParseAsync } from "@/shared/lib/zod";
import {
  type WishlistResponseDTO,
  WishlistResponseDTOSchema,
} from "@/types/schema/user/wishlist";
import {
  type UserResponse,
  type UserResponseDTO,
  UserResponseDTOSchema,
} from "@/types/schema/user/profile";
import {
  PerformanceIndexesResponseSchema,
  type PerformanceIndexesResponse,
} from "@/types/schema/indexes";
import { standartSearchParams } from "@/shared/utils/parseSearchParams";
import type { FiltersQueryParams } from "@/types/schema/SearchParams";
import { HTTPError } from "ky";

class UserActionsService {
  async getPerfomanceIndex() {
    try {
      const result = await requester.get<PerformanceIndexesResponse>(
        "performance-indexes"
      );

      const parseResult = await safeParseAsync(
        process.env.NODE_ENV === "development"
          ? PerformanceIndexesResponseSchema
          : undefined,
        result
      );

      if (!parseResult.success) {
        console.error("Ошибка валидации", parseResult.error);
      } else {
        return parseResult.data satisfies PerformanceIndexesResponse;
      }
    } catch (e) {}
  }

  async getWishlist(params?: FiltersQueryParams) {
    try {
      const result = await requester.get<WishlistResponseDTO>(
        "v2/user/wishlist",
        {
          searchParams: standartSearchParams(params),
          next: { tags: [UserTags.WISHLIST] },
        }
      );

      const parseResult = await safeParseAsync(
        process.env.NODE_ENV === "development"
          ? WishlistResponseDTOSchema
          : undefined,
        result
      );

      if (!parseResult.success) {
        console.error("Ошибка валидации", parseResult.error);
      } else {
        return parseResult.data satisfies WishlistResponseDTO;
      }
    } catch (e) {}
  }

  async addItemToWishlist(id: string) {
    try {
      return await requester.post("user/wishlist", { id });
    } catch (e) {}
  }

  async removeItemFromWishlist(id: string) {
    try {
      return await requester.delete("user/wishlist", { id });
    } catch (e) {}
  }

  /**
   * Check me
   */
  async me() {
    try {
      const result = await requester.get<UserResponseDTO>("user/me", {
        next: { tags: [UserTags.CHECK_ME] },
      });

      const parseResult = await safeParseAsync(
        process.env.NODE_ENV === "development"
          ? UserResponseDTOSchema
          : undefined,
        result
      );

      if (!parseResult.success) {
        console.error("Ошибка валидации", parseResult.error);
      } else {
        return parseResult.data.data satisfies UserResponse;
      }
    } catch (err) {}
  }

  async updateProfile(body: Partial<UserResponse>) {
    try {
      return await requester.base.post<UserResponseDTO>("user/profile", {
        json: body,
      });
    } catch (error) {
      if (error instanceof HTTPError) {
        return error?.response;
      }
    }
  }

  async deleteUser() {
    try {
      return await requester.delete("user/me");
    } catch (e) {}
  }

  async changePassword(body: unknown) {
    try {
      return await requester.base.post("user/password-change", { json: body });
    } catch (error) {
      if (error instanceof HTTPError) {
        return error?.response;
      }
    }
  }
}

export const UserActionsServiceInstance = new UserActionsService();
