import { api } from "@/lib/api";
import { setToken, clearToken, getToken } from "@/lib/auth";

type LoginResponse = { accessToken: string; user: unknown };

export async function login(payload: { email: string; password: string }) {
  const res = await api.request<LoginResponse>("/v1/auth/login", { method: "POST", body: payload });
  setToken(res.accessToken);
  return res;
}

export async function me() {
  return api.request("/v1/auth/me");
}

export async function logout() {
  try {
    await api.request("/v1/auth/logout", { method: "POST" });
  } finally {
    clearToken();
  }
}

export function isAuthenticated() {
  return Boolean(getToken());
}

