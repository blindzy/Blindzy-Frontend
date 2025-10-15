export class CreateAddToCart {
//   private baseUrl = import.meta.env.VITE_API_URL;
  private API_BASE = import.meta.env.VITE_API_URL || "https://208.87.135.120:9000"; // Medusa backend URL
  private API_BASE_KEY = import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "pk_618e1efe2b7d74576d7e072b76bd3c56d46ef94ede9463774e1c2b09c50f6bda"; // Medusa backend URL


  private async medusaRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${this.API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": this.API_BASE_KEY,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request failed: ${res.status} - ${errorText}`);
    }

    return res.json();
  }

  async addToCart(userData: {
    email: string;
    product_id: string;
    quantity: number;
    customizations: any;
  }): Promise<any> {
    try {
      const response = await this.medusaRequest<any>("/store/customers/cart", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      return response;
    } catch (error) {
      console.error("Product failed Add To Cart:", error);
      throw error;
    }
  }
}

export const createAddToCart = new CreateAddToCart();
