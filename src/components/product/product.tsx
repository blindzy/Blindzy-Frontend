import React from "react";
import { productsData } from "@data/site-content";

function Products() {
    return (
        <section className="product-section relative w-screen xl:h-screen flex items-center justify-center z-[10] xl:py-0 sm:py-[6.25vw] py-[64px]" id="products">
            <div className="w-full flex items-center xl:justify-center xl:gap-[1.25vw] sm:gap-[16px] gap-4 xl:px-[1.25vw] sm:px-6 px-2 xl:overflow-hidden overflow-auto scroll-hidden">
                {productsData.map((product, index) => (
                    <a
                        key={index}
                        href={product.link}
                        className="relative group transition xl:w-full sm:w-[60vw] w-[90vw] xl:h-[64vh] h-[50vh] xl:shrink shrink-0 flex flex-col gap-4 xl:p-[1.25vw] sm:p-[2.344vw] p-6 text-[--black] hover:text-[--black] bg-white border border-[--Black] rounded-48 overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url('${product.backgroundImage}')` }}
                        />
                        <span className="relative z-10 w-fit ml-auto py-3 px-6 bg-[--primary] text-md text-[--white] transition group-hover:text-[--black] group-hover:bg-[--white] rounded-full shrink-0">
                            Explore
                        </span>
                        <div className="w-full h-full flex items-center justify-center transition group-hover:opacity-0">
                            <img
                                src={product.image}
                                className="xl:w-[11.615vw] w-[40%] object-scale-down"
                                alt={product.name}
                            />
                        </div>
                        <div className={`relative z-10 w-full flex flex-col gap-2 shrink-0 transition text-[--black] group-hover:text-[--white]`}>
                            <h4 className="xl:text-[1.875vw] sm:text-[3.516vw] text-[6.512vw] font-extrabold font-plus leading-tight">{product.name}</h4>
                            <p className="text-sm">
                                {product.description}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

export default Products;

