import * as React from "react";
import { useEffect, } from "react";
import { Icon } from '@iconify/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from '../../hooks/useLenis';
import BlogContent from "./blog-content";

function BlogDetail(props) {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const lenis = isDesktop ? useLenis() : null;

    useEffect(() => {
        if (!isDesktop) return;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.normalizeScroll(true);

        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
        }
    }, [lenis, isDesktop]);


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

    return (
        <div className="relative w-screen min-h-screen flex xl:flex-row flex-col items-start xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-0 sm:pt-0 pt-0 overflow-hidden" id="blogDetail">

            <div className="w-full flex flex-col xl:gap-[1.25vw] sm:p-6 sm:gap-[2.344vw] gap-4 text-black">
                <div className="w-full flex items-center justify-between">
                    <h3 className="text-xxxl uppercase font-black font-plus">{props.data.title}</h3>
                    <p className="text-sm text-primary">{toShortDate(props.data.date)}</p>
                </div>
                <BlogContent content={props.data.content} />
            </div>
            {props.blogList && (
                <div className="xl:w-[30.833vw] w-full flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-4 text-black xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48 shrink-0">
                    <h3 className="text-xxl uppercase font-black font-plus">Other Reads</h3>
                    {props.blogList.slice(0, 4).map((blog, index) => (
                        <React.Fragment key={index}>
                            <div className="flex items-center gap-2 shrink-0 text-mediumGrey">
                                <Icon icon="uil:plus" className="text-[18px]" />
                                <div className="w-full h-[1px] bg-mediumGrey"></div>
                                <Icon icon="uil:plus" className="text-[18px]" />
                            </div>
                            <a href={`/blogs/${blog.slug}`} className="flex items-center" key={index}>
                                <div className="w-full flex flex-col gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-2">
                                    <p className="text-sm ">{toShortDate(blog.date)}</p>
                                    <h6 className="text-md">{blog.title}</h6>
                                    <p className="text-sm line-clamp-3">{blog.description}</p>
                                </div>
                                <div className="xl:w-[11.979vw] xl:h-[10vw] sm:w-[230px] w-[150px] shrink-0 rounded-24 overflow-hidden">
                                    <img src={blog.image && `https://strapi.blindzy.com${blog.image[0]?.url}`} alt="" className="object-cover w-full h-full" />
                                </div>
                            </a>
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BlogDetail;

