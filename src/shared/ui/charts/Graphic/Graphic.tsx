import type React from "react";
import { type FC, useRef } from "react";

import styles from "../Charts.module.css";
import { GraphicTooltip } from "./GraphicTooltip";
import type { LineStoreOfSwitcher } from "@/app/funds/[fundId]/[shareId]/performance/entities/BlockTabsWithChart/useToggleSwitcher";

import { Block } from "../../Block";
import { Typography } from "@/components/Typography";
import { GLOBAL_TEXT } from "@/shared/content/globalText";
import { useLineWithTooltip } from "./useLineWithTooltip";

type LineChartWithTooltipProps = {
  data: {
    values: {
      __id: string;
      __nameTooltip: string;

      month: string;
      year: number;

      Date: Date;
      Value: number;
    }[];
  };
  svgRef: React.RefObject<SVGSVGElement>;

  activeLines: LineStoreOfSwitcher;
};

export const LineChartWithTooltip: FC<LineChartWithTooltipProps> = ({
  data,
  svgRef,
  activeLines,
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const { storeTooltip } = useLineWithTooltip({
    data: data?.values ?? [],
    svgRef,
    tooltipRef,
    activeLines,
  });

  if (data?.values?.length === 0) {
    return (
      <Block>
        <Typography align="center" as="h3" spacing="s">
          {data?.message ?? GLOBAL_TEXT.charts.graphic.empty.title}
        </Typography>
      </Block>
    );
  }

  return (
    <div className={styles.wrapper}>
      <GraphicTooltip
        tooltipRef={tooltipRef}
        date={storeTooltip.date}
        items={storeTooltip.items}
      />

      <svg ref={svgRef} className={styles.chart} />
    </div>
  );
};
