"use server";

import { FundTags } from "@/api/funds/tags";
import { UserTags } from "@/api/user/tags";
import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { revalidateTag } from "next/cache";

export async function removeWishlist(id: string) {
  await UserActionsServiceInstance.removeItemFromWishlist(id);
  revalidateTag(UserTags.WISHLIST);
  revalidateTag(FundTags.FUNDS);
}

export async function addWishlist(id: string) {
  await UserActionsServiceInstance.addItemToWishlist(id);
  revalidateTag(UserTags.WISHLIST);
  revalidateTag(FundTags.FUNDS);
}