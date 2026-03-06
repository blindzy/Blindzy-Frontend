export class StoreCardDetails {
  private baseUrl = import.meta.env.VITE_API_URL; // Medusa backend URL
  private baseUrl_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY; // Medusa backend URL

  private async medusaRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": this.baseUrl_KEY,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request failed: ${res.status} - ${errorText}`);
    }

    return res.json();
  }

  async storeCard(userData: {
    email: string;
    card_type: string;
    card_number: string;
    card_name: string;
    expiry_date: string;
    security_code: string;
  }): Promise<any> {
    try {
      const response = await this.medusaRequest<any>("/store/customers/card", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      return response;
    } catch (error) {
      console.error("Store card detail failed:", error);
      throw error;
    }
  }
}

export const storeCardDetails = new StoreCardDetails();
