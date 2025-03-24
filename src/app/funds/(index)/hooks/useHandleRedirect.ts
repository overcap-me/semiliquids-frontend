"use client";
import { ROUTE_PATHS } from "@/shared/routes";
import type { AccessorFundFormatted } from "@/types/schema/funds";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useHandleRedirect = () => {
  const router = useRouter();

  return useCallback(
    (fund: AccessorFundFormatted) => {
      return () => {
        if (fund.__fund.slug && fund?.share_class?.slug) {
          router.push(
            ROUTE_PATHS.FUND_BY_ID.BASE(
              fund.__fund.slug,
              fund?.share_class?.slug,
            ),
          );
        }
      };
    },
    [router],
  );
};
