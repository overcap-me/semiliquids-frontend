import { PagesActionsServiceInstance } from "@/api/pages/PagesActionsService";
import { Accordion } from "@/ui/Accordion";
import { Typography } from "@/components/Typography";
import { Narrow, Wrapper } from "@/components/Wrapper";
import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { MainBanner } from "@/ui/MainBanner";
import { clsx } from "clsx";
import styles from "./Faq.module.css";
import { TextView } from "@/app/funds/[fundId]/[shareId]/ui/TextView";

const FAQPage = async () => {
  const { data } = (await PagesActionsServiceInstance.getPages("faq")) ?? {
    data: {},
  };

  const sections = data?.sections ?? [];

  return (
    <>
      <MainBanner title={data.name} />
      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x120}>
        <Narrow>
          <div className={clsx(stylesLayout.Grid, stylesLayout.Gap_80)}>
            {sections?.map((sect) =>
              sect.data.items.map((faq, ind) => {
                return (
                  <Accordion
                    key={ind}
                    headerClassName={styles.AccordionHeader}
                    header={
                      <Typography spacing="null" as="h2">
                        {faq.question}
                      </Typography>
                    }
                  >
                    <TextView content={faq.answer.content} />
                  </Accordion>
                );
              }),
            )}
          </div>
        </Narrow>
      </Wrapper>
    </>
  );
};

export default FAQPage;
