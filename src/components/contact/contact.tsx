import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import axios from 'axios';
import { Input } from "@lib/components/ui/input";
import { Textarea } from "@lib/components/ui/textarea";
import { Button } from "@lib/components/ui/button";


interface ContactProps {
	// Add any props if needed in the future
}

function Contact(props: ContactProps) {
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	// Form state
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		enquiry: '',
		number: '',
		message: ''
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// API configuration
	const headers = {
		"Content-Type": "application/json",
		"x-publishable-api-key": "pk_c1345b52039702b7035e1cf270b942de49b7b14d0ac24fe91cca9a32a1ec4546",
	};
	const baseUrl = "http://208.87.135.120:9000";

	// Handle form input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setFormData(prev => ({
			...prev,
			[id]: value
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await axios.post(`${baseUrl}/store/customers/contact`, formData, {
				headers,
			});
			console.log('Contact form submitted successfully:', response.data);
			setSuccess(true);
			// Reset form
			setFormData({
				name: '',
				email: '',
				phone: '',
				enquiry: '',
				number: '',
				message: ''
			});
		} catch (err) {
			console.error('Failed to submit contact form:', err);
			setError('Failed to send message. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis]);
    

	return (
        <div className="relative w-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="contact-us">
            <div className="w-full border border-[--Black] p-4 text-center rounded-[48px]">
                <h1 className="text-1xl text-black">CONTACT US</h1>
            </div>
            <div className="flex items-stretch xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <div className="w-[575px] flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black rounded-[48px]">
                    <h4 className="text-xl uppercase">Contact METHODS</h4>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h6 className="text-md ">Contact Via</h6>
                        <div className="flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                            <a href="" className="flex items-center gap-2 text-sm transition hover:text-[--primary]">
                                <Icon icon="solar:phone-outline" />
                                <span>+1 233 898 0897</span>
                            </a>
                            <a href="" className="flex items-center gap-2 text-sm transition hover:text-[--primary]">
                                <Icon icon="fluent:mail-32-light" />
                                <span>email@example.com</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                        <Icon icon="uil:plus" className="text-[18px]" />
                        <div className="w-full h-[1px] bg-mediumGrey"></div>
                        <Icon icon="uil:plus" className="text-[18px]" />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <h6 className="text-md">Open Hours</h6>
                        <div className="flex items-center justify-between gap-8">
                            <p className="text-sm">WEEK DAYS</p>
                            <p className="text-sm">9 AM – 7 PM</p>
                        </div>
                        <div className="flex items-center justify-between gap-8">
                            <p className="text-sm">SATURDAY</p>
                            <p className="text-sm">9 AM – 5 PM</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:gap-[48px] xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] text-black rounded-[48px]">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xl uppercase">Fill Out The Form to Contact us</h4>
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur nunc faucibus ut ornare.</p>
                        
                        {/* Success Message */}
                        {success && (
                            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                <p className="text-sm">✅ Message sent successfully! We'll get back to you soon.</p>
                            </div>
                        )}
                        
                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                <p className="text-sm">❌ {error}</p>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid items-stretch grid-cols-12 xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4">
                            <div className="sm:col-span-6 col-span-12">
                                <Input 
                                    type="text" 
                                    id="name" 
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <Input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <Input 
                                    type="text" 
                                    id="phone" 
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-6 col-span-12">
                                <Input 
                                    type="text" 
                                    id="enquiry" 
                                    placeholder="Enquiry About"
                                    value={formData.enquiry}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-span-12">
                                <Input 
                                    type="text" 
                                    id="number" 
                                    placeholder="Your Number"
                                    value={formData.number}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-span-12">
                                <Textarea 
                                    name="message" 
                                    id="message" 
                                    placeholder="Your Message Here"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-span-12 flex justify-end">
                                <Button 
                                    type="submit" 
                                    variant={"primary"}
                                    size={'smallest'}
                                    className="w-fit "
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
	);
}

export default Contact;
