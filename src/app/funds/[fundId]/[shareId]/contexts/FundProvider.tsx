"use client";
import type { FundByIdResponse } from "@/types/schema/fund";
import type { ClassDetail } from "@/types/schema/funds";
import type { PerformanceIndexesResponse } from "@/types/schema/indexes";
import React, {
  createContext,
  type FC,
  type ReactNode,
  useContext,
} from "react";

// TODO: all types update
type FundContextProps = {
  data?: FundByIdResponse;
  shareId?: string;
  currentData?: ClassDetail;
  perfomancesIndex?: PerformanceIndexesResponse;
};

const FundContext = createContext<FundContextProps | null>(null);

type FundProviderProps = {
  children: ReactNode;
  hub: FundByIdResponse;
  currentData: ClassDetail;
  shareId: string;
  perfomancesIndex: PerformanceIndexesResponse;
};

export const FundProvider: FC<FundProviderProps> = ({
  children,
  hub,
  currentData,
  shareId,
  perfomancesIndex,
}) => {
  return (
    <FundContext.Provider
      value={{ data: hub, currentData, shareId, perfomancesIndex }}
    >
      {children}
    </FundContext.Provider>
  );
};

export const useFundContext = (): FundContextProps => {
  const fundContextAccessor = useContext(FundContext);

  if (!fundContextAccessor) {
    throw new Error("useFundContext must be used within a FundProvider");
  }

  return fundContextAccessor;
};
