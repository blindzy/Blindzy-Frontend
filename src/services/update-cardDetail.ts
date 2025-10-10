export class UpdateCard {
  private baseUrl = import.meta.env.VITE_API_URL || "http://208.87.135.120:9000"; // Medusa backend URL
  private baseUrl_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "pk_618e1efe2b7d74576d7e072b76bd3c56d46ef94ede9463774e1c2b09c50f6bda"; // Medusa backend URL

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

  // 👇 CardId ko dynamic endpoint me inject kiya gaya
  async updateCard(cardId: string, userData: {
    customer_id: string;
    email: string;
    card_type: string;
    card_number: string;
    card_name: string;
    expiry_date: string;
    security_code: string;
  }): Promise<any> {
    try {
      const response = await this.medusaRequest<any>(`/store/customers/card/${cardId}`, {
        method: "PUT", // Medusa ka structure dekh lo, agar update PUT se hoti ho to change kar lena
        body: JSON.stringify(userData),
      });

      return response;
    } catch (error) {
      console.error("Store address update failed:", error);
      throw error;
    }
  }
}

export const updateCard = new UpdateCard();
