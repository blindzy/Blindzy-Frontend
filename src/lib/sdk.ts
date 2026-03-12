import Medusa from "@medusajs/js-sdk"


const baseUrl = import.meta.env.PUBLIC_API_URL
const publishableKey = import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY

export const sdk = new Medusa({
  baseUrl,
  debug: import.meta.env.DEV,
  publishableKey,
  auth: {
    type: "session",
  },
})



