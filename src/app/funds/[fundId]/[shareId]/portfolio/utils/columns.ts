import type { TopInvestmentsDetail } from "@/types/schema/funds";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelperInvest = createColumnHelper<TopInvestmentsDetail>();

const Left = 'rt-tr-align-left';
const Right = 'rt-tr-align-right';

export const mutatorInvestData = (list) => {

  if (!list) {
    return {
      columns: [],
      rows: []
    }
  }

  try {
    const dynamicColumns = list?.headers?.map((header) =>
      columnHelperInvest.accessor(header.title.toLowerCase().replace(/\s+/g, "_"),
        {
          header: header.title,
          cellClassName: Left
        }
      )
    );

    const dynamicData = list?.rows?.map((row) =>
      row?.reduce((acc, cell, index) => {
        const key = list.headers[index].title.toLowerCase().replace(/\s+/g, "_");
        acc[key] = cell.value;
        return acc;
      }, {})
    );

    return {
      columns: dynamicColumns,
      rows: dynamicData
    }
  } catch (error) {
    return {
      columns: [],
      rows: []
    }
  }
}