import type { ClassValue } from "clsx";
import type {
  TAlign,
  TFontFamily,
  TFontWeight,
  TSize,
  TTextTransform,
  TTextWrap,
  TagVariants,
} from "./Typography";
import styles from "./Typography.module.css";
import type { TColor, TSpacing } from "./types";

export const StylesOverrideFontSize: Record<TSize, ClassValue> = {
  xxl: styles.FontSize_xxl,
  xl: styles.FontSize_xl,
  l: styles.FontSize_l,
  m: styles.FontSize_m,
  s: styles.FontSize_s,
  xs: styles.FontSize_xs,
  xxs: styles.FontSize_xxs,
};

export const StylesOverrideSpacing: Record<TSpacing, ClassValue> = {
  xxl: styles.Spacing_xxl,
  xl: styles.Spacing_xl,
  l: styles.Spacing_l,
  m: styles.Spacing_m,
  s: styles.Spacing_s,
  smm: styles.Spacing_smm,
  sm: styles.Spacing_sm,
  xs: styles.Spacing_xs,
  xxs: styles.Spacing_xxs,
  null: styles.Spacing_null,
};

export const StylesOverrideColor: Record<TColor, ClassValue> = {
  primary: styles.Color_primary,
  "primary-70": styles.Color_primary_70,
  "primary-50": styles.Color_primary_50,
  "primary-20": styles.Color_primary_20,
  accent: styles.Color_accent,
  "accent-50": styles.Color_accent_50,
  white: styles.Color_white,
  "white-60": styles.Color_white_60,
  "white-50": styles.Color_white_50,
  active: styles.Color_active,
  error: styles.Color_error,
  "error-70": styles.Color_error_70,
};

export const Headings: Record<TagVariants, ClassValue> = {
  h1: styles.Heading_1,
  h2: styles.Heading_2,
  h3: styles.Heading_3,
  h4: styles.Heading_4,
  h5: styles.Heading_5,
  h6: styles.Heading_6,
  p: styles.Text_Default,
  span: styles.Text_Default,
  div: undefined,
  time: undefined,
};

export const Weights: Record<TFontWeight, ClassValue> = {
  400: styles.Weight_400,
  500: styles.Weight_500,
  600: styles.Weight_600,
  700: styles.Weight_700,
  800: styles.Weight_800,
};

export const FontFamily: Record<TFontFamily, ClassValue> = {
  manrope: styles.Font_Manrope,
  "frank-ruhl-libre": styles.Font_FrankRuhlLibre,
};

export const TextTransform: Record<TTextTransform, ClassValue> = {
  uppercase: styles.Text_Transform_Upp,
  lowercase: styles.Text_Transform_Low,
  capitalize: styles.Text_Transform_Cap,
};

export const TextAlign: Record<TAlign, ClassValue> = {
  left: styles.Left,
  right: "",
  center: styles.Center,
};

export const StylesTextWrap: Record<TTextWrap, ClassValue> = {
  'nowrap': styles.Text_NoWrap,
  'wrap': styles.Text_Wrap,
}