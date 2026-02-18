import React, { useEffect, useState, useMemo } from "react";
import { Icon } from '@iconify/react';
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';


function Showroom(props) {
    const [type, setType] = useState(1);
    const [show, setShow] = useState(true);
    const [filteredData, setFilteredData] = useState(props.data || []);
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1150;
    const lenis = isDesktop ? useLenis() : null;

    // useEffect(() => {
    // 	gsap.registerPlugin(ScrollTrigger);
    // 	if(window.innerWidth  > 1150){
    // 		ScrollTrigger.normalizeScroll(true);
    // 	}

    // 	if (lenis) {
    // 		lenis.on('scroll', ScrollTrigger.update);
    // 	}

    // }, [lenis]);

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
        <div className="relative w-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-2 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="showroom">
            <div className="w-full border border-[--Black] p-4 text-center xl:rounded-[2.5vw] sm:rounded-[4.688vw] rounded-[15px]">
                <h1 className="text-1xl text-black uppercase">Showroom</h1>
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
            <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                <Icon icon="uil:plus" className="text-[18px]" />
                <div className="w-full h-[1px] bg-mediumGrey"></div>
                <Icon icon="uil:plus" className="text-[18px]" />
            </div>
            <div className={`relative grid items-stretch grid-cols-12 xl:gap-[0.833vw] sm:gap-[1.563vw] gap-3 ${show ? 'fade-in' : 'fade-out'}`}>
                {filteredData.map((item, index) => (
                    <div
                        key={item.id}
                        className="sm:col-span-4 col-span-6 rounded-48 overflow-hidden"
                    >
                        <img
                            src={item.image && `https://strapi.blindzy.com${item.image.url}`}
                            className="w-full object-cover"
                            alt={`showroom-${item.id}`}
                            loading="lazy"
                        />
                    </div>
                ))}
                {/* Loading overlay */}
                {/* {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-primary">Loading...</span>
                        </div>
                    </div>
                )} */}
            </div>
            {/* {paginationData.totalPages > 1 && (
                <ul className="navigation">
                    <li 
                        onClick={handlePreviousPage} 
                        style={{ 
                            cursor: currentPage > 1 && !isLoading ? 'pointer' : 'not-allowed', 
                            opacity: currentPage > 1 && !isLoading ? 1 : 0.5 
                        }}
                        className={currentPage > 1 && !isLoading ? 'hover:bg-primary hover:text-white' : ''}
                    >
                        <Icon icon="majesticons:arrow-left-line" />
                    </li>
                    {Array.from({ length: paginationData.totalPages }, (_, i) => i + 1).map((page) => (
                        <li 
                            key={page}
                            className={`${currentPage === page ? 'active' : ''} ${!isLoading ? 'hover:bg-primary hover:text-white' : ''}`}
                            onClick={() => handlePageChange(page)}
                            style={{ cursor: !isLoading ? 'pointer' : 'not-allowed' }}
                        >
                            {page}
                        </li>
                    ))}
                    <li 
                        onClick={handleNextPage} 
                        style={{ 
                            cursor: currentPage < paginationData.totalPages && !isLoading ? 'pointer' : 'not-allowed', 
                            opacity: currentPage < paginationData.totalPages && !isLoading ? 1 : 0.5 
                        }}
                        className={currentPage < paginationData.totalPages && !isLoading ? 'hover:bg-primary hover:text-white' : ''}
                    >
                        <Icon icon="majesticons:arrow-right-line" />
                    </li>
                </ul>
            )} */}
        </div>
    );
}

export default Showroom;

