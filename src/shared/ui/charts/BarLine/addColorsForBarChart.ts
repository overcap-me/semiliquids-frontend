import { colors } from "../colors/colorsOrder";

export function addColorsForBarChart(data) {
  return data?.map((item, index) => ({ ...item, color: colors[index] }));
}