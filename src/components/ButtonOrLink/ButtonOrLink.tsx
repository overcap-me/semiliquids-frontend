import { type ClassValue, clsx } from "clsx";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { type FC, type MouseEvent, type ReactNode, createElement } from "react";
import styles from "./Button.module.css";

type TPointDirection = "left" | "bottom";

type TMode = "arrow-right" | "arrow-left";

export type TColor =
  | "accent"
  | "accent-50"
  | "primary"
  | "primary-20"
  | "primary-50"
  | "primary-70"
  | "error"
  | "white"
  | "white-50"
  | "white-60"
  | "active"
  | "pink"
  | "hover";

type AnchorProps = {
  asTag: "a";
} & LinkProps;

type ButtonProps = {
  asTag: "button";
  type?: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

type TProps = (AnchorProps | ButtonProps) & {
  pointDirection?: TPointDirection;
  mode?: TMode;
  underline?: "bottom";
  isActive?: boolean;
  color?: TColor;
  /**
   * @deprecated classNames
   * The prop classNames will be remove in the next release
   */
  classNames?: ClassValue;
  className?: ClassValue;
  children: ReactNode;
};

const Element = ({ tag, children, ...props }) => {
  if (tag === "button") {
    return createElement(tag, props, children);
  }

  return createElement(Link, props, children);
};

const StylesPointDirection: Record<TPointDirection, ClassValue> = {
  left: styles.Point__Left,
  bottom: styles.Point__Bottom,
};

const StylesMode: Record<TMode, ClassValue> = {
  "arrow-left": styles.ArrowLeft,
  "arrow-right": styles.ArrowRight,
};

const StylesUnderline: Record<"bottom", ClassValue> = {
  bottom: styles.Underline__Bottom,
};

const StylesColor: Record<TColor, ClassValue> = {
  "primary-50": styles.Primary_50,
  "primary-70": styles.Primary_70,
  primary: styles.Primary,
  accent: styles.Accent,
  "accent-50": styles.Accent_50,
  "white-50": styles.White_50,
  pink: styles.Pink,
  error: styles.Error,
  white: styles.White,
  active: styles.Active,
};

export const ButtonOrLink: FC<TProps> = ({
  asTag,
  pointDirection,
  classNames,
  className,
  color,
  mode,
  underline,
  isActive,
  children,
  ...props
}) => {
  const classes = clsx(
    classNames,
    className,
    styles.Button,
    color && StylesColor[color],
    pointDirection && StylesPointDirection[pointDirection],
    underline && StylesUnderline[underline],
    mode && StylesMode[mode],
    {
      [styles.Selected]: isActive,
    }
  );

  return (
    <Element className={classes} tag={asTag} {...props}>
      {children}
    </Element>
  );
};
