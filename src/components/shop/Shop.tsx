import React, { useEffect, useState } from "react";
// import type { Product } from '../../services/api';
import { Button } from "@lib/components/ui/button";
import { Label } from "@lib/components/ui/label";
import ProductComponent from './product';
import Instruction from './instruction';






function Shop(props) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [products, setProducts] = useState(props.data);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dimensions, setDimensions] = useState({ width: '', height: '' });
    const [calculating, setCalculating] = useState(false);
    const [size, setSize] = useState(1);


    const handleCalculate = () => {
        const sqMeter = parseFloat(dimensions.width) * parseFloat(dimensions.height);
        console.log(sqMeter)
        setSize(sqMeter);
    };


    return (
        <section className="shop-section w-full min-h-screen flex flex-col xl:flex-row items-start gap-4 sm:gap-6 xl:gap-[1.25vw] p-2 sm:p-6 xl:p-[1.25vw]" id="shop">
            <div className="w-full xl:w-[23.438vw] flex flex-col xl:gap-6 text-[--Black] shrink-0">
                <div className="w-full flex flex-col gap-4 p-6 sm:p-6 xl:p-[1.25vw] border border-[--Black] rounded-48">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg uppercase">GET AN INSTANT PRICE</h5>
                        <p className="text-sm xl:w-[90%]">Enter window size for real-time pricing. Fine-tune later.</p>
                    </div>
                    <div className="w-full flex items-center gap-2 py-2 px-3 border border-[--Black] rounded-full">
                        <Label htmlFor="Width" className="shrink-0">Width: <span className="text-xs">(m)</span></Label>
                        <input
                            type="number"
                            id="Width"
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                            value={dimensions.width}
                            onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                        />
                    </div>
                    <div className="w-full flex items-center gap-2 py-2 px-3 border border-[--Black] rounded-full">
                        <Label htmlFor="Height" className="shrink-0">Height: <span className="text-xs">(m)</span></Label>
                        <input
                            type="number"
                            id="Height"
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                            value={dimensions.height}
                            onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                        />
                    </div>
                    <Button
                        variant={'primary'}
                        size={'small'}
                        className="w-full"
                        onClick={handleCalculate}
                        disabled={!dimensions.width || !dimensions.height || calculating}
                    >
                        {calculating ? 'Calculating...' : 'Calculate'}
                    </Button>
                </div>
                {/* Sidebar info cards (large screens only) */}
                <div className="hidden xl:flex flex-col gap-2">
                    <Instruction />
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 sm:gap-6 xl:gap-[1.25vw]">
                <div className="w-full p-4 sm:py-[1.563vw] xl:py-[0.833vw] sm:px-[2.344vw] xl:p-[1.25vw] flex flex-col md:flex-row items-center justify-between gap-4 border border-[--Black] sm:rounded-full rounded-[32px]">
                    <h6 className="text-md sm:block hidden text-black"></h6>
                    <div className="relative flex sm:w-fit w-full shrink-0 ">
                        <span className={`absolute left-0 top-0 transition w-[25%] sm:w-[14.648vw] xl:w-[9vw] h-full bg-[--primary] rounded-full
							${selectedCategory === 'all' ? 'left-0' : selectedCategory === 'blockout' ? 'left-[25%]' : selectedCategory === 'light-filtering' ? 'left-[50%]' : selectedCategory === 'sunscreen' ? 'left-[75%]' : ''}
						`} />
                        <button className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === 'all' ? 'text-[--white]' : ''}`}
                            onClick={() => setSelectedCategory('all')}>
                            All Products
                        </button>
                        <button className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === 'blockout' ? 'text-[--white]' : ''}`}
                            onClick={() => setSelectedCategory('blockout')}>
                            Blockout
                        </button>
                        <button className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === 'light-filtering' ? 'text-[--white]' : ''}`}
                            onClick={() => setSelectedCategory('light-filtering')}>
                            Light Filtering
                        </button>
                        <button className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === 'sunscreen' ? 'text-[--white]' : ''}`}
                            onClick={() => setSelectedCategory('sunscreen')}>
                            Sunscreen
                        </button>
                    </div>
                </div>
                <div className="grid items-stretch grid-cols-12 gap-4 sm:gap-6 xl:gap-[1.25vw]">
                    {/*PRODUCT CARDS  */}
                    {loading && <div className="col-span-12 text-center py-8">Loading products...</div>}
                    {error && <div className="col-span-12 text-center py-8 text-red-500">{error}</div>}
                    {!loading && !error && products
                        .filter(product => 
                            selectedCategory === 'all' || 
                            (product.tags && product.tags.includes(selectedCategory))
                        )
                        .map((product) => (
                            <ProductComponent key={product.id} data={product} size={size} customizePage={props.customizePage} />
                        ))
                    }
                </div>
                <div className="xl:hidden flex flex-col gap-2">
                    <Instruction />
                </div>
            </div>
        </section>
    );
}

export default Shop;

