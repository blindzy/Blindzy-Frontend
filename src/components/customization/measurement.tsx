import React from "react";
import { Plus } from 'lucide-react';
import { Label } from "@lib/components/ui/label";
function Measurement({ measurements, setMeasurements }) {
    return (
        <div className="grid grid-cols-12 sm:gap-4 gap-x-2 gap-y-4">
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
                    <div className="sm:col-span-4 col-span-6 flex items-center gap-2 p-2 sm:py-4 xl:py-[0.833vw] px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                        <Label htmlFor="width" className="text-sm normal shrink-0">Width: <span className="text-xs">(m)</span></Label>
                        <input 
                            type="number" 
                            id="width" 
                            value={measurements.width}
                            onChange={(e) => setMeasurements(prev => ({...prev, width: Number(e.target.value)}))}
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                        />
                    </div>
                    <div className="sm:col-span-4 col-span-6 flex items-center gap-2 p-2 sm:py-4 xl:py-[0.833vw] px-3 bg-[--white] border border-[--lightGrey] rounded-full">
                        <Label htmlFor="height" className="text-sm normal shrink-0">Height: <span className="text-xs">(m)</span></Label>
                        <input 
                            type="number" 
                            id="height" 
                            value={measurements.height}
                            onChange={(e) => setMeasurements(prev => ({...prev, height: Number(e.target.value)}))}
                            className="w-full bg-transparent border-none shadow-none outline-none text-sm text-[--Black]"
                        />
                    </div>
                </div>
    );
}

export default Measurement;

