import React, { useRef, useState } from "react";
import { Button } from "@lib/components/ui/button";
import { createAddresses } from '../../services/create-address';

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
import { X, Loader2 } from 'lucide-react';


export function AddAddress(props) {
    const [open, setOpen] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [formData, setFormData] = useState({
        country: '',
        city: '',
        zipCode: '',
        address: '',
        apartment: ''
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveAddress = async () => {
        // Validate required fields
        if (!formData.country || !formData.city || !formData.zipCode || !formData.address) {
            setError('Please fill in all required fields');
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!props.userData) {
            console.error("User data is not available.");
            return;
        }

        try {
                const response = await createAddresses.storeAddress({
                    customer_id: String(props.userData.id),
                    email: props.userData.email,
                    first_name: props.userData.first_name,
                    last_name: props.userData.last_name,
                    address_1: formData.address,
                    city: formData.city,
                    postal_code: formData.zipCode,
                    country_code: formData.country
                });
    
                setSuccess("Address created successfully!");
                // Call the onSuccess callback to update parent component
                props.onSuccess?.();
                // Close the dialog immediately on success
                closeButtonRef.current?.click();
    
            } catch (err: any) {
                console.error("Signup error:", err);
                setError(err.message || "Something went wrong during Address creation.");
            } finally {
                setLoading(false);
            }
        // Reset form
        setFormData({
            country: '',
            city: '',
            zipCode: '',
            address: '',
            apartment: ''
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={'primary'} size={'smallest'}
                    className="w-fit"
                >
                    Add Address
                </Button>
            </DialogTrigger>
            <DialogContent className="xl:max-w-[61.354vw] w-full">
                <DialogHeader>
                    <DialogTitle className="text-xxl uppercase">New Address</DialogTitle>
                    <DialogClose asChild>
                        <Button type="button" variant="light" size={'lg'}>
                            <X className="size-6" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="grid grid-cols-12 gap-6">
                    <div className="sm:col-span-6 col-span-12">
                        <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Country / Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="AUS">Australia</SelectItem>
                                <SelectItem value="USA">United States</SelectItem>
                                <SelectItem value="CAN">Canada</SelectItem>
                                <SelectItem value="GBR">United Kingdom</SelectItem>
                                <SelectItem value="NZL">New Zealand</SelectItem>
                                <SelectItem value="DEU">Germany</SelectItem>
                                <SelectItem value="FRA">France</SelectItem>
                                <SelectItem value="JPN">Japan</SelectItem>
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
                    {/* <div className="col-span-12">
                        <Input
                            type="text"
                            id="apartment"
                            placeholder="Apartment, suit, unit, etc. (Optional)"
                            value={formData.apartment}
                            onChange={(e) => handleInputChange('apartment', e.target.value)}
                        />
                    </div> */}
                </div>
                {/* Status Messages */}
                <div className="w-full flex flex-col gap-2">
                    {success && (
                        <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                            {error}
                        </div>
                    )}
                </div>
                <DialogFooter >
                    <DialogClose asChild>
                        <Button ref={closeButtonRef} variant={'light'} size={'smallest'} className="w-full sm:w-[200px] sm:shrink-0 shrink">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button 
                        variant={'primary'} 
                        size={'smallest'} 
                        className="w-full sm:w-[200px] sm:shrink-0 shrink"
                        onClick={handleSaveAddress}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </div>
                        ) : (
                            "Save Address"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
