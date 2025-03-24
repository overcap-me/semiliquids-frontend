"use client";

import { TableOfCompare } from "./TableOfCompare";
import type { PerformanceIndexesResponse } from "@/types/schema/indexes";
import type { FC } from "react";
import { useTableCompareContext } from "./TableCompareProvider";

type TableOfCompareClientProps = {
  indexes: PerformanceIndexesResponse;
};

export const TableOfCompareClient: FC<TableOfCompareClientProps> = ({
  indexes,
}) => {
  const { funds, length } = useTableCompareContext();

  return <TableOfCompare indexes={indexes} funds={funds} length={length} />;
};
