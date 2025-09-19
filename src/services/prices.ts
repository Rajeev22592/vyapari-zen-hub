import { api } from "@/lib/api";

export type Commodity = { id: string; name: string; unit?: string; segment?: string };
export type Market = { id: string; name: string; state?: string; district?: string };

export type Price = {
  id: string;
  commodity: Commodity;
  market: Market;
  min_price: number;
  max_price: number;
  modal_price: number;
  unit: string;
  date: string;
  trend_change?: number;
  change_abs?: number;
  change_pct?: number;
  variety?: string;
  grade?: string;
};

export type Paginated<T> = { data: T[]; meta: { page: number; perPage: number; total: number; nextPage?: number; prevPage?: number } };

export async function fetchPriceHighlights() {
  return api.request<Price[]>("/v1/prices/highlights");
}

export async function fetchPrices(params: Record<string, unknown>) {
  return api.request<Paginated<Price>>("/v1/bhav", { params });
}

export async function fetchDailyPrices(params: Record<string, unknown>) {
  return api.request<Paginated<Price>>("/v1/prices/daily", { params });
}

export async function fetchMarkets() {
  return api.request<Market[]>("/v1/filters/markets");
}

export async function fetchCommodities() {
  return api.request<Commodity[]>("/v1/filters/commodities");
}

export async function fetchCommoditiesPaginated(params: Record<string, unknown>) {
  return api.request<Paginated<Commodity>>("/v1/filters/commodities", { params });
}

// Markets where average modal price fell vs yesterday
export async function fetchMarketsDown(params: Record<string, unknown>) {
  return api.request<Paginated<Price>>("/v1/prices/markets-down", { params });
}

// Markets where average modal price rose vs yesterday
export async function fetchMarketsUp(params: Record<string, unknown>) {
  return api.request<Paginated<Price>>("/v1/prices/markets-up", { params });
}

