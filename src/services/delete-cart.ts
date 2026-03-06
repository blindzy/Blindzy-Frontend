export class DeleteCart {
    //   private baseUrl = import.meta.env.VITE_API_URL;
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

    // 👇 AddressId ko dynamic endpoint me inject kiya gaya
    async deleteCart(cartId: string): Promise<any> {
        try {
            const response = await this.medusaRequest<any>(`/store/customers/cart/${cartId}`, {
                method: "DELETE",
            });

            return response;
        } catch (error) {
            console.error("cart deletion failed:", error);
            throw error;
        }
    }
}

export const deleteCart = new DeleteCart();
