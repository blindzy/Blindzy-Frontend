import React, { useEffect , useState} from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';

interface BlogProps {
	// Add any props if needed in the future
}

function Blog(props: BlogProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
        <div className="relative w-screen min-h-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="blog">
            <div className="w-full border border-[--Black] p-4 text-center rounded-[48px]">
                <h1 className="text-1xl text-black uppercase">BLOGS</h1>
            </div>
            <div className="flex items-center justify-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <button className={`w-fit cus-btn small ${selectedCategory === 'all' ? 'pointer-events-none' : 'white'}`} onClick={() => setSelectedCategory('all')}>
                    All
                </button>
                <button className={`w-fit cus-btn small ${selectedCategory === 'blinds' ? 'pointer-events-none' : 'white'}`} onClick={() => setSelectedCategory('blinds')}>
                    Blinds
                </button>
                <button className={`w-fit cus-btn small ${selectedCategory === 'curatins' ? 'pointer-events-none' : 'white'}`} onClick={() => setSelectedCategory('curatins')}>
                    Curatins
                </button>
            </div>
            <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                <Icon icon="uil:plus" className="text-[18px]" />
                <div className="w-full h-[1px] bg-mediumGrey"></div>
                <Icon icon="uil:plus" className="text-[18px]" />
            </div>
            <div className="grid items-stretch grid-cols-12 xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4">
                <a href="blog/blog-detail" className={`sm:col-span-6 col-span-12 flex items-stretch  border border-[--Black] rounded-32 overflow-hidden ${selectedCategory === 'all' || selectedCategory ==='curatins' ? 'visible': 'hidden'}`}>
                    <div className="w-full flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 justify-between text-black xl:p-[0.833vw] sm:p-[1.563vw] p-4">
                        <div className="flex flex-col gap-2">
                            <div className="w-full flex items-center justify-between">
                                <h6 className="text-md">Title Goes Here</h6>
                                <p className="text-sm">5 Oct, 2023</p>
                            </div>
                            <p className="text-sm">Lorem Ipsum is simply dummy text of the 
                            printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <button className="w-fit cus-btn small">Read More</button>
                    </div>
                    <div className="w-full rounded-l-[32px] overflow-hidden">
                        <img src="images/blog/1.png" className="w-full " alt="" />
                    </div>
                </a>
                <a href="blog/blog-detail" className={`sm:col-span-6 col-span-12 flex items-stretch  border border-[--Black] rounded-32 overflow-hidden ${selectedCategory === 'all' || selectedCategory ==='curatins' ? 'visible': 'hidden'}`}>
                    <div className="w-full flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 justify-between text-black xl:p-[0.833vw] sm:p-[1.563vw] p-4">
                        <div className="flex flex-col gap-2">
                            <div className="w-full flex items-center justify-between">
                                <h6 className="text-md">Title Goes Here</h6>
                                <p className="text-sm">5 Oct, 2023</p>
                            </div>
                            <p className="text-sm">Lorem Ipsum is simply dummy text of the 
                            printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <button className="w-fit cus-btn small">Read More</button>
                    </div>
                    <div className="w-full rounded-l-[32px] overflow-hidden">
                        <img src="images/blog/1.png" className="w-full " alt="" />
                    </div>
                </a>
                <a href="blog/blog-detail" className={`sm:col-span-6 col-span-12 flex items-stretch  border border-[--Black] rounded-32 overflow-hidden ${selectedCategory === 'all' || selectedCategory ==='blinds'? 'visible': 'hidden'}`}>
                    <div className="w-full flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 justify-between text-black xl:p-[0.833vw] sm:p-[1.563vw] p-4">
                        <div className="flex flex-col gap-2">
                            <div className="w-full flex items-center justify-between">
                                <h6 className="text-md">Title Goes Here</h6>
                                <p className="text-sm">5 Oct, 2023</p>
                            </div>
                            <p className="text-sm">Lorem Ipsum is simply dummy text of the 
                            printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <button className="w-fit cus-btn small">Read More</button>
                    </div>
                    <div className="w-full rounded-l-[32px] overflow-hidden">
                        <img src="images/blog/2.png" className="w-full " alt="" />
                    </div>
                </a>
                <a href="blog/blog-detail" className={`sm:col-span-6 col-span-12 flex items-stretch  border border-[--Black] rounded-32 overflow-hidden ${selectedCategory === 'all' || selectedCategory ==='blinds'? 'visible': 'hidden'}`}>
                    <div className="w-full flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 justify-between text-black xl:p-[0.833vw] sm:p-[1.563vw] p-4">
                        <div className="flex flex-col gap-2">
                            <div className="w-full flex items-center justify-between">
                                <h6 className="text-md">Title Goes Here</h6>
                                <p className="text-sm">5 Oct, 2023</p>
                            </div>
                            <p className="text-sm">Lorem Ipsum is simply dummy text of the 
                            printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <button className="w-fit cus-btn small">Read More</button>
                    </div>
                    <div className="w-full rounded-l-[32px] overflow-hidden">
                        <img src="images/blog/2.png" className="w-full " alt="" />
                    </div>
                </a>
                <a href="blog/blog-detail" className={`sm:col-span-6 col-span-12 flex items-stretch  border border-[--Black] rounded-32 overflow-hidden ${selectedCategory === 'all' ? 'visible': 'hidden'}`}>
                    <div className="w-full flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 justify-between text-black xl:p-[0.833vw] sm:p-[1.563vw] p-4">
                        <div className="flex flex-col gap-2">
                            <div className="w-full flex items-center justify-between">
                                <h6 className="text-md">Title Goes Here</h6>
                                <p className="text-sm">5 Oct, 2023</p>
                            </div>
                            <p className="text-sm">Lorem Ipsum is simply dummy text of the 
                            printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <button className="w-fit cus-btn small">Read More</button>
                    </div>
                    <div className="w-full rounded-l-[32px] overflow-hidden">
                        <img src="images/blog/2.png" className="w-full " alt="" />
                    </div>
                </a>
                <a href="blog/blog-detail" className={`sm:col-span-6 col-span-12 flex items-stretch  border border-[--Black] rounded-32 overflow-hidden ${selectedCategory === 'all' ? 'visible': 'hidden'}`}>
                    <div className="w-full flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 justify-between text-black xl:p-[0.833vw] sm:p-[1.563vw] p-4">
                        <div className="flex flex-col gap-2">
                            <div className="w-full flex items-center justify-between">
                                <h6 className="text-md">Title Goes Here</h6>
                                <p className="text-sm">5 Oct, 2023</p>
                            </div>
                            <p className="text-sm">Lorem Ipsum is simply dummy text of the 
                            printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <button className="w-fit cus-btn small">Read More</button>
                    </div>
                    <div className="w-full rounded-l-[32px] overflow-hidden">
                        <img src="images/blog/2.png" className="w-full " alt="" />
                    </div>
                </a>
            </div>
            <ul className="navigation">
                <li><Icon icon="majesticons:arrow-left-line" /></li>
                <li className="active">1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li><Icon icon="majesticons:arrow-right-line" /></li>
            </ul>
        </div>
	);
}

export default Blog;
