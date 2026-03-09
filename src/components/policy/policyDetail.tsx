import * as React from "react";
import { useEffect, useState } from "react";
import Content from "@components/blog/blog-content";


export default function PolicyDetail(props) {
    const [virtual, setVirtual] = useState(true);

    useEffect(() => {
        if (window.innerWidth > 1150) {
            setVirtual(true);
        }else{
            setVirtual(false);
        }
    }, []);
    const apiUrl = 'https://strapi.blindzy.com';
    return (
        <section className="w-screen min-h-screen xl:pt-[2.5vw] sm:pt-[14.648vw] pt-[114px] xl:p-[1.25vw] sm:p-[2.344vw] xl:pb-[4.167vw] sm:pb-[7.813vw] pb-[10.178vw] overflow-hidden" >
            <div className="w-full flex flex-col xl:gap-[1.25vw] gap-[6.107vw] sm:gap-[2.344vw] xl:p-[1.25vw] sm:p-[2.344vw] p-3">
                <h2 className="w-full text-1xl" 
                    data-sal="slide-up" data-sal-delay="50" data-sal-easing="ease-out-back" data-sal-duration="1000"
                >
                    {props.data&& props.data.title}
                </h2>
                <div className="blog-content flex flex-col xl:gap-[1.25vw] sm:gap-[2.344vw] gap-2"
                    // data-sal="fade" data-sal-delay="0" data-sal-easing="ease-out-back" data-sal-duration="1000"
                >
                    <Content content={props.data&& props.data.content}/>
                </div>
            </div>
        </section>
    );
}