import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../firebase.init';
import Payment from './Payment/Payment';

const PaymentPage = () => {
  const [user, loading, uError] = useAuthState(auth);
  const { orderId } = useParams();
  const [order, setOrder] = useState({});

  useEffect(() => {
    fetch(`https://autoparts-vsj8.onrender.com/orders?id=${orderId}&email=${user.email}`, {
      headers: {
        authorization: localStorage.getItem("accessToken")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
        else {
          setOrder(data);
        }
      })
  }, [orderId, user])
  return (
    <div className='md:flex justify-evenly text-center mx-4 my-10'>
      <div>
        <p className='text-3xl text-accent-focus my-5 font-bold'>Your Information</p>
        <form id="form">
          <label class="label">
            <span class="label-text">Your Name:</span>
          </label>
          <input type="text" name='name' value={order.userName} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />
          <label class="label">
            <span class="label-text">Your Email:</span>
          </label>
          <input type="text" name='email' value={order.email} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />


          <label class="label">
            <span class="label-text">Your Address:</span>
          </label>
          <input type="text" name='address' value={order.address} placeholder='Enter Your Address' disabled class=" input input-bordered w-full input-sm max-w-xs" /> <br />
          <label class="label">
            <span class="label-text">Your Phone Number:</span>
          </label>
          <input type="number" name='phone' value={order.phone} disabled placeholder='Enter Your Phone Number' class=" input input-bordered w-full input-sm max-w-xs" /> <br />
        </form>
      </div>
      <div>
        <p className='text-3xl text-accent-focus my-5 font-bold'>Order Information</p>
        <label class="label">
          <span class="label-text">Ordered Item:</span>
        </label>
        <input type="text" name='email' value={order.item?.toUpperCase()} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />
        <label class="label">
          <span class="label-text">Ordered Item Quantity:</span>
        </label>
        <input type="text" name='email' value={order.quantity} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />
        <label class="label">
          <span class="label-text">Price:</span>
        </label>
        <input type="number" name='quantity' disabled value={order.price} placeholder='Enter Amount Your Want To Order' class="input input-bordered w-full  input-sm max-w-xs" /> <br />
        <Payment order={order}></Payment>
      </div>
    </div>
  );
};

export default PaymentPage;