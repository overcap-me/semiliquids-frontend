"use client";
import type { ApexOptions } from "apexcharts";
import { type FC, useRef, useState } from "react";
import styles from "./DescWithDonut.module.css";
import { Typography } from "@/components/Typography";
import { cellWithPostfix } from "@/utils/calcCell";

import stylesLayout from "@/styles/module/Layout.module.css";
import clsx from "clsx";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import dynamic from "next/dynamic";
import { hasData } from "@/utils/hasData";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const colors = [
  "#131E57",
  "#5E7FE3",
  "#FB8800",
  "#FDD795",
  "#9D0C74",
  "#EB6CC1",
  "#0E9B82",
  "#9EDED7",
  "#E80210",
  "#FE837D",
];

const options: ApexOptions = {
  chart: {
    type: "donut",
    dropShadow: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
    parentHeightOffset: 0,
  },
  stroke: {
    width: 0,
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: false,
    padding: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: false,
          total: {
            showAlways: false,
            show: false,
          },
        },
      },
    },
  },

  colors,
  legend: {
    position: "left",
    show: false,
    onItemHover: {
      highlightDataSeries: false,
    },
  },

  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

type TProps = {
  name: string;
  id: string;
  items: unknown[];
  values: number[];
};

export const DescWithDonut: FC<TProps> = ({
  items,
  values,
  name,
  id,
}) => {
  const refChart = useRef(null);
  const [info, setInfo] = useState<
    undefined | { name: string; value: string }
  >();

  const handleSelect = (opt, index) => {
    refChart?.current?.chart?.toggleDataPointSelection(index);
    setInfo({
      name: opt.name,
      value: opt.value,
    });
  };

  if (!hasData(values)) {
    return null;
  }

  return (
    <div className={styles.Block}>
      <div>
        <Typography
          className={clsx(stylesLayout.Flex, stylesLayout.JCSB)}
          as="div"
          spacing="smm"
        >
          <Typography id={id} as="h3">
            {name}
          </Typography>
        </Typography>

        <div className={clsx(stylesLayout.Grid, stylesLayout.Gap_24)}>
          {items.map((opt, index) => (
            <ButtonOrLink
              onClick={() => handleSelect(opt, index)}
              className={styles.Control}
              asTag="button"
              type="button"
              key={opt.id}
            >
              <Typography>
                <span
                  className={styles.ControlIcon}
                  style={{
                    background: colors[index],
                  }}
                />
                {opt.name}
              </Typography>
              <Typography color="primary-70">
                {cellWithPostfix(opt.value, "%")}
              </Typography>
            </ButtonOrLink>
          ))}
        </div>
      </div>

      <div className={styles.DonutWrapper}>
        {hasData(values) && (
          <ApexChart
            ref={refChart}
            type="donut"
            options={options}
            series={values}
            height={300}
          />
        )}
        <div className={styles.DonutBody}>
          <Typography align="center" as="p" fontWeight="800">
            {info?.name}
          </Typography>
          <Typography color="primary-70" fontWeight="500">
            {cellWithPostfix(info?.value, "%")}
          </Typography>
        </div>
      </div>
    </div>
  );
};
