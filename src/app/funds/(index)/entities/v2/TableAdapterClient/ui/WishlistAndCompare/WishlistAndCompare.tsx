import type { FundResponse } from "@/types/schema/funds";

import type { Row } from "@tanstack/react-table";
import styles from "./WishlistAndCompare.module.css";

import { WishlistButton } from "@/entities/WishlistButton";

import { CompareButton } from "@/entities/compare/CompareButton";
import { ArrowNext } from "@/shared/ui/HelperOfTable/ArrowNavigation";

type WishlistAndCompareProps<T> = {
  row: Row<T>;
};

export const WishlistAndCompare = <T,>({ row }: WishlistAndCompareProps<T>) => {
  return (
    <div className={styles.buttons}>
      <CompareButton mode="minimal" classDetails={row.original} tooltip />
      <WishlistButton
        mode="minimal"
        classDetails={row.original}
        remove
        tooltip
        removeRow={row?.removeRow}
      />
    </div>
  );
};

export const columnsActionsWishlistCompare = [
  {
    id: "actions",
    header: () => (
      <div className={styles.cellWithArrowNext}>
        <ArrowNext />
      </div>
    ),
    cell: ({ row }: WishlistAndCompareProps<FundResponse>) => (
      <WishlistAndCompare row={row} />
    ),
    enableSorting: false,
  },
];
