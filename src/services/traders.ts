import { api } from "@/lib/api";

export type Trader = {
  id: string | number;
  name: string;
  business: string;
  location: { city?: string; state?: string; label?: string } | string;
  specialities?: string[] | string;
  rating?: number;
  verified?: boolean;
  phoneMasked?: string;
  avatarUrl?: string;
};

export type Paginated<T> = { data: T[]; meta: { page: number; perPage: number; total: number; nextPage?: number; prevPage?: number } };

export async function fetchTraders(params: Record<string, unknown>) {
  return api.request<Paginated<Trader>>("/v1/traders", { params });
}

export async function fetchTraderById(id: string | number) {
  return api.request<Trader>(`/v1/traders/${id}`);
}

export async function joinNetwork(payload: { business: string; city: string; state: string; phone: string }) {
  return api.request<Trader>("/v1/traders", { method: "POST", body: payload });
}

