import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import './css/style.css';

interface ProductsProps {
	// Add any props if needed in the future
}
function Products(props: ProductsProps) {
	return (
		<section className="product-section relative w-screen xl:h-screen flex items-center justify-center z-[10] xl:py-0 sm:py-[6.25vw] py-[64px]" id="product">
            <div className="w-full flex items-center xl:justify-center xl:gap-[1.25vw] sm:gap-[16px] gap-4 xl:px-[1.25vw] sm:px-6 px-2 xl:overflow-hidden overflow-auto scroll-hidden">
                <div onClick={() => window.location.href = "/shop"} className="card showroom-1 cursor-pointer xl:w-full sm:w-[60vw] w-[90vw] xl:h-[64vh] h-[50vh] xl:shrink shrink-0 flex flex-col gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 bg-white border border-[--Black]  rounded-48 relative overflow-hidden group">
                    <div className="card-image" style={{backgroundImage: "url('/images/product/product1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'absolute', inset: 0, zIndex: 1}}></div>
                    <a href="/shop" className="w-fit ml-auto cus-btn small shrink-0">
                        Explore
                    </a>
                    <div className="svg-wrapper w-full h-full flex items-center justify-center">
                        <img src="/images/product/blinds.png" className="xl:w-[11.615vw] w-[40%]  object-scale-down" alt="Blinds" />
                    </div>
                    <div className="w-full flex flex-col gap-2 shrink-0">
                        <h4 className="text-xl text-black group-hover:text-shadow-lg">Blinds</h4>
                        <div className="flex items-end gap-4">
                            <p className="text-sm text-black group-hover:text-shadow-lg">Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.</p>
                        </div>
                    </div>
                </div>
                <div onClick={() => window.location.href = "/shop"} className="card showroom-2 cursor-pointer xl:w-full sm:w-[60vw] w-[90vw] xl:h-[64vh] h-[50vh] xl:shrink shrink-0 flex flex-col gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 bg-white border border-[--Black] rounded-48 relative overflow-hidden group">
                    <div className="card-image" style={{backgroundImage: "url('/images/product/product2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'absolute', inset: 0, zIndex: 1}}></div>
                    <a href="/shop" className="w-fit ml-auto cus-btn small shrink-0">
                        Explore
                    </a>
                    <div className="svg-wrapper w-full h-full flex items-center justify-center">
                        <img src="/images/product/curtain.png" className="xl:w-[11.615vw] w-[40%] object-scale-down" alt="curtain" />
                    </div>
                    <div className="w-full flex flex-col gap-2 shrink-0">
                        <h4 className="text-xl text-black group-hover:text-shadow-lg">Curtains</h4>
                        <div className="flex items-end gap-4">
                            <p className="text-sm text-black group-hover:text-shadow-lg">Offering a classic and elegant way to enhance privacy, control light, and add style to any room.</p>
                        </div>
                    </div>
                </div>
                <div onClick={() => window.location.href = "/shop"} className="card showroom-3 cursor-pointer xl:w-full sm:w-[60vw] w-[90vw] xl:h-[64vh] h-[50vh] xl:shrink shrink-0 flex flex-col gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 bg-white border border-[--Black] rounded-48 relative overflow-hidden group">
                    <div className="card-image" style={{backgroundImage: "url('/images/product/product3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'absolute', inset: 0, zIndex: 1}}></div>
                    <a href="/shop" className="w-fit ml-auto cus-btn small shrink-0">
                        Explore
                    </a>
                    <div className="svg-wrapper w-full h-full flex items-center justify-center">
                        <img src="/images/product/shutters.png" className="xl:w-[11.615vw] w-[40%] object-scale-down" alt="Shutters" />
                    </div>
                    <div className="w-full flex flex-col gap-2 shrink-0">
                        <h4 className="text-xl text-black group-hover:text-shadow-lg">Shutters</h4>
                        <div className="flex items-end gap-4">
                            <p className="text-sm text-black group-hover:text-shadow-lg">Plantation shutters are durable, louvered window coverings, designed to provide excellent light control, privacy, and a timeless, sophisticated look for any space.</p>
                        </div>
                    </div>
                </div>
            </div>
		</section>
	);
}

export default Products;

