import React, { useEffect, useState, useRef } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { signup } from '../../services/auth/signup';
import { Input } from '@lib/components/ui/input';
import { Button } from '@lib/components/ui/button';
import { sdk } from "@lib/sdk";
import { Checkbox } from "@lib/components/ui/checkbox";

function SignUp() {
    const [viaEmail, setViaEmail] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
    const submissionInProgress = useRef(false);
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.normalizeScroll(true);
        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
        }

    }, [lenis]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        setFormData({
            ...formData,
            [fieldName]: e.target.value
        });
    };

    const registerWithGoogle = async () => {
        const result = await sdk.auth.login("customer", "google", {})

        if (typeof result === "object" && result.location) {
            // redirect to Google for authentication
            window.location.href = result.location

            return
        }

        alert("Authentication failed")
    }

    const handleCheckboxChange = (field: string) => (checked: boolean) => {
        if (field === 'agreedToTerms') {
            setAgreedToTerms(checked);
        } else if (field === 'rememberMe') {
            setRememberMe(checked);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // prevent double submits
        if (submissionInProgress.current || loading) {
            console.log("Submission in progress, ignoring...");
            return;
        }

        const currentTime = Date.now();
        if (currentTime - lastSubmissionTime < 2000) {
            console.log("Too soon since last submission, ignoring...");
            return;
        }

        submissionInProgress.current = true;
        setLastSubmissionTime(currentTime);
        setLoading(true);
        setError("");
        setSuccess("");

        // validations
        if (
            !formData.first_name ||
            !formData.last_name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill all required fields.");
            setLoading(false);
            submissionInProgress.current = false;
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            submissionInProgress.current = false;
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Enter a valid email address");
            setLoading(false);
            submissionInProgress.current = false;
            return;
        }

        try {
            const response = await signup.register({
                email: formData.email,
                password: formData.password,
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone: formData.phone,
            });

            console.log("Signup success:", response);
            setSuccess("Account created successfully!");

            setTimeout(() => {
                window.location.href = '/user';
            }, 1500);
        } catch (err: any) {
            console.error("Signup error:", err);
            setError(err.message || "Something went wrong during signup.");
        } finally {
            setLoading(false);
            submissionInProgress.current = false;
        }
    };

    return (
        <div className="relative w-screen min-h-screen flex items-center justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-2 overflow-hidden" id="signUp">
            <div className="w-full max-w-[750px] flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black shrink-0 p-4">
                <img src="/images/blindzy-logo.png" className="w-fit" alt="blindzy-logo" />
                <div className="w-full flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h3 className="text-xxl">SIGN UP</h3>

                {!viaEmail ? (
                    <>
                        <Button
                            variant={'light'}
                            size={'large'}
                            className="w-full"
                            onClick={registerWithGoogle}
                        >
                            <Icon icon="flat-color-icons:google" className="text-[28px] shrink-0" />
                            <span className="text-sm">Continue as Google</span>
                        </Button>
                        <Button onClick={() => setViaEmail(true)}
                            variant={'light'}
                            size={'large'}
                            className="w-full"
                        >
                            <span className="text-sm">
                                Sign up via Email
                            </span>
                        </Button>

                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full">
                        {error && (
                            <div className="w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded mb-4">
                                {success}
                            </div>
                        )}
                        <div className="w-full grid col-span-12 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                            <div className="sm:col-span-6 col-span-12">
                                <Input type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={formData.first_name}
                                    onChange={handleChange} required
                                />
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <Input type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={formData.last_name}
                                    onChange={handleChange} required
                                />
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <Input type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange} required
                                />
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <Input type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-12">
                                <Input type="text"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange} required
                                />
                            </div>
                            <div className="col-span-12">
                                <Input type="text"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange} required
                                />
                            </div>
                            <div className="col-span-12">
                                <Button
                                    type="submit"
                                    variant={'primary'}
                                    size={'large'}
                                    className={`w-full ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                                    disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Icon icon="eos-icons:loading" className="text-lg animate-spin mr-2" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        'Sign Up'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
                <div className="w-full flex flex-col sm:flex-row items-center sm:justify-between justify-center gap-2 sm:gap-0">
                    <div className="flex items-center gap-2 shrink-0">
                        <Checkbox
                            id="agree"
                            checked={agreedToTerms}
                            onCheckedChange={handleCheckboxChange('agreedToTerms')}
                        />
                        <label htmlFor="agree" className="text-sm normal cursor-pointer">
                            By Signing up you agree to our Terms and Policies
                        </label>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <Checkbox
                            id="Remember"
                            checked={rememberMe}
                            onCheckedChange={handleCheckboxChange('rememberMe')}
                        />
                        <label htmlFor="Remember" className="text-sm normal cursor-pointer">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm">
                    Already have an account?
                    <a href="/login" className="text-[--primary] transition hover:underline focus:outline-none">Login</a>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
