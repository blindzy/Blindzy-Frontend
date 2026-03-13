import { HttpTypes } from "@medusajs/types"
import React, { useEffect, useMemo, useState } from "react"
import { decodeToken } from "react-jwt"
import { sdk } from "@lib/sdk"

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  // ⚠️ Don't use HttpOnly or Domain here — JS can't set HttpOnly
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

export default function GoogleCallback() {
  const [loading, setLoading] = useState(true)
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer>()
  // for other than Next.js



  const sendCallback = async () => {

    const searchParams = new URLSearchParams(window.location.search)
    const queryParams = Object.fromEntries(searchParams.entries())

    let token = ""

    try {
      token = await sdk.auth.callback(
        "customer",
        "google",
        // pass all query parameters received from the
        // third party provider
        queryParams
      )
    } catch (error) {
      alert("Authentication Failed")

      throw error
    }

    return token
  }

  const createCustomer = async (email: string) => {
    // create customer
    await sdk.store.customer.create({
      email,
    })
  }


  const refreshToken = async () => {
    // refresh the token
    const result = await sdk.auth.refresh()
  }

  const validateCallback = async () => {
    const token = await sendCallback()

    localStorage.setItem("access_token", token)
    setCookie("access_token", token);

    const decodedToken = decodeToken(token) as { actor_id: string, user_metadata: Record<string, unknown> }

    const shouldCreateCustomer = decodedToken.actor_id === ""

    if (shouldCreateCustomer) {
      await createCustomer(decodedToken.user_metadata.email as string)

      await refreshToken()
    }

    // use token to send authenticated requests
    const { customer: customerData } = await sdk.store.customer.retrieve()

    setCustomer(customerData)
    setLoading(false)
  }

  useEffect(() => {
    if (!loading) {
      return
    }

    validateCallback()
  }, [loading])

  useEffect(() => {
    if (!customer) {
      return
    }

    // Save data in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(customer));
      localStorage.setItem("userEmail", customer.email);
    }

    window.location.href = "/user"
  }, [customer])


  return (
    <div>
      {loading && <span>Loading...</span>}
      {customer && <span>Created customer {customer.email} with Google.</span>}
    </div>
  )
}