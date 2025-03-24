import { Typography } from "@/components/Typography";
import { NOT_DATA } from "@/utils/constans";
import clsx from "clsx";
import stylesLayout from "@/styles/module/Layout.module.css";

export const NotDataTable = () => {
  return (
    <div className={clsx(stylesLayout.Flex, stylesLayout.FDC, stylesLayout.JCC, stylesLayout.AIC)}>
      <Typography as="h2">{NOT_DATA}</Typography>
      <Typography>You can try to set other parameters for the filters</Typography>
    </div>
  )
}