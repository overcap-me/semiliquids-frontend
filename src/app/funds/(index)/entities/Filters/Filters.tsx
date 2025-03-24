import { Wrapper } from "@/components/Wrapper";
import stylesSpace from "@/styles/module/Spacing.module.css";

import { Filters as FiltersGlobal } from '@/widgets/Filters'

export const Filters = async () => {
  return (
    <Wrapper classNameContainer={stylesSpace.Spacing__Outer_40x32}>
      <FiltersGlobal />
    </Wrapper>
  );
};
