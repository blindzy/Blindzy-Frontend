import React, { useEffect , useState} from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

function ReturnPolicy() {

	useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
		ScrollTrigger.normalizeScroll(true);

		const deviceWidth = window.innerWidth;
		if (deviceWidth > 768) {
		  ScrollSmoother.create({
		    smooth: 2,
		    effects: true,
		    normalizeScroll: true,
		  });
		}
	}, []);
    

	return (
        <div className="relative w-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="returnPolicy">
            <div className="w-full border border-[--Black] p-4 text-center rounded-[48px]">
                <h1 className="text-1xl text-black uppercase">RETURN POLICY</h1>
            </div>
            <div className="flex items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Introduction</h5>
                        <p className="text-sm">Welcome to Aludoors ("we," "our," or "us"). At Aludoors, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us in other ways.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Personal Information</h5>
                        <p className="text-sm">When you interact with us, we may collect the following personal information:</p>
                        <ul className="list">
                            <li>Contact Information: Name, email address, phone number, and mailing address.</li>
                            <li>Service Information: Details about the products and services you request, including specifications, installation details, and any preferences you may have.
                            Payment Information: Credit card numbers and billing information when you make a purchase or pay for services.</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Usage Data</h5>
                        <p className="text-sm">We may also collect non-personal information about how you use our website and services, such as:</p>
                        <ul className="list">
                            <li>Log Data: IP address, browser type, operating system, and access times.</li>
                            <li>Cookies and Tracking Technologies: Information about your interactions with our website, including cookies and other tracking technologies used to enhance your browsing experience.</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">How We Use Your Information</h5>
                        <p className="text-sm">We use your personal information for the following purposes:</p>
                        <ul className="list">
                            <li>To Provide and Manage Services: To process orders, schedule installations, and provide customer support.</li>
                            <li>To Improve Our Services: To analyse usage data and improve our products and services.</li>
                            <li>To Communicate with You: To send you updates, promotional materials, and other information related to our services. You may opt out of marketing communications at any time.</li>
                            <li>To Process Payments: To handle transactions and billing</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Sharing Your Information</h5>
                        <p className="text-sm">We may share your information in the following circumstances:</p>
                        <ul className="list">
                            <li>With Service Providers: Third-party vendors who assist us in operating our business, such as payment processors, delivery services, and marketing partners.</li>
                            <li>For Legal Compliance: When required by law or to protect our rights and the rights of others.</li>
                            <li>With Your Consent: For any other purpose with your explicit consent.</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Data Security</h5>
                        <p className="text-sm">We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Your Choices and Rights</h5>
                        <p className="text-sm">You have the following rights regarding your personal information:</p>
                        <ul className="list">
                            <li>Access and Correction: You may request access to or correction of your personal information that we hold.</li>
                            <li>Opt-Out: You may opt out of receiving marketing communications from us at any time.</li>
                            <li>Data Deletion: You may request the deletion of your personal information, subject to certain legal and contractual limitations.</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Third-Party Links</h5>
                        <p className="text-sm">Our website may contain links to third-party websites that are not operated by us. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Changes to This Privacy Policy</h5>
                        <p className="text-sm">We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the effective date. Your continued use of our services after such changes constitutes your acceptance of the revised policy.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg">Contact Us</h5>
                        <p className="text-sm">If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us.</p>
                    </div>
                </div>
                <div className="w-[524px] flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black rounded-48 shrink-0">
                    <h4 className="text-xl">Table of Content</h4>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <a href="" className="text-md hover:text-[--primary] transition">Introduction</a>
                    <a href="" className="text-md hover:text-[--primary] transition">Personal Information</a>
                    <a href="" className="text-md hover:text-[--primary] transition">Usage Data</a>
                    <a href="" className="text-md hover:text-[--primary] transition">How We Use Your Information</a>
                    <a href="" className="text-md hover:text-[--primary] transition">Sharing Your Information</a>
                    <a href="" className="text-md hover:text-[--primary] transition">Data Security</a>
                    <a href="" className="text-md hover:text-[--primary] transition">Your Choices and Rights</a>
                    <a href="" className="text-md hover:text-[--primary] transition">Third-Party Links</a>
                    <a href="" className="text-md hover:text-[--primary] transition">Changes to This Privacy Policy</a>
                    <a href="" className="text-md hover:text-[--primary] transition">Contact Us</a>
                </div>
            </div>
        </div>
	);
}

export default ReturnPolicy;
