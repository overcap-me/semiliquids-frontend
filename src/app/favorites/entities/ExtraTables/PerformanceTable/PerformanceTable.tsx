import { cellWithPostfix } from "@/utils/calcCell";
import styles from "../ExtraTables.module.css";
import { Typography } from "@/components/Typography";
import clsx from "clsx";
import { CellWithTwoRow } from "@/shared/ui/HelperOfTable/CellWithTwoRow";
import { subtitleOptions, titleOptions } from "@/shared/ui/HelperOfTable/CellWithTwoRow/consts";
import { Block } from "@/shared/ui/Block";
import { formattedDate } from "@/utils/actionsWithDate";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";

const cells = [
  {
    cellClassName: 'rt-tr-align-right', title: <CellWithTwoRow
      titleOptions={{ ...titleOptions, textWrap: 'nowrap' }}
      subtitleOptions={subtitleOptions}
      title="1 Month"
      subtitle="Date"
    />,
    key: "one_month",
    dateKey: "updated_at",
  },
  { cellClassName: 'rt-tr-align-right', title: "3 Months", key: "three_month" },
  { cellClassName: 'rt-tr-align-right', title: "YTD", key: "ytd" },
  { cellClassName: 'rt-tr-align-right', title: "1 Year", key: "one_year" },
  { cellClassName: 'rt-tr-align-right', title: <>3 Years <br /> annualized</>, key: "three_years_annualized" },
  {
    cellClassName: 'rt-tr-align-right', title: <CellWithTwoRow
      titleOptions={titleOptions}
      subtitleOptions={subtitleOptions}
      title={<>Since <br /> Inception</>}
      subtitle="Date"
    />,
    key: "since_inception_cumulative",
    dateKey: "updated_at",
  },
  { cellClassName: 'rt-tr-align-right', title: <>Since Inception <br /> Annualized</>, key: "since_inception_annualized" },
];

export const PerformanceTable = ({ row }) => {
  return (
    <div className={styles.Block}>
      <table>
        <thead>
          <tr className={styles.Header}>
            {cells.map((header) => (
              <th key={header.key} className={clsx(styles.Cell, header.cellClassName)}>
                <Typography as="h6" fontWeight="800" textTransform="uppercase">
                  {header.title}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {
              cells.map((cell) => (
                <td key={cell.key} className={clsx(styles.Cell, cell.cellClassName)}>
                  <Block>
                    <Typography>{cellWithPostfix(row?.original?.[cell.key], "%")}</Typography>
                    <Typography size="xs" color="primary-50">{formattedDate(row.original?.[cell.dateKey], GLOBAL_OPTIONS_DATE)}</Typography>
                  </Block>
                </td>
              ))
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
};
