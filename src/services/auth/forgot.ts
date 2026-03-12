export class ForgotPasswordService {
  private baseUrl = import.meta.env.PUBLIC_API_URL ; // Medusa backend URL
  private baseUrl_KEY = import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY ; // Medusa backend URL

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
      throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
  }

  // Step 1: Send Reset Email
  async sendResetEmail(email: string): Promise<any> {
    try {
      const response = await this.medusaRequest<any>("/store/customers/send-reset-email", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      return response;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  }

  // Step 2: Verify OTP
  async verifyOtp(email: string, otp: string): Promise<any> {
    return this.medusaRequest<any>("/store/customers/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
  }

  // Step 3: Reset Password
  async resetPassword(email: string,  newPassword: string): Promise<any> {
    return this.medusaRequest<any>("/store/customers/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, newPassword }),
    });
  }
}

export const forgotPassword = new ForgotPasswordService();
