'use client'
/**
 * The component for table,
 * render fund name and class name
 */
import { memo, type FC } from "react";

import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";

import styles from "./TableAdapterClient.module.css";
import type { Row } from "@tanstack/react-table";
import type { AccessorFundFormatted } from "@/types/schema/funds";
import stylesHeaderCell from './HeaderCellFundClient.module.css';


import Minus from "@/assets/icons/Minus.svg";
import Plus from "@/assets/icons/Plus.svg";
import { CellWithTwoRow } from "@/shared/ui/HelperOfTable/CellWithTwoRow";
import { usePathname } from "next/navigation";
import { ROUTE_PATHS } from "@/shared/routes";
import { ArrowPrev } from "@/shared/ui/HelperOfTable/ArrowNavigation";

type HeaderCellClientProps = {
  row: Row<AccessorFundFormatted>;
};

/**
 * 
 * TODO: Move to shared
 * 
 */

export const HeaderCellFundClient: FC<HeaderCellClientProps> = ({
  row,
}) => {
  const pathname = usePathname();
  const strategyDataPath = pathname.includes(ROUTE_PATHS.INDEX.STRATEDY_DATA);

  return (
    <div className={stylesHeaderCell.cellBlockMainHeader}>
      <CellWithTwoRow
        title={row.original?.__fund?.name}
        subtitle={row.original?.__fund?.abbreviation}
      />
      {!strategyDataPath && row.getCanExpand() && (
        <ButtonOrLink
          className={styles.expandedButton}
          onClick={(event) => {
            event.stopPropagation()
            row.getToggleExpandedHandler()()
          }}
          asTag="button"
        >
          {row.getIsExpanded() ? <Minus width="24" height="24" /> : <Plus width="24" height="24" />}
          <Typography color="accent">classes</Typography>
        </ButtonOrLink>
      )}
    </div>

  );
}

export const HeaderCellClassClient: FC<HeaderCellClientProps> = memo(({
  row,
}) => {
  return (
    <div className={stylesHeaderCell.cellBlockClassName}>
      <CellWithTwoRow
        title={row.original?.share_class?.name}
        subtitle={row.original?.currency?.name}
      />
    </div>
  );
})

HeaderCellClassClient.displayName = "HeaderCellClassClient";

export const columnsHeaderFundAndClass = [
  {
    id: "fund_name",
    cell: ({ row }) => <HeaderCellFundClient row={row} />,
    enableSorting: false
  },
  {
    id: "share_class_name",
    header: () => <div className={stylesHeaderCell.cellWithArrowPrev}> <ArrowPrev /></div>,
    cell: ({ row }) => <HeaderCellClassClient row={row} />,
    enableSorting: false
  },
]