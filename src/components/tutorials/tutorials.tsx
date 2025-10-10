import * as React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Plus } from 'lucide-react';

function Tutorials() {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1150;
	const lenis = isDesktop ? useLenis() : null;

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		if(window.innerWidth  > 1150){
			ScrollTrigger.normalizeScroll(true);
		}

		if (lenis) {
			lenis.on('scroll', ScrollTrigger.update);
		}

	}, [lenis]);
    

	return (
        <div className="relative w-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw gap-4 xl:p-[1.25vw] sm:p-[2.344vw p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="tutorials">
            <div className="w-full border border-[--Black] p-4 text-center rounded-48">
                <h1 className="text-1xl text-[--Black] uppercase">Tutorials</h1>
            </div>
            <div className="flex items-center justify-center xl:gap-[1.25vw] sm:gap-[2.344vw gap-4">
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${selectedCategory === 'all' ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    All
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${selectedCategory === 'blinds' ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => setSelectedCategory('blinds')}
                >
                    Blinds
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${selectedCategory === 'curatins' ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => setSelectedCategory('curatins')}
                >
                    Curatins
                </button>
            </div>
            <div className="w-full flex items-center gap-2 shrink-0">
                <Plus className="size-[18px] text-[--Black]" />
                <div className="w-full border-b border-[--Black]"></div>
                <Plus className="size-[18px] text-[--Black]" />
            </div>
            <div className="w-full grid items-stretch grid-cols-12 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2">
                {[
                    { category: ['all'], img: '/images/tutorial/1.png', title: 'DESIGN SPECIFICATIONS', desc: 'Welcome, we’re here to bring you a new standard in energy-efficient home solutions.' },
                    { category: ['all'], img: '/images/tutorial/1.png', title: 'DESIGN SPECIFICATIONS', desc: 'Welcome, we’re here to bring you a new standard in energy-efficient home solutions.' },
                    { category: ['all', 'blinds'], img: '/images/tutorial/1.png', title: 'DESIGN SPECIFICATIONS', desc: 'Welcome, we’re here to bring you a new standard in energy-efficient home solutions.' },
                    { category: ['all'], img: '/images/tutorial/1.png', title: 'DESIGN SPECIFICATIONS', desc: 'Welcome, we’re here to bring you a new standard in energy-efficient home solutions.' },
                    { category: ['all', 'blinds'], img: '/images/tutorial/1.png', title: 'DESIGN SPECIFICATIONS', desc: 'Welcome, we’re here to bring you a new standard in energy-efficient home solutions.' },
                    { category: ['all', 'curatins'], img: '/images/tutorial/1.png', title: 'DESIGN SPECIFICATIONS', desc: 'Welcome, we’re here to bring you a new standard in energy-efficient home solutions.' },
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className={`xl:col-span-4 sm:col-span-6 col-span-6 flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2 ${card.category.includes(selectedCategory) ? 'visible' : 'hidden'}`}
                    >
                        <div className="w-full xl:h-[24.271vw] sm:h-[45.508vw] overflow-hidden rounded-48">
                            <img src={card.img} className="w-full h-full object-cover" alt="tutorial" />
                        </div>
                        <div className="flex flex-col text-[--Black]">
                            <h4 className="xl:text-[1.875vw] sm:text-[3.516vw] text-[3.721vw] sm:font-extrabold font-bold font-plus leading-tight">{card.title}</h4>
                            <p className="text-sm">{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
	);
}

export default Tutorials;

