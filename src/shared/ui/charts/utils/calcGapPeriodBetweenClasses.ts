import { PerformanceTransform } from "./transformDataOfEachMonth";

type MonthData = PerformanceTransform["period"]["from"];

interface GapResult {
  class1: string;
  class1EndPeriod: string;
  class2: string;
  class2StartPeriod: string;
  gapInMonths: number;
  exceedsTwoMonths: boolean;
}

const MAX_VALUE_GAP = 2;

function calculateMonthsBetween(end: MonthData, start: MonthData): number {
  return (start.year - end.year) * 12 + (start.monthIndex - end.monthIndex);
}

export const analyzeClassGaps = (
  classes: PerformanceTransform[]
): {
  allGaps: GapResult[];
  gapSummary: Record<
    string,
    { description: string; exceedsTwoMonths: boolean }
  >;
  overallAnalysis: {
    totalGapsFound: number;
    gapsExceedingTwoMonths: number;
    maxGapInMonths: number;
    classesWithoutGaps: string[];
  };
} => {
  const allGaps: GapResult[] = [];
  const gapSummary: Record<
    string,
    { description: string; exceedsTwoMonths: boolean }
  > = {};

  const classesWithGaps = new Set<string>();
  const allClassIds = classes.map((c) => c.id);

  for (let i = 0; i < classes.length; i++) {
    for (let j = 0; j < classes.length; j++) {
      if (i === j) continue;

      const class1 = classes[i];
      const class2 = classes[j];

      const monthGap = calculateMonthsBetween(
        class1.period.to,
        class2.period.from
      );

      if (monthGap > 0) {
        classesWithGaps.add(class1.id);
        classesWithGaps.add(class2.id);

        const gapResult: GapResult = {
          class1: class1.id,
          class1EndPeriod: `${class1.period.to.month} ${class1.period.to.year}`,
          class2: class2.id,
          class2StartPeriod: `${class2.period.from.month} ${class2.period.from.year}`,
          gapInMonths: monthGap,
          exceedsTwoMonths: monthGap > 2,
        };

        allGaps.push(gapResult);

        const summaryKey = `${class1.id} to ${class2.id}`;
        gapSummary[summaryKey] = {
          description: `${monthGap} month${monthGap !== 1 ? "s" : ""} gap (${
            class1.id
          } ends ${class1.period.to.month} ${class1.period.to.year}, ${
            class2.id
          } starts ${class2.period.from.month} ${class2.period.from.year})`,
          exceedsTwoMonths: monthGap > MAX_VALUE_GAP,
        };
      }
    }
  }

  const classesWithoutGaps = allClassIds.filter(
    (id) => !classesWithGaps.has(id)
  );

  const maxGap =
    allGaps.length > 0 ? Math.max(...allGaps.map((g) => g.gapInMonths)) : 0;

  return {
    allGaps,
    gapSummary,
    overallAnalysis: {
      totalGapsFound: allGaps.length,
      gapsExceedingTwoMonths: allGaps.filter((g) => g.exceedsTwoMonths).length,
      maxGapInMonths: maxGap,
      classesWithoutGaps,
    },
  };
};
