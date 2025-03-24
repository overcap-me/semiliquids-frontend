import { Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { FundsActionsServiceInstance } from "@/api/funds/FundsActionsService";

import type { FC } from "react";
import { FirmsActionsServiceInstance } from "@/api/firms/FirmsActionsService";
import { MainBanner } from "@/ui/MainBanner";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { GeneratorContent } from "../../service/generator-content";
import { Filters } from "@/widgets/Filters";
import { Menu } from "@/components/Menu";
import { menuItems } from "../../menu.items";
import { TermsAndConditions } from "@/entities/TermsAndConditions";
import { TableAdapterClient } from "@/app/funds/(index)/entities/v2/TableAdapterClient";
import { formattedFunds } from "@/shared/utils/funds/formattedFunds";
import type { FiltersQueryParams } from "@/types/schema/SearchParams";
import { columns } from "@/app/funds/(index)/terms/config/v2/table.columns";

type TermsPageProps = {
  params: {
    firmId: string;
  };
  searchParams: {
    "filter[manager]"?: string;
  } & FiltersQueryParams;
};

const TermsPage: FC<TermsPageProps> = async ({
  params: { firmId },
  searchParams,
}) => {
  const firmResponse = await FirmsActionsServiceInstance.getById(firmId);
  const fundsBelongingToFirm = await FundsActionsServiceInstance.getListV2({
    "filter[manager]": firmResponse?.id,
    ...searchParams,
  });

  return (
    <>
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
    </>
  );
};

export default TermsPage;
