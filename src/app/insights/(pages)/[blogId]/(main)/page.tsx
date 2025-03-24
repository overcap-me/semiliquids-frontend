import { PublishInformation } from "@/components/PublishInformation";
import { Typography } from "@/components/Typography";
import { Narrow } from "@/components/Wrapper";

import { MainBanner } from "@/ui/MainBanner";

import { InsightsActionsServiceInstance } from "@/api/insights/InsightsActionsService";
import { fullName } from "@/utils/fullName";
import { Article } from "./ui/Article";

export async function generateMetadata({ params: { blogId } }) {
  const page = await InsightsActionsServiceInstance.getById(blogId);

  return {
    title: page?.data?.meta?.seo?.title,
    description: page?.data?.meta?.seo?.description,
  };
}

const BlogPage = async ({ params: { blogId } }) => {
  const article = await InsightsActionsServiceInstance.getById(blogId);

  return (
    <>
      <MainBanner>
        <Narrow>
          <Typography as="div" spacing="m">
            {article?.data?.title && (
              <Typography as="h1" spacing="sm">
                {article.data.title}
              </Typography>
            )}

            <PublishInformation
              theme="dark"
              author={fullName(
                article?.data?.author?.first_name,
                article?.data?.author?.last_name,
              )}
              time={article?.data?.published_at}
            />
          </Typography>
        </Narrow>
      </MainBanner>

      <Article article={article} />

      {/* <Wrapper classNameContainer={stylesSpace.Spacing__Outer_120x120}>
        <Narrow>
          <div className={clsx(stylesLayout.Flex, stylesLayout.Gap_32)}>
            <ButtonOrLink asTag="button" color="accent">
              <Typography as="h4">See Also</Typography>
            </ButtonOrLink>
            {listBlogsMocks.map((opt) => (
              <Card
                key={opt.id}
                title={opt.title}
                time={opt.time}
                author={opt.author}
              />
            ))}
            <ButtonOrLink asTag="button" underline="bottom" color="accent-50">
              <Typography color="accent">More Articles</Typography>
            </ButtonOrLink>
          </div>
        </Narrow>
      </Wrapper> */}
    </>
  );
};

export default BlogPage;
