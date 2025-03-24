import { Typography } from "@/components/Typography";
import { EBackgroundColor, Wrapper } from "@/components/Wrapper";
import { type ClassValue, clsx } from "clsx";
import type { FC, ReactNode } from "react";
import styles from "./MainBanner.module.css";

type TTypeBanner = "default" | "minimal" | "primary" | "card";

type MainBannerProps = {
  type?: TTypeBanner;
  title?: string;
  children?: ReactNode;
  breadcrumbs?: ReactNode;
};

const StylesType: Record<TTypeBanner, ClassValue> = {
  card: styles.Card,
  default: styles.Default,
  minimal: styles.Minimal,
  primary: styles.Primary,
};

export const MainBanner: FC<Readonly<MainBannerProps>> = ({
  children,
  title,
  breadcrumbs,
  type = "default",
}) => {
  const classesOfContainer = clsx(styles.banner, type && StylesType[type]);

  if (children) {
    return (
      <Wrapper
        classNameContainer={classesOfContainer}
        bg={EBackgroundColor.Primary}
      >
        {breadcrumbs}
        {children}
      </Wrapper>
    );
  }

  return (
    <Wrapper
      classNameContainer={classesOfContainer}
      bg={EBackgroundColor.Primary}
    >
      {breadcrumbs}
      {title && (
        <Typography fontWeight="400" as="h1">
          {title}
        </Typography>
      )}
    </Wrapper>
  );
};
