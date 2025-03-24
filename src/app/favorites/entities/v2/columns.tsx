//TODO: WishlistAndCompare should be move to shared
import { WishlistAndCompare } from "@/app/funds/(index)/entities/v2/TableAdapterClient/ui/WishlistAndCompare";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { ReportButton } from "@/entities/v2/ReportButton";
import { CellWithTwoRow } from "@/shared/ui/HelperOfTable/CellWithTwoRow";
import type {
  AccessorWishlist,
  WishlistByIdResponse,
} from "@/types/schema/user/wishlist";
import { createColumnHelper } from "@tanstack/react-table";

import Minus from "@/assets/icons/Minus.svg";
import Plus from "@/assets/icons/Plus.svg";
import { SIZE_PROPS } from "@/shared/lib/icons";
import { cellWithPostfix } from "@/utils/calcCell";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";
import { formattedDate } from "@/utils/actionsWithDate";

import styles from "./TableOfMyListClient.module.css";
import { Typography } from "@/components/Typography";
import stylesLayout from "@/styles/module/Layout.module.css";
import clsx from "clsx";
import { columnHeaderFundFirm } from "@/app/funds/(index)/(home)/entities/FundFirm";
import { ROUTE_PATHS } from "@/shared/routes";
import {
  subtitleOptions,
  titleOptions,
} from "@/shared/ui/HelperOfTable/CellWithTwoRow/consts";
import { roundUpTo } from "@/utils/currency";
import { percentSort } from "@/shared/utils/percentSort";

const columnHelper = createColumnHelper<AccessorWishlist>();

export const columns = [
  columnHelper.accessor("expander", {
    header: () => null,
    cell: ({ row }) =>
      row.getCanExpand() && (
        <ButtonOrLink
          className={styles.expander}
          onClick={row.getToggleExpandedHandler()}
          asTag="button"
          type="button"
        >
          {row.getIsExpanded() ? (
            <Minus {...SIZE_PROPS} />
          ) : (
            <Plus {...SIZE_PROPS} />
          )}
        </ButtonOrLink>
      ),
    enableSorting: false,
  }),

  columnHelper.accessor("__fund.name", {
    header: "Fund Name",
    cell: ({ row }) => {
      const { __fund } = row.original;

      return (
        <ButtonOrLink
          className={styles.nameLink}
          href={ROUTE_PATHS.FUND_BY_ID.BASE(
            __fund.slug,
            row.original?.share_class.slug
          )}
          asTag="a"
        >
          <CellWithTwoRow
            title={__fund?.name}
            subtitle={__fund?.abbreviation}
          />
        </ButtonOrLink>
      );
    },
    enableSorting: false,
  }),

  columnHelper.accessor("share_class.name", {
    header: () => (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title="Share Class"
        subtitle="Currency"
      />
    ),
    cell: ({ row }) => (
      <CellWithTwoRow
        title={row?.original?.share_class?.name}
        subtitle={row?.original?.currency?.name}
      />
    ),
    enableSorting: false,
    cellStyles: {
      textWrap: "nowrap",
    },
  }),

  ...columnHeaderFundFirm,

  columnHelper.accessor("__fund.asset_class", {
    header: "Main Asset class",
    enableSorting: false,
    cell: ({ renderValue }) => <Typography>{renderValue()}</Typography>,
  }),

  columnHelper.accessor("one_month", {
    header: () => (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title="Nav"
        subtitle="Date"
      />
    ),
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
  }),

  columnHelper.accessor("ytd", {
    header: () => (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title="YTD"
        subtitle="Date"
      />
    ),
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
  }),

  columnHelper.accessor("since_inception_annualized", {
    header: () => (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title="Annualized"
        subtitle="Since inception"
      />
    ),
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
  }),

  columnHelper.accessor("__fund.aum.value", {
    header: () => (
      <CellWithTwoRow
        titleOptions={titleOptions}
        subtitleOptions={subtitleOptions}
        title="Fund AuM, M"
        subtitle="Currency"
      />
    ),
    cell: ({ row }) => {
      const { __fund } = row.original;
      return (
        <CellWithTwoRow
          title={roundUpTo(__fund?.aum?.value)}
          subtitle={__fund?.currency?.name}
        />
      );
    },
    cellClassName: "rt-tr-align-right",
    cellStyles: {
      textWrap: "nowrap",
    },
  }),

  columnHelper.accessor("fund.monthly_report", {
    header: () => <></>,
    cell: ({ row }) => (
      <div
        className={clsx(stylesLayout.Flex, stylesLayout.AIC, stylesLayout.FDC)}
      >
        <ReportButton report={row.original?.__fund?.monthly_report} />
        {row.original?.__fund?.monthly_report?.url && (
          <Typography
            style={{
              whiteSpace: "nowrap",
            }}
            as="h6"
            color="primary-50"
          >
            {formattedDate(row.original?.updated_at, GLOBAL_OPTIONS_DATE)}
          </Typography>
        )}
      </div>
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("actions", {
    header: () => <></>,
    cell: ({ row, table }) => {
      const removeRow = (id) => table?.options?.meta?.removeRow(id);
      return <WishlistAndCompare row={{ ...row, removeRow }} />;
    },
    enableSorting: false,
  }),
];
