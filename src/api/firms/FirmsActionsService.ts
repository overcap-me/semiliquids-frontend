import { requester } from "../requestInstance";
import type { FirmResponseDTO } from "@/types/schema/firms";

class FirmsActionsService {
  async getById(firmId: string) {
    try {
      const { data } = await requester.get<FirmResponseDTO>(`firms/${firmId}`);

      return data
    } catch (e) { }
  }
}

export const FirmsActionsServiceInstance = new FirmsActionsService();
