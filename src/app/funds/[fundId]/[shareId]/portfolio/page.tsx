"use client";
import { Typography } from "@/components/Typography";
import { Narrow, Wrapper } from "@/components/Wrapper";

import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";

import { DescWithDonut } from "./ui/DescWithDonut";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Table } from "../ui/Table";
import clsx from "clsx";
import { cellWithPrefix } from "@/utils/calcCell";
import { useFundContext } from "../contexts/FundProvider";
import { AsideNavigationOfPage } from "@/ui/Aside";
import { optionsOfDate } from "../ui/BannerFundById";
import { formattedDate } from "@/utils/actionsWithDate";

import { PREFIX_AS_DATE } from "@/utils/constans";
import { mutatorInvestData } from "./utils/columns";
import type { TopInvestmentsDetail } from "@/types/schema/funds";
import { Block } from "@/shared/ui/Block";

const formattedData = (list) =>
  list
    ?.map((el) => ({
      name:
        el?.focus ||
        el?.strategy ||
        el?.asset_class ||
        el?.industry ||
        el.investment_type,
      value: el?.value,
      id: el?.id,
    }))
    .sort((a, b) => Number(b.value) - Number(a.value));

const values = (list) => list?.map((item) => Number.parseFloat(item.value));

const PortfolioPage = () => {
  const { data, currentData } = useFundContext();

  const assetClassesData = formattedData(data.asset_classes);
  const focusesData = formattedData(data.focuses);
  const strategiesData = formattedData(data.strategies);
  const industriesData = formattedData(data.industries);
  const investmentTypesData = formattedData(data.investment_types);

  const [activeSection, setActiveSection] = useState(null);
  const [sections, setSections] = useState<
    {
      id: string;
      tag: string;
      label: string;
    }[]
  >([]);

  const date = useMemo(
    () =>
      cellWithPrefix(
        formattedDate(currentData?.updated_at, optionsOfDate),
        PREFIX_AS_DATE
      ),
    [currentData]
  );

  // Функция для обработки видимости заголовков h2
  const handleIntersection = useCallback((entries) => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    // Находим все заголовки h2
    const headers = Array.from(
      document.querySelectorAll("article h2, article h3")
    );

    // Обновляем состояние для хранения найденных заголовков
    setSections(
      headers?.map((header) => ({
        id: header.id,
        tag: header.nodeName,
        label: header.innerText,
      }))
    );

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Порог 50%, чтобы элемент считался видимым
    });

    for (const element of headers) {
      observer.observe(element);
    }

    // Очистка наблюдателя при размонтировании компонента
    return () => {
      for (const header of headers) {
        observer.unobserve(header);
      }
    };
  }, [handleIntersection]);

  const { columns, rows } = mutatorInvestData(data?.top_investments) as {
    rows: any[];
    columns: any[];
  };

  const dountsList = [
    {
      id: "asset-class",
      values: values(assetClassesData),
      name: "Asset Class",
      items: assetClassesData,
    },
    {
      id: "strategy",
      values: values(strategiesData),
      name: "Strategy",
      items: strategiesData,
    },
    {
      id: "investment-types",
      values: values(investmentTypesData),
      name: "Investment Type",
      items: investmentTypesData,
    },
    {
      id: "geo-focus",
      values: values(focusesData),
      name: "Geo Focus",
      items: focusesData,
    },
    {
      id: "core-industry",
      values: values(industriesData),
      name: "Core Industries",
      items: industriesData,
    },
  ];

  return (
    <>
      <Wrapper
        classNameContainer={stylesSpace.Spacing__Outer_80x120}
        classNameWrapper={clsx(stylesLayout.Flex, stylesLayout.JCSB)}
      >
        <Narrow type="large">
          <Typography as="div" spacing="xxl">
            <Typography
              id="current-portfolio-construction"
              as="h2"
              spacing="xxs"
            >
              Current Portfolio Construction
            </Typography>
            {date && (
              <Typography as="h6" color="primary-50">
                {date}
              </Typography>
            )}
          </Typography>

          <Typography
            as="div"
            className={clsx(
              stylesLayout.Grid,
              stylesLayout.Gap_64,
              stylesSpace.Spacing__Outer_80x100
            )}
          >
            {dountsList.map((donut) => (
              <DescWithDonut
                key={donut.id}
                id={donut.id}
                values={donut.values}
                name={donut.name}
                items={donut.items}
              />
            ))}
          </Typography>

          {(data?.top_investments as TopInvestmentsDetail) &&
            columns?.length > 0 &&
            rows?.length > 0 && (
              <>
                <Block
                  className={clsx(
                    stylesLayout.Flex,
                    stylesLayout.JCSB,
                    stylesLayout.AIE
                  )}
                  spacing="smm"
                >
                  <Typography id="top-10-investments" as="h2" spacing="null">
                    Top investments
                  </Typography>
                </Block>

                <Table data={rows} columns={columns} />
              </>
            )}
        </Narrow>
        <AsideNavigationOfPage activeId={activeSection} menu={sections} />
      </Wrapper>
    </>
  );
};

export default PortfolioPage;
