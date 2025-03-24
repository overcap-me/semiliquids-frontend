import { useState, type FC } from "react";
import styles from './RoundIcon.module.css'
import clsx from "clsx";

type RoundIconProps = {
  /**
   * Background color of the round icon
   */
  backgroundColor?: string;

  selected?: boolean;

  /**
   * That means the schedule can't be turned off
   */
  neverChange?: boolean
};

export const RoundIcon: FC<RoundIconProps> = ({ backgroundColor, selected = false, neverChange }) => {
  return (
    <span className={clsx(styles.outside, {
      [styles.selected]: selected,
    })} style={{
      borderColor: backgroundColor,
      backgroundColor: neverChange ? backgroundColor : undefined
    }}>
      <span className={styles.inner} style={{
        backgroundColor: backgroundColor
      }} />
    </span >
  )
};
