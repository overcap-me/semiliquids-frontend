import type { PerformanceDetail } from "@/types/schema/funds";
import type { PerformanceIndexesResponse } from "@/types/schema/indexes";
import { slicingIndexesBasedOnFund } from "./slicingIndexesBasedOnFund";
import { findPeriodWhenMadeFund } from "./findPeriodWhenMadeFund";
import { transformDataOfEachMonth } from "./transformDataOfEachMonth";
import { addPrefixSLtoIndex } from "./addPrefixSLtoIndex";
import { slicingValuesBasedOnPeriod } from "./slicingValuesBasedOnPeriod";
import { slicingValuesBasedOnYTD } from "./slicingValuesBasedOnYTD";

export const FALLBACK_NAME_FUND = "spring";

export const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const BASE_VALUE_START = 100;

/**
 *
 * К каждому графику, добавляем базовое значение.
 * Базовое значение - это 100.
 *
 */
export const addBasicToChart = (chartData: unknown[]) => {
  if (chartData.length === 0) {
    // console.warn("No data for the current period");
    return [];
  }

  const startMonth = chartData?.[0] ?? {};

  const startMonthWithValue = {
    ...startMonth,
    year: startMonth.year,
    month: MONTHS[MONTHS.indexOf(startMonth?.month) - 1],
    percent: 0,
    Value: Number.parseFloat("100.00"),
    Date: new Date(startMonth?.year, MONTHS.indexOf(startMonth?.month) - 1, 1),
  };

  if (startMonth?.month === "jan") {
    startMonthWithValue.year = startMonth?.year - 1;
    startMonthWithValue.month = "dec";
    startMonthWithValue.Date = new Date(
      startMonth?.year - 1,
      MONTHS.indexOf("dec"),
      1
    );
  }

  let currentValue = BASE_VALUE_START;

  // Начинаем с добавления стартового месяца
  const result = [startMonthWithValue];

  for (let i = 0; i < chartData.length; i++) {
    const { month, year, percent, ...item } = chartData[i];

    currentValue *= 1 + percent / 100;
    result.push({
      ...item,
      year,
      month,
      Value: Number.parseFloat(currentValue.toFixed(2)),
    });
  }

  return result;
};

export const mutatorDataForChart = ({
  performances,
  indexes,
}: {
  performances: { [key: string]: PerformanceDetail[] };
  indexes: PerformanceIndexesResponse;
}) => {
  const names = Object.keys({ ...performances, ...indexes }).map((name) => ({
    key: name.toLocaleLowerCase(),
    name: addPrefixSLtoIndex(Object.keys(indexes), name),
  }));

  const fundsWithResultPeriod = Object.entries(performances).flatMap(
    ([fundId, performance]) => ({
      id: fundId,
      performance,
      period: findPeriodWhenMadeFund(performance),
    })
  );

  const yearFirstFundWasSetUp = Math.min(
    ...fundsWithResultPeriod.map((it) => Number(it.period.from.year))
  );

  const lastYearWhenFundHasValues = Math.min(
    ...fundsWithResultPeriod.map((it) => Number(it.period.to.year))
  );

  /**
   * The month in which the first data from the foundation year was available
   */
  const monthInWhichFirstValue = Math.min(
    ...fundsWithResultPeriod
      .filter((it) => it.period.from.year === yearFirstFundWasSetUp)
      .map((it) => it.period.from.monthIndex)
  );

  const monthInWhichLastValue = Math.min(
    ...fundsWithResultPeriod
      .filter((it) => it.period.to.year === lastYearWhenFundHasValues)
      .map((it) => it.period.to.monthIndex)
  );

  const periodOptions = {
    yearFirstFundWasSetUp,
    lastYearWhenFundHasValues,
    monthInWhichFirstValue,
    monthInWhichLastValue,
  };

  const slicedIndexes = slicingIndexesBasedOnFund(indexes, periodOptions);
  const slicedPerformances = slicingIndexesBasedOnFund(
    performances,
    periodOptions
  );

  const indexesWithResultPeriod = Object.entries(slicedIndexes).flatMap(
    ([indexId, index]) => ({
      id: indexId,
      performance: index,
      period: findPeriodWhenMadeFund(index),
    })
  );

  const valuesPerformancesOfEachMonth = transformDataOfEachMonth(
    [
      ...fundsWithResultPeriod.map((it) => ({
        ...it,
        performance: slicedPerformances[it.id],
      })),
      ...indexesWithResultPeriod,
    ],
    {
      from: {
        year: yearFirstFundWasSetUp,
        monthIndex: monthInWhichFirstValue,
      },
      to: {
        year: lastYearWhenFundHasValues,
        monthIndex: monthInWhichLastValue,
      },
    }
  );

  return {
    names,
    charts: new Map([
      [
        "three_month",
        slicingValuesBasedOnPeriod(valuesPerformancesOfEachMonth, 3),
      ],
      [
        "six_month",
        slicingValuesBasedOnPeriod(valuesPerformancesOfEachMonth, 6),
      ],
      ["ytd", slicingValuesBasedOnYTD(valuesPerformancesOfEachMonth)],
      [
        "one_year",
        slicingValuesBasedOnPeriod(valuesPerformancesOfEachMonth, 12),
      ],
      [
        "three_years",
        slicingValuesBasedOnPeriod(valuesPerformancesOfEachMonth, 36),
      ],
      [
        "all",
        slicingValuesBasedOnPeriod(valuesPerformancesOfEachMonth, Infinity),
      ],
    ]),
  };
};

export const getPerformanceBySpring = (funds: any[]) => {
  const performanceMap: { [key: string]: any[] } = {};

  funds?.forEach((fund) => {
    const key = `${fund.__fund.abbreviation ?? FALLBACK_NAME_FUND}/${
      fund.share_class.name
    }`;

    if (fund?.performance?.length === 0) {
      return;
    }

    if (!performanceMap[key]) {
      performanceMap[key] = [];
    }
    performanceMap[key] = fund.performance;
  });
  return performanceMap;
};
