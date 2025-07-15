import React, { useEffect , useState} from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';

interface ShowroomProps {
	// Add any props if needed in the future
}
function Showroom(props: ShowroomProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
	const lenis = isDesktop ? useLenis() : null;

	useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.normalizeScroll(true);

		// If using Lenis, connect it with GSAP
		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}
	}, [lenis]);
    

	return (
        <div className="relative w-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="showroom">
            <div className="w-full border border-[--Black] p-4 text-center xl:rounded-[2.5vw] sm:rounded-[4.688vw] rounded-[15px]">
                <h1 className="text-1xl text-black uppercase">Showroom</h1>
            </div>
            <div className="flex items-center justify-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <button className={`w-fit cus-btn small ${selectedCategory === 'all' ? '' : 'white'}`} onClick={() => setSelectedCategory('all')}>
                    All
                </button>
                <button className={`w-fit cus-btn small ${selectedCategory === 'blinds' ? '' : 'white'}`} onClick={() => setSelectedCategory('blinds')}>
                    Blinds
                </button>
                <button className={`w-fit cus-btn small ${selectedCategory === 'curatins' ? '' : 'white'}`} onClick={() => setSelectedCategory('curatins')}>
                    Curatins
                </button>
            </div>
            <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                <Icon icon="uil:plus" className="text-[18px]" />
                <div className="w-full h-[1px] bg-mediumGrey"></div>
                <Icon icon="uil:plus" className="text-[18px]" />
            </div>
            <div className="grid items-stretch grid-cols-12 xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4">
                <a href="/single-product" className={`sm:col-span-4 col-span-12 rounded-48 overflow-hidden ${selectedCategory === 'all' ? 'visible': 'hidden'}`}>
                    <img src="/images/showroom/01.png" className="w-full object-cover"  alt="showroom" />
                </a>
                <a href="/single-product" className={`sm:col-span-4 col-span-12 rounded-48 overflow-hidden ${selectedCategory === 'all' ? 'visible': 'hidden'}`}>
                    <img src="/images/showroom/02.png" className="w-full object-cover"  alt="showroom" />
                </a>
                <a href="/single-product" className={`sm:col-span-4 col-span-12 rounded-48 overflow-hidden ${selectedCategory === 'all' || selectedCategory === 'blinds' ? 'visible': 'hidden'}`}>
                    <img src="/images/showroom/03.png" className="w-full object-cover"  alt="showroom" />
                </a>
                <a href="/single-product" className={`sm:col-span-4 col-span-12 rounded-48 overflow-hidden ${selectedCategory === 'all' ? 'visible': 'hidden'}`}>
                    <img src="/images/showroom/04.png" className="w-full object-cover"  alt="showroom" />
                </a>
                <a href="/single-product" className={`sm:col-span-4 col-span-12 rounded-48 overflow-hidden ${selectedCategory === 'all' || selectedCategory === 'blinds' ? 'visible': 'hidden'}`}>
                    <img src="/images/showroom/05.png" className="w-full object-cover"  alt="showroom" />
                </a>
                <a href="/single-product" className={`sm:col-span-4 col-span-12 rounded-48 overflow-hidden ${selectedCategory === 'all' || selectedCategory === 'curatins' ? 'visible': 'hidden'}`}>
                    <img src="/images/showroom/06.png" className="w-full object-cover"  alt="showroom" />
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

export default Showroom;

