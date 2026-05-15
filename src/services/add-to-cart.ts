export class CreateAddToCart {
  //   private baseUrl = import.meta.env.VITE_API_URL;
  private API_BASE = import.meta.env.PUBLIC_API_URL; // Medusa backend URL
  private API_BASE_KEY = import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY; // Medusa backend URL


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
    variants: any;
    customizations: any;
  }): Promise<any> {
    try {

      console.log("userData: ", userData)

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
