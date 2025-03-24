"use client";
import { Typography } from "@/components/Typography";
import { Narrow, Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { cellWithPrefix } from "@/utils/calcCell";

import { formattedDate } from "@/utils/actionsWithDate";
import { PREFIX_AS_DATE } from "@/utils/constans";
import { hasData } from "@/utils/hasData";
import { useFundContext } from "../contexts/FundProvider";
import { optionsOfDate } from "../ui/BannerFundById/BannerFundById";
import { SuspenseConditional } from "@/ui/SuspenseConditional";

import { BlockTabsWithChart } from "./entities/BlockTabsWithChart";
import { Table } from "../ui/Table";
import { columnsMonthly, columnsSummary } from "./utils/columns";
import { GLOBAL_TEXT } from "@/shared/content/globalText";

const PerformancePage = () => {
  const { data, currentData } = useFundContext();
  const classes = data?.classes ?? [];

  return (
    <SuspenseConditional>
      {
        hasData(currentData?.performance) && (
          <BlockTabsWithChart />
        )
      }

      {hasData(currentData?.performance) && (
        <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x80}>
          <Narrow type="extra">
            <Typography as="div" spacing="smm">
              <Typography spacing="xxs" as="h2">
                Monthly Returns
              </Typography>
              <Typography size="xs">
                Share {currentData?.share_class?.name}
              </Typography>
            </Typography>

            <Table columns={columnsMonthly} data={currentData?.performance} />

            <Typography as="h6" size="xxs" color="primary-50">
              {GLOBAL_TEXT.monthlyReturns.caption}
            </Typography>
          </Narrow>
        </Wrapper>
      )}

      {hasData(classes) && (
        <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x100}>
          <Narrow type="extra">
            <Typography as="div" spacing="smm">
              <Typography spacing="xxs" as="h2">
                Return Summary
              </Typography>
              <Typography size="xs" color="primary-50">
                {cellWithPrefix(
                  formattedDate(currentData?.updated_at, optionsOfDate),
                  PREFIX_AS_DATE,
                )}
              </Typography>
            </Typography>

            <Table columns={columnsSummary} data={classes} />
          </Narrow>
        </Wrapper>
      )}
    </SuspenseConditional>
  );
};

export default PerformancePage;
