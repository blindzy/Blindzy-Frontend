import React, { useEffect , useState } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';

interface SignUpProps {
	// Add any props if needed in the future
}

function SignUp(props: SignUpProps) {
	const [viaEmail, setViaEmail] = useState<boolean>(false);
	const lenis = useLenis();

	useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis]);
    

	return (
        <div className="relative w-screen h-screen flex items-center justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-2 overflow-hidden" id="signUp">
            <div className="w-full max-w-[750px] flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black shrink-0 p-4">
                <img src="/images/blindzy-logo.png" className="w-fit"  alt="blindzy-logo" />
                <div className="w-full flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h3 className="text-xxl">SIGN UP</h3>
                {!viaEmail ? (
                    <>
                        <button className="w-full p-4 flex items-center justify-center gap-2 transition border border-[--Black] hover:bg-[--Black] hover:text-[--white] rounded-[50px]">
                            <Icon icon="flat-color-icons:google" className="text-[28px] shrink-0" />
                            <span className="text-sm">Continue as Google</span>
                        </button>
                        <button onClick={()=> setViaEmail(true)} className="w-full text-sm p-4 flex items-center justify-center gap-1 transition border border-[--Black] hover:bg-[--Black] hover:text-[--white] rounded-[50px]">
                            Sign up via Email
                        </button>
                        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                            <div className="check-box">
                                <input type="checkbox" id="policies" name="terms"/>
                                <div className="icon">
                                    <Icon icon="tabler:check" />
                                </div>
                                <label htmlFor="policies" className="text-sm">By Signing up you agree to our Terms and Policies</label>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                                Already have an account?
                                <a href="/login" className="text-primary">Login</a>
                            </div>
                        </div>
                    </>
                ):(
                    <>
                        <form action="/user" className="w-full">
                            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                <div className="w-full flex flex-col sm:flex-row items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                    <input type="text" className="formInput" id="f-name" placeholder="First Name"/>
                                    <input type="text" className="formInput" id="l-name" placeholder="Last Name"/>
                                </div>
                                <div className="w-full flex flex-col sm:flex-row items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                    <input type="email" className="formInput" id="email" placeholder="Email"/>
                                    <input type="text" className="formInput" id="phone" placeholder="Phone"/>
                                </div>
                                <input type="text" className="formInput" id="username" placeholder="User name"/>
                                <input type="text" className="formInput" id="password" placeholder="Password"/>
                                <input type="text" className="formInput" id="confirmPassword" placeholder="Confirm Password"/>
                                <button className="w-full cus-btn small text-sm rounded-full-override" type="submit">
                                    Sign Up
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
                                        Already have an account?
                                        <a href="/login" className="text-primary">Login</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
	);
}

export default SignUp;
