import type React from "react";
import type { FC } from "react";

import { MainChapter } from "../Frames/MainChapter";
import { Snapshot } from "../Frames/Snapshot";
import { Performance } from "../Frames/Performance";
import { Terms } from "../Frames/Terms";
import { Portfolio } from "../Frames/Portfolio";


import styles from "./TableOfCompare.module.css";
import type { PerformanceIndexesResponse } from "@/types/schema/indexes";
import type { FundByIdCompareResponse } from "@/types/schema/compare";

type TableOfCompareProps = {
  funds: FundByIdCompareResponse[];
  indexes: PerformanceIndexesResponse;
  length: number;
};

export const TableOfCompare: FC<TableOfCompareProps> = ({
  funds = [],
  indexes,
  length,
}) => {
  return (
    <div className={styles.Block}>
      <table>
        <tbody className={styles.tbody} data-columns={length}>
          <MainChapter funds={funds} />

          <Snapshot length={length} funds={funds} />

          <Performance length={length} indexes={indexes} funds={funds} />

          <Portfolio length={length} funds={funds} />

          <Terms length={length} funds={funds} />
        </tbody>
      </table>
    </div>
  );
};
