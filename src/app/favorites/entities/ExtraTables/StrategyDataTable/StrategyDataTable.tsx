import { Typography } from "@/components/Typography";
import styles from "../ExtraTables.module.css";
import { cellWithPostfix } from "@/utils/calcCell";
import { addColorsForBarChart, BarLine } from "@/shared/ui/charts/BarLine";
import stylesStrategy from "./StrategyDataTable.module.css";

const headerList = [
  { name: "Asset Class", key: "asset_classes" },
  { name: "Strategy", key: "strategies" },
  { name: "Investment type", key: "focuses" },
  { name: "Geo Focus", key: "industries" },
  { name: "Core Industries", key: "industries" },
]

export const StrategyDataTable = ({ row }) => {
  return (
    <div className={styles.Block}>
      <table>
        <thead>
          <tr className={styles.Header}>
            {headerList.map((header) => (
              <th key={header.key} className={styles.Cell}>
                <Typography as="h6" fontWeight="800" textTransform="uppercase">
                  {header.name}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.Cell}>
              <div className={stylesStrategy.cellBlockWithChart}>
                <BarLine width={200} data={addColorsForBarChart(row?.original?.__fund?.asset_classes)} />
                {row?.original?.__fund?.asset_classes?.map((cls) => (
                  <Typography key={cls.id}>
                    {cls.asset_class} {cellWithPostfix(cls.value, "%")}
                  </Typography>
                ))}
              </div>
            </td>
            <td className={styles.Cell}>
              <div className={stylesStrategy.cellBlockWithChart}>
                <BarLine width={200} data={addColorsForBarChart(row?.original?.__fund?.strategies)} />
                {row?.original?.__fund?.strategies?.map((cls) => (
                  <Typography key={cls.id}>
                    {cls.strategy} {cellWithPostfix(cls.value, "%")}
                  </Typography>
                ))}
              </div>
            </td>

            <td className={styles.Cell}>
              <div className={stylesStrategy.cellBlockWithChart}>
                <BarLine width={200} data={addColorsForBarChart(row?.original?.__fund?.investment_types)} />
                {row?.original?.__fund?.investment_types?.map((cls) => (
                  <Typography key={cls.id}>
                    {cls.investment_type} {cellWithPostfix(cls.value, "%")}
                  </Typography>
                ))}
              </div>
            </td>

            <td className={styles.Cell}>
              <div className={stylesStrategy.cellBlockWithChart}>
                <BarLine width={200} data={addColorsForBarChart(row?.original?.__fund?.focuses)} />
                {row?.original?.__fund?.focuses?.map((cls) => (
                  <Typography key={cls.id}>
                    {cls.focus} {cellWithPostfix(cls.value, "%")}
                  </Typography>
                ))}
              </div>
            </td>
            <td className={styles.Cell}>
              <div className={stylesStrategy.cellBlockWithChart}>
                <BarLine width={200} data={addColorsForBarChart(row?.original?.__fund?.industries)} />
                {row?.original?.__fund?.industries?.map((cls) => (
                  <Typography key={cls.id}>
                    {cls.industry} {cellWithPostfix(cls.value, "%")}
                  </Typography>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
