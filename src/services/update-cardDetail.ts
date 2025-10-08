export class UpdateCard {
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
