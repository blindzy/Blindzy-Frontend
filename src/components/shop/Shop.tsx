import React, { useState } from "react";
import ProductComponent from './product';
import Instruction from './instruction';
import Measurement from './measurement';

function Shop({ data, groupData, tags, type, customizePage }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [products] = useState(data);
    const [loading] = useState(false);
    const [error] = useState('');
    const [calculating, setCalculating] = useState(false);

    const widthValues = groupData?.Width_values || [];
    const dropValues = groupData?.Drop_values || [];

    const ranges = React.useMemo(() => ({
        widthMin: Math.min(...widthValues),
        widthMax: Math.max(...widthValues),
        heightMin: Math.min(...dropValues),
        heightMax: Math.max(...dropValues),
    }), [widthValues, dropValues]);

    const [measurements, setMeasurements] = useState({
        roomName: '',
        width: ranges.widthMin,
        height: ranges.heightMin
    });
    const [appliedMeasurements, setAppliedMeasurements] = useState(measurements);

    const handleCalculate = React.useCallback(() => {
        setCalculating(true);
        setAppliedMeasurements(measurements);
        setTimeout(() => {
            setCalculating(false);
        }, 1000);
    }, [measurements]);

    const filteredProducts = React.useMemo(() => {
        return products.filter(product =>
            selectedCategory === 'all' ||
            (product.tags && product.tags.some(tag => tag.value.toLowerCase() === selectedCategory))
        );
    }, [products, selectedCategory]);

    return (
        <section className="shop-section w-full min-h-screen flex flex-col xl:flex-row items-start gap-4 sm:gap-6 xl:gap-[1.25vw] p-2 sm:p-6 xl:p-[1.25vw]" id="shop">
            <div className="w-full xl:w-[23.438vw] flex flex-col xl:gap-6 text-[--Black] shrink-0">
                <Measurement
                    handleCalculate={handleCalculate}
                    calculating={calculating}
                    measurements={measurements}
                    setMeasurements={setMeasurements}
                    widthMin={ranges.widthMin}
                    widthMax={ranges.widthMax}
                    heightMin={ranges.heightMin}
                    heightMax={ranges.heightMax}
                />
                <div className="hidden xl:flex flex-col gap-2">
                    <Instruction />
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 sm:gap-6 xl:gap-[1.25vw]">
                {tags.length > 0 && type !== 'double' && (
                    <div className="w-full p-4 sm:py-[1.563vw] xl:py-[0.833vw] sm:px-[2.344vw] xl:p-[1.25vw] flex flex-col md:flex-row items-center justify-between gap-4 border border-[--Black] sm:rounded-full rounded-[32px]">
                        <h6 className="text-md sm:block hidden text-black"></h6>
                        <div className="relative flex sm:w-fit w-full shrink-0">
                            <span
                                className={`absolute top-0 transition h-full bg-[--primary] rounded-full`}
                                style={{
                                    width: `${100 / (tags.length + 1)}%`,
                                    left: selectedCategory === 'all'
                                        ? '0'
                                        : `${(tags.findIndex(tag => tag.toLowerCase() === selectedCategory) + 1) * (100 / (tags.length + 1))}%`
                                }}
                            />
                            <button
                                className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === 'all' ? 'text-[--white]' : ''}`}
                                onClick={() => setSelectedCategory('all')}
                            >
                                All Products
                            </button>
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    className={`relative z-[1] w-full sm:w-[14.648vw] xl:w-[9vw] text-sm py-3 px-1 xl:p-[0.833vw] text-center bg-transparent border-none outline-none shadow-none transition ${selectedCategory === tag.toLowerCase() ? 'text-[--white]' : ''}`}
                                    onClick={() => setSelectedCategory(tag.toLowerCase())}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid items-stretch grid-cols-12 gap-4 sm:gap-6 xl:gap-[1.25vw]">
                    {loading && <div className="col-span-12 text-center py-8">Loading products...</div>}
                    {error && <div className="col-span-12 text-center py-8 text-red-500">{error}</div>}
                    {!loading && !error && filteredProducts.map((product: any) => (
                        <ProductComponent
                            key={product.id}
                            groupData={groupData}
                            measurements={appliedMeasurements}
                            data={product}
                            customizePage={customizePage}
                        />
                    ))}
                </div>

                <div className="xl:hidden flex flex-col gap-2">
                    <Instruction />
                </div>
            </div>
        </section>
    );
}

export default Shop;
