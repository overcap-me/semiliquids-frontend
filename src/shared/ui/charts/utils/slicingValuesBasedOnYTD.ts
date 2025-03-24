import { GLOBAL_TEXT } from "@/shared/content/globalText";
import { NAME_RESERVER_OF_INDEXES } from "./addPrefixSLtoIndex";
import { analyzeClassGaps } from "./calcGapPeriodBetweenClasses";
import { addBasicToChart } from "./getValuesForMonths";
import { PerformanceTransform } from "./transformDataOfEachMonth";

export const slicingValuesBasedOnYTD = (performances: {
  [key: string]: PerformanceTransform;
}) => {
  const classes = Object.values(performances).filter(
    (it) => !NAME_RESERVER_OF_INDEXES.includes(it.id)
  );

  const analyzedClassBasedOnGaps = analyzeClassGaps(classes);

  if (analyzedClassBasedOnGaps.allGaps.length > 0) {
    return {
      message: GLOBAL_TEXT.charts.graphic.status.noMatching.title,
      values: [],
    };
  }

  const latestCommonDate = Math.min(
    ...Object.values(performances).map((it) => it.period.to.year)
  );

  return {
    values: Object.values(performances)
      .map((it) =>
        addBasicToChart(
          it.performance.filter((it) => it.year >= latestCommonDate)
        )
      )
      .filter((it) => it.length > 0)
      .flat(),
  };
};
