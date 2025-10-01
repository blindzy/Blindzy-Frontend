export class SignupService {
  private baseUrl = "http://208.87.135.120:9000";

  private async medusaRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": "pk_35f5ace6ac7d3be739f9edbf5a4ee494f93bf53432f8673a6446da2556e826c7",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request failed: ${res.status} - ${errorText}`);
    }

    return res.json();
  }

  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
    username?: string;
  }): Promise<any> {
    try {
      const response = await this.medusaRequest<any>("/store/customers/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      // Save user data locally
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.customer));
        localStorage.setItem("userEmail", userData.email);
        console.log("Signup user data saved to localStorage");
      }

      return response;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }
}

export const signup = new SignupService();
