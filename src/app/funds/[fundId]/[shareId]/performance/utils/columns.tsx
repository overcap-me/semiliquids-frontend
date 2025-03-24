import type { ClassDetail, PerformanceDetail } from "@/types/schema/funds";
import { cellWithPostfix } from "@/utils/calcCell";
import { createColumnHelper } from "@tanstack/react-table";

const cellStyles = {
  cellStyles: { textWrap: "nowrap", }
}

const DirectionRight = 'rt-tr-align-right';
const DirectionLeft = 'rt-tr-align-left';

const columnHelperSummary = createColumnHelper<ClassDetail>();
export const columnsSummary = [
  columnHelperSummary.accessor("share_class.name", {
    header: "",
    cell: (info) => info.getValue(),
  }),
  columnHelperSummary.accessor("one_month", {
    header: "1 month",
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
    ...cellStyles,
  }),
  columnHelperSummary.accessor("three_month", {
    header: "3 months",
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
    ...cellStyles,
  }),
  columnHelperSummary.accessor("ytd", {
    header: "YTD",
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
    ...cellStyles,
  }),
  columnHelperSummary.accessor("one_year", {
    header: "1 year",
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
    ...cellStyles,
  }),
  columnHelperSummary.accessor("three_years_annualized", {
    header: "3 years",
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
    ...cellStyles,
  }),
  columnHelperSummary.accessor("since_inception_cumulative", {
    header: () => <> Since Inception, <br /> cumulative</>,
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
    ...cellStyles,
  }),
  columnHelperSummary.accessor("since_inception_annualized", {
    header: () => <> Since Inception, <br /> annualized</>,
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
    ...cellStyles,
  }),
];

const columnHelperMonthly = createColumnHelper<PerformanceDetail>();
export const columnsMonthly = [
  columnHelperMonthly.accessor("year", {
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("jan", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("feb", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("mar", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("apr", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("may", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("jun", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("jul", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("aug", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("sep", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("oct", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("nov", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("dec", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
  columnHelperMonthly.accessor("ytd", {
    cell: (info) => cellWithPostfix(info.getValue(), "%"),
    cellClassName: DirectionRight,
  }),
];
