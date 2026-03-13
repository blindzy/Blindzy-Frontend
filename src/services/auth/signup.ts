export class SignupService {
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
  }): Promise<any> {
    try {
      const response = await this.medusaRequest<any>("/store/customers/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.customer));
        localStorage.setItem("userEmail", userData.email);
      }

      return response;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }

  async verifyEmail(email: string, otp: string): Promise<{ message: string }> {
    try {
      const response = await this.medusaRequest<{ message: string }>(
        "/store/customers/verify-email",
        {
          method: "POST",
          body: JSON.stringify({ email, otp }),
        }
      );
      return response;
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    }
  }
}

export const signup = new SignupService();