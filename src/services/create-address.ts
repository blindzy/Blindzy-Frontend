export class CreateAddresses {
  private baseUrl = import.meta.env.VITE_API_URL;

  private async medusaRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY,
        ...(options.headers || {}),
      },
    });

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
