import {
  ItemPerformanceIndex,
  PerformanceIndexesResponse,
} from "@/types/schema/indexes";
import { MONTHS } from "./getValuesForMonths";

export const slicingIndexesBasedOnFund = (
  indexes: PerformanceIndexesResponse,
  periodOptions: {
    yearFirstFundWasSetUp: number;
    lastYearWhenFundHasValues: number;
    monthInWhichFirstValue: number;
    monthInWhichLastValue: number;
  }
) => {
  const slicedIndexes: PerformanceIndexesResponse = {};

  const deleteMonthFromIndex = (
    index: ItemPerformanceIndex,
    start: number,
    end: number
  ) => {
    const monthsWhichNeedToBeRemoved = MONTHS.slice(start, end);

    for (const month of monthsWhichNeedToBeRemoved) {
      index[`${month}_value`] = null;
      index[month] = null;
    }

    return index;
  };

  for (const index in indexes) {
    const performance = indexes[index].sort((a, b) => a.year - b.year);

    slicedIndexes[index] = performance.filter((it: ItemPerformanceIndex) => {
      if (
        it.year >= periodOptions.yearFirstFundWasSetUp &&
        it.year <= periodOptions.lastYearWhenFundHasValues
      ) {
        if (
          it.year === periodOptions.yearFirstFundWasSetUp &&
          it.year === periodOptions.lastYearWhenFundHasValues
        ) {
          deleteMonthFromIndex(it, 0, periodOptions.monthInWhichFirstValue);
          deleteMonthFromIndex(
            it,
            periodOptions.lastYearWhenFundHasValues + 1,
            MONTHS.length
          );
          return it;
        }

        if (it.year === periodOptions.yearFirstFundWasSetUp)
          return deleteMonthFromIndex(
            it,
            0,
            periodOptions.monthInWhichFirstValue
          );
        if (it.year === periodOptions.lastYearWhenFundHasValues)
          return deleteMonthFromIndex(
            it,
            periodOptions.monthInWhichLastValue + 1,
            MONTHS.length
          );

        return it;
      }
    }) satisfies PerformanceIndexesResponse;
  }

  return slicedIndexes;
};
