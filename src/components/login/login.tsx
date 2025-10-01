import React, { useEffect, useState } from "react";
import { EyeClosed , Eye } from 'lucide-react';
import { Icon } from '@iconify/react';
// import ForgetPasswordPopup from '@components/popup/forget-password';
import {ForgetPasswordPopup} from './forget-password';
import Separate from '@components/separate';
import { Input } from '@lib/components/ui/input';
import { Button } from '@lib/components/ui/button';
import { Checkbox } from "@lib/components/ui/checkbox";
import { login } from '../../services/auth/login';
import { forgotPassword } from "../../services/auth/forgot";

interface LoginProps { }

function Login(props: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForgot, setShowForgot] = useState(false);
    const [forgotError, setForgotError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
        const response = await login.login(email, password);
        console.log("Login success:", response);

        setSuccess("Login successful!");

        // Redirect after success
        window.location.href = "/user"; 
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if(!email) {
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
                                    {showPassword ? <Eye className="size-[18px]"/> : <EyeClosed className="size-[18px]"/>}
                                </span>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <button
                                    type="button"
                                    className="text-[--primary] hover:underline focus:outline-none w-fit text-sm transition"
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
                    >
                        <Icon icon="flat-color-icons:google" className="text-[28px] shrink-0" />
                        <span className="text-sm">Continue as Google</span>
                    </Button>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 shrink-0">
                            <Checkbox id="measurements-checked"/>
                            <label htmlFor="measurements-checked" className="text-sm normal cursor-pointer">
                                Remember me
                            </label>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            Don't have an account?
                            <a href="/signup" className="text-[--primary] transition hover:underline focus:outline-none">Signup</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* {showForgot && (
                <ForgetPasswordPopup email={email} onClose={() => setShowForgot(false)} />
            )} */}
        </>
    );
}

export default Login;
