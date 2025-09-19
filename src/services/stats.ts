import { api } from "@/lib/api";

export type OverviewStats = {
  totalRegisteredMandis: number;
  totalStatesAndUTs: number;
  liveMarketsToday: number;
  commoditiesTraded: number;
  totalDistricts: number;
  totalPricesToday: number;
  totalPricesYesterday: number;
  priceChangePercentage: number;
  topCommodities: Array<{ name: string; count: number }>;
  topStates: Array<{ name: string; count: number }>;
};

export async function fetchOverviewStats() {
  return api.request<OverviewStats>("/v1/stats/overview");
}

