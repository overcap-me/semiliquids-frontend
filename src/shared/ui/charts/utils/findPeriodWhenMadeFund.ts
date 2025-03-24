import { ItemPerformanceIndex } from "@/types/schema/indexes";
import { MONTHS } from "./getValuesForMonths";

export const findPeriodWhenMadeFund = (fund: ItemPerformanceIndex[]) => {
  let yearWhenFundWasCreated: number | null = null;
  let monthInWhichFirstValueWas: string | null = null;
  let lastYearWhenFundHasValues: number | null = null;
  let lastMonthInWhichValueWas: string | null = null;

  const sortedOfFund = fund.sort((a, b) => a.year - b.year);

  for (const yearData of sortedOfFund) {
    for (const month of MONTHS) {
      const value = yearData[month];

      if (value !== null) {
        if (yearWhenFundWasCreated === null) {
          yearWhenFundWasCreated = yearData.year;
          monthInWhichFirstValueWas = month;
        }
        lastYearWhenFundHasValues = yearData.year;
        lastMonthInWhichValueWas = month;
      }
    }
  }

  return {
    from: {
      year: yearWhenFundWasCreated,
      month: monthInWhichFirstValueWas,
      monthIndex: MONTHS.indexOf(monthInWhichFirstValueWas as string),
    },
    to: {
      year: lastYearWhenFundHasValues,
      month: lastMonthInWhichValueWas,
      monthIndex: MONTHS.indexOf(lastMonthInWhichValueWas as string),
    },
  };
};
