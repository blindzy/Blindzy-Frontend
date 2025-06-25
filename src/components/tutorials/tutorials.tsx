import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';

interface TutorialsProps {
	// Add any props if needed in the future
}
function Tutorials(props: TutorialsProps) {
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
        <div className="relative w-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="tutorials">
            <div className="w-full border border-[--Black] p-4 text-center rounded-[48px]">
                <h1 className="text-1xl text-black uppercase">Tutorials</h1>
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
                <div className={`sm:col-span-4 col-span-12 flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 ${selectedCategory === 'all' ? 'visible': 'hidden'}`}>
                    <img src="/images/tutorial/1.png" className="w-full rounded-48"  alt="tutorail" />
                    <div className="flex flex-col text-black">
                        <h4 className="text-xl">DESIGN SPECIFICATIONS</h4>
                        <p className="text-sm">Welcome, weâ€™re here to bring you a new standard in energy-efficient home solutions. </p>
                    </div>
                </div>
                <div className={`sm:col-span-4 col-span-12 flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 ${selectedCategory === 'all' ? 'visible': 'hidden'}`}>
                    <img src="/images/tutorial/1.png" className="w-full rounded-48"  alt="tutorail" />
                    <div className="flex flex-col text-black">
                        <h4 className="text-xl">DESIGN SPECIFICATIONS</h4>
                        <p className="text-sm">Welcome, weâ€™re here to bring you a new standard in energy-efficient home solutions. </p>
                    </div>
                </div>
                <div className={`sm:col-span-4 col-span-12 flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 ${selectedCategory === 'all' || selectedCategory === 'blinds' ? 'visible': 'hidden'}`}>
                    <img src="/images/tutorial/1.png" className="w-full rounded-48"  alt="tutorail" />
                    <div className="flex flex-col text-black">
                        <h4 className="text-xl">DESIGN SPECIFICATIONS</h4>
                        <p className="text-sm">Welcome, weâ€™re here to bring you a new standard in energy-efficient home solutions. </p>
                    </div>
                </div>
                <div className={`sm:col-span-4 col-span-12 flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 ${selectedCategory === 'all' ? 'visible': 'hidden'}`}>
                    <img src="/images/tutorial/1.png" className="w-full rounded-48"  alt="tutorail" />
                    <div className="flex flex-col text-black">
                        <h4 className="text-xl">DESIGN SPECIFICATIONS</h4>
                        <p className="text-sm">Welcome, weâ€™re here to bring you a new standard in energy-efficient home solutions. </p>
                    </div>
                </div>
                <div className={`sm:col-span-4 col-span-12 flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 ${selectedCategory === 'all' || selectedCategory === 'blinds' ? 'visible': 'hidden'}`}>
                    <img src="/images/tutorial/1.png" className="w-full rounded-48"  alt="tutorail" />
                    <div className="flex flex-col text-black">
                        <h4 className="text-xl">DESIGN SPECIFICATIONS</h4>
                        <p className="text-sm">Welcome, weâ€™re here to bring you a new standard in energy-efficient home solutions. </p>
                    </div>
                </div>
                <div className={`sm:col-span-4 col-span-12 flex flex-col xl:gap-[0.833vw] sm:gap-[1.563vw] gap-4 ${selectedCategory === 'all' || selectedCategory === 'curatins' ? 'visible': 'hidden'}`}>
                    <img src="/images/tutorial/1.png" className="w-full rounded-48"  alt="tutorail" />
                    <div className="flex flex-col text-black">
                        <h4 className="text-xl">DESIGN SPECIFICATIONS</h4>
                        <p className="text-sm">Welcome, weâ€™re here to bring you a new standard in energy-efficient home solutions. </p>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default Tutorials;

