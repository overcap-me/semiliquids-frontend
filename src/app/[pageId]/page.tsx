import { PagesActionsServiceInstance } from "@/api/pages/PagesActionsService";
import { MainBanner } from "@/ui/MainBanner";
import { Fragment } from "react";
import { Article } from "../insights/(pages)/[blogId]/(main)/ui/Article";

export async function generateMetadata({ params: { pageId } }) {
  const page = await PagesActionsServiceInstance.getPages(pageId);

  return {
    title: page?.data?.meta?.seo?.title,
    description: page?.data?.meta?.seo?.description,
  };
}

const GeneratePage = async ({ params: { pageId } }) => {
  const page = await PagesActionsServiceInstance.getPages(pageId);

  return (
    <Fragment>
      <MainBanner title={page?.data?.name} />
      <Article article={page} />
    </Fragment>
  );
};

export default GeneratePage;
