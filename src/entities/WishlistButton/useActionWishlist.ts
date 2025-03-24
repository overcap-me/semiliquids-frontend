import type { SyntheticEvent } from "react";
import { addWishlist, removeWishlist } from "./actions";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/shared/routes";

export const useActionWishlist = (classId: string, active: boolean, canDelete: boolean) => {
  const router = useRouter()

  return async (event: SyntheticEvent) => {
    event.stopPropagation();

    if (!classId) {
      throw new Error('Missing classId')
    }

    if (active) {
      if (canDelete) {
        return await removeWishlist(classId);
      }

      return router.push(ROUTE_PATHS.FAVORITES.BASE)
    }

    return await addWishlist(classId);
  };
};
