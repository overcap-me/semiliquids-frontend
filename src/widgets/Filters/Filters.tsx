import { FundsActionsServiceInstance } from "@/api/funds/FundsActionsService";
import { FiltersClient } from "./FiltersClient";
import type { FC } from "react";

type FiltersProps = {};


export const Filters: FC<FiltersProps> = async () => {
  const filters = await FundsActionsServiceInstance.getFilters();

  const customOrder = [
    { key: "asset_classes", values: filters?.asset_classes },
    { key: 'strategies', values: filters?.strategies },
    { key: "focuses", values: filters?.focuses },
  ]

  return <FiltersClient filters={customOrder} />;
};
