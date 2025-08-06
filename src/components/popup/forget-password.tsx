

import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

// --- Utility Icons (Inline SVGs) ---
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-x"
  >
    <path d="M18 6 6 18" />
    <path d="M6 6 18 18" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-eye"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M2.05 12a9.94 9.94 0 0 1 19.9 0 9.94 9.94 0 0 1-19.9 0z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-eye-off"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a18.06 18.06 0 0 1 4.7-5.94M15.01 7.01A3 3 0 0 0 12 9a3 3 0 0 0-3 3c0 .76.16 1.47.43 2.1L2.36 4.36M12 17.92c-.73.23-1.5.38-2.32.44M22 2L2 22" />
  </svg>
);
// ...existing code...

// --- PopupBox Component ---
const PopupBox: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => (
  <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm w-screen h-screen flex items-center justify-center font-inter">
    <div className="relative bg-white rounded-[20px] shadow-lg min-w-[350px] max-w-[400px] w-full px-6 pt-8 pb-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-full"
        aria-label="Close"
      >
        <CloseIcon />
      </button>
      {children}
    </div>
  </div>
);

// --- CodeInputRow Component ---
const CodeInputRow: React.FC<{ value: string; onChange: (v: string) => void; disabled?: boolean }> = ({ value, onChange, disabled }) => {
  // 6 digit code
  const boxes: React.ReactElement[] = [];
  for (let i = 0; i < 6; i++) {
    boxes.push(
      <input
        key={i}
        type="text"
        maxLength={1}
        value={value[i] || ""}
        disabled={disabled}
        className={`w-9 h-9 rounded-lg border border-gray-200 text-center text-lg mr-2 last:mr-0 outline-none bg-white font-inter
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'focus:border-[#8C6FF0]'}
        `}
        onChange={e => {
          const val = e.target.value.replace(/[^0-9]/g, "");
          let newValue = value.split("");
          newValue[i] = val;
          onChange(newValue.join(""));
        }}
      />
    );
  }
  return <div className="flex justify-center mb-4">{boxes}</div>;
};

// --- ForgetPasswordPopup Component ---
const ForgetPasswordPopup: React.FC<{ email: string; onClose: () => void }> = ({ email, onClose }) => {

  const sendOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.medusaSendResetEmail(email);
      setSuccess("Verification code sent to your email.");
      setView(1);
    } catch (err: any) {
      setError(err.message || err?.response?.data?.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.medusaVerifyOtp(email, code);
      setSuccess("OTP verified. Please enter your new password.");
      setView(2);
    } catch (err: any) {
      setError(err.message || err?.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.medusaResetPassword(email, newPassword);
      setSuccess("Password reset successful!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || err?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const [view, setView] = useState(0); // 0: send code, 1: enter code, 2: new password
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <PopupBox onClose={onClose}>
      <div className="text-left font-inter">
        <h3 className="font-bold text-lg mb-2">Change Password</h3>
        {/* Error and Success Messages */}
        {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
        {success && <div className="text-xs text-green-600 mb-2">{success}</div>}
        {view === 0 && (
          <div>
            <div className="text-xs text-gray-500 mb-2">
              Enter your email and click Send Code to receive a verification code.
            </div>
            <div className="text-xs text-gray-500 mb-4">
              Verification code will be sent to <b>{email}</b>
            </div>
            <div className="mb-2 flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1">Verification Code</label>
              <CodeInputRow value={code} onChange={setCode} disabled={true} />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-[#8C6FF0] text-white rounded-lg px-5 py-2 font-medium text-sm transition hover:bg-[#7a5bd9]"
                onClick={sendOtp}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Code"}
              </button>
              <button
                className="bg-gray-100 text-gray-500 rounded-lg px-5 py-2 font-medium text-sm transition hover:bg-gray-200"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {view === 1 && (
          <div>
            <div className="text-xs text-gray-500 mb-4">
              Verification code has been sent to <b>{email}</b>
            </div>
            <div className="mb-2 flex flex-col items-center">
              <label className="text-xs text-gray-400 mb-1">Enter Verification Code</label>
              <CodeInputRow value={code} onChange={setCode} />
            </div>
            <div className="flex mt-2">
              <button
                className="bg-[#8C6FF0] text-white rounded-lg px-5 py-2 font-medium text-sm w-full transition hover:bg-[#7a5bd9]"
                onClick={verifyOtp}
                disabled={code.length !== 6 || loading}
              >
                {loading ? "Verifying..." : "Next"}
              </button>
            </div>
          </div>
        )}
        {view === 2 && (
          <div>
            <div className="text-xs text-gray-500 mb-4">Enter your new password</div>
            <div className="mb-3">
              <div className="relative mb-2">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#8C6FF0] pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#8C6FF0] pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-gray-100 text-gray-500 rounded-lg px-5 py-2 font-medium text-sm transition hover:bg-gray-200"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="bg-[#8C6FF0] text-white rounded-lg px-5 py-2 font-medium text-sm transition hover:bg-[#7a5bd9]"
                disabled={
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword || loading
                }
                onClick={resetPassword}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </PopupBox>
  );
};

export default ForgetPasswordPopup;
