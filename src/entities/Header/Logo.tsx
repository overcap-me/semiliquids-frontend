import { Typography } from "@/components/Typography";

import styles from "./Header.module.css";

export const Logo = () => {
  return (
    <span className={styles.logo}>
      <Typography size="l" fontWeight="400" fontFamily="frank-ruhl-libre">
        <span>SEMI</span>
        <span className={styles.dot} />
        <span>LIQUIDS</span>
      </Typography>
      <Typography fontWeight="400" as="h6" className={styles.subtitle}>
        Private Market Funds Navigator
      </Typography>
    </span>
  );
};
