import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import CheckoutForm from "./CheckoutForm";

const Payment = ({ order, obj }) => {

  const stripePromise = loadStripe('pk_test_51L1y09DxiqLICkOEEFqsEjRH3GKPgQEvPIsCmfeAtHFJ0EFs4VHePIgAepjsh6WfcehSDARcBkuotDjEumyKLyYV007q4Wma04');


  return (
    <div className='w-full mx-auto'>
      <div class="card mb-5 w-full md:w-96 bg-base-100 shadow-xl">
        <div class="card-body text-left">
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order} obj={obj} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;