import { Typography } from "@/components/Typography";
import { clsx } from "clsx";
import type { FC } from "react";
import styles from "./PublishInformation.module.css";
import { formattedDate } from "@/utils/actionsWithDate";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";

type TTheme = "dark" | "light";

type TProps = {
  theme?: TTheme;
  author: string;
  time: string;
};

export const PublishInformation: FC<TProps> = ({
  author,
  time,
  theme = "light",
}) => {
  const classes = clsx({
    [styles.Dark]: theme === "dark",
    [styles.Light]: theme === "light",
  });
  return (
    <div className={classes}>
      {author && <Typography as="h6">by {author}</Typography>}
      {time && (
        <time className={styles.Time}>
          {formattedDate(time, {
            ...GLOBAL_OPTIONS_DATE,
            ...{ day: "numeric" },
          })}
        </time>
      )}
    </div>
  );
};
