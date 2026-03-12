import React, { useEffect, useRef , useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { Icon } from '@iconify/react';
const stripePromise = loadStripe('pk_test_51ReVtpEyZ8uIZ3ONqcj3Du0xz7OamUW7raZGxJk9sIBiBp5Jtf3ZTstDqx7Qw1yLEWjfeT4Poc9q8DPrTwU13zd100LbDhIgbs');
import { Button } from '@lib/components/ui/button';
import './css/style.css';

const publishableKey = import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY;

const PaymentPage = ({ amount, customer, shippingInfo, back }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} customer={customer} shippingInfo={shippingInfo} back={back} />
  </Elements>
);

const CheckoutForm = ({ amount, customer, shippingInfo, back }: { amount: any; customer: any; shippingInfo?: any; back: () => void }) => {
  //  const containerRef = useRef();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [loader, SetLoader] = useState<boolean>(false);
  useEffect(() => {
    const amountInCents = Math.round(amount * 100);

    // Ensure amount is a positive integer in cents
    if (amountInCents <= 0) {
      setError('Amount must be a positive number.');
      return;
    }
    // Create PaymentIntent on mount with the passed amount https://acp-backend.techplinth.com/api/checkout_sessions
    
    fetch('https://api.blindzy.com/store/customers/checkout_sessions', {
      method: 'POST',
       headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": publishableKey,
        },
      body: JSON.stringify({
        amount: amountInCents,
        email: customer.email,
        phone: customer.phone,
        name: customer.firstName,
        address: `${shippingInfo.address}, ${shippingInfo.zipCode},${shippingInfo.city}, ${shippingInfo.country}`, // Include full address,
        // address: {
        //   address: `${shippingInfo.address}, ${shippingInfo.zipCode},${shippingInfo.city}, ${shippingInfo.country}`, // Include full address
        //   city: shippingInfo.city, // Include shippingInfo city
        //   state: shippingInfo.state, // Include shippingInfo state
        //   country: shippingInfo.country, // Include shippingInfo country
        //   postal_code: shippingInfo.postal_code, // Include shippingInfo zipcode
        // },
      }), // Pass the amount from the prop
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

    if (stripe) {

      const pr = stripe.paymentRequest({
        country: 'AU',
        currency: 'aud',
        total: {
          label: 'Total',
          amount: amountInCents, // Use the amount prop here as well
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {

        console.log(result)
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe, amount]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    SetLoader(true);
    if (!stripe || !elements) {
      SetLoader(false);
      setError('Stripe has not loaded yet.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      SetLoader(false);
      setError('Card details not found.');
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    const { error, paymentIntent } = result;

    if (error) {
      setError(error?.message ?? 'An error occurred while processing payment.');
      SetLoader(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log(customer.id, shippingInfo.id);
      try {
        const response = await fetch('https://api.blindzy.com/store/customers/checkout', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": publishableKey,
          },
          body: JSON.stringify({
            customer_id: customer.id,
            address_id: shippingInfo.id,
          }),
        });

        const data = await response.json();
        console.log("Checkout success:", data);

        setPaymentSuccess(true);
      } catch (err) {
        console.error("Checkout failed:", err);
        setError("Order creation failed. Please contact support.");
      } finally {
        SetLoader(false);
      }
    }

    // if (paymentIntent && paymentIntent.status === 'succeeded') {
    //   fetch('https://api.blindzy.com/store/customers/checkout', {
    //     method: 'POST',
    //     headers: {
    //           "Content-Type": "application/json",
    //           "x-publishable-api-key": '',
    //       },
    //     body: JSON.stringify({
    //       customer_id: customer.id,
    //       address_id: shippingInfo.id,
    //     }), // Pass the amount from the prop
    //   })
    //   setPaymentSuccess(true);
    //   SetLoader(false);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className='h-full col-span-12 flex flex-col gap-4'>
      {!paymentSuccess ? (
        <>
          <CardElement />
          {error && <div className='text-red-600'>{error}</div>}
            <div className='flex justify-end col-span-12 gap-2'>
                <Button variant={'light'} size={'small'} className="sm:w-[200px] w-full sm:shrink-0 shrink " onClick={back}>
                    Back
                </Button>
                <Button variant={'primary'} size={'small'} name='submit' className="sm:w-[200px] w-full sm:shrink-0 shrink " type="submit" disabled={!stripe}>
                    {!loader ? 'Place Order' : 'processing...'}
                </Button>
            </div>

          {/* {paymentRequest && (
            <PaymentRequestButtonElement options={{ paymentRequest }} />
          )} */}
        </>
      ) : (
        <div className='h-full w-full flex flex-col justify-center items-center'>
          <Icon icon="ph:check-circle-light" className='text-[128px] text-primary'/>
          <h2 className='text-xl text-black'>Order Successful</h2>
        </div>
      )}
    </form>
  );
};

export default PaymentPage;
