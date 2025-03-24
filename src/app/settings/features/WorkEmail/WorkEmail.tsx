import { Typography } from "@/components/Typography";
import stylesLayout from "@/styles/module/Layout.module.css";
import { clsx } from "clsx";
import type { FC } from "react";

type TProps = {
  email?: string;
};
export const WorkEmail: FC<TProps> = ({ email }) => {
  return (
    <div
      className={clsx(stylesLayout.Flex, stylesLayout.Gap_16, stylesLayout.FDC)}
    >
      <div>
        <div>
          <Typography spacing="xxs" color="primary-70">
            Work Email
          </Typography>
          <Typography>{email}</Typography>
        </div>
      </div>
    </div>
  );
};
