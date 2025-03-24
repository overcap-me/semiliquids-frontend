import { Typography } from "@/components/Typography";
import { Wrapper } from "@/components/Wrapper";
import stylesLayout from "@/styles/module/Layout.module.css";
import stylesSpace from "@/styles/module/Spacing.module.css";
import { MainBanner } from "@/ui/MainBanner";
import { clsx } from "clsx";
import { Card } from "../../ui/Card";
import { InsightsActionsServiceInstance } from "@/api/insights/InsightsActionsService";
import { BlogPagination } from "../../entities/BlogPagination";
import { OverviewBlog } from "./entities/OverviewBlog";
import { Suspense } from "react";

const BlogsPage = async () => {
  const listOfBlog = await InsightsActionsServiceInstance.getList();
  const primaryArticle =
    await InsightsActionsServiceInstance.getPrimaryArticle();

  return (
    <Suspense>
      <MainBanner>
        {primaryArticle && (
          <Card
            article={primaryArticle}
            advert="Hot Right Now"
            variants="primary"
          />
        )}
      </MainBanner>

      <Wrapper classNameContainer={[stylesSpace.Spacing__Outer_80x80]}>
        <OverviewBlog />

        <Typography
          as="div"
          className={clsx(
            stylesLayout.Grid,
            stylesLayout.Grid__Col_3,
            stylesLayout.Gap_40,
            stylesLayout.AIS
          )}
        >
          {listOfBlog?.data?.map((opt) => (
            <Card article={opt} key={opt.id} />
          ))}
        </Typography>
      </Wrapper>

      <Wrapper classNameContainer={stylesSpace.Spacing__Outer_100x120}>
        <BlogPagination meta={listOfBlog?.meta} />
      </Wrapper>
    </Suspense>
  );
};

export default BlogsPage;
