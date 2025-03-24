import type { FC } from "react";
import clsx, { type ClassValue } from "clsx";
import { ButtonOrLink, type TColor } from "@/components/ButtonOrLink";
import { Typography } from "@/components/Typography";
import Bin from "@/assets/icons/Bin.svg";
import stylesLayout from "@/styles/module/Layout.module.css";
import { SIZE_PROPS } from "@/shared/lib/icons";
import styles from "./RemoveButton.module.css";

type TProps = {
  onClick: () => void;
  title: string;
  color?: TColor;
  className?: ClassValue;
};

export const RemoveButton: FC<TProps> = ({
  onClick,
  title,
  color,
  className,
}) => {
  return (
    <ButtonOrLink
      asTag="button"
      color={color}
      onClick={onClick}
      underline="bottom"
      className={clsx(stylesLayout.Flex, stylesLayout.AIC, styles.remove, className)}
    >
      <Bin {...SIZE_PROPS} className={stylesLayout.Icon_MR_8} />
      <Typography>{title}</Typography>
    </ButtonOrLink>
  );
};
