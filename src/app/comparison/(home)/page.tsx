import { Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import type React from "react";
import type { FC } from "react";
import { TableOfCompareClient } from "../entities/TableOfCompare";
import { FundsActionsServiceInstance } from "@/api/funds/FundsActionsService";
import { UserActionsServiceInstance } from "@/api/user/UserActionsService";
import { NotData } from "@/ui/NotData";
import { ROUTE_PATHS } from "@/shared/routes";
import { TableCompareProvider } from "../entities/TableOfCompare/TableCompareProvider";
import { GLOBAL_TEXT } from "@/shared/content/globalText";

type TProps = { searchParams: Record<"q", string> };

const ComparePage: FC<TProps> = async ({ searchParams }) => {
  if (typeof searchParams.q === "undefined" || searchParams.q === "") {
    return (
      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
        <NotData
          title={GLOBAL_TEXT.comparison.empty.title}
          text={GLOBAL_TEXT.comparison.empty.desc}
          href={ROUTE_PATHS.INDEX.BASE}
        />
      </Wrapper>
    );
  }

  const funds = await FundsActionsServiceInstance.getFundsByIdsOfCompare(
    searchParams.q
  );
  const perfomancesIndex =
    await UserActionsServiceInstance.getPerfomanceIndex();

  return (
    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
      <TableCompareProvider funds={funds}>
        <TableOfCompareClient indexes={perfomancesIndex} />
      </TableCompareProvider>
    </Wrapper>
  );
};

export default ComparePage;
