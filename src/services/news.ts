import { api } from "@/lib/api";

export type NewsItem = {
  id: string | number;
  title: string;
  summary: string;
  content?: string;
  time?: string;
  category?: string;
  urgent?: boolean;
  image?: string;
};

export type Paginated<T> = { data: T[]; meta: { page: number; perPage: number; total: number; nextPage?: number; prevPage?: number } };

export async function fetchNews(params: Record<string, unknown>) {
  return api.request<Paginated<NewsItem>>("/v1/news", { params });
}

export async function fetchNewsById(id: string | number) {
  return api.request<NewsItem>(`/v1/news/${id}`);
}

