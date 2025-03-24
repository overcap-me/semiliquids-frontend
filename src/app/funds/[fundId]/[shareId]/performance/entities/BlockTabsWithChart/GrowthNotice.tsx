import { Typography } from "@/components/Typography";
import { Block } from "@/shared/ui/Block";
import { formattedDate } from "@/utils/actionsWithDate";
import { cellWithPostfix } from "@/utils/calcCell";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";
import type { FC } from "react";

type GrowthNoticeProps = {
  data: unknown[];
  date?: string;
};

const calculatehGrowth = (data: unknown[] = []) => {
  const list = data

  if (list?.length < 2) {
    return "N/A";
  }

  const startValue = list[0].Value;
  const endValue = list[list.length - 1].Value;

  const growth = ((endValue / startValue) - 1) * 100;

  return cellWithPostfix(growth.toFixed(2), "%");
};


export const GrowthNotice: FC<GrowthNoticeProps> = ({ data, date }) => {
  if (data?.length <= 0) return null;

  return (
    <Block>
      <Typography as="h2" spacing="xxs" color="accent">
        {calculatehGrowth(data)}
      </Typography>
      {date && (
        <Typography as="h6" color="primary-70">
          {formattedDate(date, GLOBAL_OPTIONS_DATE)}
        </Typography>
      )}
    </Block>
  );
};
