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


export function AddCard({ onCardAdd }) {
    const [formData, setFormData] = useState({
        cardType: '',
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvvCode: ''
    });

    const handlePaymentInfoChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveCard = () => {
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

        // Create new card object
        const newCard = {
            id: Date.now(), // Simple ID generation
            cardType: formData.cardType,
            cardName: formData.cardName,
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvvCode: formData.cvvCode,
            createdAt: new Date().toISOString()
        };

        // Pass data back to parent
        if (onCardAdd) {
            onCardAdd(newCard);
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
            <DialogContent className="xl:max-w-[1178px] w-full">
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
                            onClick={handleSaveCard}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
