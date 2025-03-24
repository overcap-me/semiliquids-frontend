import { Typography } from "@/components/Typography";
import type { TypographyProps } from "@/components/Typography";
import type { FC, ReactNode } from "react";

type BlockProps = {
  children: ReactNode;
  ref?: React.RefObject<HTMLElement | null>;
} & Pick<TypographyProps, "spacing" | "className">;

export const Block: FC<BlockProps> = ({ children, spacing, className, ref }) => {
  return <Typography ref={ref} className={className} spacing={spacing} as="div">{children}</Typography>;
};
