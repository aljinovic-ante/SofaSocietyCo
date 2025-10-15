import Medusa from "@medusajs/js-sdk"

const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  publishableKey:
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  useCookie: true,
  withCredentials: true,
  debug: process.env.NODE_ENV === "development",
})
