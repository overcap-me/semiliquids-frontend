import { Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { TableAdapterClient } from "../entities/v2/TableAdapterClient";
import { columns } from "./config/v2/table.columns";
import { formattedFunds } from "@/shared/utils/funds/formattedFunds";
import { FundsActionsServiceInstance } from "@/api/funds/FundsActionsService";
import type { FiltersQueryParams } from "@/types/schema/SearchParams";
import { type FC } from "react";
import { PaginationClient } from "../entities/PaginationClient";

type StrategyDataPageProps = {
  searchParams: FiltersQueryParams;
};

const StrategyDataPage: FC<StrategyDataPageProps> = async ({
  searchParams,
}) => {
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

export default StrategyDataPage;
