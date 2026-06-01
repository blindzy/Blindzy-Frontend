import React from "react";
import { Label } from "@lib/components/ui/label";
function Measurement({ measurements, setMeasurements,widthMin,widthMax,heightMin,heightMax }) {
    const WIDTH_MIN = widthMin;
    const WIDTH_MAX = widthMax;
    const HEIGHT_MIN = heightMin;
    const HEIGHT_MAX = heightMax;

    const widthNum = measurements.width === '' ? NaN : Number(measurements.width);
    const heightNum = measurements.height === '' ? NaN : Number(measurements.height);

    const widthInvalid = !Number.isNaN(widthNum) && (widthNum < WIDTH_MIN || widthNum > WIDTH_MAX);
    const heightInvalid = !Number.isNaN(heightNum) && (heightNum < HEIGHT_MIN || heightNum > HEIGHT_MAX);
    return (
        <div className="grid grid-cols-12 items-start sm:gap-4 gap-x-2 gap-y-4">
            <div className="sm:col-span-4 col-span-12 flex items-center gap-2 p-2 sm:py-4 xl:py-[0.833vw] px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                <Label htmlFor="roomName" className="text-sm normal shrink-0">Room Name:</Label>
                <input 
                    type="text" 
                    id="roomName" 
                    value={measurements.roomName}
                    onChange={(e) => setMeasurements(prev => ({...prev, roomName: e.target.value}))}
                    className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                />
            </div>
            <div className="sm:col-span-4 col-span-6 flex flex-col gap-2">
                <div className="w-full flex items-center gap-2 p-2 sm:py-4 xl:py-[0.833vw] px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                    <Label htmlFor="width" className="text-sm normal shrink-0">Width: <span className="text-xs">(mm)</span></Label>
                    <input 
                        type="number" 
                        id="width" 
                        min={WIDTH_MIN}
                        max={WIDTH_MAX}
                        value={measurements.width}
                        onChange={(e) => {
                            const raw = e.target.value;
                            const newValue = raw === '' ? '' : Number(raw);
                            setMeasurements(prev => ({...prev, width: newValue}));
                        }}
                        className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                    />
                </div>
                <p className="text-xs text-[--mediumGrey] mt-1">Min: {WIDTH_MIN}mm / Max: {WIDTH_MAX}mm</p>
            </div>
            <div className="sm:col-span-4 col-span-6 flex flex-col gap-2">
                <div className="w-full flex items-center gap-2 p-2 sm:py-4 xl:py-[0.833vw] px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                    <Label htmlFor="height" className="text-sm normal shrink-0">Height: <span className="text-xs">(mm)</span></Label>
                    <input 
                        type="number" 
                        id="height" 
                        min={HEIGHT_MIN}
                        max={HEIGHT_MAX}
                        value={measurements.height}
                        onChange={(e) => {
                            const raw = e.target.value;
                            const newValue = raw === '' ? '' : Number(raw);
                            setMeasurements(prev => ({...prev, height: newValue}));
                        }}
                        className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                    />
                </div>
                <p className="text-xs text-[--mediumGrey] mt-1">Min: {HEIGHT_MIN}mm / Max: {HEIGHT_MAX}mm</p>
            </div>
            {/* Inline validation message below the inputs */}
            {(widthInvalid || heightInvalid) && (
                <div className="col-span-12 p-3 rounded-[16px] border border-red-400 bg-red-50 text-red-600 text-sm flex items-start gap-2">
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

export default React.memo(Measurement);

