import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import $ from 'jquery';

import './css/style.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        enquiry: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        $('.open__contactPopup').on('click', function () {
            $('body').addClass('scroll-none');
            $('#contactPopup').css({
                display: 'block',
                width: window.innerWidth >= 1280 ? '1120px' : '100vw', // widened
                pointerEvents: 'auto'
            });
            $('#back-drop').css({ pointerEvents: 'auto', opacity: 1 });
        });
    }, []);

    const contactClose = () => {
        $('#back-drop').css({ pointerEvents: 'none', opacity: 0 });
        $('#contactPopup').css({ display: 'none', width: '0', pointerEvents: 'none' });
        $('body').removeClass('scroll-none');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = e.target.id === 'contact-email' ? 'email' :
                          e.target.id === 'contact-phone' ? 'phone' :
                          e.target.id;
        setFormData({
            ...formData,
            [fieldName]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess('Message sent successfully! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', phone: '', enquiry: '', message: '' });

            setTimeout(() => {
                contactClose();
            }, 2000);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 z-[90] w-screen h-screen bg-[#00000078] transition backdrop-blur-[10px] opacity-0 pointer-events-none" id="back-drop"></div>

            <div
                id="contactPopup"
                className="fixed top-0 right-0 z-[100] contact-popup w-[0] xl:w-[1120px] h-screen hidden pointer-events-none transition-all duration-500 ease-in-out"
            >
                <div className="h-screen xl:px-[2vw] xl:py-[1.25vw] sm:p-[2.344vw] p-2">
                    <div className="w-full flex xl:flex-row flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 h-full shrink-0">
                        {/* Left Sidebar */}
                        <div className="xl:w-[360px] w-full text-white flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2 bg-primary rounded-48 order-2 xl:order-1 self-start">
                            <h4 className="text-xl">Contact INFO</h4>
                            <div className="flex items-center gap-2 shrink-0">
                                <Icon icon="uil:plus" className="text-[18px]" />
                                <div className="w-full h-[1px] bg-white"></div>
                                <Icon icon="uil:plus" className="text-[18px]" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <h6 className="text-md">Contact Via</h6>
                                <div className="flex flex-col gap-6">
                                    <a href="#" className="flex items-center gap-2 text-sm transition hover:text-[--Black]">
                                        <Icon icon="solar:phone-outline" />
                                        <span>+1 233 898 0897</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-2 text-sm transition hover:text-[--Black]">
                                        <Icon icon="fluent:mail-32-light" />
                                        <span>email@example.com</span>
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Icon icon="uil:plus" className="text-[18px]" />
                                <div className="w-full h-[1px] bg-white"></div>
                                <Icon icon="uil:plus" className="text-[18px]" />
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <h6 className="text-md">OPENING HOUR</h6>
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

                        {/* Form Section */}
                        <div className="relative w-full max-h-full h-fit flex flex-col gap-[48px] text-black xl:p-[1.25vw] sm:p-[2.344vw] p-2 bg-white rounded-48 overflow-scroll scroll-hidden order-1 xl:order-2">
                            <button className="absolute top-6 right-6 transition text-black text-[32px] hover:text-primary" onClick={contactClose}>
                                <Icon icon="iconamoon:close-bold" />
                            </button>
                            <div className="flex flex-col gap-4">
                                <h2 className="text-xxl uppercase">Fill Out The Form to Contact us</h2>
                                <p className="text-sm">Lorem ipsum dolor sit amet consectetur nunc faucibus ut ornare.</p>
                            </div>
                            {success && (
                                <div className="w-full p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                    {success}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                <div className="w-full flex xl:flex-row flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                    <input type="text" className="formInput" id="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
                                    <input type="email" className="formInput" id="contact-email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="w-full flex xl:flex-row flex-col items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                    <input type="tel" className="formInput" id="contact-phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
                                    <input type="text" className="formInput" id="enquiry" placeholder="Enquiry About" value={formData.enquiry} onChange={handleInputChange} />
                                </div>
                                <div className="w-full flex items-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                                    <textarea id="message" className="formInput h-[162px]" placeholder="Your Message" value={formData.message} onChange={handleInputChange} required></textarea>
                                </div>
                                <button type="submit" className="w-fit xl:ml-auto mx-auto cus-btn small shrink-0" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
