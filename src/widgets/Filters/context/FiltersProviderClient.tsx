"use client";
import { ROUTE_PATHS } from "@/shared/routes";
import type { FiltersKeys } from "@/types/schema/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { type DebouncedState, useDebouncedCallback } from "use-debounce";

export type FiltersName = FiltersKeys | "search" | "page";

type FiltersContextProps = {
  updateFilter: (name: FiltersName, value: string) => void;
  updateSearch: DebouncedState<(value: string) => void>;
  getSearchedValue: string | null;
  clearAllFilters: () => void;
  isActiveFilter: (name: FiltersName, value: string) => boolean;
  hasFilters: boolean;
  updatePagination: (page: string) => void;
};

const FiltersContext = createContext<FiltersContextProps | null>(null);

type FiltersProviderProps = {
  children: ReactNode;
};

export const createFilterName = (name: string) => `filter[${name}][]`;

const getValueOnBaseName = (name: string) => createFilterName(name);

const initializeStore = (searchParams: URLSearchParams) => ({
  [createFilterName("asset_class")]: searchParams.getAll(
    getValueOnBaseName("asset_class")
  ),
  [createFilterName("focus")]: searchParams.getAll(getValueOnBaseName("focus")),
  [createFilterName("strategy")]: searchParams.getAll(
    getValueOnBaseName("strategy")
  ),
  search: searchParams.get("search"),
  page: searchParams.get("page") ?? 1,
});

export const FiltersProviderClient: FC<FiltersProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [store, setStore] = useState<Record<FiltersName, string | string[]>>(
    () => initializeStore(searchParams)
  );

  useEffect(() => {
    if (pathname === ROUTE_PATHS.INDEX.BASE && searchParams.size === 0) {
      clearAllFilters();
    }
  }, [searchParams, pathname]);

  useEffect(() => {
    const paramsObject = initializeStore(searchParams);
    const isDifferent = JSON.stringify(store) !== JSON.stringify(paramsObject);

    if (isDifferent) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const newSearchParams = new URLSearchParams();

        Object.entries(store).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((val) => newSearchParams.append(key, val));
          } else if (value) {
            newSearchParams.set(key, value);
          }
        });

        router.push(`${pathname}?${newSearchParams.toString()}`, {
          scroll: false,
        });
      }, 300);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [store, pathname, searchParams, router]);

  const updateFilter = (name: FiltersName, value: string) => {
    setStore((prevFilters) => ({
      ...prevFilters,
      [name]: prevFilters[name].includes(value)
        ? prevFilters[name].filter((item) => item !== value)
        : [...prevFilters[name], value],
      page: "1",
    }));
  };

  const updatePagination = (page: string) => {
    setStore((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  const updateSearch = useDebouncedCallback((value) => {
    setStore((prevFilters) => ({
      ...prevFilters,
      search: value,
      page: "1",
    }));
  }, 300);

  const clearAllFilters = () => {
    setStore({
      [createFilterName("asset_class")]: [],
      [createFilterName("focus")]: [],
      [createFilterName("strategy")]: [],
      search: "",
      page: "1",
    });

    const event = new CustomEvent("filtersCleared");
    window.dispatchEvent(event);
  };

  const isActiveFilter = (name: FiltersName, value: string) => {
    return store[name]?.includes(value) ?? false;
  };

  const getSearchedValue = useMemo(() => store.search, [store.search]);

  const hasFilters = useMemo(
    () =>
      Object.entries(store).some(
        ([key, value]) => key !== "page" && value && value.length > 0
      ),
    [store]
  );

  return (
    <FiltersContext.Provider
      value={{
        updateFilter,
        updateSearch,
        getSearchedValue,
        clearAllFilters,
        isActiveFilter,
        hasFilters,
        updatePagination,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = (): FiltersContextProps => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }
  return context;
};
