import { colorScale } from "@/shared/lib/d3";
import { MONTHS } from "./getValuesForMonths";
import {
  addPrefixSLtoIndex,
  NAME_RESERVER_OF_INDEXES,
} from "./addPrefixSLtoIndex";

type PerformanceItem = {
  __id: string;
  __bg: string;
  __nameTooltip: string;
  year: number;
  month: string;
  monthIndex: number;
  percent: number;
  Value: string;
  Date: string;
};

export type PerformanceTransform = {
  id: string;
  period: {
    from: {
      year: number;
      month: string;
      monthIndex: number;
    };
    to: {
      year: number;
      month: string;
      monthIndex: number;
    };
  };
  performance: PerformanceItem[];
};

export const transformDataOfEachMonth = (performances, periodOptions) => {
  const formattedData = {};
  let colorIdBasedOnCounter = 0;

  for (const perf of performances) {
    const tmp = [] as PerformanceItem[];
    const id = perf.id;

    for (const valuesPerYear of perf.performance) {
      const year = valuesPerYear.year;
      for (const month of MONTHS) {
        if (year >= periodOptions.from.year && year <= periodOptions.to.year) {
          if (
            year === periodOptions.from.year &&
            MONTHS.indexOf(month) < periodOptions.from.monthIndex
          ) {
            continue;
          }

          if (
            year === periodOptions.to.year &&
            MONTHS.indexOf(month) > periodOptions.to.monthIndex
          ) {
            continue;
          }

          const monthIndex = MONTHS.indexOf(month);

          if (!valuesPerYear[month]) continue;

          tmp.push({
            __id: id ?? valuesPerYear.fund_class_id ?? valuesPerYear.type,
            __bg: colorScale(colorIdBasedOnCounter),
            __nameTooltip:
              addPrefixSLtoIndex(NAME_RESERVER_OF_INDEXES, id) ??
              valuesPerYear.fund_class_id ??
              valuesPerYear.type,

            year,
            month,
            monthIndex,
            percent: Number.parseFloat(valuesPerYear[month]) || 0,

            Value: valuesPerYear[month],
            Date: new Date(year, monthIndex, 1),
          });
        }
      }
    }
    colorIdBasedOnCounter++;
    formattedData[id] = {
      id,
      period: perf.period,
      performance: tmp,
    } satisfies PerformanceTransform;
  }

  return formattedData as { [key: string]: PerformanceTransform };
};
