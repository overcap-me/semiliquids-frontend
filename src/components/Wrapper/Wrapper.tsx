import { type ClassValue, clsx } from "clsx";
import type { FC } from "react";
import styles from "./Wrapper.module.css";
import { EBackgroundColor } from "./types";

type TProps = {
  children: React.ReactNode;
  classNameContainer?: ClassValue;
  classNameWrapper?: ClassValue;
  bg?: Lowercase<keyof typeof EBackgroundColor>;

  onlyInner?: boolean;
};

export const Wrapper: FC<TProps> = ({
  children,
  classNameContainer,
  classNameWrapper,
  bg,
  onlyInner = false,
}) => {
  if (onlyInner) {
    return (
      <div className={clsx(styles.Wrapper, classNameWrapper)}>{children}</div>
    );
  }

  return (
    <section
      className={clsx(classNameContainer, {
        [styles.Primary]: bg === EBackgroundColor.Primary,
        [styles.Secondary]: bg === EBackgroundColor.Secondary,
        [styles.Navigation]: bg === EBackgroundColor.Navigation,
      })}
    >
      <div className={clsx(styles.Wrapper, classNameWrapper)}>{children}</div>
    </section>
  );
};
