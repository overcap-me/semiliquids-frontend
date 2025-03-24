import type { PageResponse } from "@/types/schema/pages";
import { requester } from "../requestInstance";

class PagesActionsService {
  async getPages(pageId: string) {
    try {
      return await requester.get<PageResponse>(`pages/${pageId}`);
    } catch (e) {}
  }
}

export const PagesActionsServiceInstance = new PagesActionsService();
