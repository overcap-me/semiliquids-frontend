"use client";
import { useCallback, useRef, useState, type FC } from "react";
import clsx from "clsx";

import { Block } from "@/shared/ui/Block";
import { Typography } from "@/components/Typography";
import { Narrow, Wrapper } from "@/components/Wrapper";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { LineChartWithTooltip } from "@/shared/ui/charts/Graphic";

import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";
import styles from "./BlockTabsWithChart.module.css";

import {
  FALLBACK_NAME_FUND,
  mutatorDataForChart,
} from "@/shared/ui/charts/utils/getValuesForMonths";
import { SwitcherChart } from "@/shared/ui/charts/SwitcherChart";

import { colors } from "@/shared/ui/charts/colors/colorsOrder";

import { useFundContext } from "../../../contexts/FundProvider";
import { GrowthNotice } from "./GrowthNotice";
import { useToggleSwitcher } from "./useToggleSwitcher";
import { GLOBAL_TEXT } from "@/shared/content/globalText";

export type Period =
  | "three_month"
  | "six_month"
  | "ytd"
  | "one_year"
  | "three_years"
  | "all";

const list: { id: Period; title: string }[] = [
  {
    id: "three_month",
    title: "3 months",
  },
  {
    id: "six_month",
    title: "6 months",
  },
  {
    id: "ytd",
    title: "YTD",
  },
  {
    id: "one_year",
    title: "1 year",
  },
  {
    id: "three_years",
    title: "3 years",
  },
  {
    id: "all",
    title: "All",
  },
];

type TabsProps = {
  handleTabChange: (tab: Period) => void;
  activeId: Period;
};

export const TabsOfChart: FC<TabsProps> = ({ handleTabChange, activeId }) => {
  return (
    <Block className={clsx(stylesLayout.Flex, stylesLayout.Gap_16)}>
      {list.map(({ title, id }, index) => (
        <ButtonOrLink
          onClick={() => handleTabChange(id)}
          key={id}
          className={styles.tab}
          pointDirection="bottom"
          color="active"
          asTag="button"
          isActive={activeId === id}
        >
          <Typography as="h6">{title}</Typography>
        </ButtonOrLink>
      ))}
    </Block>
  );
};

export const BlockTabsWithChart = () => {
  const { data, currentData, perfomancesIndex } = useFundContext();
  const values = currentData?.performance ?? [];
  const abbreviation = data?.abbreviation ?? FALLBACK_NAME_FUND;

  const svgRef = useRef<SVGSVGElement | null>(null);

  const result = mutatorDataForChart({
    performances: {
      [abbreviation as string]: values,
    },
    indexes: perfomancesIndex,
  });

  const [__data, __setData] = useState(result.charts);

  const [__activeTab, __setActiveTab] = useState<Period>("all");

  const handlePickupData = useCallback((id: Period) => {
    __setActiveTab(id);
  }, []);

  const switcher = useToggleSwitcher(svgRef, result.names);

  return (
    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x100}>
      <Narrow type="extra">
        <Block spacing="smm">
          <Typography spacing="xxs" as="h2">
            Performance
          </Typography>

          {currentData?.share_class?.name && (
            <Typography size="xs">
              Share {currentData?.share_class?.name}
            </Typography>
          )}
        </Block>

        <Block spacing="smm">
          <TabsOfChart
            activeId={__activeTab}
            handleTabChange={handlePickupData}
          />
        </Block>

        {__data.get(__activeTab)?.values?.length > 0 && (
          <Block
            className={clsx(stylesLayout.Flex, stylesLayout.JCSB)}
            spacing="smm"
          >
            <GrowthNotice
              data={__data
                .get(__activeTab)
                ?.values?.filter((it) => it.__id === abbreviation)}
              date={currentData?.updated_at}
            />

            <Block
              className={clsx(
                stylesLayout.Flex,
                stylesLayout.AIE,
                stylesLayout.Gap_24
              )}
            >
              {Object.entries(result.names).map(([_, { key, name }], index) => (
                <SwitcherChart
                  key={key}
                  onClick={switcher.handleToggleSwitcher}
                  canSwitch={key === abbreviation?.toLocaleLowerCase()}
                  id={key}
                  name={name}
                  color={colors[index]}
                  selected={switcher.store[key].active}
                />
              ))}
            </Block>
          </Block>
        )}

        <Block spacing="m">
          <LineChartWithTooltip
            activeLines={switcher.store}
            svgRef={svgRef}
            data={__data.get(__activeTab)}
          />
        </Block>
        <Typography
          align="center"
          className={styles.caption}
          as="h6"
          color="primary-50"
        >
          {GLOBAL_TEXT.charts.graphic.caption}
        </Typography>
      </Narrow>
    </Wrapper>
  );
};
