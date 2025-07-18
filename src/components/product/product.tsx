import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import './css/style.css';

interface ProductsProps {
	// Add any props if needed in the future
}
function Products(props: ProductsProps) {
	const cardRefs: React.RefObject<HTMLDivElement>[] = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
	const bgImages = [
		"url('/images/product/product1.jpg')",
		"url('/images/product/product2.jpg')",
		"url('/images/product/product3.jpg')"
	];

	useEffect(() => {
		if (window.innerWidth > 640) {
			cardRefs.forEach((ref, idx) => {
				const el = ref.current;
				if (!el) return;
	
				const overlay = el.querySelector?.('.image-overlay') as HTMLDivElement | null;
				const svgWrapper = el.querySelector?.('.svg-wrapper');
				const h4 = el.querySelector?.('h4');
				const p = el.querySelector?.('p');
				const btn = el.querySelector?.('.cus-btn');
	
				// Set overlay image and styles once
				if (overlay) {
					overlay.style.backgroundImage = bgImages[idx];
					overlay.style.backgroundSize = 'cover';
					overlay.style.backgroundPosition = 'center';
					overlay.style.backgroundRepeat = 'no-repeat';
					overlay.style.opacity = '0';
				}
	
				const onEnter = () => {
					if (overlay) {
						gsap.to(overlay, { opacity: 1, duration: 0.6, ease: "power2.out" });
					}
					gsap.to([h4, p], { color: '#fff', duration: 0.4, ease: 'power2.out' });
					gsap.to(svgWrapper, { opacity: 0, duration: 0.3, ease: 'power2.out' });
					gsap.to(btn, {
						backgroundColor: '#fff',
						color: '#000',
						border: '1px solid #fff',
						duration: 0.4,
						ease: 'power2.out',
					});
				};
	
				const onLeave = () => {
					if (overlay) {
						gsap.to(overlay, { opacity: 0, duration: 0.6, ease: "power2.out" });
					}
					gsap.to([h4, p], { color: '#000', duration: 0.4, ease: 'power2.out' });
					gsap.to(svgWrapper, { opacity: 1, duration: 0.3, ease: 'power2.out' });
					gsap.to(btn, {
						backgroundColor: '#9F89E8',
						color: '#fff',
						border: 'none',
						duration: 1,
						ease: 'power2.out',
					});
				};
	
				el.addEventListener?.('mouseenter', onEnter);
				el.addEventListener?.('mouseleave', onLeave);
	
				// Clean up listeners
				return () => {
					el.removeEventListener?.('mouseenter', onEnter);
					el.removeEventListener?.('mouseleave', onLeave);
				};
			});
		}
	},	 [cardRefs]);

	return (
		<section className="product-section relative w-screen xl:h-screen flex items-center justify-center z-[10] xl:py-0 sm:py-[6.25vw] py-[64px]" id="product">
            <div className="w-full flex items-center xl:justify-center xl:gap-[1.25vw] sm:gap-[16px] gap-4 xl:px-[1.25vw] sm:px-4 px-2 xl:overflow-hidden overflow-auto scroll-hidden">
                <div ref={cardRefs[0]} onClick={() => window.location.href = "/shop"} className="card showroom-1 cursor-pointer xl:w-full sm:w-[60vw] w-[90vw] xl:h-[64vh] h-[50vh] xl:shrink shrink-0 flex flex-col gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 bg-white border border-[--Black] rounded-48 relative overflow-hidden">
                    <div className="image-overlay"></div>
                    <a href="/shop" className="w-fit ml-auto cus-btn small shrink-0">
                        Explore
                    </a>
                    <div className="svg-wrapper w-full h-full flex items-center justify-center">
                        <img src="/images/product/blinds.png" className="xl:w-[11.615vw] w-[40%]  object-scale-down" alt="Blinds" />
                    </div>
                    <div className="w-full flex flex-col gap-2 shrink-0">
                        <h4 className="text-xl text-black">Blinds</h4>
                        <div className="flex items-end gap-4">
                            <p className="text-sm text-black">Sleek and versatile, offering a simple and stylish way to control light and privacy in any room.</p>
                        </div>
                    </div>
                </div>
                <div ref={cardRefs[1]} onClick={() => window.location.href = "/shop"} className="card showroom-2 cursor-pointer xl:w-full sm:w-[60vw] w-[90vw] xl:h-[64vh] h-[50vh] xl:shrink shrink-0 flex flex-col gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 bg-white border border-[--Black] rounded-48 relative overflow-hidden">
                    <div className="image-overlay"></div>
                    <a href="/shop" className="w-fit ml-auto cus-btn small shrink-0">
                        Explore
                    </a>
                    <div className="svg-wrapper w-full h-full flex items-center justify-center">
                        <img src="/images/product/curtain.png" className="xl:w-[11.615vw] w-[40%] object-scale-down" alt="curtain" />
                    </div>
                    <div className="w-full flex flex-col gap-2 shrink-0">
                        <h4 className="text-xl text-black">Curtains</h4>
                        <div className="flex items-end gap-4">
                            <p className="text-sm text-black">Offering a classic and elegant way to enhance privacy, control light, and add style to any room.</p>
                        </div>
                    </div>
                </div>
                <div ref={cardRefs[2]} onClick={() => window.location.href = "/shop"} className="card showroom-3 cursor-pointer xl:w-full sm:w-[60vw] w-[90vw] xl:h-[64vh] h-[50vh] xl:shrink shrink-0 flex flex-col gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-4 bg-white border border-[--Black] rounded-48 relative overflow-hidden">
                    <div className="image-overlay"></div>
                    <a href="/shop" className="w-fit ml-auto cus-btn small shrink-0">
                        Explore
                    </a>
                    <div className="svg-wrapper w-full h-full flex items-center justify-center">
                        <img src="/images/product/shutters.png" className="xl:w-[11.615vw] w-[40%] object-scale-down" alt="Shutters" />
                    </div>
                    <div className="w-full flex flex-col gap-2 shrink-0">
                        <h4 className="text-xl text-black">Shutters</h4>
                        <div className="flex items-end gap-4">
                            <p className="text-sm text-black">Plantation shutters are durable, louvered window coverings, designed to provide excellent light control, privacy, and a timeless, sophisticated look for any space.</p>
                        </div>
                    </div>
                </div>
            </div>
		</section>
	);
}

export default Products;

