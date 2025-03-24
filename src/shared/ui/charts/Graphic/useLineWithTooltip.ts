import { type RefObject, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { colorScale } from "@/shared/lib/d3";
import type { LineStoreOfSwitcher } from "@/app/funds/[fundId]/[shareId]/performance/entities/BlockTabsWithChart/useToggleSwitcher";

const dimensions = {
  width: 920,
  height: 400,
  margin: {
    top: 10,
    right: 25,
    bottom: 26,
    left: 55,
  },
};

const createNodeCircle = (
  node: SVGElement,
  id: string,
  counter: number,
  activeLines: LineStoreOfSwitcher
) => {
  return node
    .append("circle")
    .attr("class", `circle-${id}`) // Add class for easy selection
    .attr("r", 5)
    .attr("fill", () => colorScale(counter))
    .attr("visibility", () => toggleEl(activeLines, id))
    .style("opacity", 0);
};

const createNodeLineOfTooltip = (node: SVGElement) => {
  return node
    .append("line")
    .attr("stroke", "var(--color-primary-70)")
    .attr("stroke-width", 2)
    .attr("y1", dimensions.margin.top)
    .attr("y2", dimensions.height - dimensions.margin.bottom)
    .style("opacity", 0);
};

const toggleEl = (activeLines: LineStoreOfSwitcher, id: string) => {
  if (Object.hasOwn(activeLines, id)) {
    if (activeLines[id].active) {
      return "visible";
    }
    return "hidden";
  }

  return "visible";
};

const MAX_MONTHS_OF_YEAR = 12;

type UseLineWithTooltipProps = {
  data: unknown[];
  svgRef: RefObject<SVGSVGElement>;
  tooltipRef: RefObject<HTMLDivElement>;
  activeLines: LineStoreOfSwitcher;
};

export const useLineWithTooltip = ({
  data,
  svgRef,
  tooltipRef,
  activeLines,
}: UseLineWithTooltipProps) => {
  const lineRef = useRef<SVGLineElement | null>(null);

  const [storeTooltip, setStoreTooltip] = useState({ date: "", items: [] });
  const [storeCirlces, setStoreCircles] = useState<
    { circle: Element; id: string }[]
  >([]);

  const groupedById = d3.group(data, (d) => d.__id);

  const parseDate = d3.timeFormat("%b %y");
  const xAccessor = (d) => d.Date;
  const yAccessor = (d) => d.Value;

  // Scales
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor) as [number, number])
    .range([
      dimensions.height - dimensions.margin.bottom,
      dimensions.margin.top,
    ])
    .nice();

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor) as [Date, Date])
    .range([
      dimensions.margin.left,
      dimensions.width - dimensions.margin.right,
    ]);

  const line = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  useEffect(() => {
    if (svgRef.current) {
      const node = d3.select(svgRef.current);
      node.selectAll("*").remove();

      node.attr("viewBox", [0, 0, dimensions.width, dimensions.height]);
      node.attr("width", dimensions.width);
      node.attr("height", dimensions.height);

      // Axis
      const xAxis = d3.axisBottom(xScale).tickFormat(parseDate);

      // Get unique months and sort them in descending order (most recent first)
      const uniqueMonths = Array.from(
        new Set(data.map((d) => d3.timeMonth(xAccessor(d)).getTime()))
      )
        .map((time) => new Date(time))
        .sort((a, b) => b.getTime() - a.getTime()); // Sort in descending order

      const tickValues =
        uniqueMonths.length > MAX_MONTHS_OF_YEAR
          ? uniqueMonths.filter(
              (_, i) =>
                i % Math.ceil(uniqueMonths.length / MAX_MONTHS_OF_YEAR) === 0
            )
          : uniqueMonths;

      xAxis.tickValues(tickValues);

      node
        .append("g")
        .attr(
          "transform",
          `translate(0,${dimensions.height - dimensions.margin.bottom})`
        )
        .call(xAxis)
        .call((g) =>
          g
            .selectAll(".tick text")
            .attr("font-weight", "500")
            .attr("font-size", "var(--font-size-xs)")
            .attr("fill", "var(--color-primary-70)")
        )
        .call((g) => g.select(".domain").remove());

      const yAxis = d3.axisLeft(yScale);
      node
        .append("g")
        .attr("transform", `translate(${dimensions.margin.left},0)`)
        .call(yAxis)
        .call((g) =>
          g
            .selectAll(".tick text")
            .attr("font-weight", "800")
            .attr("font-size", "var(--font-size-xs)")
            .attr("font-family", "var(--font-manrope)")
        )
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .attr(
              "x2",
              dimensions.width -
                dimensions.margin.left -
                dimensions.margin.right
            )
            .attr("stroke-opacity", 0.1)
        );

      const lineTooltip = createNodeLineOfTooltip(node);

      lineRef.current = lineTooltip;
    }
  }, [data]);

  useEffect(() => {
    let counter = 0;

    if (svgRef.current) {
      const node = d3.select(svgRef.current);

      for (const [id, values] of groupedById) {
        const path = node
          .append("path")
          .datum(values)
          .attr("class", `line-${id}`) // Add class for easy selection
          .attr("fill", "none")
          .attr("stroke", "var(--color-active)")
          .attr("stroke", () => colorScale(counter))
          .attr("stroke-width", 4)
          .attr("stroke-linecap", "round")
          .attr("visibility", () => toggleEl(activeLines, id))
          .attr("d", line);

        const length = path?.node()?.getTotalLength();

        path
          .attr("stroke-dasharray", `${length} ${length}`)
          .attr("stroke-dashoffset", length)
          .transition()
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
          .duration(1500);

        const circle = createNodeCircle(node, id, counter, activeLines);

        setStoreCircles((prev) => [...prev, { circle, id }]);

        counter++;
      }
    }

    return () => {
      counter = 0;
      setStoreCircles([]);
    };
  }, [data]);

  useEffect(() => {
    if (svgRef.current && storeCirlces.length > 0) {
      const node = d3.select(svgRef.current);

      const nodeTooltip = d3
        .select(tooltipRef.current)
        .style("pointer-events", "none")
        .style("opacity", 0);

      node.on("mousemove", (event) => {
        const svgElement = svgRef.current;
        const svgRect = svgElement?.getBoundingClientRect();

        const [mouseX] = d3.pointer(event);
        const closestDate = xScale.invert(mouseX);

        const closestDataPoints = Array.from(groupedById)?.map(
          ([id, group]) => {
            return group.reduce((prev, curr) =>
              Math.abs(curr.Date - closestDate) <
              Math.abs(prev.Date - closestDate)
                ? curr
                : prev
            );
          }
        );

        // Find the earliest date from closestDataPoints
        const earliestDate = d3.min(closestDataPoints, (d) => d.Date);

        if (
          mouseX > dimensions.margin.left &&
          mouseX < dimensions.width - dimensions.margin.right
        ) {
          lineRef?.current
            ?.attr("x1", xScale(earliestDate))
            ?.attr("x2", xScale(earliestDate))
            ?.style("opacity", 1);
        }

        // biome-ignore lint/complexity/noForEach: <explanation>
        storeCirlces.forEach(({ circle }, index) => {
          const closestDataPoint = closestDataPoints[index];

          circle
            .attr("cx", xScale(closestDataPoint.Date))
            .attr("cy", yScale(closestDataPoint.Value))
            .style("opacity", 1);
        });

        const formattedDate = d3.timeFormat("%b %Y")(earliestDate);

        setStoreTooltip({
          date: formattedDate,
          items: closestDataPoints.filter(
            (it) => activeLines?.[it.__id.toLocaleLowerCase()]?.active
          ),
        });

        const tooltipWidth = tooltipRef.current?.clientWidth || 0;
        const tooltipHeight = tooltipRef.current?.clientHeight || 0;

        // Calculate position accounting for scroll
        const mouseClientX = event.clientX - (svgRect?.left || 0);
        let xPosition = mouseClientX - tooltipWidth / 2;

        // Ensure tooltip stays within visible area
        const containerWidth = svgRect?.width || 0;
        if (xPosition + tooltipWidth > containerWidth) {
          xPosition = containerWidth - tooltipWidth;
        } else if (xPosition < 0) {
          xPosition = 0;
        }

        nodeTooltip
          .style("opacity", 1)
          .style("transform", `translate(${xPosition}px, ${-tooltipHeight}px)`);
      });

      node.on("mouseleave", () => {
        lineRef?.current?.style("opacity", 0);
        nodeTooltip.style("opacity", 0);

        // biome-ignore lint/complexity/noForEach: <explanation>
        storeCirlces.forEach(({ circle }) => circle.style("opacity", 0));
      });
    }
  }, [storeCirlces, activeLines]);

  return {
    storeTooltip,
  };
};
