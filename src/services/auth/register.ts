// src/services/auth/register.ts

const API_BASE = import.meta.env.PUBLIC_API_URL;
const API_BASE_KEY = import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY;

// ✅ Cookie setting utility (client-side)
function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

export interface RegisterResponse {
  customer: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
  token?: string;
}

// ✅ Reusable Medusa request wrapper
async function medusaRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": API_BASE_KEY,
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Medusa API request failed (${res.status})`);
  }

  return res.json();
}

export const register = {
  async registerWithEmail(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
    username?: string;
  }): Promise<RegisterResponse> {
    console.log("🟢 Registration attempt for:", userData.email);

    const medusaResponse = await medusaRequest<any>(
      "store/customers/register",
      {
        method: "POST",
        body: JSON.stringify(userData),
      }
    );

    const authResponse: RegisterResponse = {
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
      localStorage.setItem("userEmail", userData.email);
      if (authResponse.token) {
        localStorage.setItem("access_token", authResponse.token);
        setCookie("access_token", authResponse.token);
      }

      console.log("✅ User registered and saved to localStorage");
    }

    return authResponse;
  },

 
};
