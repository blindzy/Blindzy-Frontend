export class CreateAddresses {
  // private baseUrl = import.meta.env.VITE_API_URL;

  private baseUrl = import.meta.env.PUBLIC_API_URL;
  private baseUrl_KEY = import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY;

  private async medusaRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": this.baseUrl_KEY,
        ...(options.headers || {}),
      },
    });
    console.log("Medusa request to:", `${this.baseUrl}${endpoint}`, "with options:", options);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request failed: ${res.status} - ${errorText}`);
    }

    return res.json();
  }

  async storeAddress(userData: {
    customer_id: string;
    email: string;
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postal_code: string;
    country_code: string;
  }): Promise<any> {
    try {
      const response = await this.medusaRequest<any>("/store/customers/addresses", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      return response;
    } catch (error) {
      console.error("Store address failed:", error);
      throw error;
    }
  }
}

export const createAddresses = new CreateAddresses();
