import React, { useEffect, useState } from "react";
import { sdk } from "../../lib/sdk";
import { EyeClosed, Eye } from 'lucide-react';

import { ForgetPasswordPopup } from './forget-password';
import Separate from '@components/separate';
import { Input } from '@lib/components/ui/input';
import { Button } from '@lib/components/ui/button';
import { Checkbox } from "@lib/components/ui/checkbox";
import { login } from '../../services/auth/login';
import { forgotPassword } from "../../services/auth/forgot";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForgot, setShowForgot] = useState(false);
    const [forgotError, setForgotError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const loginWithGoogle = async () => {
        const result = await sdk.auth.login("customer", "google", {})

        if (typeof result === "object" && result.location) {
            // redirect to Google for authentication
            window.location.href = result.location

            return
        }

        alert("Authentication failed")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await login.login(email, password);
            console.log("Login success:", response);

            // Save user data and email to localStorage
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(response.customer));
                localStorage.setItem("userEmail", response.customer.email);
                localStorage.setItem("access_token", response.token);
            }

            setSuccess("Login successful!");
            // login.login handles redirect, but we ensure it happens
            setTimeout(() => {
                window.location.href = "/user";
            }, 300);
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setForgotError("Please input email");
            return;
        }
        setForgotError("");

        try {
            const response = await forgotPassword.sendResetEmail(email);
            console.log("Reset email sent:", response);

            setShowForgot(true); // OTP UI ya popup dikhao
            // setSuccess("OTP / reset email sent successfully!");
        } catch (error: any) {
            console.error("Forgot password failed:", error);
            setForgotError("Something went wrong. Please try again.");
        }
    };


    return (
        <>
            <div className="relative w-screen h-screen flex items-center justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-2 overflow-hidden" id="signUp">
                <div className="w-full max-w-[750px] flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black shrink-0 p-4">
                    <img src="/images/blindzy-logo.png" className="w-fit" alt="blindzy-logo" />
                    <div className="w-full">
                        <Separate />
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
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="relative w-full">
                                <Input
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute top-0 right-0 w-fit h-full flex items-center pr-6 transition text-[16px] text-[--black] hover:text-[--primary]">
                                    {showPassword ? <Eye className="size-[18px]" /> : <EyeClosed className="size-[18px]" />}
                                </span>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <button
                                    type="button"
                                    className="text-[--primary] hover:underline outline-none w-fit text-sm transition"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot Password?
                                </button>
                                {forgotError && (
                                    <div className="w-full p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs mb-2">
                                        {forgotError}
                                    </div>
                                )}
                                {showForgot && <ForgetPasswordPopup email={email} onClose={() => setShowForgot(false)} />}
                            </div>
                            <Button
                                variant={'primary'}
                                size={'large'}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </Button>
                        </div>
                    </form>
                    <div className="w-full flex items-center gap-2">
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <p className="text-sm shrink-0">or</p>
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                    </div>
                    <Button
                        variant={'light'}
                        size={'large'}
                        className="w-full"
                        onClick={loginWithGoogle}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chromium-icon lucide-chromium"><path d="M10.88 21.94 15.46 14" /><path d="M21.17 8H12" /><path d="M3.95 6.06 8.54 14" /><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
                        <span className="text-sm">Continue as Google</span>
                    </Button>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 shrink-0">
                            <Checkbox id="measurements-checked" />
                            <label htmlFor="measurements-checked" className="text-sm normal cursor-pointer">
                                Remember me
                            </label>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            Don't have an account?
                            <a href="/signUp" className="text-[--primary] transition hover:underline focus:outline-none">Signup</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
