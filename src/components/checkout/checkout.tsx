import React, { useEffect , useState } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import './css/style.css';

interface CheckoutProps {
	// Add any props if needed in the future
}
function Checkout(props: CheckoutProps) {
	const lenis = useLenis();
	const [currentStep, setCurrentStep] = useState<number>(1);
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis]);
    const nextStep = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (currentStep < 3) {
          setCurrentStep(currentStep + 1);
        }
    };
    
      // Function to move to the previous step
    const prevStep = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
        }
    };
	return (
		<section className="checkout-section w-screen flex flex-col gap-[80px] py-[85px] xl:px-[1.25vw] sm:px-[2.344vw] px-2" id="checkout">
			<div className="flex xl:flex-row flex-col gap-4 w-full">
				<div className="xl:w-[35%] w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black xl:shrink-0 rounded-48">
					<h4 className="text-xl">YOUR ORDER</h4>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="w-full max-h-[400px] flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:overflow-hidden overflow-auto line-scroll">
						<div className="w-full flex flex-col gap-2.5 p-4 border border-[--Black] rounded-24">
							<div className="flex items-center gap-2">
								<div className="w-[64px] h-[64px] bg-primary rounded-xl shrink-0"></div>
								<div className="w-full flex items-center justify-between">
									<h6 className="text-md">Product Name</h6>
									<h6 className="text-md">$7000</h6>
								</div>
							</div>
							<div className="w-fit mx-auto flex items-center justify-center cursor-pointer text-sm text-primary hover:text-[--Black]">
								<p>See More</p>
								<Icon icon="icon-park-outline:down" />
							</div>
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
									<Icon icon="uil:plus" className="text-[18px]" />
									<div className="w-full h-[1px] bg-mediumGrey"></div>
									<Icon icon="uil:plus" className="text-[18px]" />
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Color:</p>
									<p>Ash</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Size:</p>
									<p>24cm x 56cm</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Fit Type:</p>
									<p>Recess Fit</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Roll Direction:</p>
									<p>Front Roll</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Chain Colour:</p>
									<p>Silver</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Bracket Colour:</p>
									<p>Sandstone</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Base Rail Shape:</p>
									<p>Oval</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Base Rail Colour:</p>
									<p>Bone</p>
								</div>
							</div>
						</div>
						<div className="w-full flex flex-col gap-2.5 p-4 border border-[--Black] rounded-24">
							<div className="flex items-center gap-2">
								<div className="w-[64px] h-[64px] bg-primary rounded-xl shrink-0"></div>
								<div className="w-full flex items-center justify-between">
									<h6 className="text-md">Product Name</h6>
									<h6 className="text-md">$7000</h6>
								</div>
							</div>
							<div className="w-fit mx-auto flex items-center justify-center cursor-pointer text-sm text-primary hover:text-[--Black]">
								<p>See More</p>
								<Icon icon="icon-park-outline:down" />
							</div>
							<div className="flex flex-col gap-2 hidden">
								<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
									<Icon icon="uil:plus" className="text-[18px]" />
									<div className="w-full h-[1px] bg-mediumGrey"></div>
									<Icon icon="uil:plus" className="text-[18px]" />
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Color:</p>
									<p>Ash</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Size:</p>
									<p>24cm x 56cm</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Fit Type:</p>
									<p>Recess Fit</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Roll Direction:</p>
									<p>Front Roll</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Chain Colour:</p>
									<p>Silver</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Bracket Colour:</p>
									<p>Sandstone</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Base Rail Shape:</p>
									<p>Oval</p>
								</div>
								<div className="w-full flex items-center justify-between text-sm text-black">
									<p>Base Rail Colour:</p>
									<p>Bone</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex items-center justify-between">
						<h5 className="text-lg">SUBTOTAL</h5>
						<h5 className="text-lg">$14000</h5>
					</div>
					<div className="flex items-center justify-between">
						<h5 className="text-lg">SHIPPING</h5>
						<h5 className="text-lg">$20</h5>
					</div>
					<div className="flex items-center gap-2 shrink-0 text-mediumGrey">
						<Icon icon="uil:plus" className="text-[18px]" />
						<div className="w-full h-[1px] bg-mediumGrey"></div>
						<Icon icon="uil:plus" className="text-[18px]" />
					</div>
					<div className="flex items-center justify-between">
						<h5 className="text-xl">TOTAL</h5>
						<h5 className="text-xl">$14000</h5>
					</div>
				</div>
				<div className="xl:w-[65%] w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black rounded-48">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 shrink-0">
							<div className={`w-[24px] h-[24px] flex items-center justify-center border text-sm rounded-[24px] transition ${currentStep === 1 || currentStep === 2 ? 'border-[--primary] text-white bg-primary':'border-[--black] text-black'}`}>1</div>
							<p className="text-sm">Personal Info</p>
						</div>
						<div className="w-full h-[1px] bg-black"></div>
						<div className="flex items-center gap-2 shrink-0">
							<div className={`w-[24px] h-[24px] flex items-center justify-center border text-sm rounded-[24px] transition ${currentStep === 2 || currentStep === 3 ? 'border-[--primary] text-white bg-primary':'border-[--black] text-black'}`}>2</div>
							<p className="text-sm">Shipping Info</p>
						</div>
						<div className="w-full h-[1px] bg-black"></div>
						<div className="flex items-center gap-2 shrink-0">
							<div className={`w-[24px] h-[24px] flex items-center justify-center border text-sm rounded-[24px] transition ${currentStep === 3 ? 'border-[--primary] text-white bg-primary':'border-[--black] text-black'}`}>3</div>
							<p className="text-sm">Payment</p>
						</div>
					</div>
					<form action="">
						<div className={`flex flex-col gap-[32px] ${currentStep === 1 ? 'visible' : 'hidden'}`}>
							<div className="flex items-center justify-between">
								<h3 className="text-xxl">CUSTOMER INFO</h3>
								<div className="flex items-center gap-1 text-sm">
									<p>Already have an account? </p>
									<a href="/login" className="text-primary">Login</a>
								</div>
							</div>
							<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 ">
								<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
									<input type="text" className="formInput" id="f-name" placeholder="First Name"/>
									<input type="text" className="formInput" id="l-name" placeholder="Last Name"/>
								</div>
								<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
									<input type="text" className="formInput" id="email" placeholder="Email"/>
									<input type="text" className="formInput" id="number" placeholder="Number"/>
								</div>
								<input type="text" className="formInput" id="company" placeholder="Company Name (Optional)"/>
								<div className="w-fit ml-auto flex items-center gap-2">
									{/* <button className="w-[200px] cus-btn small shrink-0 stroke-black">
										Back
									</button> */}
									<button className="w-[200px] cus-btn small primary shrink-0" onClick={nextStep}>
										Next
									</button>
								</div>
							</div>
						</div>
						<div className={`flex flex-col gap-[32px] ${currentStep === 2 ? 'visible' : 'hidden'}`}>
							<div className="flex items-center justify-between">
								<h3 className="text-xxl">SHIPPING INFO</h3>
								<div className="flex items-center gap-1 text-sm">
									<p>Already have an account? </p>
									<a href="/login" className="text-primary">Login</a>
								</div>
							</div>
							<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
								<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
									<div className="formSelect">
										<select name="" id="" className="formInput">
											<option value="" selected hidden disabled>Country / Region</option>
										</select>
									</div>
									<div className="formSelect">
										<select name="" id="" className="formInput">
											<option value="" selected hidden disabled>Country / Region</option>
										</select>
									</div>
								</div>
								<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
									<input type="text" className="formInput" id="town" placeholder="Town / City"/>
									<input type="text" className="formInput" id="zipCode" placeholder="Zip Code"/>
								</div>
								<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
									<input type="text" className="formInput" id="house" placeholder="House number and street name"/>
									<input type="text" className="formInput" id="apartment" placeholder="Apartment, suit, unit, etc. (Optional)"/>
								</div>
								<input type="text" className="formInput" id="company-name" placeholder="Company Name (Optional)"/>
								<div className="w-fit ml-auto flex items-center gap-2">
									<button className="w-[200px] cus-btn small shrink-0 stroke-black" onClick={prevStep}>
										Back
									</button>
									<button className="w-[200px] cus-btn small primary shrink-0" onClick={nextStep}>
										Next
									</button>
								</div>
							</div>
						</div>
						<div className={`flex flex-col gap-[32px] ${currentStep === 3 ? 'visible' : 'hidden'}`}>
							<div className="flex items-center justify-between">
								<h3 className="text-xxl">PaymenT Method</h3>
								<div className="flex items-center gap-1 text-sm">
									<p>Already have an account? </p>
									<a href="/login" className="text-primary">Login</a>
								</div>
							</div>
							<div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
								<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
									<div className="formSelect">
										<select name="" id="" className="formInput">
											<option value="" selected hidden disabled>Credit Card</option>
										</select>
									</div>
									<input type="text" className="formInput" id="cardName" placeholder="Name of Card"/>
								</div>
								<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
									<div className="w-full">
										<input type="text" className="w-full formInput" id="cardNumber" placeholder="Card Number"/>
									</div>
									
									<div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
										<input type="date" className="formInput" id="expiration-date" placeholder="Expiration Date (MM / YY)"/>
										<input type="text" className="formInput" id="securityCode" placeholder="Security Code"/>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<div className="check-box">
										<input type="checkbox" id="permanent" name="employment"/>
										<div className="icon">
											<Icon icon="tabler:check" />
										</div>
										<label htmlFor="permanent" className="text-sm">Use a different billing address?</label>
									</div>
									<div className="flex items-center gap-2">
										<button className="w-[200px] cus-btn small shrink-0 stroke-black" onClick={prevStep}>
											Back
										</button>
										<button className="w-[200px] cus-btn small primary shrink-0">
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Checkout;

