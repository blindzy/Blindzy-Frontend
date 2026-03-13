import React, { useEffect, useState } from "react";
import { sdk } from "../../lib/sdk";
import { decodeToken } from "react-jwt";

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

export default function OAuthCallback() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  const validateCallback = async () => {
    try {
      // 1. Exchange OAuth code for JWT
      const searchParams = new URLSearchParams(window.location.search);
      const queryParams = Object.fromEntries(searchParams.entries());

      if (!queryParams.code && !queryParams.state) {
        throw new Error("Missing OAuth parameters from provider");
      }

      const token = await sdk.auth.callback("customer", "google", queryParams);
      if (!token) throw new Error("No token received from OAuth provider");

      localStorage.setItem("access_token", token);
      setCookie("access_token", token);

      // 2. Decode to check if this is a new user
      const decoded = decodeToken(token) as {
        actor_id: string;
        user_metadata: Record<string, unknown>;
      };

      const isNewUser = !decoded.actor_id;

      if (isNewUser) {
        // 3a. New user — create customer record (JWT is used as Bearer automatically by sdk)
        await sdk.store.customer.create({
          email: decoded.user_metadata.email as string,
        });
      }

      // 4. Establish session cookie (replaces JWT flow with cookie-based session)
      await sdk.auth.refresh();

      // 5. Retrieve customer — now safe since session is established
      const { customer } = await sdk.store.customer.retrieve();

      localStorage.setItem("user", JSON.stringify(customer));
      localStorage.setItem("userEmail", customer.email);

      setStatus("success");
      setTimeout(() => (window.location.href = "/user"), 500);
    } catch (err: any) {
      console.error("OAuth validation error:", err);
      setError(err.message || "Authentication failed. Please try again.");
      setStatus("error");
    }
  };

  useEffect(() => {
    validateCallback();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="text-center flex flex-col items-center gap-4">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-lg text-gray-600">Completing your login...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl">✓</div>
            <p className="text-lg text-gray-600">Login successful! Redirecting...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl">✕</div>
            <p className="text-lg text-red-600 font-semibold">Authentication Failed</p>
            <p className="text-sm text-gray-600">{error}</p>
            <a href="/login" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Back to Login
            </a>
          </>
        )}
      </div>
    </div>
  );
}