"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { FundResponse } from "@/types/schema/funds";
import { usePathname } from "next/navigation";
import { CurtainWithSelectedFunds } from "../CurtainWithSelectedFunds";
import { createCompareUrl } from "../utils/createCompareUrl";


type TProps = {
  selected?: FundResponse[];
  onSelect: (value: FundResponse) => void;
  hasSelectedById: (id: string) => void;
  onClear: () => void;
  isLimit: boolean;
  compareUrl: string
  count: number;
};

const CompareContext = createContext<TProps>({
  onSelect: (value: FundResponse) => { },
  hasSelectedById: (id: string) => { },
  onClear: () => { },
  isLimit: false,
  compareUrl: '',
  count: 0,
});

export const MAX_LIMIT_SELECTED = 2;

// TODO: Should be refactored to move the logic to the compare entity
export const CompareProvider = ({ children }) => {
  const pathname = usePathname();
  const [selected, setSelected] = useState<FundResponse[]>([]);

  const onSelect = useCallback((value: FundResponse) => {
    setSelected((prev) => {
      const isItemSelected = prev.some((item) => item.id === value.id);

      if (isItemSelected) {
        return prev.filter((item) => item.id !== value.id);
      }

      if (prev.length > MAX_LIMIT_SELECTED) {
        return prev;
      }

      return [...prev, value];
    });
  }, []);

  const onClear = useCallback(() => {
    setSelected([]);
  }, []);

  const hasSelectedById = useCallback(
    (id: string) => selected.some((item) => item.id === id),
    [selected],
  );

  const isLimit = useMemo(
    () => selected.length > MAX_LIMIT_SELECTED,
    [selected],
  );

  const compareUrl = createCompareUrl(selected);

  const count = selected.length;

  return (
    <CompareContext.Provider
      value={{
        selected,
        onSelect,
        hasSelectedById,
        onClear,
        isLimit,
        compareUrl,
        count
      }}
    >
      {children}

      <CurtainWithSelectedFunds items={selected} onDeleteById={onSelect} pathname={pathname} />
    </CompareContext.Provider>
  );
};

export const useCompareContext = () => useContext(CompareContext);
