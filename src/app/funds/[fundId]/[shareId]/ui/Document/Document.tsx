import DocumentIcon from "@/assets/icons/Document.svg";
import { Typography } from "@/components/Typography";
import type { FC } from "react";
import styles from "./Documents.module.css";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import type { DocumentDetail } from "@/types/schema/funds";
import { formattedDate } from "@/utils/actionsWithDate";
import { GLOBAL_OPTIONS_DATE } from "@/utils/constans";

type TProps = {
  document: DocumentDetail;
};

export const Document: FC<TProps> = ({ document }) => {

  return (
    <ButtonOrLink
      target="_blank"
      asTag="a"
      href={document.url}
      className={styles.Document}
    >
      <div className={styles.Document__Icon}>
        <DocumentIcon />
      </div>

      <div className={styles.Document__Desc}>
        <Typography className={styles.Document__Title} as="h6">
          {document.title}
        </Typography>
        {document.created_at && (
          <Typography as="h6" color="primary-50">
            {formattedDate(document?.created_at, GLOBAL_OPTIONS_DATE)}
          </Typography>
        )}
      </div>
    </ButtonOrLink>
  );
};
