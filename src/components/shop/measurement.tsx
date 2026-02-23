import React from "react";
import { Label } from "@lib/components/ui/label";
import { Button } from "@lib/components/ui/button";

function Measurement({ handleCalculate, calculating, measurements, setMeasurements, widthMin, widthMax, heightMin, heightMax }) {
    const WIDTH_MIN = widthMin;
    const WIDTH_MAX = widthMax;
    const HEIGHT_MIN = heightMin;
    const HEIGHT_MAX = heightMax;

    const widthNum = measurements.width === '' ? NaN : Number(measurements.width);
    const heightNum = measurements.height === '' ? NaN : Number(measurements.height);

    const widthInvalid = !Number.isNaN(widthNum) && (widthNum < WIDTH_MIN || widthNum > WIDTH_MAX);
    const heightInvalid = !Number.isNaN(heightNum) && (heightNum < HEIGHT_MIN || heightNum > HEIGHT_MAX);
    return (
        <div className="w-full flex flex-col gap-4 p-6 sm:p-6 xl:p-[1.25vw] border border-[--Black] rounded-48">
            <div className="flex flex-col gap-2">
                <h5 className="text-lg uppercase">GET AN INSTANT PRICE</h5>
                <p className="text-sm xl:w-[90%]">Enter window size for real-time pricing. Fine-tune later.</p>
            </div>
            <div className="w-full flex items-center gap-2 py-2 px-3 border border-[--Black] rounded-full">
                <Label htmlFor="Width" className="shrink-0">Width: <span className="text-xs">(m)</span></Label>
                <input
                    type="number"
                    id="width"
                    min={WIDTH_MIN}
                    max={WIDTH_MAX}
                    value={measurements.width}
                    onChange={(e) => {
                        const raw = e.target.value;
                        const newValue = raw === '' ? '' : Number(raw);
                        setMeasurements(prev => ({ ...prev, width: newValue }));
                    }}
                    className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                />
            </div>
            <p className="text-xs text-[--mediumGrey] mt-1">Min: {WIDTH_MIN}mm / Max: {WIDTH_MAX}mm</p>
            <div className="w-full flex items-center gap-2 py-2 px-3 border border-[--Black] rounded-full">
                <Label htmlFor="Height" className="shrink-0">Height: <span className="text-xs">(m)</span></Label>
                <input
                    type="number"
                    id="height"
                    min={HEIGHT_MIN}
                    max={HEIGHT_MAX}
                    value={measurements.height}
                    onChange={(e) => {
                        const raw = e.target.value;
                        const newValue = raw === '' ? '' : Number(raw);
                        setMeasurements(prev => ({ ...prev, height: newValue }));
                    }}
                    className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                />
            </div>
            <p className="text-xs text-[--mediumGrey] mt-1">Min: {HEIGHT_MIN}mm / Max: {HEIGHT_MAX}mm</p>
            <Button
                variant={'primary'}
                size={'small'}
                className="w-full"
                onClick={handleCalculate}
                disabled={!measurements.width || !measurements.height || calculating}
            >
                {calculating ? 'Calculating...' : 'Calculate'}
            </Button>
            {/* Inline validation message below the inputs */}
            {(widthInvalid || heightInvalid) && (
                <div className="w-full  p-3 rounded-[16px] border border-red-400 bg-red-50 text-red-600 text-sm flex items-start gap-2">
                    <span className="font-bold">⚠</span>
                    <div className="w-full flex items-center gap-6">
                        {widthInvalid && <div>Width should be between {WIDTH_MIN} and {WIDTH_MAX} mm.</div>}
                        {heightInvalid && <div>Drop should be between {HEIGHT_MIN} and {HEIGHT_MAX} mm.</div>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Measurement;

