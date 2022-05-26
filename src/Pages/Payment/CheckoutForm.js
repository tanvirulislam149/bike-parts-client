import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");



    const { price, userName, email, _id } = order;

    useEffect(() => {
        if (price) {
            fetch(`https://pacific-inlet-53322.herokuapp.com/create-payment-intent`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ price })
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.clientSecret) {
                        setClientSecret(data.clientSecret)
                    }
                })
        }
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!elements || !stripe) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message);
        }
        else {
            setCardError("");
        }

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        email: email
                    },
                },
            },
        )

        if (intentError) {
            setCardError(intentError?.message)
        }
        else {
            setCardError("")
            toast.success("Your Payment Is Completed")
            console.log(paymentIntent);
            if (paymentIntent?.id) {
                const paidStatus = {
                    transactionId: paymentIntent?.id,
                    orderId: _id,
                }
                fetch("https://pacific-inlet-53322.herokuapp.com/updateOrder", {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(paidStatus)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))

            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button className='btn border-0 w-full bg-accent-focus mt-5' type="submit" disabled={!stripe || !elements}>
                    Pay
                </button>
            </form>
            {
                cardError ? <p className='text-red-500'>{cardError}</p> : ""
            }
        </div>

    );
};

export default CheckoutForm;