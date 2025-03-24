import type { FC } from "react";
import { Chapter } from "../../ui/Chapter";
import { Row } from "../../ui/Row";
import { Head } from "../../ui/Head";

import { Cell } from "../../ui/Cell";
import { Typography } from "@/components/Typography";
import { cellWithPostfix } from "@/utils/calcCell";
import { addColorsForBarChart, BarLine } from "@/shared/ui/charts/BarLine";
import type { FundByIdCompareResponse } from "@/types/schema/compare";

type PortfolioProps = {
  funds: FundByIdCompareResponse[];
  length?: number;
};

export const Portfolio: FC<PortfolioProps> = ({ funds, length }) => {
  return (
    <>
      <Row>
        <Chapter colSpan={length}>Portfolio</Chapter>
      </Row>

      <Row>
        <Head>ASSET CLASS</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id} as="div">
            <BarLine data={addColorsForBarChart(cls?.__fund?.asset_classes)} />
            {cls?.__fund?.asset_classes?.map((asset) => (
              <Typography key={asset.id}>
                {asset?.asset_class} {cellWithPostfix(asset?.value, "%")}
              </Typography>
            ))}
          </Cell>
        ))}
      </Row>

      <Row>
        <Head>STRATEGY</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id} as="div">
            <BarLine data={addColorsForBarChart(cls?.__fund?.strategies)} />
            {cls?.__fund?.strategies?.map((strt) => (
              <Typography key={strt.id}>
                {strt.strategy} {cellWithPostfix(strt.value, "%")}
              </Typography>
            ))}
          </Cell>
        ))}
      </Row>


      <Row>
        <Head>Investment type</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id} as="div">
            <BarLine data={addColorsForBarChart(cls?.__fund?.investment_types)} />
            {cls?.__fund?.investment_types?.map((invs) => (
              <Typography key={invs.id}>
                {invs.investment_type} {cellWithPostfix(invs.value, "%")}
              </Typography>
            ))}
          </Cell>
        ))}
      </Row>

      <Row>
        <Head>Geo Focus</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id} as="div">
            <BarLine data={addColorsForBarChart(cls?.__fund?.focuses)} />
            {cls?.__fund?.focuses?.map((fcs) => (
              <Typography key={fcs.id}>
                {fcs.focus} {cellWithPostfix(fcs.value, "%")}
              </Typography>
            ))}
          </Cell>
        ))}
      </Row>

      <Row>
        <Head>Core Industries</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id} as="div">
            <BarLine data={addColorsForBarChart(cls?.__fund?.industries)} />
            {cls?.__fund?.industries?.map((inds) => (
              <Typography key={inds.id}>
                {inds.industry} {cellWithPostfix(inds.value, "%")}
              </Typography>
            ))}
          </Cell>
        ))}
      </Row>
    </>
  );
};
