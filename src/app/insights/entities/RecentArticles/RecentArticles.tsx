import { listBlogsMocks } from "@/__mocks__/blogs.mocks";
import { Card } from "@/app/insights/ui/Card";
import { Typography } from "@/components/Typography";
import stylesLayout from "@/styles/module/Layout.module.css";
import { clsx } from "clsx";
import styles from "./RecentArticles.module.css";

export const RecentArticles = () => {
  return (
    <aside className={styles.Body}>
      <div className={styles.Desc}>
        <Typography spacing="xs" as="h2">
          Market Updates this Week
        </Typography>
        <Typography color="primary-70">
          Serached high and low for this jewels.
        </Typography>
      </div>
      <div className={clsx(stylesLayout.Grid, stylesLayout.Gap_32)}>
        {listBlogsMocks.map((opt) => (
          <Card
            key={opt.id}
            title={opt.title}
            time={opt.time}
            author={opt.author}
          />
        ))}
      </div>
    </aside>
  );
};
