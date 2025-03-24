import { requester } from "../requestInstance";

class NavigationActionsService {
  async getNavigation(navId: string) {
    try {
      return await requester.get(`navigation/${navId}`);
    } catch (e) { }
  }
}

export const NavigationActionsServiceInstance = new NavigationActionsService();
