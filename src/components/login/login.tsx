import React, { useEffect } from "react";
import { Icon } from '@iconify/react';

interface LoginProps {
	// Add any props if needed in the future
}

function Login(props: LoginProps) {

	useEffect(() => {
	}, []);
    

	return (
        <div className="relative w-screen h-screen flex items-center justify-center xl:p-[1.25vw] sm:p-[2.344vw] p-4 overflow-hidden" id="signUp">
            <div className="w-[750px] flex flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black shrink-0">
                <img src="/images/blindzy-logo.png" className="w-fit"  alt="blindzy-logo" />
                <div className="w-full flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <h3 className="text-xxl">Sign Up</h3>
                <form action="/" className="w-full">
                    <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                        
                        <input type="email" className="formInput" id="email" placeholder="Email"/>
                        <input type="text" className="formInput" id="password" placeholder="Password"/>
                        <button className="w-full cus-btn small text-sm" type="submit">
                            Log In
                        </button>
                    </div>
                </form>
                <div className="w-full flex items-center gap-2">
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <p className="text-sm shrink-0">or</p>
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                </div>
                <button className="w-full  p-4 flex items-center justify-center gap-2 transition border border-[--Black] hover:bg-[--Black] hover:text-[--white] rounded-[50px]">
                    <Icon icon="flat-color-icons:google" className="text-[28px] shrink-0" />
                    <span className="text-sm">Continue as Google</span>
                </button>
                <div className="w-full flex items-center justify-between">
                    <div className="check-box">
                        <input type="checkbox" id="remember" name="remember"/>
                        <div className="icon">
                            <Icon icon="tabler:check" />
                        </div>
                        <label htmlFor="remember" className="text-sm">Remember me</label>
                    </div>
                    <div className="flex itemx-cneter gap-1 text-sm">
                        Don't have an account? 
                        <a href="/signUp" className="text-primary">Signup</a>
                    </div>
                </div>
                
                
            </div>
        </div>
	);
}

export default Login;
