import type { FC } from "react";
import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { Wrapper } from "@/components/Wrapper";
import { ROUTE_PATHS } from "@/shared/routes";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { NotData } from "@/ui/NotData";
import { TableOfMyListClient } from "./entities/v2";
import { Filters } from "@/widgets/Filters";
import { FiltersProviderClient } from "@/widgets/Filters/context";
import type { FiltersQueryParams } from "@/types/schema/SearchParams";
import type {
  AccessorWishlist,
  WishlistResponseDTO,
} from "@/types/schema/user/wishlist";
import { GLOBAL_TEXT } from "@/shared/content/globalText";
import { PaginationClient } from "../funds/(index)/entities/PaginationClient";

/**
 * Flatten wishlist data
 */
const wishlistMutateData = (
  wishlist: WishlistResponseDTO
): AccessorWishlist[] => {
  return wishlist?.data.flatMap((it) => {
    const { classes, ...fundWithoutClasses } = it;

    classes.map((cls) => (cls["__fund"] = fundWithoutClasses));

    return it.classes;
  });
};

type FavoritesPageProps = {
  searchParams: FiltersQueryParams;
};

const FavoritesPage: FC<FavoritesPageProps> = async ({ searchParams }) => {
  const wishlist = await UserActionsServiceInstance.getWishlist(searchParams);

  return (
    <FiltersProviderClient>
      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_40x80}>
        <Filters />
      </Wrapper>

      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
        {wishlist?.data?.length > 0 ? (
          <TableOfMyListClient funds={wishlistMutateData(wishlist)} />
        ) : (
          <NotData
            title={GLOBAL_TEXT.favorites.empty.title}
            text={GLOBAL_TEXT.favorites.empty.desc}
            href={ROUTE_PATHS.INDEX.BASE}
          />
        )}
      </Wrapper>

      {wishlist?.data?.length > 0 && <PaginationClient fund={wishlist} />}
    </FiltersProviderClient>
  );
};

export default FavoritesPage;
