import { useState, type MutableRefObject } from "react";
import * as d3 from "d3";

export type LineStoreOfSwitcher = Record<string, {
  key: string;
  name: string;
  active: boolean;
}>;


const GLOBAL_HIDDEN_LINES = ['pd', 'pe']

export const useToggleSwitcher = (
  svgRef: MutableRefObject<SVGSVGElement | null>,
  nameOfLines: { key: string; name: string }[]
) => {
  const [store, setStore] = useState<LineStoreOfSwitcher>(nameOfLines.reduce<LineStoreOfSwitcher>((acc, item) => {
    acc[item.key] = {
      key: item.key,
      name: item.name,
      active: !GLOBAL_HIDDEN_LINES.includes(item.key)
    };
    return acc;
  }, {})
  );

  const handleSelect = (id: string) => {
    setStore((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          active: !prev[id].active
        }
      };
    });
  }

  const handleToggleSwitcher = (id: string) => {
    handleSelect(id);

    const line = d3.select(svgRef.current).select(`.line-${id}`);
    const circle = d3.select(svgRef.current).select(`.circle-${id}`);

    const isVisible = line.style("visibility") === "visible";
    line.style("visibility", isVisible ? "hidden" : "visible");
    circle.style("visibility", isVisible ? "hidden" : "visible");
  };

  return {
    store,
    handleToggleSwitcher
  };
};
