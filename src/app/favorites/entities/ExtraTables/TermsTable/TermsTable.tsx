import { Typography } from "@/components/Typography";
import styles from "../ExtraTables.module.css";
import { cellWithPostfix } from "@/utils/calcCell";
import { calcValueWithCurrency } from "@/utils/currency";

export const TermsTable = ({ row }) => {
  return (
    <div className={styles.Block}>
      <table>
        <thead>
          <tr className={styles.Header}>
            <td className={styles.Cell}>
              <Typography as="h6" fontWeight="800" textTransform="uppercase">
                Fund Domicile
              </Typography>
            </td>
            <td className={styles.Cell}>
              <Typography as="h6" fontWeight="800" textTransform="uppercase">
                Minimum Investment
              </Typography>
            </td>
            <td className={styles.Cell}>
              <Typography as="h6" fontWeight="800" textTransform="uppercase">
                Fees
              </Typography>
            </td>
            <td className={styles.Cell}>
              <Typography as="h6" fontWeight="800" textTransform="uppercase">
                Subscriptions
              </Typography>
            </td>
            <td className={styles.Cell}>
              <Typography as="h6" fontWeight="800" textTransform="uppercase">
                Liquidity
              </Typography>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.Cell}><Typography>{row?.original?.fund_domicile}</Typography></td>
            <td className={styles.Cell}><Typography>{row?.original?.minimum_investment}</Typography></td>
            <td className={styles.Cell}>{row?.original?.fees?.map(fee => <Typography key={fee}>{fee}</Typography>)}</td>
            <td className={styles.Cell}><Typography>{row?.original?.subscription}</Typography></td>
            <td className={styles.Cell}><Typography>{row?.original?.liquidity}</Typography></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
