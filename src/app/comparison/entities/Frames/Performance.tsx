import type { FC } from "react";
import { Chapter } from "../../ui/Chapter";
import { Row } from "../../ui/Row";

import { Head } from "../../ui/Head";
import { Cell } from "../../ui/Cell";
import { cellWithPostfix } from "@/utils/calcCell";
import { CellWithTwoRow } from "@/shared/ui/HelperOfTable/CellWithTwoRow";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";
import { formattedDate } from "@/utils/actionsWithDate";
import { PerformanceChart } from "../PerformanceChart";
import type { PerformanceIndexesResponse } from "@/types/schema/indexes";
import type { FundByIdCompareResponse } from "@/types/schema/compare";
import { Typography } from "@/components/Typography";
import { subtitleOptions } from "./constans";

type PerformanceProps = {
  funds: FundByIdCompareResponse[];
  indexes: PerformanceIndexesResponse;
  length: number;
};

export const Performance: FC<PerformanceProps> = ({
  funds,
  indexes,
  length,
}) => {
  return (
    <>
      <Row>
        <Chapter colSpan={length}>Performance</Chapter>
      </Row>

      <Row>
        <th colSpan={length + 1}>
          <PerformanceChart indexes={indexes} data={funds} />
        </th>
      </Row>

      <Row>
        <Head subtitle="Date" subtitleOptions={subtitleOptions}>1 Month</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id} as="div">
            <CellWithTwoRow
              title={cellWithPostfix(cls?.one_month, "%")}
              subtitle={formattedDate(cls?.updated_at, GLOBAL_OPTIONS_DATE)}
            />
          </Cell>
        ))}
      </Row>

      <Row>
        <Head>3 Months</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id}>{cellWithPostfix(cls?.three_month, "%")}</Cell>
        ))}
      </Row>

      <Row>
        <Head>6 Months</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id}>{cellWithPostfix(cls?.six_month, "%")}</Cell>
        ))}
      </Row>

      <Row>
        <Head>YTD</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id}>{cellWithPostfix(cls?.ytd, "%")}</Cell>
        ))}
      </Row>

      <Row>
        <Head>1 year</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id}>{cellWithPostfix(cls?.one_year, "%")}</Cell>
        ))}
      </Row>

      <Row>
        <Head>3 Years <br /> annualized</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id}>{cellWithPostfix(cls?.three_years_annualized, "%")}</Cell>
        ))}
      </Row>

      <Row>
        <Head subtitle="Date" subtitleOptions={subtitleOptions}>Since Inception</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id} as="div">
            <CellWithTwoRow
              title={cellWithPostfix(cls?.since_inception_cumulative, "%")}
              subtitle={cls?.inception_date && formattedDate(cls?.inception_date, GLOBAL_OPTIONS_DATE)}
            />
          </Cell>
        ))}
      </Row>

      <Row>
        <Head>Since Inception Annualized</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id}>
            {cellWithPostfix(cls?.since_inception_annualized, "%")}
          </Cell>
        ))}
      </Row>
    </>
  );
};
