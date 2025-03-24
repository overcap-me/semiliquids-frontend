import {
  Frank_Ruhl_Libre as FontFrankRuhlLibre,
  Manrope as FontManrope,
} from "next/font/google";

export const FrankRuhlLibre = FontFrankRuhlLibre({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-frank-ruhl-libre",
  preload: false
});

export const Manrope = FontManrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
  preload: false
});
