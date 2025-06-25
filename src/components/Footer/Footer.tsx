import React, { useEffect } from "react";
import './css/style.css';
import { Icon } from '@iconify/react';

interface FooterProps {
	// Add any props if needed in the future
}
function Footer(props: FooterProps) {

	useEffect(() => {
	}, []);

	return (
		<section className="footer-section w-screen flex xl:flex-row flex-col items-stretch xl:gap-[1.25vw] sm:gap-4 gap-2 xl:pt-[17.4603vh] sm:pt-[10vh] pt-[6vh] xl:p-[1.25vw] sm:p-4 p-2 overflow-hidden" id="footer">
            <div className="xl:w-[38.125vw] w-full flex flex-col justify-between gap-[2.5vw] xl:p-[1.25vw] sm:p-[2.344vw] p-4 shrink-0 bg-primary rounded-64">
                <div className="xl:w-full sm:w-[80%] w-full xl:m-0 mx-auto xl:text-left text-center flex flex-col xl:items-start items-center gap-4">
                    <img src="/images/footer-logo.png" className="xl:w-[80%] w-[70%]" alt="footer-logo" />
                    <p className="text-sm text-white">Lorem ipsum dolor sit amet consectetur. Lacus commodo fusce at neque malesuada id et aliquam. Aliquam eleifend mattis a risus orci nunc pretium elementum sem. Porttitor enim elit enim in at. Proin eget tellus faucibus sem. At eros leo sed ut arcu in.</p>
                </div>
                <div className="flex items-stretch xl:gap-[1.25vw] sm:gap-4 gap-2">
                    <a href="/shop" className="w-full h-[17.4603vh] effect-btn white">
                        <span>Browse Category</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                            <path d="M11.1109 5.38867H6.66645C5.68462 5.38867 4.88867 6.18462 4.88867 7.16645V11.6109C4.88867 12.5927 5.68462 13.3887 6.66645 13.3887H11.1109C12.0927 13.3887 12.8887 12.5927 12.8887 11.6109V7.16645C12.8887 6.18462 12.0927 5.38867 11.1109 5.38867Z" className="stroke-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M25.3336 5.38867H20.8891C19.9072 5.38867 19.1113 6.18462 19.1113 7.16645V11.6109C19.1113 12.5927 19.9072 13.3887 20.8891 13.3887H25.3336C26.3154 13.3887 27.1113 12.5927 27.1113 11.6109V7.16645C27.1113 6.18462 26.3154 5.38867 25.3336 5.38867Z" className="stroke-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11.1109 19.6108H6.66645C5.68462 19.6108 4.88867 20.4068 4.88867 21.3886V25.8331C4.88867 26.8149 5.68462 27.6108 6.66645 27.6108H11.1109C12.0927 27.6108 12.8887 26.8149 12.8887 25.8331V21.3886C12.8887 20.4068 12.0927 19.6108 11.1109 19.6108Z" className="stroke-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M23.1113 27.6108C25.3204 27.6108 27.1113 25.8199 27.1113 23.6108C27.1113 21.4018 25.3204 19.6108 23.1113 19.6108C20.9023 19.6108 19.1113 21.4018 19.1113 23.6108C19.1113 25.8199 20.9023 27.6108 23.1113 27.6108Z" className="stroke-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M25.9023 26.4766L28.8143 29.3886" className="stroke-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                    <button className="w-full open__contactPopup h-[17.4603vh] effect-btn black">
                        <span>Contact Us</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                            <path d="M16.0001 15.6785C17.2461 15.6785 18.2561 14.6685 18.2561 13.4225C18.2561 12.1765 17.2461 11.1665 16.0001 11.1665C14.7542 11.1665 13.7441 12.1765 13.7441 13.4225C13.7441 14.6685 14.7542 15.6785 16.0001 15.6785Z" className="fill-white"/>
                            <path d="M19.9071 21.2307C20.6128 21.0084 20.9844 20.2298 20.6839 19.5524C19.8875 17.7551 18.0919 16.5 15.9995 16.5C13.9071 16.5 12.1115 17.7551 11.3151 19.5524C11.0164 20.2298 11.3862 21.0084 12.092 21.2307C13.0964 21.5471 14.428 21.8333 15.9995 21.8333C17.5711 21.8333 18.9008 21.5471 19.9071 21.2307Z" className="fill-white"/>
                            <path d="M24.4455 24.0553V8.94423C24.4455 6.98055 22.8537 5.38867 20.89 5.38867H11.1122C9.14852 5.38867 7.55664 6.98055 7.55664 8.94423V24.0553C7.55664 26.0191 9.14852 27.6109 11.1122 27.6109H20.89C22.8537 27.6109 24.4455 26.0191 24.4455 24.0553Z" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M28.8887 8.05518V24.9441" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3.11133 8.05518V24.9441" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:gap-4 gap-2">
                <div className="w-full h-full flex sm:flex-row flex-col justify-between xl:text-left text-center xl:gap-[1.25vw] sm:gap-4 gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-2 bg-white border border-[--Black] rounded-48">
                    <div className="w-full flex flex-col gap-3 text-black">
                        <h6 className="text-md ">SITE MAP</h6>
                        <a href="/about" className="text-sm hover:text-primary">ABOUT US</a>
                        <button className="w-fit sm:m-0 mx-auto open__contactPopup text-left text-sm hover:text-primary">CONTACT US</button>
                        <a href="/privacy-policy" className="text-sm hover:text-primary">TERMS & CONDITIONS</a>
                        <a href="/privacy-policy" className="text-sm hover:text-primary">PRIVACY POLICY</a>
                        <a href="/return-policy" className="text-sm hover:text-primary">RETURN POLICY</a>
                        <a href="/shipping-policy" className="text-sm hover:text-primary">SHIPPING POLICY</a>
                    </div>
                    <div className="flex sm:flex-col items-center gap-2 shrink-0">
                        <Icon icon="uil:plus" className="text-[18px] text-black" />
                        <div className="sm:w-[1px] w-full sm:h-full h-[1px] bg-black"></div>
                        <Icon icon="uil:plus" className="text-[18px] text-black" />
                    </div>
                    <div className="w-full flex flex-col gap-3 text-black">
                        <h6 className="text-md ">CATEGORIES</h6>
                        <a href="/shop" className="text-sm hover:text-primary">CHAIRS</a>
                        <a href="/shop" className="text-sm hover:text-primary">WORKSTATION DESKS</a>
                        <a href="/shop" className="text-sm hover:text-primary">TABLES</a>
                        <a href="/shop" className="text-sm hover:text-primary">ACCESSORIES</a>
                        <a href="/shop" className="text-sm hover:text-primary">OTHERS</a>
                    </div>
                    <div className="flex sm:flex-col items-center gap-2 shrink-0">
                        <Icon icon="uil:plus" className="text-[18px] text-black" />
                        <div className="sm:w-[1px] w-full sm:h-full h-[1px] bg-black"></div>
                        <Icon icon="uil:plus" className="text-[18px] text-black" />
                    </div>
                    <div className="w-full  flex flex-col sm:gap-[80px] gap-2">
                        <div className="w-full flex flex-col sm:items-start items-center gap-3 text-black">
                            <h6 className="text-md">OPENING HOUR</h6>
                            <div className="flex items-center gap-8">
                                <p className="text-sm">MON-FRI</p>
                                <p className="text-sm">09am-5pm</p>
                            </div>
                            <div className="flex items-center gap-8">
                                <p className="text-sm">SAT-SUN</p>
                                <p className="text-sm">09am-5pm</p>
                            </div>
                        </div>
                        <div className="sm:hidden flex sm:flex-col items-center gap-2 shrink-0">
                            <Icon icon="uil:plus" className="text-[18px] text-black" />
                            <div className="sm:w-[1px] w-full sm:h-full h-[1px] bg-black"></div>
                            <Icon icon="uil:plus" className="text-[18px] text-black" />
                        </div>
                        <div className="w-full flex flex-col gap-3 text-black">
                            <h6 className="text-md">CONTACT INFO</h6>
                            <div className="flex flex-col gap-3">
                                <a href="tel:1300 337 446" className="text-sm hover:text-primary">1300 337 446</a>
                                <a href="mailto:sales@ingo.com.au" className="text-sm hover:text-primary">sales@ingo.com.au</a>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full flex sm:flex-row flex-col sm:gap-0 gap-4 items-center justify-between  xl:p-[1.25vw] sm:p-[2.344vw] p-2 bg-white border border-[--Black] rounded-24">
                    <p className="text-sm text-black">Â©2024 All Rights Reserved</p>
                    <div className="flex items-center gap-2">
                        <a href="">
                            <img src="/images/afterPay.png" alt="afterPay" />
                        </a>
                        <a href="">
                            <img src="/images/visa.png" alt="visa" />
                        </a>
                        <a href="">
                            <img src="/images/ipple-pay.png" alt="ipple-pay" />
                        </a>
                        <a href="">
                            <img src="/images/master-card.png" alt="master-card" />
                        </a>
                        <a href="">
                            <img src="/images/pay-pal.png" alt="pay-pal" />
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-black">Â©2024 All Rights Reserved</p>
                        <a href="aithur.com">
                            <svg xmlns="http://www.w3.org/2000/svg" width="92" height="24" viewBox="0 0 92 24" fill="none">
                                <g clipPath="url(#clip0_30_1229)">
                                <path d="M9.50266 24.0001C7.37746 23.9975 5.6669 22.2778 5.67384 20.1512C5.68078 18.0351 7.39308 16.3206 9.50266 16.3162C11.6252 16.3128 13.3532 18.0507 13.3436 20.1816C13.3341 22.2978 11.6192 24.0027 9.50266 24.0001Z" fill="#0F0F0F"/>
                                <path d="M29.666 20.958C29.1455 21.1319 26.63 21.5666 25.0686 19.3931C23.3225 16.9631 21.6119 10.4043 21.2519 7.9169C21.0975 6.85274 19.5171 0.26611 13.3584 0.00528763C8.32729 -0.168594 6.87175 4.44014 6.87175 4.44014C6.87175 4.44014 5.28263 9.61746 3.55645 11.0468C1.56137 12.6986 0 11.9162 0 11.9162C0 11.9162 4.42388 16.0893 8.32729 14.0897C12.2307 12.0901 13.4451 8.00384 13.4451 8.00384C13.4451 8.00384 14.6829 14.4722 15.6683 16.7153C16.0899 17.6743 17.6955 23.1315 22.0326 23.7401C26.3698 24.3487 29.666 20.958 29.666 20.958Z" fill="#0F0F0F"/>
                                <rect x="26.3516" y="3.46729" width="3.83594" height="16.7728" rx="1.91797" fill="#0F0F0F"/>
                                <rect x="26.3516" y="3.46729" width="3.83594" height="16.7728" rx="1.91797" fill="#0F0F0F"/>
                                <path d="M45.0098 5.1383C45.0098 4.21543 45.7565 3.46729 46.6776 3.46729H47.1779C48.099 3.46729 48.8457 4.21543 48.8457 5.1383V8.543C48.8457 9.46588 49.238 9.77538 50.1591 9.77538H52.2647C53.1858 9.77538 53.5989 9.46588 53.5989 8.543V5.1383C53.5989 4.21543 54.3456 3.46729 55.2667 3.46729H55.7671C56.6882 3.46729 57.4349 4.21543 57.4349 5.1383V18.5691C57.4349 19.492 56.6882 20.2401 55.7671 20.2401H55.2667C54.3456 20.2401 53.5989 19.492 53.5989 18.5691V14.6631C53.5989 13.7402 53.1858 13.4516 52.2647 13.4516H50.1591C49.238 13.4516 48.8457 13.7402 48.8457 14.6631V18.5691C48.8457 19.492 48.099 20.2401 47.1779 20.2401H46.6776C45.7565 20.2401 45.0098 19.492 45.0098 18.5691V5.1383Z" fill="#0F0F0F"/>
                                <path d="M45.0098 5.1383C45.0098 4.21543 45.7565 3.46729 46.6776 3.46729H47.1779C48.099 3.46729 48.8457 4.21543 48.8457 5.1383V8.543C48.8457 9.46588 49.238 9.77538 50.1591 9.77538H52.2647C53.1858 9.77538 53.5989 9.46588 53.5989 8.543V5.1383C53.5989 4.21543 54.3456 3.46729 55.2667 3.46729H55.7671C56.6882 3.46729 57.4349 4.21543 57.4349 5.1383V18.5691C57.4349 19.492 56.6882 20.2401 55.7671 20.2401H55.2667C54.3456 20.2401 53.5989 19.492 53.5989 18.5691V14.6631C53.5989 13.7402 53.1858 13.4516 52.2647 13.4516H50.1591C49.238 13.4516 48.8457 13.7402 48.8457 14.6631V18.5691C48.8457 19.492 48.099 20.2401 47.1779 20.2401H46.6776C45.7565 20.2401 45.0098 19.492 45.0098 18.5691V5.1383Z" fill="#0F0F0F"/>
                                <path d="M33.5233 3.46729C32.6022 3.46729 31.8555 4.21543 31.8555 5.1383V5.47251C31.8555 6.39538 32.6022 7.14353 33.5233 7.14353H34.4927C35.4138 7.14353 35.6706 7.62013 35.6706 8.543V18.5691C35.6706 19.492 36.4173 20.2401 37.3384 20.2401H37.8387C38.7598 20.2401 39.5065 19.492 39.5065 18.5691V8.543C39.5065 7.62013 39.7529 7.14353 40.674 7.14353H41.6538C42.5749 7.14353 43.3216 6.39538 43.3216 5.47251V5.1383C43.3216 4.21543 42.5749 3.46729 41.6538 3.46729H33.5233Z" fill="#0F0F0F"/>
                                <path d="M33.5233 3.46729C32.6022 3.46729 31.8555 4.21543 31.8555 5.1383V5.47251C31.8555 6.39538 32.6022 7.14353 33.5233 7.14353H34.4927C35.4138 7.14353 35.6706 7.62013 35.6706 8.543V18.5691C35.6706 19.492 36.4173 20.2401 37.3384 20.2401H37.8387C38.7598 20.2401 39.5065 19.492 39.5065 18.5691V8.543C39.5065 7.62013 39.7529 7.14353 40.674 7.14353H41.6538C42.5749 7.14353 43.3216 6.39538 43.3216 5.47251V5.1383C43.3216 4.21543 42.5749 3.46729 41.6538 3.46729H33.5233Z" fill="#0F0F0F"/>
                                <path d="M60.0625 5.0968C60.0625 4.17392 60.8092 3.42578 61.7303 3.42578H62.2306C63.1517 3.42578 63.8984 4.17392 63.8984 5.0968V14.6947C63.8984 16.3657 64.8887 16.819 66.2445 16.819C67.724 16.819 68.6517 16.3657 68.6517 14.6947V5.0968C68.6517 4.17392 69.3984 3.42578 70.3195 3.42578H70.8198C71.7409 3.42578 72.4876 4.17392 72.4876 5.0968V15.478C72.4876 17.1281 71.1429 20.5746 66.1395 20.5746C61.1361 20.5746 60.0625 16.7208 60.0625 15.478V5.0968Z" fill="#0F0F0F"/>
                                <path d="M60.0625 5.0968C60.0625 4.17392 60.8092 3.42578 61.7303 3.42578H62.2306C63.1517 3.42578 63.8984 4.17392 63.8984 5.0968V14.6947C63.8984 16.3657 64.8887 16.819 66.2445 16.819C67.724 16.819 68.6517 16.3657 68.6517 14.6947V5.0968C68.6517 4.17392 69.3984 3.42578 70.3195 3.42578H70.8198C71.7409 3.42578 72.4876 4.17392 72.4876 5.0968V15.478C72.4876 17.1281 71.1429 20.5746 66.1395 20.5746C61.1361 20.5746 60.0625 16.7208 60.0625 15.478V5.0968Z" fill="#0F0F0F"/>
                                <path d="M88.7013 19.6601C88.6667 19.5648 88.6113 19.4721 88.5482 19.3915C88.1453 18.8718 87.7381 18.3564 87.3326 17.8401C86.551 16.8448 85.7668 15.8512 84.9887 14.8524C84.6065 14.3622 84.6783 13.7948 85.1538 13.4015C85.3138 13.269 85.4711 13.133 85.6172 12.9866C86.4888 12.1108 87.0464 11.0705 87.1943 9.83608C87.3689 8.37821 87.0274 7.03641 86.1637 5.85313C85.0682 4.35195 83.5733 3.53769 81.7162 3.49004C80.0311 3.44673 78.3451 3.47792 76.6592 3.48138C76.207 3.48225 75.8274 3.66502 75.5231 3.99766C75.2283 4.32076 75.1124 4.70624 75.1133 5.14022C75.1176 7.35518 75.115 9.57101 75.115 11.786V18.2446C75.115 18.3694 75.1133 18.4941 75.1167 18.618C75.1461 19.4738 75.8058 20.1296 76.6609 20.1529C76.8952 20.159 77.1304 20.1564 77.3656 20.1529C77.6699 20.1486 77.9526 20.0646 78.2042 19.8922C78.6711 19.5717 78.9106 19.1247 78.9114 18.5565C78.914 17.6357 78.9114 16.7149 78.9132 15.794C78.9132 15.691 78.9166 15.5853 78.9348 15.4839C79.0256 14.9746 79.4899 14.6307 80.0043 14.6835C80.3138 14.7147 80.5412 14.875 80.7297 15.1141C81.9548 16.6672 83.1851 18.2169 84.4077 19.7718C84.6074 20.0256 84.8503 20.1555 85.1711 20.1547C86.1801 20.1521 87.1882 20.1555 88.1972 20.1512C88.2984 20.1512 88.4056 20.133 88.4998 20.0966C88.6943 20.023 88.7713 19.8541 88.7013 19.6601ZM82.9379 10.6477C82.5661 11.1008 82.0888 11.3425 81.4966 11.3381C81.2484 11.3364 80.9994 11.3381 80.7513 11.3381C80.4816 11.3381 80.2127 11.339 79.9438 11.3381C79.3446 11.3355 78.9261 10.9284 78.9158 10.3264C78.908 9.8768 78.914 9.42722 78.914 8.97764C78.914 8.68745 78.9123 8.3964 78.914 8.10621C78.9201 7.46693 79.329 7.05287 79.9645 7.04854C80.4617 7.04507 80.9588 7.0468 81.456 7.04767C82.235 7.0494 82.7995 7.41495 83.1661 8.08889C83.6036 8.89275 83.5059 9.95389 82.9379 10.6477Z" fill="#0F0F0F"/>
                                <path d="M88.7013 19.6601C88.6667 19.5648 88.6113 19.4721 88.5482 19.3915C88.1453 18.8718 87.7381 18.3564 87.3326 17.8401C86.551 16.8448 85.7668 15.8512 84.9887 14.8524C84.6065 14.3622 84.6783 13.7948 85.1538 13.4015C85.3138 13.269 85.4711 13.133 85.6172 12.9866C86.4888 12.1108 87.0464 11.0705 87.1943 9.83608C87.3689 8.37821 87.0274 7.03641 86.1637 5.85313C85.0682 4.35195 83.5733 3.53769 81.7162 3.49004C80.0311 3.44673 78.3451 3.47792 76.6592 3.48138C76.207 3.48225 75.8274 3.66502 75.5231 3.99766C75.2283 4.32076 75.1124 4.70624 75.1133 5.14022C75.1176 7.35518 75.115 9.57101 75.115 11.786V18.2446C75.115 18.3694 75.1133 18.4941 75.1167 18.618C75.1461 19.4738 75.8058 20.1296 76.6609 20.1529C76.8952 20.159 77.1304 20.1564 77.3656 20.1529C77.6699 20.1486 77.9526 20.0646 78.2042 19.8922C78.6711 19.5717 78.9106 19.1247 78.9114 18.5565C78.914 17.6357 78.9114 16.7149 78.9132 15.794C78.9132 15.691 78.9166 15.5853 78.9348 15.4839C79.0256 14.9746 79.4899 14.6307 80.0043 14.6835C80.3138 14.7147 80.5412 14.875 80.7297 15.1141C81.9548 16.6672 83.1851 18.2169 84.4077 19.7718C84.6074 20.0256 84.8503 20.1555 85.1711 20.1547C86.1801 20.1521 87.1882 20.1555 88.1972 20.1512C88.2984 20.1512 88.4056 20.133 88.4998 20.0966C88.6943 20.023 88.7713 19.8541 88.7013 19.6601ZM82.9379 10.6477C82.5661 11.1008 82.0888 11.3425 81.4966 11.3381C81.2484 11.3364 80.9994 11.3381 80.7513 11.3381C80.4816 11.3381 80.2127 11.339 79.9438 11.3381C79.3446 11.3355 78.9261 10.9284 78.9158 10.3264C78.908 9.8768 78.914 9.42722 78.914 8.97764C78.914 8.68745 78.9123 8.3964 78.914 8.10621C78.9201 7.46693 79.329 7.05287 79.9645 7.04854C80.4617 7.04507 80.9588 7.0468 81.456 7.04767C82.235 7.0494 82.7995 7.41495 83.1661 8.08889C83.6036 8.89275 83.5059 9.95389 82.9379 10.6477Z" fill="#0F0F0F"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_30_1229">
                                    <rect width="92" height="24" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
		</section>
	);
}

export default Footer; 
