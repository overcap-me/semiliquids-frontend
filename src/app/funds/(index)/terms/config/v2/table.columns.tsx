"use client";
import { columnsHeaderFundAndClass } from "@/app/funds/(index)/entities/v2/TableAdapterClient/HeaderCellFundClient";
import { columnsActionsWishlistCompare } from "@/app/funds/(index)/entities/v2/TableAdapterClient/ui/WishlistAndCompare";
import { Typography } from "@/components/Typography";
import { columnHeaderReportButton } from "@/entities/v2/ReportButton/ReportButton";
import { Fragment } from "react";

export const columns = [
  ...columnsHeaderFundAndClass,

  {
    header: "Fund Domicile",
    accessorKey: "fund_domicile",
    enableSorting: false,
    cell: ({ renderValue }) => <Typography>{renderValue()}</Typography>,
    cellClassName: "rt-tr-align-left",
  },
  {
    header: "Minimum Investment",
    accessorKey: "minimum_investment",
    enableSorting: false,
    cell: ({ renderValue }) => <Typography>{renderValue()}</Typography>,
    cellClassName: "rt-tr-align-left",
  },
  {
    header: "Fees",
    cell: ({ row }) => {
      return row.original?.fees?.map((value) => (
        <Typography key={value}>{value}</Typography>
      ));
    },
    enableSorting: false,
    cellClassName: "rt-tr-align-left",
  },

  {
    header: "Subscriptions",
    accessorKey: "subscription",
    enableSorting: false,
    cell: ({ renderValue }) => <Typography>{renderValue()}</Typography>,
    cellClassName: "rt-tr-align-left",
  },

  {
    header: "Liquidity",
    accessorKey: "liquidity",
    enableSorting: false,
    cell: ({ renderValue }) => <Typography>{renderValue()}</Typography>,
    cellClassName: "rt-tr-align-left",
  },

  ...columnHeaderReportButton,
  ...columnsActionsWishlistCompare,
];
