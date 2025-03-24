import type { FC } from "react";
import { Chapter } from "../../ui/Chapter";
import { Row } from "../../ui/Row";
import { Cell } from "../../ui/Cell";
import { Head } from "../../ui/Head";
import { cellWithPostfix } from "@/utils/calcCell";
import { CellWithTwoRow } from "@/shared/ui/HelperOfTable/CellWithTwoRow";
import { formattedDate } from "@/utils/actionsWithDate";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";
import { ReportButton } from "@/entities/v2/ReportButton";

import { Typography } from "@/components/Typography";

import styles from "../TableOfCompare/TableOfCompare.module.css";
import type { FundByIdCompareResponse } from "@/types/schema/compare";
import { roundUpTo } from "@/utils/currency";
import { subtitleOptions } from "./constans";

type SnapshotProps = {
  funds: FundByIdCompareResponse[];
  length?: number;
};


export const Snapshot: FC<SnapshotProps> = ({ funds, length }) => {
  return (
    <>
      <Row>
        <Chapter colSpan={length}>Snapshot</Chapter>
      </Row>

      {/* NAV */}
      <Row>
        <Head subtitle="Date" subtitleOptions={subtitleOptions}>NAV</Head>
        {funds?.map((cls) => {
          return (
            <Cell key={cls?.id} as="div">
              <CellWithTwoRow
                title={cellWithPostfix(cls?.one_month, "%")}
                subtitle={formattedDate(cls?.updated_at, GLOBAL_OPTIONS_DATE)}
              />
            </Cell>
          );
        })}
      </Row>

      {/* YTD */}
      <Row>
        <Head subtitle="Date" subtitleOptions={subtitleOptions}>YTD</Head>
        {funds?.map((cls) => {
          return (
            <Cell key={cls?.id} as="div">
              <CellWithTwoRow
                title={cellWithPostfix(cls?.ytd, "%")}
                subtitle={formattedDate(cls?.updated_at, GLOBAL_OPTIONS_DATE)}
              />
            </Cell>
          );
        })}
      </Row>

      {/* Annualized Since inception */}
      <Row>
        <Head subtitle="Since inception" subtitleOptions={subtitleOptions}>Annualized</Head>
        {funds?.map((cls) => {
          return (
            <Cell key={cls?.id} as="div">
              <CellWithTwoRow
                title={cellWithPostfix(cls?.since_inception_annualized, "%")}
                subtitle={cls?.inception_date && formattedDate(cls?.inception_date, GLOBAL_OPTIONS_DATE)}
              />
            </Cell>
          );
        })}
      </Row>

      {/* Fund AuM Currency */}
      <Row>
        <Head subtitle="Currency" subtitleOptions={subtitleOptions}>Fund AuM, M</Head>
        {funds?.map((cls) => {
          return (
            <Cell key={cls?.id} as="div">
              <CellWithTwoRow
                title={roundUpTo(cls?.__fund?.aum?.value)}
                subtitle={cls?.__fund?.currency?.name}
              />
            </Cell>
          );
        })}
      </Row>

      {/* Monthly Report */}
      <Row>
        <Head />
        {funds?.map((cls) => {
          return (
            <Cell
              key={cls?.id}
              as="div"
              classNameBody={styles.cellMonthlyReport}
            >
              <ReportButton report={cls?.__fund?.monthly_report} />
              {cls?.__fund?.monthly_report && (
                <Typography as="h6" color="primary-70">
                  {formattedDate(cls?.updated_at, GLOBAL_OPTIONS_DATE)}
                </Typography>
              )}
            </Cell>
          );
        })}
      </Row>
    </>
  );
};
