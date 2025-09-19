import { api } from "@/lib/api";

export type CreateAlertPayload = {
  phone?: string;
  commodity_id: string | number;
  market_id?: string | number;
  threshold_type?: "above" | "below" | "change_pct";
  threshold_value?: number;
  channel?: "sms" | "whatsapp" | "push";
};

export async function createAlert(payload: CreateAlertPayload) {
  return api.request("/v1/alerts", { method: "POST", body: payload });
}

