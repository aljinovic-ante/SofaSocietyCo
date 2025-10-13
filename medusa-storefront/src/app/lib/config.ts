import Medusa from "@medusajs/js-sdk"

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  publishableKey:
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
    "pk_97197d85b167545521ac552d6f313f207b8012188c46fd33b2ce73526f22669e",
  useCookie: true,
  withCredentials: true,
  debug: process.env.NODE_ENV === "development",
})
