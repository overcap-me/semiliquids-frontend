"use client";

import { Typography } from "@/components/Typography";
import { Narrow, Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import stylesLayout from "@/styles/module/Layout.module.css";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import styles from "./Terms.module.css";
import { useFundContext } from "../../contexts/FundProvider";
import { TextView } from "../../ui/TextView";
import { strToArray } from "@/utils/strToArray";

type RowProps = {
  title: string;
  children: ReactNode;
};

const Row: FC<RowProps> = ({ title, children }) => {
  return (
    <div className={clsx(stylesLayout.Grid, styles.row, styles.Gap_24)}>
      <Typography as="h3">{title}</Typography>
      <Typography as="div" color="primary-70">
        {children}
      </Typography>
    </div>
  );
};

const TermsPage = () => {
  const { currentData } = useFundContext();

  return (
    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
      <Narrow type="large">
        <div className={clsx(stylesLayout.Gap_40, stylesLayout.Grid)}>
          {currentData?.fund_domicile && (
            <Row title="Fund Domicile">
              <Typography>{currentData?.fund_domicile}</Typography>
            </Row>
          )}

          {currentData?.minimum_investment && (
            <Row title="Minimum Investment">
              <Typography>{currentData?.minimum_investment}</Typography>
            </Row>
          )}

          {currentData?.fees?.length > 0 && (
            <Row title="Fees">
              {currentData?.fees?.map((fee, index) => (
                <Typography key={index}>{fee}</Typography>
              ))}
            </Row>
          )}

          {currentData?.subscription && (
            <Row title="Subscriptions">
              {strToArray(currentData?.subscription)?.map((item) => {
                return <Typography key={item}>{item}</Typography>;
              })}
            </Row>
          )}

          {currentData?.liquidity && (
            <Row title="Liquidity">
              {strToArray(currentData?.liquidity)?.map((item) => {
                return <Typography key={item}>{item}</Typography>;
              })}
            </Row>
          )}

          {currentData?.other_terms && (
            <Row title="Other Terms">
              <TextView
                content={currentData?.other_terms?.content}
                type={currentData?.other_terms?.type}
              />
            </Row>
          )}
        </div>
      </Narrow>
    </Wrapper>
  );
};
export default TermsPage;
