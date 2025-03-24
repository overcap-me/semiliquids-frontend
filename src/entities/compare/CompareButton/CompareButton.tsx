"use client";

import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import { useCallback, type FC } from "react";
import styles from "./CompareButton.module.css";
import Compare from "@/assets/icons/Compare.svg";
import type { FundResponse } from "@/types/schema/funds";
import { SIZE_PROPS } from "@/shared/lib/icons";
import { TOOLTIP_ID } from "@/entities/TooltipProvider";

// TODO: change path to the correct one
import { TOOLTIP_TEXT } from "@/app/funds/(index)/entities/v2/TableAdapterClient/ui/WishlistAndCompare/constance";
import clsx from "clsx";
import { useCompareContext } from "../context";

type CompareButtonProps = {
  mode: "minimal" | "regular";

  /**
   * Default is false
   */
  tooltip?: boolean;

  classDetails: FundResponse;
};

const DenotationTitle = {
  in: "in comparison",
  add: "compare",
};

export const CompareButton: FC<CompareButtonProps> = ({
  mode,
  classDetails,
  tooltip = false,
}) => {
  const { onSelect, hasSelectedById, isLimit } = useCompareContext();

  const compareTitle = useCallback(
    (row: T) => {
      if (isLimit) {
        if (hasSelectedById(row?.id)) {
          return TOOLTIP_TEXT.COMPARE(row?.id);
        }
        return TOOLTIP_TEXT.MAX_LIMIT_COMPARE;
      }
      return TOOLTIP_TEXT.COMPARE(hasSelectedById(row?.id));
    },
    [hasSelectedById, isLimit]
  );

  const handleCompare = (event) => {
    event.stopPropagation();
    onSelect(classDetails);
  };

  const tooltipOptions = tooltip
    ? {
        "data-tooltip-id": TOOLTIP_ID,
        "data-tooltip-content": compareTitle(classDetails),
        "data-tooltip-place": "top",
      }
    : null;

  return (
    <ButtonOrLink
      onClick={handleCompare}
      className={clsx(styles.compare, {
        [styles.regular]: mode === "regular",
        [styles.minimal]: mode === "minimal",
        [styles.active]: hasSelectedById(classDetails?.id),
      })}
      asTag="button"
      type="button"
      {...tooltipOptions}
    >
      <span className={styles.icon}>
        <Compare {...SIZE_PROPS} />
      </span>
      {mode === "regular" && (
        <Typography
          as="h6"
          fontWeight="800"
          fontFamily="manrope"
          textTransform="uppercase"
        >
          {hasSelectedById(classDetails?.id)
            ? DenotationTitle.in
            : DenotationTitle.add}
        </Typography>
      )}
    </ButtonOrLink>
  );
};
