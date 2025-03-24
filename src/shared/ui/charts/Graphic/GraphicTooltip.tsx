import type { FC, RefObject } from "react";
import { Typography } from "@/components/Typography";
import { Block } from "@/shared/ui/Block";

import stylesGraphic from "./Graphic.module.css";
import { RoundIcon } from "../../RoundIcon";

type GraphicTooltipProps = {
  date: string;
  items: unknown[];
  tooltipRef: RefObject<HTMLDivElement>;
};

export const GraphicTooltip: FC<GraphicTooltipProps> = ({
  date,
  items,
  tooltipRef,
}) => {
  return (
    <div ref={tooltipRef} className={stylesGraphic.tooltip}>
      <Block className={stylesGraphic.tooltipBody}>
        <Typography align="left" spacing="xs" as="h6" color="primary-50">
          {date}
        </Typography>

        {items.map((point, index) => (
          <Typography
            key={index as number}
            className={stylesGraphic.tooltipItem}
            as="h6"
            textTransform="uppercase"
            color="primary-70"
          >
            <span className={stylesGraphic.tooltipName}>
              <RoundIcon neverChange backgroundColor={point.__bg} />
              <span>{point?.__nameTooltip}</span>
            </span>
            <span className={stylesGraphic.left}>
              <span className={stylesGraphic.tooltipCurrencyName}>USD</span>
              <span className={stylesGraphic.tooltipValue}>{point?.Value}</span>
            </span>
          </Typography>
        ))}
      </Block>
    </div>
  );
};
