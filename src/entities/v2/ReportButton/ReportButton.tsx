import type { FC } from "react";
import clsx from "clsx";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import type { DocumentDetail } from "@/types/schema/funds";
import { Document } from "@/assets/icons/documents";

import styles from "./ReportButton.module.css";
import { TOOLTIP_ID } from "@/entities/TooltipProvider";
import { SIZE_PROPS } from "@/shared/lib/icons";
import { Block } from "@/shared/ui/Block";
import stylesLayout from "@/styles/module/Layout.module.css";
import { Typography } from "@/components/Typography";
import { formattedDate } from "@/utils/actionsWithDate";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";

type ReportButtonProps = {
  report: DocumentDetail | null;
};

const TOOLTIP_OPTIONS = {
  "data-tooltip-id": TOOLTIP_ID,
  "data-tooltip-content": "FactSheet",
  "data-tooltip-place": "top",
};

export const ReportButton: FC<ReportButtonProps> = ({ report }) => {
  if (!report?.url) {
    console.warn("No monthly report url found");
    return null;
  }

  return (
    <ButtonOrLink
      asTag="a"
      href={report.url}
      target="_blank"
      className={styles.button}
      {...TOOLTIP_OPTIONS}
      onClick={(e) => e.stopPropagation()}
    >
      <Document {...SIZE_PROPS} />
    </ButtonOrLink>
  );
};

export const columnHeaderReportButton = [
  {
    id: "__fund.monthly_report",
    header: () => <></>,
    cell: ({ row }) => (
      <Block
        className={clsx(stylesLayout.Flex, stylesLayout.AIC, stylesLayout.FDC)}
      >
        <ReportButton report={row.original.__fund.monthly_report} />
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
      </Block>
    ),
    enableSorting: false,
  },
];
