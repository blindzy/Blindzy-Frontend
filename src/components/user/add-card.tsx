import React, { useRef, useState } from "react";
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
import { Loader2, X } from 'lucide-react';
import { storeCardDetails } from '../../services/store-cardDetail';


export function AddCard(props) {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [formData, setFormData] = useState({
        cardType: '',
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvvCode: ''
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePaymentInfoChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveCard = async () => {
        // Validate required fields
        if (!formData.cardType || !formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvvCode) {
            alert('Please fill in all required fields');
            return;
        }

        // Basic card number validation (simple check for length)
        if (formData.cardNumber.replace(/\s/g, '').length < 13) {
            alert('Please enter a valid card number');
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
            const response = await storeCardDetails.storeCard({
                    email: props.userData.email,
                    card_type: formData.cardType,
                    card_number: formData.cardNumber,
                    card_name: formData.cardName,
                    expiry_date: formData.expiryDate,
                    security_code: formData.cvvCode
                });
    
                setSuccess("Card detail store successfully!");
                // Call the onSuccess callback to update parent component
                props.onSuccess?.();
                // Close the dialog immediately on success
                closeButtonRef.current?.click();
    
            } catch (err: any) {
                console.error("store error:", err);
                setError(err.message || "Something went wrong during Card detail store.");
            } finally {
                setLoading(false);
            }

        // Reset form
        setFormData({
            cardType: '',
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            cvvCode: ''
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant={'primary'}
                    size={'smallest'}
                    className="w-fit"
                >
                    Add Card
                </Button>
        </DialogTrigger>
            <DialogContent className="xl:max-w-[61.354vw] w-full">
                <DialogHeader>
                    <DialogTitle>Payment Details</DialogTitle>
                    <DialogClose asChild>
                        <Button type="button" variant="light" size={'lg'}>
                            <X className="size-6" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="grid grid-cols-12 gap-6">
                    <div className="sm:col-span-6 col-span-12">
                        <Select value={formData.cardType} onValueChange={(value) => handlePaymentInfoChange('cardType', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Credit Card" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="visa">Visa</SelectItem>
                                <SelectItem value="mastercard">Mastercard</SelectItem>
                                <SelectItem value="amex">American Express</SelectItem>
                                <SelectItem value="discover">Discover</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <Input
                            type="text" 
                            id="cardName" 
                            placeholder="Name of Card"
                            value={formData.cardName}
                            onChange={(e) => handlePaymentInfoChange('cardName', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <Input
                            type="text" 
                            id="cardNumber" 
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <Input
                            type="date" 
                            id="expiration-date" 
                            placeholder="Expiration Date (MM / YY)"
                            value={formData.expiryDate}
                            onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                        <Input
                            type="text" 
                            id="cvvCode" 
                            placeholder="CVV Code"
                            value={formData.cvvCode}
                            onChange={(e) => handlePaymentInfoChange('cvvCode', e.target.value)}
                        />
                    </div>
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
                        <Button ref={closeButtonRef} variant={'light'} size={'smallest'} className="w-full sm:w-[200px] sm:shrink-0 shrink ">
                            Cancel
                        </Button>
                    </DialogClose>
                        <Button 
                            variant={'primary'} 
                            size={'smallest'} 
                            className="w-full sm:w-[200px] sm:shrink-0 shrink "
                            onClick={handleSaveCard}
                            disabled={loading}

                        >
                            {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                                </div>
                            ) : (
                                "Save"
                            )}
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
