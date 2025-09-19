import { z } from "zod";

const EnvSchema = z.object({
  VITE_API_URL: z.string().url(),
});

const parsed = EnvSchema.safeParse(import.meta.env);

let apiUrl = "http://vyapari-backend.test/api";
if (parsed.success) {
  apiUrl = parsed.data.VITE_API_URL.replace(/\/$/, "");
} else {
  // eslint-disable-next-line no-console
  console.warn(
    "VITE_API_URL not set. Falling back to http://vyapari-backend.test/api. Set it in your .env file."
  );
}

export const env = { apiUrl };

