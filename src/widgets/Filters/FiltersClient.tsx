"use client";

import stylesLayout from "@/styles/module/Layout.module.css";
import {
  type Filter,
  type FiltersResponse,
  FiltersTitleList,
  NameOfFiltersInSingularList,
} from "@/types/schema/filters";
import { Chips } from "@/shared/ui/Chips";
import { Search } from "@/components/forms";
import clsx from "clsx";
import { Typography } from "@/components/Typography";
import type { FC, SyntheticEvent } from "react";
import { usePathname } from "next/navigation";
import { ClearAll } from "./ui/ClearAll";
import { useFiltersContext } from "./context";
import { createFilterName } from "./context/FiltersProviderClient";

type CaptionProps = {
  title: string;
};

const Caption: FC<CaptionProps> = ({ title }) => (
  <Typography textTransform="uppercase" as="h6" fontWeight="800" spacing="s">
    {title}
  </Typography>
);

type FiltersClientProps = {
  filters: FiltersResponse;
};

export const FiltersClient: FC<FiltersClientProps> = ({ filters }) => {
  const pathname = usePathname();
  const {
    updateFilter,
    updateSearch,
    clearAllFilters,
    isActiveFilter,
    getSearchedValue,
    hasFilters,
  } = useFiltersContext();

  const handleChip = (name: string, value: Filter) => {
    return (event: SyntheticEvent) => {
      event.preventDefault();
      updateFilter(name, String(value.id));
    };
  };

  return (
    <div>
      <div
        className={clsx(
          stylesLayout.Grid,
          stylesLayout.Grid__Col_4,
          stylesLayout.Gap_40
        )}
      >
        {filters?.map(({ key, values }) => {
          return (
            <div key={key}>
              <Caption title={FiltersTitleList[key]} />

              <div className={clsx(stylesLayout.Flex, stylesLayout.Gap_8)}>
                {values?.map((filter) => {
                  const name = createFilterName(
                    NameOfFiltersInSingularList[key]
                  );

                  const value = String(filter.id);

                  return (
                    <Chips
                      onChange={handleChip(name, filter)}
                      asTag="a"
                      mode="multiple"
                      key={filter.id}
                      active={isActiveFilter(name, value)}
                      href={{
                        pathname,
                        query: {
                          [name]: value,
                        },
                      }}
                    >
                      {filter.name}
                    </Chips>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div>
          <Caption title="Search" />
          <Search
            onChange={updateSearch}
            search={getSearchedValue}
            name="search"
          />
        </div>
      </div>
      <div className={clsx(stylesLayout.Flex, stylesLayout.AIE)}>
        <ClearAll
          onClear={clearAllFilters}
          href={pathname}
          active={hasFilters}
        />
      </div>
    </div>
  );
};
