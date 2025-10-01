export class ForgotPasswordService {
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
