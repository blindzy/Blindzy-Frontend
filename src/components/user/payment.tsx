import React, { useEffect, useRef, useState } from "react";
import { AddCard } from './add-card';
import { EditCard } from './edit-card';

type Payment = {
    id: string | number;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
};
type PaymentCard = {
    id: string | number;
    cardType: string;
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvvCode: string;
    createdAt: string;
};
function Payment(props) {
    
    const handleAddCard = (newCard) => {
        };
        // const handleUpdateCard = (updatedCard) => {
        //     setPaymentDetail(prev => 
        //         prev.map(card => 
        //             card.id === updatedCard.id ? updatedCard : card
        //         )
        //     );
        // };
    return (
        <div className="w-full grid grid-cols-12 gap-4">
            {props.list.length > 0 ? (
                <React.Fragment>
                    {props.list.map((card) => (
                        <div key={card.id} className="sm:col-span-6 col-span-12 flex flex-col gap-6 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                            <div className="w-full flex items-center justify-between">
                                <h5 className="text-lg">{card.cardName}</h5>
                                <EditCard 
                                    userData={props.userData}
                                    onSuccess={props.onCardChange}
                                    card={card} 
                                />
                            </div>
                            <p className="text-md text-[--Black]">Credit Card Number: ****{card.cardNumber.slice(-4)}</p>
                            <div className="flex items-center gap-2 justify-between">
                                <p className="text-md text-[--Black]">Expires: {card.expiryDate}</p>
                                <p className="text-md text-[--Black]">CVV: {card.cvvCode}</p>
                            </div>
                        </div>
                    ))}
                    <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                        <h5 className="text-lg text-center">WANT TO ADD A NEW CARD?</h5>
                        <AddCard userData={props.userData} onSuccess={props.onCardChange} />
                    </div>
                </React.Fragment>
            ):(
                <React.Fragment>
                    <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                        <h5 className="text-lg text-center">No cards found</h5>
                        <p className="text-sm text-center text-gray-600">Add your first card to get started</p>
                    </div>
                    <div className="sm:col-span-6 col-span-12 flex flex-col items-center justify-center gap-2 xl:p-[1.25vw] sm:p-[2.344vw] p-4 border border-[--Black] rounded-48">
                        <h5 className="text-lg text-center">ADD NEW CARD</h5>
                        <AddCard userData={props.userData} onSuccess={props.onCardChange} />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default Payment;

