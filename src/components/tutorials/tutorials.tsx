import * as React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Plus } from 'lucide-react';

function Tutorials(props) {
	const [type, setType] = useState(1);
    const [show, setShow] = useState(true);
    const [filteredData, setFilteredData] = useState(props.data || []);
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

    const changeCategory = (newStep) => {
        setShow(false);
        setTimeout(() => {
            setShow(true);
            setType(newStep);
        }, 300);
    };
     
    useEffect(() => {
        filterData();
    }, [type, props.data]);


    const filterData = () => {
        let filtered = props.data || [];

        switch (type) {
            case 2: // Blinds
            filtered = filtered.filter(item => item.category?.toLowerCase() === "blinds");
            break;
            case 3: // Curtains
            filtered = filtered.filter(item => item.category?.toLowerCase() === "curtains");
            break;
            case 4: // Shutters
            filtered = filtered.filter(item => item.category?.toLowerCase() === "shutters");
            break;
            default: // all
            break;
        }

        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setFilteredData(filtered);
    };
    

	return (
        <div className="relative w-screen min-h-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw gap-4 xl:p-[1.25vw] sm:p-[2.344vw p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="tutorials">
            <div className="w-full border border-[--Black] p-4 text-center rounded-48">
                <h1 className="text-1xl text-[--Black] uppercase">Tutorials</h1>
            </div>
            <div className="flex items-center justify-center xl:gap-[1.25vw] sm:gap-[2.344vw gap-4">
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${type === 1 ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => changeCategory(1)}
                >
                    All
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${type === 2 ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => changeCategory(2)}
                >
                    Blinds
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${type === 3 ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => changeCategory(3)}
                >
                    Curtains
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${type === 4 ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => changeCategory(4)}
                >
                    Shutters
                </button>
            </div>
            <div className="w-full flex items-center gap-2 shrink-0">
                <Plus className="size-[18px] text-[--Black]" />
                <div className="w-full border-b border-[--Black]"></div>
                <Plus className="size-[18px] text-[--Black]" />
            </div>
            <div className={`w-full grid items-stretch grid-cols-12 xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2 ${show ? 'fade-in' : 'fade-out'}`}>
                {filteredData.map((card, idx) => (
                    <div
                        key={idx}
                        className={`xl:col-span-4 sm:col-span-6 col-span-6 flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2 `}
                    >
                        <div className="w-full xl:h-[24.271vw] sm:h-[45.508vw] bg-[--lightGrey] overflow-hidden rounded-48">
                            <video src={card.video && `https://strapi.blindzy.com${card.video[0]?.url}`} className="w-full h-full object-cover" controls></video>
                        </div>
                        <div className="flex flex-col text-[--Black]">
                            <h4 className="xl:text-[1.875vw] sm:text-[3.516vw] text-[3.721vw] sm:font-extrabold font-bold font-plus leading-tight">{card.title}</h4>
                            <p className="text-sm">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
	);
}

export default Tutorials;

