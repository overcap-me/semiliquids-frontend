import { PublishInformation } from "@/components/PublishInformation";
import { Typography } from "@/components/Typography";
import { clsx } from "clsx";
import type { FC } from "react";
import styles from "./Card.module.css";
import { ButtonOrLink } from "@/components/ButtonOrLink";
import { ROUTE_PATHS } from "@/shared/routes";
import type { ArticleDetail } from "@/types/schema/blogs/article";
import Image from "next/image";
import { fullName } from "@/utils/fullName";

type CardProps = {
  variants?: "default" | "primary" | "minimal" | "large";
  advert?: string;
  article: ArticleDetail;
};

export const Card: FC<CardProps> = ({
  advert,
  variants = "default",

  article
}) => {
  return (
    <ButtonOrLink
      className={styles.Link}
      asTag="a"
      href={ROUTE_PATHS.BLOG.ARTICLE_BY_ID(article.slug)}
    >
      <article
        className={clsx(styles.Card, {
          [styles.Large]: variants === "large",
          [styles.Primary]: variants === "primary",
        })}
      >
        {!!article?.media?.url && (
          <picture className={styles.Picture}>
            <Image className={styles.Image} width={400} height={240} src={article.media.url} alt={article.media.pretty_name} />
          </picture>
        )}

        <div className={styles.Body}>
          {!!advert && (
            <Typography color="active" as="h4">
              {advert}
            </Typography>
          )}
          <Typography
            className={styles.Title}
            spacing="xs"
            as={variants === "primary" ? "h1" : "h3"}
          >
            {article.title}
          </Typography>
          <PublishInformation
            theme={variants === "primary" ? "dark" : "light"}
            author={fullName(article.author.first_name, article.author.last_name)}
            time={article.published_at}
          />
        </div>
      </article>
    </ButtonOrLink>
  );
};
