"use client";
import { columnsHeaderFundAndClass } from "@/app/funds/(index)/entities/v2/TableAdapterClient/HeaderCellFundClient";
import { columnsActionsWishlistCompare } from "@/app/funds/(index)/entities/v2/TableAdapterClient/ui/WishlistAndCompare";
import { Typography } from "@/components/Typography";
import { CellWithTwoRow } from "@/shared/ui/HelperOfTable/CellWithTwoRow";
import {
  subtitleOptions,
  titleOptions,
} from "@/shared/ui/HelperOfTable/CellWithTwoRow/consts";
import { formattedDate } from "@/utils/actionsWithDate";
import { cellWithPostfix } from "@/utils/calcCell";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";

const cellStyles = {
  cellStyles: { textWrap: "nowrap" },
};

export const columns = [
  ...columnsHeaderFundAndClass,

  {
    header: () => (
      <CellWithTwoRow
        titleOptions={{ ...titleOptions, textWrap: "nowrap" }}
        subtitleOptions={subtitleOptions}
        title="1 Month"
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
    enableSorting: false,
    cellClassName: "rt-tr-align-right",
    ...cellStyles,
  },
  {
    header: () => (
      <Typography as="h6" textWrap="nowrap" {...titleOptions}>
        3 Months
      </Typography>
    ),
    accessorKey: "three_month",
    cell: ({ renderValue }) => (
      <Typography>{cellWithPostfix(renderValue(), "%")}</Typography>
    ),
    enableSorting: false,
    cellClassName: "rt-tr-align-right",
  },
  {
    header: () => (
      <Typography as="h6" textWrap="nowrap" {...titleOptions}>
        YTD
      </Typography>
    ),
    accessorKey: "ytd",
    cell: ({ renderValue }) => (
      <Typography>{cellWithPostfix(renderValue(), "%")}</Typography>
    ),
    enableSorting: false,
    cellClassName: "rt-tr-align-right",
  },

  {
    header: () => (
      <Typography as="h6" textWrap="nowrap" {...titleOptions}>
        1 Year
      </Typography>
    ),
    accessorKey: "one_year",
    cell: ({ renderValue }) => (
      <Typography>{cellWithPostfix(renderValue(), "%")}</Typography>
    ),
    enableSorting: false,
    cellClassName: "rt-tr-align-right",
  },

  {
    header: () => (
      <Typography as="h6" textWrap="nowrap" {...titleOptions}>
        3 Years <br /> annualized
      </Typography>
    ),
    accessorKey: "three_years_annualized",
    cell: ({ renderValue }) => (
      <Typography>{cellWithPostfix(renderValue(), "%")}</Typography>
    ),
    enableSorting: false,
    cellClassName: "rt-tr-align-right",
  },

  {
    header: () => (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title={
          <>
            Since <br /> Inception
          </>
        }
        subtitle="Date"
      />
    ),
    accessorKey: "since_inception_cumulative",
    cell: ({ row, renderValue }) => (
      <CellWithTwoRow
        title={cellWithPostfix(renderValue(), "%")}
        subtitle={formattedDate(
          row?.original?.inception_date,
          GLOBAL_OPTIONS_DATE
        )}
      />
    ),
    enableSorting: false,
    cellClassName: "rt-tr-align-right",
    ...cellStyles,
  },
  {
    header: () => (
      <Typography as="h6" textWrap="nowrap" {...titleOptions}>
        Since Inception <br /> Annualized
      </Typography>
    ),
    accessorKey: "since_inception_annualized",
    cell: ({ renderValue }) => (
      <Typography>{cellWithPostfix(renderValue(), "%")}</Typography>
    ),
    enableSorting: false,
    cellClassName: "rt-tr-align-right",
    ...cellStyles,
  },

  ...columnsActionsWishlistCompare,
];
