import * as React from "react";
import { useEffect, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import { Plus } from 'lucide-react';
import { Button } from "@lib/components/ui/button";
// import ReactMarkdown from 'react-markdown';

// Define the blog item interface
interface BlogItem {
    id: number;
    title: string;
    date: string;
    description: string;
    image: string;
    category: string;
    href: string;
}

function Blog(props) {
    const [type, setType] = useState(1);
    const [show, setShow] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(props.data || []);
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1150;
    const lenis = isDesktop ? useLenis() : null;

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);
    //     if (window.innerWidth > 1150) {
    //         ScrollTrigger.normalizeScroll(true);
    //     }

    //     // If using Lenis, connect it with GSAP
    //     if (lenis) {
    //         lenis.on('scroll', ScrollTrigger.update);
    //     }

    // }, [lenis]);

    useEffect(() => {
        filterData();
    }, [type, searchTerm, props.data]);

    const changeStep = (newStep) => {
        setShow(false);
        setTimeout(() => {
            setShow(true);
            setType(newStep);
        }, 300);
    };

    function toShortDate(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        if (isNaN(date)) {
            return "Invalid Date";
        }

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = months[date.getMonth()];
        let day = date.getDate();
        let year = date.getFullYear();

        return `${day} ${month}, ${year}`;
    }

    const filterData = () => {
        let filtered = props.data || [];

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

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
        <div className="relative w-screen flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw gap-4 xl:p-[1.25vw] sm:p-[2.344vw p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="blog">
            <div className="w-full border border-[--Black] p-4 text-center rounded-48">
                <h1 className="text-1xl text-black uppercase">BLOGS</h1>
            </div>
            <div className="flex items-center justify-center xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4">
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${type === 1 ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => changeStep(1)}
                >
                    All
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${type === 2 ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => changeStep(2)}
                >
                    Blinds
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${type === 3 ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => changeStep(3)}
                >
                    Curtains
                </button>
                <button
                    className={`w-fit py-4 px-6 text-sm transition rounded-full ${type === 4 ? 'text-[--white] bg-[--primary]' : 'text-[--black] bg-transparent'}`}
                    onClick={() => changeStep(4)}
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
                {filteredData.map((item, index) => (
                    <a
                        key={index}
                        href={`/blogs/${item.slug}`}
                        className="sm:col-span-6 col-span-12 flex xl:items-stretch items-center xl:gap-0 gap-4 border border-[--Black] rounded-32 overflow-hidden transition xl:p-0 sm:p-4 p-3"
                    >
                        <div className="w-full flex flex-col gap-6 justify-between text-[--Black] xl:p-[1.25vw]">
                            <div className="flex flex-col gap-2">
                                <div className="w-full flex xl:flex-row flex-col xl:items-center justify-between">
                                    <h6 className="text-md">{item.title}</h6>
                                    <p className="text-sm shrink-0">{toShortDate(item.date)}</p>
                                </div>
                                <div className="text-sm line-clamp-3">
                                    {item.description}
                                </div>
                            </div>
                            <Button variant="primary" size={'large'} className="hidden xl:flex w-fit">
                                Read More
                            </Button>
                        </div>
                        <div className="size-[34.884vw] sm:size-[17.578vw] xl:w-[23.438vw] xl:h-[17.188vw] shrink-0 rounded-32 overflow-hidden">
                            <img src={item.image && `https://strapi.blindzy.com${item.image[0]?.url}`} className="w-full h-full object-cover" alt={item.title} loading="lazy" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Blog;
