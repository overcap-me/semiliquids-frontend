import { type ClassValue, clsx } from "clsx";
import type React from "react";
import { type CSSProperties, type FC, createElement } from "react";
import {
  FontFamily,
  Headings,
  StylesOverrideColor,
  StylesOverrideFontSize,
  StylesOverrideSpacing,
  StylesTextWrap,
  TextAlign,
  TextTransform,
  Weights,
} from "./helper.styles";
import type { TColor, TSpacing } from "./types";

export type TagVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "time"
  | "li"
  | "div";
export type TFontWeight = "400" | "500" | "600" | "700" | "800";
export type TAlign = "left" | "right" | "center";
export type TTextTransform = "lowercase" | "uppercase" | "capitalize";
export type TFontFamily = "manrope" | "frank-ruhl-libre";

export type TTextWrap = 'wrap' | 'nowrap';

/**
 * The font size is described
 */
export type TSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";

export type TypographyProps = {
  id?: string;
  as?: TagVariants;
  size?: TSize;
  color?: TColor;
  fontFamily?: TFontFamily;
  fontWeight?: TFontWeight;
  textTransform?: TTextTransform;
  textWrap?: TTextWrap
  align?: TAlign;
  spacing?: TSpacing;
  className?: ClassValue;
  children: React.ReactNode;
  style?: CSSProperties;
  ref?: React.RefObject<HTMLElement | null>;
};

export const DynamicTypography = ({ tag, children, ...props }) =>
  createElement(tag, props, children);

export const Typography: FC<TypographyProps> = ({
  as = "p",
  id,
  color,
  fontWeight,
  fontFamily,
  textTransform,
  align,
  size,
  spacing,
  className,
  children,
  textWrap,
  style,
  ref
}) => {
  const classes = clsx(
    Headings[as],
    fontWeight && Weights[fontWeight],
    fontFamily && FontFamily[fontFamily],
    textTransform && TextTransform[textTransform],
    align && TextAlign[align],
    color && StylesOverrideColor[color],
    size && StylesOverrideFontSize[size],
    spacing && StylesOverrideSpacing[spacing],
    textWrap && StylesTextWrap[textWrap],
    className,
  );

  // TODO: Add a test for this
  if (!children) {
    return null
  }

  return (
    <DynamicTypography ref={ref} id={id} className={classes} tag={as} style={style}>
      {children}
    </DynamicTypography>
  );
};
