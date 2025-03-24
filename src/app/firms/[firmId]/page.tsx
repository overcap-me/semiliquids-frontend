import { FirmsActionsServiceInstance } from "@/api/firms/FirmsActionsService";
import { FundsActionsServiceInstance } from "@/api/funds/FundsActionsService";
import { Menu } from "@/components/Menu";
import { MainBanner } from "@/ui/MainBanner";
import { Suspense, type FC } from "react";
import { menuItems } from "./menu.items";
import { Filters } from "@/widgets/Filters";
import { Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { GeneratorContent } from "./service/generator-content";
import { TermsAndConditions } from "@/entities/TermsAndConditions";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { TableAdapterClient } from "@/app/funds/(index)/entities/v2/TableAdapterClient";
import { columns } from "@/app/funds/(index)/(home)/config/v2/table.columns";
import { formattedFunds } from "@/shared/utils/funds/formattedFunds";
import type { FiltersQueryParams } from "@/types/schema/SearchParams";
import { SkeletonPage } from "@/ui/Skeleton";

type FirmPageProps = {
  params: {
    firmId: string;
  };
  searchParams: {
    "filter[manager]"?: string;
  } & FiltersQueryParams;
};

const FirmPage: FC<FirmPageProps> = async ({
  params: { firmId },
  searchParams,
}) => {
  const firmResponse = await FirmsActionsServiceInstance.getById(firmId);
  const fundsBelongingToFirm = await FundsActionsServiceInstance.getListV2({
    "filter[manager]": firmResponse?.id,
    ...searchParams,
  });

  return (
    <Suspense fallback={<SkeletonPage />}>
      <MainBanner
        breadcrumbs={<Breadcrumbs items={[]} />}
        title={firmResponse?.name}
      />

      <GeneratorContent content={firmResponse} />

      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x56}>
        <Filters />
      </Wrapper>

      <Menu scroll={false} items={menuItems(firmId)} />

      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
        <TableAdapterClient
          columns={columns}
          funds={formattedFunds(fundsBelongingToFirm?.data)}
        />
      </Wrapper>

      <TermsAndConditions />
    </Suspense>
  );
};

export default FirmPage;
