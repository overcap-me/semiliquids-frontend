"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import type { FundByIdCompareResponse } from "@/types/schema/compare";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { useCompareContext } from "@/entities/compare/context";
import { createCompareUrl } from "@/entities/compare/utils/createCompareUrl";
import { ROUTE_PATHS } from "@/shared/routes";


type TableCompareContextProps = {
  funds: FundByIdCompareResponse[];
  removeRow: (id: number) => void;
  length: number;
};

const TableCompareContext = createContext<TableCompareContextProps | null>(
  null,
);

type TableCompareProviderProps = {
  children: ReactNode;
} & Pick<TableCompareContextProps, "funds">;

export const TableCompareProvider: FC<TableCompareProviderProps> = ({
  funds,
  children,
}) => {
  const router = useRouter();
  const [data, setData] = useState(() => funds ?? []);

  const { onSelect: onDeleteByIdOfStateComapre } = useCompareContext()

  const removeRow = (id: number) => {
    const fund = data.find((it) => it.id !== id);

    if (fund) {
      onDeleteByIdOfStateComapre(fund);
    }

    setData((prev) => prev.filter((it) => it.id !== id));
  }


  const length = useMemo(() => data.length, [data]);

  useEffect(() => {
    if (length === 0) {
      router.push("/");
    }
  }, [length, router]);

  return (
    <TableCompareContext.Provider value={{
      removeRow,
      funds: data,
      length
    }}>

      {children}
    </TableCompareContext.Provider>
  );
};

export const useTableCompareContext = (): TableCompareContextProps => {
  const tableCompareContextAccessor = useContext(TableCompareContext);

  if (!tableCompareContextAccessor) {
    throw new Error(
      "useTableCompareContext must be used within a TableCompareProvider",
    );
  }

  return tableCompareContextAccessor;
};
