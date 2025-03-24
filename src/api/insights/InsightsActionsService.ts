import { ArticlesResponseSchema, type ArticlesResponse } from "@/types/schema/blogs/article";
import { requester } from "../requestInstance";
import { safeParseAsync } from "@/shared/lib/zod";

class InsightsActionsService {
  async getList() {
    try {
      const result = await requester.get<ArticlesResponse>("articles");


      const parseResult = await safeParseAsync(
        process.env.NODE_ENV === "development" ? ArticlesResponseSchema : undefined,
        result,
      );

      if (!parseResult.success) {
        console.error("Ошибка валидации", parseResult.error.toString());
      } else {
        return parseResult.data satisfies ArticlesResponse;
      }
    } catch (e) { }
  }

  async getPrimaryArticle() {
    try {
      const response = await requester.get("pages/insights");

      // TODO: refactor this
      // @ts-ignore
      return response?.data?.sections?.[0]?.data?.article as ArticleDetail;
    } catch (e) { }
  }

  async getById(blogId: string) {
    try {
      return await requester.get(`articles/${blogId}`);
    } catch (e) { }
  }
}

export const InsightsActionsServiceInstance = new InsightsActionsService();
