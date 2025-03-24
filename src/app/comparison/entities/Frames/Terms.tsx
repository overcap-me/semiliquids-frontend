import type { FC } from "react";
import { Chapter } from "../../ui/Chapter";
import { Row } from "../../ui/Row";

import { Head } from "../../ui/Head";
import { Cell } from "../../ui/Cell";

import { Typography } from "@/components/Typography";
import { TextView } from "@/app/funds/[fundId]/[shareId]/ui/TextView";
import type { FundByIdCompareResponse } from "@/types/schema/compare";
import { strToArray } from "@/utils/strToArray";

type TermsProps = {
  funds: FundByIdCompareResponse[];
  length: number;
};

export const Terms: FC<TermsProps> = ({ funds, length }) => {
  return (
    <>
      <Row>
        <Chapter colSpan={length}>Terms</Chapter>
      </Row>

      <Row>
        <Head>FUND DOMICILE</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id}>{cls?.fund_domicile}</Cell>
        ))}
      </Row>

      <Row>
        <Head>MINIMUM INVESTMENT</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id}>{cls?.minimum_investment}</Cell>
        ))}
      </Row>

      <Row>
        <Head>FEES</Head>
        {funds?.map((cls) => {
          return (
            <Cell key={cls.id} as="div">
              {cls?.fees?.map((fee) => (
                <Typography key={fee}>{fee}</Typography>
              ))}
            </Cell>
          );
        })}
      </Row>

      <Row>
        <Head>SUBSCRIPTIONS</Head>
        {funds?.map((cls) => (
          <Cell as="div" key={cls?.id}>
            {strToArray(cls?.subscription)?.map((item) => {
              return <Typography key={item}>{item}</Typography>;
            })}
          </Cell>
        ))}
      </Row>

      <Row>
        <Head>LIQUIDITY</Head>
        {funds?.map((cls) => (
          <Cell as="div" key={cls?.id}>
            {strToArray(cls?.liquidity)?.map((item) => {
              return <Typography key={item}>{item}</Typography>;
            })}
          </Cell>
        ))}
      </Row>

      <Row>
        <Head>Other Terms</Head>
        {funds?.map((cls) => (
          <Cell key={cls?.id} as="div">
            <TextView
              content={cls?.other_terms?.content}
              type={cls?.other_terms?.type}
            />
          </Cell>
        ))}
      </Row>
    </>
  );
};
