"use client";
import { clsx } from "clsx";
import { Accordion } from "@/ui/Accordion";
import { Typography } from "@/components/Typography";
import { Wrapper } from "@/components/Wrapper";
import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";
import stylesDocuments from "../ui/Document/Documents.module.css";
import { Document } from "../ui/Document";
import { useFundContext } from "../contexts/FundProvider";
import { SuspenseConditional } from "@/ui/SuspenseConditional";
import { hasData } from "@/utils/hasData";
import { Block } from "@/shared/ui/Block";

const START_INDEX = 0;
const MAX_LIMIT = 4;

const DocumentsPage = () => {
  const { data } = useFundContext();

  const hasMoreItemsFundLiterature = data?.fund_literature?.length > MAX_LIMIT;
  const hasMoreItemsRegulatoryDocuments =
    data?.regulatory_documents?.length > MAX_LIMIT;

  return (
    <SuspenseConditional>
      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_80x64}>
        <Typography as="h2">Documents</Typography>
      </Wrapper>
      {hasData(data?.fund_literature) && (
        <Wrapper classNameContainer={[stylesSpace.Spacing__Outer_64x64]}>
          <Typography spacing="smm" as="h3">
            Fund Updates
          </Typography>
          <Block
            className={clsx(stylesDocuments.Documents, stylesLayout.Gap_24)}
          >
            {data?.fund_literature
              ?.slice(START_INDEX, MAX_LIMIT)
              ?.map((doc) => (
                <Document key={doc.id} document={doc} />
              ))}
          </Block>

          {hasMoreItemsFundLiterature && (
            <Accordion
              hiddenArrow
              headerClassName={stylesDocuments.accordionHeader}
              header={<Typography>Archive</Typography>}
            >
              <div
                className={clsx(stylesDocuments.Documents, stylesLayout.Gap_24)}
              >
                {data?.fund_literature?.slice(MAX_LIMIT)?.map((doc) => (
                  <Document key={doc.id} document={doc} />
                ))}
              </div>
            </Accordion>
          )}
        </Wrapper>
      )}

      {hasData(data?.regulatory_documents) && (
        <Wrapper classNameContainer={[stylesSpace.Spacing__Outer_64x64]}>
          <Typography spacing="smm" as="h3">
            Fund Information
          </Typography>
          <Block
            className={clsx(stylesDocuments.Documents, stylesLayout.Gap_24)}
          >
            {data?.regulatory_documents
              ?.slice(START_INDEX, MAX_LIMIT)
              ?.map((doc) => (
                <Document key={doc.id} document={doc} />
              ))}
          </Block>

          {hasMoreItemsRegulatoryDocuments && (
            <Accordion
              hiddenArrow
              headerClassName={stylesDocuments.accordionHeader}
              header={<Typography>Archive</Typography>}
            >
              <div
                className={clsx(stylesDocuments.Documents, stylesLayout.Gap_24)}
              >
                {data?.regulatory_documents?.slice(MAX_LIMIT)?.map((doc) => (
                  <Document key={doc.id} document={doc} />
                ))}
              </div>
            </Accordion>
          )}
        </Wrapper>
      )}
    </SuspenseConditional>
  );
};

export default DocumentsPage;
