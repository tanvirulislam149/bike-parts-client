import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const CheckoutForm = ({ order, obj }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const toastId = React.useRef(null);


  const { phone, setPhone, address, setAddress } = obj;

  const { price, userName, email, _id } = order;

  useEffect(() => {
    if (price) {
      fetch(`https://autoparts-vsj8.onrender.com/create-payment-intent`, {
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


  // toast(
  //   <div className='flex items-center'>
  //     <ColorRing
  //       visible={true}
  //       height="40"
  //       width="40"
  //       ariaLabel="blocks-loading"
  //       wrapperStyle={{}}
  //       wrapperClass="blocks-wrapper"
  //       colors={["white", "white", "white", "white", "white"]}
  //     />
  //     <p>Loading...</p>
  //   </div>
  //   , { autoClose: false }
  // )


  const handleSubmit = async (event) => {
    event.preventDefault();

    toast(
      <div className='flex items-center'>
        <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["white", "white", "white", "white", "white"]}
        />
        <p>Loading...</p>
      </div>
      , { autoClose: false }
    )

    if (!phone || !address) {
      toast.dismiss(toastId.current);
      setCardError("Please enter address and phone number.");
      return;
    }


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
      toast.dismiss(toastId.current);
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
      toast.dismiss(toastId.current);
      setCardError(intentError?.message)
    }
    else {
      setCardError("")
      toast.dismiss(toastId.current);
      toast.success("Your Payment Is Completed")
      console.log(paymentIntent);
      setAddress("");
      setPhone("");
      if (paymentIntent?.id) {
        const paidStatus = {
          transactionId: paymentIntent?.id,
          orderId: _id,
          address: address,
          phone: phone
        }
        fetch("https://autoparts-vsj8.onrender.com/updateOrder", {
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
        <button className='btn border-0 w-full bg-red-600 hover:bg-black rounded-none mt-5' type="submit" disabled={!stripe || !elements}>
          Pay
        </button>
      </form>
      {
        cardError ? <p className='text-red-500 mt-2'>{cardError}</p> : ""
      }
    </div>

  );
};

export default CheckoutForm;