import type { FC } from "react";
import type { Row } from "@tanstack/react-table";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import { ROUTE_PATHS } from "@/shared/routes";
import type { FundResponse } from "@/types/schema/funds";

import styles from './FundFirm.module.css'
import { CellWithTwoRow } from "@/shared/ui/HelperOfTable/CellWithTwoRow";
import { titleOptions } from "@/shared/ui/HelperOfTable/CellWithTwoRow/consts";


type FundFirmProps = {
  /**
   * Row of the fund
   */
  row: Row<FundResponse>;
};

export const FundFirm: FC<FundFirmProps> = ({ row }) => {
  return (
    <ButtonOrLink
      color="accent"
      asTag="a"
      className={styles.button}
      href={ROUTE_PATHS.FIRM_BY_ID.BASE(row.original?.__fund?.manager.slug)}
      onClick={(e) => {
        e.stopPropagation();
      }}>
      <Typography>{row.original?.__fund?.manager?.name}</Typography>
    </ButtonOrLink>
  );
};

export const columnHeaderFundFirm = [
  {
    header: () => <CellWithTwoRow titleOptions={titleOptions} title="Fund Firm" />,
    accessorKey: "__fund.manager.name",
    cell: ({ row }) => <FundFirm row={row} />,
    cellClassName: 'rt-tr-align-left',
  },
];
