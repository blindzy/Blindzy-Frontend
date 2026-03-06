import Medusa from "@medusajs/js-sdk"


const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:9000"
const publishableKey = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "pk_a31225b5bdde2ed0e28d918ac3467479184b1cffe21edca686b1a2a72217c210"

export const sdk = new Medusa({
  baseUrl,
  debug: import.meta.env.DEV,
  publishableKey,
  auth: {
    type: "session",
  },
})



