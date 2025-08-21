import React, { useEffect, useState } from "react";
import { Button } from "@lib/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@lib/components/ui/dialog";
import { Input } from "@lib/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@lib/components/ui/select";
import { X } from 'lucide-react';


export function EditAddress({ address, onAddressUpdate }) {
    const [formData, setFormData] = useState({
        state: address?.state || '',
        city: address?.city || '',
        zipCode: address?.zipCode || '',
        address: address?.address || '',
        apartment: address?.apartment || ''
    });

    // Update form data when address prop changes
    useEffect(() => {
        if (address) {
            setFormData({
                state: address.state || '',
                city: address.city || '',
                zipCode: address.zipCode || '',
                address: address.address || '',
                apartment: address.apartment || ''
            });
        }
    }, [address]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveAddress = () => {
        // Validate required fields
        if (!formData.state || !formData.city || !formData.zipCode || !formData.address) {
            alert('Please fill in all required fields');
            return;
        }

        // Create updated address object
        const updatedAddress = {
            ...address, // Keep original id and createdAt
            state: formData.state,
            city: formData.city,
            zipCode: formData.zipCode,
            address: formData.address,
            apartment: formData.apartment,
            updatedAt: new Date().toISOString()
        };

        // Pass updated data back to parent
        if (onAddressUpdate) {
            onAddressUpdate(updatedAddress);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'primary'} className="w-fit py-2 px-4 rounded-full text-sm">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="xl:max-w-[1178px] w-full">
                <DialogHeader>
                    <DialogTitle>Edit Address</DialogTitle>
                    <DialogClose asChild>
                        <Button type="button" variant="light" size={'lg'}>
                            <X className="size-6" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="grid grid-cols-12 gap-6">
                    <div className="sm:col-span-6 col-span-12">
                        <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="NSW">New South Wales</SelectItem>
                                <SelectItem value="VIC">Victoria</SelectItem>
                                <SelectItem value="QLD">Queensland</SelectItem>
                                <SelectItem value="WA">Western Australia</SelectItem>
                                <SelectItem value="SA">South Australia</SelectItem>
                                <SelectItem value="TAS">Tasmania</SelectItem>
                                <SelectItem value="NT">Northern Territory</SelectItem>
                                <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <Input
                            type="text"
                            id="town"
                            placeholder="Town / City"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <Input
                            type="text"
                            id="zipCode"
                            placeholder="Zip Code"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <Input
                            type="text"
                            id="address"
                            placeholder="House number and street name"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                    </div>
                    <div className="col-span-12">
                        <Input
                            type="text"
                            id="apartment"
                            placeholder="Apartment, suit, unit, etc. (Optional)"
                            value={formData.apartment}
                            onChange={(e) => handleInputChange('apartment', e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter >
                    <DialogClose asChild>
                        <Button variant={'light'} size={'smallest'} className="w-full sm:w-[200px]">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button 
                            variant={'primary'} 
                            size={'smallest'} 
                            className="w-full sm:w-[200px]"
                            onClick={handleSaveAddress}
                        >
                            Update Address
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
