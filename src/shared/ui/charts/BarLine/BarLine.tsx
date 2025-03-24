'use client';
import { type FC, useEffect, useRef } from "react";
import styles from "../Charts.module.css";
import * as  d3 from "d3";
import { colorScale } from "@/shared/lib/d3";

type BarLineProps = {
  data: { value: number }[];
  width?: number;
};

const height = 24;

export const BarLine: FC<BarLineProps> = ({ data, width = 264 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (data?.length === 0 || typeof data === 'undefined') {
      return;
    }

    if (data?.length === 1 && Number(data?.[0]?.value) === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const total = d3.sum(data, (d) => Number(d.value));

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "none")
      .attr("xmlns", "http://www.w3.org/2000/svg");

    // Compute x-scale
    const xScale = d3
      .scaleLinear()
      .domain([0, total])
      .range([0, width]);

    let currentX = 0;
    g
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => {
        const x = currentX;
        currentX += xScale(Number(d.value)); // Increment current position
        return x;
      })
      .attr("y", 0)
      .attr("width", (d) => xScale(Number(d.value)))
      .attr("height", height)
      .attr("fill", (d, index) => colorScale(index))

  }, [data])

  return (
    <div className={styles.wrapper}>
      <svg ref={svgRef} />
    </div>
  );
};
