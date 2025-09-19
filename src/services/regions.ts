import { api } from "@/lib/api";

export type State = { id: string | number; name: string; code?: string };
export type District = { id: string | number; state_id: string | number; name: string };
export type Market = { id: string | number; district_id: string | number; name: string; lat?: number; lng?: number; slug?: string };
export type Segment = { id: string | number; name: string; slug?: string };
export type CommodityLite = { id: string | number; name: string; unit?: string };
export type SegmentWithCommodities = { 
  id: string | number; 
  name: string; 
  slug?: string; 
  commodities: CommodityLite[] 
};

export type Mandi = {
  market_id: string | number;
  market: string;
  market_slug: string;
  market_type: string;
  district_name: string;
  state_name: string;
  state_code: string;
  lat?: number;
  lng?: number;
};

export async function fetchStates() {
  return api.request<State[]>("/v1/filters/states");
}

export async function fetchDistricts(state_id: string | number) {
  return api.request<District[]>("/v1/filters/districts", { params: { state_id } });
}

export async function fetchMarketsByDistrict(state_id: string | number, district_id: string | number) {
  return api.request<Market[]>("/v1/filters/markets", { params: { state_id, district_id } });
}

export async function fetchSegments() {
  return api.request<Segment[]>("/v1/filters/segments");
}

export async function fetchCommoditiesBySegment(segment: string) {
  return api.request<CommodityLite[]>("/v1/filters/commodities", { params: { segment } });
}

export async function fetchSegmentsWithCommodities() {
  return api.request<SegmentWithCommodities[]>("/v1/filters/segments-with-commodities");
}

export async function fetchMandis(params: Record<string, unknown> = {}) {
  return api.request<{ data: Mandi[]; meta: { total: number; page: number; perPage: number } }>("/v1/mandis", { params });
}

