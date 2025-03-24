import { FundTags } from "@/api/funds/tags";
import { requester } from "../requestInstance";

/* Types  */
import {
  type FundsResponseDTO,
  FundsResponseDTOSchema,
} from "@/types/schema/funds";
import type { SettingResponse } from "@/types/schema/pages";
import {
  FiltersResponseSchema,
  type FiltersResponse,
} from "@/types/schema/filters";
import {
  type FundByIdResponse,
  type FundByIdResponseDTO,
  FundByIdResponseDTOSchema,
} from "@/types/schema/fund";
import type { FiltersQueryParams } from "@/types/schema/SearchParams";
import { safeParseAsync } from "@/shared/lib/zod";

import { standartSearchParams } from "@/shared/utils/parseSearchParams";
import type { FundByIdCompareResponse } from "@/types/schema/compare";

const ONE_HOUR = 3600000;

class FundsActionsService {
  async getListV2(params?: FiltersQueryParams) {
    try {
      const result = await requester.get<FundsResponseDTO>("v2/funds", {
        searchParams: standartSearchParams<FiltersQueryParams>(params),
        next: {
          revalidate: ONE_HOUR,
          tags: [FundTags.FUNDS],
        },
      });

      const parseResult = await safeParseAsync(
        process.env.NODE_ENV === "development"
          ? FundsResponseDTOSchema
          : undefined,
        result
      );

      if (!parseResult.success) {
        console.error("Ошибка валидации", parseResult.error.toString());
      } else {
        return parseResult.data satisfies FundsResponseDTO;
      }
    } catch (e) {}
  }

  async getById(id: string) {
    try {
      const result = await requester.get<FundByIdResponseDTO>(`funds/${id}`, {
        next: { tags: [FundTags.FUND] },
      });

      const parseResult = await safeParseAsync(
        process.env.NODE_ENV === "development"
          ? FundByIdResponseDTOSchema
          : undefined,
        result
      );

      if (!parseResult.success) {
        console.error("Ошибка валидации", parseResult.error.toString());
      } else {
        return parseResult.data.data satisfies FundByIdResponseDTO["data"];
      }
    } catch (e) {}
  }

  async getFilters() {
    try {
      const result = await requester.get<FiltersResponse>("funds/filters");

      const parseResult = await safeParseAsync(
        process.env.NODE_ENV === "development"
          ? FiltersResponseSchema
          : undefined,
        result
      );

      if (!parseResult.success) {
        console.error("Ошибка валидации", parseResult.error.toString());
      } else {
        return parseResult.data satisfies FiltersResponse;
      }
    } catch (e) {}
  }

  async getSettings() {
    try {
      return await requester.get<SettingResponse>("settings");
    } catch (e) {}
  }

  async getFundsByIdsOfCompare(query: string) {
    try {
      const list: Record<string, string[]> = {};

      const fundAndClassIdList = decodeURIComponent(query)
        .split("&")
        .map((opt) => {
          const [fundId, classIds] = opt.split("=");

          list[fundId] = classIds.split(",").filter((classId) => classId);

          return {
            fundId,
            classIds: classIds.split(",").filter((classId) => classId),
          };
        });

      const fundRequests = fundAndClassIdList.map(
        async ({ fundId }) => await this.getById(fundId)
      );

      const results = await Promise.all(fundRequests);

      const funds = results.flatMap((response) => {
        const fund = response satisfies FundByIdResponse;
        const fundSlug = fund?.slug;

        if (Object.hasOwn(list, fundSlug)) {
          const classes = list[fundSlug];
          fund.classes = fund?.classes?.filter((cls) =>
            classes.includes(cls?.share_class?.slug)
          );
        }

        return fund;
      });

      return funds.flatMap((fund) => {
        const { classes, ...fundWitoutClasses } = fund;
        return (
          classes?.map((cls) => ({ ...cls, __fund: fundWitoutClasses })) ?? []
        );
      }) satisfies FundByIdCompareResponse[];
    } catch (e) {}
  }
}

export const FundsActionsServiceInstance = new FundsActionsService();
