"use client";
import { columnsHeaderFundAndClass } from "@/app/funds/(index)/entities/v2/TableAdapterClient";
import { columnsActionsWishlistCompare } from "@/app/funds/(index)/entities/v2/TableAdapterClient/ui/WishlistAndCompare";
import { columnHeaderFundFirm } from "@/app/funds/(index)/(home)/entities/FundFirm";

import { CellWithTwoRow } from "@/shared/ui/HelperOfTable/CellWithTwoRow";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";
import { formattedDate } from "@/utils/actionsWithDate";
import { cellWithPostfix } from "@/utils/calcCell";
import {
  subtitleOptions,
  titleOptions,
} from "@/shared/ui/HelperOfTable/CellWithTwoRow/consts";
import { roundUpTo } from "@/utils/currency";
import { Typography } from "@/components/Typography";
import { percentSort } from "@/shared/utils/percentSort";

export const columns = [
  ...columnsHeaderFundAndClass,
  ...columnHeaderFundFirm,

  {
    header: "Main Asset class",
    accessorKey: "__fund.asset_class",
    enableSorting: false,
    cell: ({ renderValue }) => <Typography>{renderValue()}</Typography>,
    cellClassName: "rt-tr-align-left",
  },

  {
    header: () => (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title="Nav"
        subtitle="Date"
      />
    ),
    accessorKey: "one_month",
    cell: ({ row, renderValue }) => (
      <CellWithTwoRow
        title={cellWithPostfix(renderValue(), "%")}
        subtitle={formattedDate(row?.original?.updated_at, GLOBAL_OPTIONS_DATE)}
      />
    ),
    sortingFn: percentSort,
    cellClassName: "rt-tr-align-right",
    cellStyles: {
      textWrap: "nowrap",
    },
  },

  {
    header: (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title="YTD"
        subtitle="Date"
      />
    ),
    accessorKey: "ytd",
    cell: ({ row, renderValue }) => (
      <CellWithTwoRow
        title={cellWithPostfix(renderValue(), "%")}
        subtitle={formattedDate(row?.original?.updated_at, GLOBAL_OPTIONS_DATE)}
      />
    ),
    // sortingFn: percentSort,
    cellClassName: "rt-tr-align-right",
    cellStyles: {
      textWrap: "nowrap",
    },
  },

  {
    header: (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title="Annualized"
        subtitle="Since inception"
      />
    ),
    accessorKey: "since_inception_annualized",
    cell: ({ row, renderValue }) => (
      <CellWithTwoRow
        title={cellWithPostfix(renderValue(), "%")}
        subtitle={
          row?.original?.inception_date &&
          formattedDate(row?.original?.inception_date, GLOBAL_OPTIONS_DATE)
        }
      />
    ),
    sortingFn: percentSort,
    cellClassName: "rt-tr-align-right",
    cellStyles: {
      textWrap: "nowrap",
    },
  },

  {
    header: (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title="Fund AuM, M"
        subtitle="Currency"
      />
    ),
    accessorKey: "__fund.aum.value",
    cell: ({ row }) => {
      return (
        <CellWithTwoRow
          title={roundUpTo(row.original?.__fund?.aum?.value)}
          subtitle={row?.original?.__fund?.currency?.name}
        />
      );
    },
    cellClassName: "rt-tr-align-right",
    cellStyles: {
      textWrap: "nowrap",
    },
  },

  ...columnsActionsWishlistCompare,
];
