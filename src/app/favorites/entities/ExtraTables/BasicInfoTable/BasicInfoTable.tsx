import { cellWithPostfix } from "@/utils/calcCell";
import styles from "../ExtraTables.module.css";
import { calcValueWithCurrency } from "@/utils/currency";
import { formattedDate } from "@/utils/actionsWithDate";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";

export const BasicInfoTable = ({ row }) => {
  return (
    <div className={styles.Block}>
      <tr className={styles.Header}>
        <th className={styles.Cell}>Fund manager</th>
        <th className={styles.Cell}>Fund AuM</th>
        <th className={styles.Cell}>Inception Date</th>
        <th className={styles.Cell}>Share Class</th>
        <th className={styles.Cell}>Share Class Currency</th>
      </tr>
      <tr>
        <td className={styles.Cell}>{row?.original?.fund?.manager?.name}</td>
        <td className={styles.Cell}>
          {cellWithPostfix(
            calcValueWithCurrency(row.original?.fund?.aum?.value, {
              currency: row?.original?.share_class?.currency?.name,
            }),
            row?.original?.fund?.aum?.unit,
          )}
        </td>
        <td className={styles.Cell}>
          {formattedDate(
            row?.original?.fund?.inception_date,
            GLOBAL_OPTIONS_DATE,
          )}
        </td>
        <td className={styles.Cell}>{row?.original?.share_class?.name}</td>
        <td className={styles.Cell}>
          {row?.original?.share_class?.currency?.name}
        </td>
      </tr>
    </div>
  );
};
