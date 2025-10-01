// src/services/auth/login.ts

const API_BASE = "http://208.87.135.120:9000"; // Medusa backend URL

export interface LocalAuthResponse {
  customer: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
  session: {
    id: string;
    token: string;
  };
}

// reusable request wrapper
async function medusaRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": "pk_35f5ace6ac7d3be739f9edbf5a4ee494f93bf53432f8673a6446da2556e826c7",
      ...(options.headers || {}),
    },
    credentials: "include", // needed for cookies/session
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
    console.log("Login attempt for:", email);

    const medusaResponse = await medusaRequest<any>("/store/customers/login", {
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
      session: {
        id: medusaResponse.session?.id || "",
        token: medusaResponse.session?.access_token || "",
      },
    };

    // Save user to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(authResponse.customer));
      localStorage.setItem("userEmail", email);
    }

    return authResponse;
  },
};
