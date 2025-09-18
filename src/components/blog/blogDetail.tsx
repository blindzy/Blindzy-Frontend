import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { useParams } from "react-router"
import { useLenis } from '../../hooks/useLenis';
interface BlogDetailProps {

	// Add any props if needed in the future
}
function BlogDetail(props: BlogDetailProps) {
    // const blogId = useParams().id;
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	useEffect(() => {
        if (!isDesktop) return;
        gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis, isDesktop]);
    

	return (
        <div className="relative w-screen min-h-screen flex xl:flex-row flex-col items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="blogDetail">
            
            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:p-6 sm:gap-[2.344vw] gap-4 text-black">
                <div className="w-full flex items-center justify-between">
                    <h3 className="text-xxxl uppercase font-black font-plus">Title Goes Here</h3>
                    <p className="text-sm text-primary">5 Oct, 2023</p>
                </div>
                <div className="w-full border border-[--Black] rounded-32 overflow-hidden">
                    <img src="/images/blog/3.png" className="w-full" alt="blog" />
                </div>
                <div className="flex flex-col">
                    <p className="text-sm">A high school teacher â€˜Gemmaâ€™ who participated in one of our 16-week Workplace Brain Health programs said it highlighted that her working memory was the key cognitive area needing improvement. During the program Gemma became aware of the strategies she used to compensate for her poor working memory, previously unrecognised to her. </p>
                    <p className="text-sm">Gemma also found the program helped her to pause and reflect more often and decreased her impulsivity within decision-making.  She said â€œI talk less and listen more. I listen better now when people are speaking rather than making assumptions. I am less impulsive, interrupt less, and have improved in my ability to read a situation accurately.â€</p>
                    <p className="text-sm">When asked of her overall experience of the program Gemma responded with â€œThe opportunity to walk this pathway with others, discuss the challenges, and work with a team that respected the vulnerability of engaging in learning together has been incredibly valuable.â€ Gemma indicated she appreciated that management invested in this particular professional development within a team, rather than individual context. </p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm">A high school teacher â€˜Gemmaâ€™ who participated in one of our 16-week Workplace Brain Health programs said it highlighted that her working memory was the key cognitive area needing improvement. During the program Gemma became aware of the strategies she used to compensate for her poor working memory, previously unrecognised to her. </p>
                    <p className="text-sm">Gemma also found the program helped her to pause and reflect more often and decreased her impulsivity within decision-making.  She said â€œI talk less and listen more. I listen better now when people are speaking rather than making assumptions. I am less impulsive, interrupt less, and have improved in my ability to read a situation accurately.â€</p>
                    <p className="text-sm">When asked of her overall experience of the program Gemma responded with â€œThe opportunity to walk this pathway with others, discuss the challenges, and work with a team that respected the vulnerability of engaging in learning together has been incredibly valuable.â€ Gemma indicated she appreciated that management invested in this particular professional development within a team, rather than individual context. </p>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm">A high school teacher â€˜Gemmaâ€™ who participated in one of our 16-week Workplace Brain Health programs said it highlighted that her working memory was the key cognitive area needing improvement. During the program Gemma became aware of the strategies she used to compensate for her poor working memory, previously unrecognised to her. </p>
                    <p className="text-sm">Gemma also found the program helped her to pause and reflect more often and decreased her impulsivity within decision-making.  She said â€œI talk less and listen more. I listen better now when people are speaking rather than making assumptions. I am less impulsive, interrupt less, and have improved in my ability to read a situation accurately.â€</p>
                    <p className="text-sm">When asked of her overall experience of the program Gemma responded with â€œThe opportunity to walk this pathway with others, discuss the challenges, and work with a team that respected the vulnerability of engaging in learning together has been incredibly valuable.â€ Gemma indicated she appreciated that management invested in this particular professional development within a team, rather than individual context. </p>
                </div>
            </div>
            <div className="xl:w-[30.833vw] w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48 shrink-0">
                <h3 className="text-xxl uppercase font-black font-plus">Other Reads</h3>
                <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                    <Icon icon="uil:plus" className="text-[18px]" />
                    <div className="w-full h-[1px] bg-mediumGrey"></div>
                    <Icon icon="uil:plus" className="text-[18px]" />
                </div>
                <a href="/blog/blog-detail" className="flex items-center">
                    <div className="w-full flex flex-col gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-2">
                        <p className="text-sm ">5 Oct, 2023</p>
                        <h6 className="text-md">Title Goes Here</h6>
                        <p className="text-sm line-clamp-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                    </div>
                    <div className="xl:w-[11.979vw] xl:h-[10vw] sm:w-[230px] w-[150px] shrink-0 rounded-24 overflow-hidden">
                        <img src="/images/blog/1.png" alt="" className="object-cover w-full h-full" />
                    </div>
                </a>
            </div>
        </div>
	);
}

export default BlogDetail;

