import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { api } from '../../services/api';
import ForgetPasswordPopup from '../../components/popup/forget-password';

interface LoginProps {}

function Login(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.login(email, password);

      console.log("Login success:", response);
      console.log("Saving user data to localStorage:", response.customer);
      setSuccess("Login successful!");

      // ✅ Save complete user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.customer));
      
      // Also save email separately for backwards compatibility
      localStorage.setItem("userEmail", response.customer.email);

      // Verify data was saved
      const savedData = localStorage.getItem("user");
      console.log("Verified saved user data:", savedData);

      // ✅ Redirect after short delay
      setTimeout(() => {
        console.log("Redirecting to /user page...");
        window.location.href = '/user';
      }, 1000);

    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-screen h-screen flex items-center justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-2 overflow-hidden" id="signUp">
        <div className="w-full max-w-[750px] flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black shrink-0 p-4">
          <img src="/images/blindzy-logo.png" className="w-fit" alt="blindzy-logo" />
          <div className="w-full flex items-center gap-2 shrink-0 text-mediumGrey">
            <Icon icon="uil:plus" className="text-[18px]" />
            <div className="w-full h-[1px] bg-mediumGrey"></div>
            <Icon icon="uil:plus" className="text-[18px]" />
          </div>
          <h3 className="text-xxl">Login</h3>
          {error && (
            <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
              <input 
                type="email" 
                className="formInput" 
                id="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                className="formInput" 
                id="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-[#8C6FF0] text-sm font-medium hover:underline focus:outline-none"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot password?
                </button>
              </div>
              <button 
                className="w-full cus-btn small text-sm rounded-full-override" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
          <div className="w-full flex items-center gap-2">
            <div className="w-full h-[1px] bg-mediumGrey"></div>
            <p className="text-sm shrink-0">or</p>
            <div className="w-full h-[1px] bg-mediumGrey"></div>
          </div>
          <button className="w-full p-4 flex items-center justify-center gap-2 transition border border-[--Black] hover:bg-[--Black] hover:text-[--white] rounded-[50px]">
            <Icon icon="flat-color-icons:google" className="text-[28px] shrink-0" />
            <span className="text-sm">Continue as Google</span>
          </button>
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="check-box">
              <input type="checkbox" id="remember" name="remember"/>
              <div className="icon">
                <Icon icon="tabler:check" />
              </div>
              <label htmlFor="remember" className="text-sm">Remember me</label>
            </div>
            <div className="flex items-center gap-1 text-sm">
              Don't have an account? 
              <a href="/signUp" className="text-primary">Signup</a>
            </div>
          </div>
        </div>
      </div>
      {showForgot && (
        <ForgetPasswordPopup email={email} onClose={() => setShowForgot(false)} />
      )}
    </>
  );
}

export default Login;
