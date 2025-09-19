import { env } from "@/lib/env";
import { getToken, clearToken } from "@/lib/auth";
import axios from "axios";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

function sanitizeParams(params?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!params) return undefined;
  const cleaned: Record<string, unknown> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    cleaned[key] = value;
  });
  return cleaned;
}

export class ApiClient {
  private axios: ReturnType<typeof axios.create>;

  constructor(baseUrl: string) {
    this.axios = axios.create({
      baseURL: baseUrl.replace(/\/$/, ""),
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    this.axios.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers = { ...(config.headers as any), Authorization: `Bearer ${token}` } as any;
      }
      
      // Add cache control headers to prevent caching
      config.headers = { 
        ...(config.headers as any), 
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      } as any;
      
      // Attach i18n header for list endpoints when language is Hindi
      try {
        const lang = (localStorage.getItem("vyapari-language") || "en").toLowerCase();
        const urlPath = String(config.url || "");
        const isFiltersEndpoint = /\/v1\/filters\//.test(urlPath);
        if (isFiltersEndpoint) {
          const headerLang = lang === "hi" ? "hi" : "en";
          config.headers = { ...(config.headers as any), "Accept-Language": headerLang } as any;
        }
      } catch {}
      // Remove empty params before sending
      config.params = sanitizeParams(config.params as Record<string, unknown>);
      return config;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // AxiosError-like shape
        const status = (error?.response?.status as number | undefined) ?? 0;
        if (status === 401) {
          clearToken();
        }
        const data = error?.response?.data as unknown;
        return Promise.reject({ status, data });
      }
    );
  }

  async request<T>(
    path: string,
    options: { method?: HttpMethod; params?: Record<string, unknown>; body?: unknown; headers?: Record<string, string> } = {}
  ): Promise<T> {
    const { method = "GET", params, body, headers = {} } = options;

    const config = {
      url: path,
      method: method as string,
      params: sanitizeParams(params),
      data: body,
      headers,
    } as const;

    const res = await this.axios.request<T>(config);

    // Attach ETag if present
    const etag = res.headers?.["etag"] as string | undefined;
    const data = res.data as unknown as Record<string, unknown>;
    if (etag && data && typeof data === "object") {
      (data as Record<string, unknown>).__etag = etag;
    }
    return res.data as T;
  }
}

export const api = new ApiClient(env.apiUrl);

