"use client";
import type React from "react";
import styles from "./PerformanceChart.module.css";
import stylesLayout from "@/styles/module/Layout.module.css";
import {
  type Period,
  TabsOfChart,
} from "@/app/funds/[fundId]/[shareId]/performance/entities/BlockTabsWithChart/BlockTabsWithChart";
import { useCallback, useRef, useState } from "react";

import { Typography } from "@/components/Typography";
import clsx from "clsx";
import { LineChartWithTooltip } from "@/shared/ui/charts/Graphic";

import {
  getPerformanceBySpring,
  mutatorDataForChart,
} from "@/shared/ui/charts/utils/getValuesForMonths";
import { Narrow } from "@/components/Wrapper";

import { colors } from "@/shared/ui/charts/colors/colorsOrder";
import { SwitcherChart } from "@/shared/ui/charts/SwitcherChart";
import type { PerformanceIndexesResponse } from "@/types/schema/indexes";
import type { FundByIdCompareResponse } from "@/types/schema/compare";
import { useToggleSwitcher } from "@/app/funds/[fundId]/[shareId]/performance/entities/BlockTabsWithChart/useToggleSwitcher";
import { Block } from "@/shared/ui/Block";
import { GLOBAL_TEXT } from "@/shared/content/globalText";

type PerformanceChartProps = {
  data: FundByIdCompareResponse[];
  indexes: PerformanceIndexesResponse;
};

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data: funds,
  indexes,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const performanceBySpring = getPerformanceBySpring(funds);
  const springsList = Object.keys(performanceBySpring).map((key) => ({
    key,
    name: key,
  }));
  const abbreviationList = springsList.map(({ key }) =>
    key.toLocaleLowerCase()
  );

  const result = mutatorDataForChart({
    performances: performanceBySpring,
    indexes,
  });

  const data = result.charts;

  const [activeTab, setActiveTab] = useState<Period>("all");

  const handlePickupData = useCallback((id: Period) => {
    setActiveTab(id);
  }, []);

  const switcher = useToggleSwitcher(svgRef, result.names);

  return (
    <div className={styles.container}>
      <Narrow type="extra">
        <Typography as="div" spacing="smm" className={styles.header}>
          {data.get(activeTab)?.values?.length > 0 && (
            <TabsOfChart
              activeId={activeTab}
              handleTabChange={handlePickupData}
            />
          )}

          {data.get(activeTab)?.values?.length > 0 && (
            <Block
              className={clsx(
                stylesLayout.Flex,
                stylesLayout.AIC,
                stylesLayout.Gap_16
              )}
            >
              {Object.entries(result.names).map(([_, { key, name }], index) => {
                return (
                  <SwitcherChart
                    key={key}
                    onClick={switcher.handleToggleSwitcher}
                    canSwitch={abbreviationList.includes(key)}
                    id={key}
                    name={name}
                    color={colors[index]}
                    selected={switcher?.store[key]?.active}
                  />
                );
              })}
            </Block>
          )}
        </Typography>

        <Block spacing="m">
          <LineChartWithTooltip
            activeLines={switcher?.store}
            svgRef={svgRef}
            data={data.get(activeTab)}
          />
        </Block>
        <Typography as="h6" color="primary-50">
          {GLOBAL_TEXT.charts.graphic.caption}
        </Typography>
      </Narrow>
    </div>
  );
};
