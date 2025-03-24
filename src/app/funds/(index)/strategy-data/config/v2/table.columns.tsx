"use client";
import { columnsHeaderFundAndClass } from "@/app/funds/(index)/entities/v2/TableAdapterClient/HeaderCellFundClient";
import { columnsActionsWishlistCompare } from "@/app/funds/(index)/entities/v2/TableAdapterClient/ui/WishlistAndCompare";
import { Typography } from "@/components/Typography";
import { addColorsForBarChart, BarLine } from "@/shared/ui/charts/BarLine";

import { cellWithPostfix } from "@/utils/calcCell";
import styles from "./StrategyData.module.css";

export const columns = [
  ...columnsHeaderFundAndClass,

  {
    header: "Asset Class",
    cell: ({ row }) => {
      return (
        <div className={styles.cellBlockWithChart}>
          <BarLine
            width={180}
            data={addColorsForBarChart(row?.original?.__fund?.asset_classes)}
          />
          {row?.original?.__fund?.asset_classes?.map((cls) => (
            <Typography key={cls.id}>
              {cls.asset_class} {cellWithPostfix(cls.value, "%")}
            </Typography>
          ))}
        </div>
      );
    },
    enableSorting: false,
    cellClassName: "rt-tr-align-left",
  },
  {
    header: "Strategy",

    cell: ({ row }) => {
      return (
        <div className={styles.cellBlockWithChart}>
          <BarLine
            width={180}
            data={addColorsForBarChart(row?.original?.__fund?.strategies)}
          />
          {row?.original?.__fund?.strategies?.map((cls) => (
            <Typography key={cls.id}>
              {cls.strategy} {cellWithPostfix(cls.value, "%")}
            </Typography>
          ))}
        </div>
      );
    },
    enableSorting: false,
    cellClassName: "rt-tr-align-left",
  },
  {
    header: "Investment type",
    cell: ({ row }) => {
      return (
        <div className={styles.cellBlockWithChart}>
          <BarLine
            width={180}
            data={addColorsForBarChart(row?.original?.__fund?.investment_types)}
          />
          {row?.original?.__fund?.investment_types?.map((cls) => (
            <Typography key={cls.id}>
              {cls.investment_type} {cellWithPostfix(cls.value, "%")}
            </Typography>
          ))}
        </div>
      );
    },
    enableSorting: false,
    cellClassName: "rt-tr-align-left",
    cellStyles: {
      textWrap: "nowrap",
    },
  },
  {
    header: "Geo Focus",

    cell: ({ row }) => {
      return (
        <div className={styles.cellBlockWithChart}>
          <BarLine
            width={180}
            data={addColorsForBarChart(row?.original?.__fund?.focuses)}
          />
          {row?.original?.__fund?.focuses?.map((cls) => (
            <Typography key={cls.id}>
              {cls.focus} {cellWithPostfix(cls.value, "%")}
            </Typography>
          ))}
        </div>
      );
    },
    enableSorting: false,
    cellClassName: "rt-tr-align-left",
  },
  {
    header: "Core Industries",
    cell: ({ row }) => {
      return (
        <div className={styles.cellBlockWithChart}>
          <BarLine
            width={180}
            data={addColorsForBarChart(row?.original?.__fund?.industries)}
          />
          {row?.original?.__fund?.industries?.map((cls) => (
            <Typography key={cls.id}>
              {cls.industry} {cellWithPostfix(cls.value, "%")}
            </Typography>
          ))}
        </div>
      );
    },
    enableSorting: false,
    cellClassName: "rt-tr-align-left",
  },

  ...columnsActionsWishlistCompare,
];
