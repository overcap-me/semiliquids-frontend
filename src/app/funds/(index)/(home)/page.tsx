import { Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { TableAdapterClient } from "../entities/v2/TableAdapterClient";
import { FundsActionsServiceInstance } from "@/api/funds/FundsActionsService";
import { formattedFunds } from "@/shared/utils/funds/formattedFunds";
import { columns } from "./config/v2/table.columns";
import { Suspense, type FC } from "react";
import type { FiltersQueryParams } from "@/types/schema/SearchParams";
import { PaginationClient } from "../entities/PaginationClient";

type HomePageProps = {
  searchParams: FiltersQueryParams;
};

const HomePage: FC<HomePageProps> = async ({ searchParams }) => {
  const fundsV2 = await FundsActionsServiceInstance.getListV2(searchParams);

  return (
    <>
      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
        <TableAdapterClient
          columns={columns}
          funds={formattedFunds(fundsV2?.data)}
        />
      </Wrapper>

      <PaginationClient fund={fundsV2} />
    </>
  );
};

export default HomePage;
