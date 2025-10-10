// src/services/auth/login.ts

const API_BASE = import.meta.env.VITE_API_URL || "http://208.87.135.120:9000"; // Medusa backend URL
const API_BASE_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "pk_618e1efe2b7d74576d7e072b76bd3c56d46ef94ede9463774e1c2b09c50f6bda";

// ✅ Cookie setting utility (client-side)
function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  // ⚠️ Don't use HttpOnly or Domain here — JS can't set HttpOnly
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

export interface LocalAuthResponse {
  customer: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
  token: string;
}

// ✅ Reusable Medusa request wrapper
async function medusaRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": API_BASE_KEY,
      ...(options.headers || {}),
    },
    credentials: "include", // Needed for cookies/sessions
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Medusa API request failed (${res.status})`);
  }

  return res.json();
}

export const login = {
  async login(email: string, password: string): Promise<LocalAuthResponse> {
    console.log("🟢 Login attempt for:", email);

    const medusaResponse = await medusaRequest<any>("store/customers/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const authResponse: LocalAuthResponse = {
      customer: {
        id: medusaResponse.customer.id,
        email: medusaResponse.customer.email,
        first_name: medusaResponse.customer.first_name,
        last_name: medusaResponse.customer.last_name,
        phone: medusaResponse.customer.phone,
      },
      token: medusaResponse.token || "",
    };

    // ✅ Save data in localStorage & cookie
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(authResponse.customer));
      localStorage.setItem("userEmail", email);
      localStorage.setItem("access_token", authResponse.token);

      // Set cookie for Astro middleware
      setCookie("access_token", authResponse.token);

      console.log("✅ Cookie set:", document.cookie);

      // ✅ Redirect after login success
      window.location.href = "/user";
    }

    return authResponse;
  },
};
