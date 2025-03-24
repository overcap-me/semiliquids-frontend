import { ButtonOrLink } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import type { FC } from "react";
import styles from "./SwitcherChart.module.css";
import { RoundIcon } from "../../RoundIcon";

type SwitcherChartProps = {
  id: string;

  name: string;

  color?: string;

  onClick?: (id: string) => void;

  selected?: boolean;

  /**
   * Always active
   */
  canSwitch?: boolean;
};

export const SwitcherChart: FC<SwitcherChartProps> = ({
  id,
  name,
  color,
  onClick,
  canSwitch,
  selected = true,
}) => {
  const handleSwitcher = () => {
    if (!canSwitch) {
      onClick?.(id);
    }
  };

  return (
    <ButtonOrLink
      className={styles.switcher}
      type="button"
      asTag="button"
      onClick={handleSwitcher}
    >
      <RoundIcon
        neverChange={canSwitch}
        selected={selected}
        backgroundColor={color}
      />
      <Typography textTransform="uppercase" color="primary-70">
        {name}
      </Typography>
    </ButtonOrLink>
  );
};
