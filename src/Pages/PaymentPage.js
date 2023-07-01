import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../firebase.init';
import Payment from './Payment/Payment';
import Loading from './Loading';

const PaymentPage = () => {
  const [user, loading, uError] = useAuthState(auth);
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const obj = {
    address, setAddress, phone, setPhone
  }

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
          setPageLoading(false);
          setOrder(data);
        }
      })
  }, [orderId, user])

  if (pageLoading) {
    return <Loading></Loading>
  }

  return (
    <div className='md:flex justify-evenly text-center mx-4 my-10'>
      <div className='md:w-96 w-full'>
        <p className='text-4xl rajdhani-font orange-color my-5 font-bold'>Billing Details</p>
        <form id="form">
          <label class="label">
            <span class="label-text">Your Name <span className='orange-color text-lg'>*</span></span>
          </label>
          <input type="text" name='name' value={order.userName} disabled class="input p-3 rounded-none input-bordered w-full input-base" /> <br />
          <label class="label">
            <span class="label-text mt-4">Your Email <span className='orange-color text-lg'>*</span></span>
          </label>
          <input type="text" name='email' value={order.email} disabled class="input p-3 rounded-none input-bordered w-full input-base" /> <br />


          <label class="label">
            <span class="label-text mt-4">Your Address <span className='orange-color text-lg'>*</span></span>
          </label>
          <input type="text" name='address' placeholder='Enter Your Address' value={address} onChange={(e) => setAddress(e.target.value)} class="input p-3 rounded-none  input-bordered w-full input-base" /> <br />
          <label class="label">
            <span class="label-text mt-4">Your Phone Number <span className='orange-color text-lg'>*</span></span>
          </label>
          <input type="number" name='phone' placeholder='Enter Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} class="input p-3 rounded-none  input-bordered w-full input-base" /> <br />
        </form>
      </div>
      <div>
        <p className='text-3xl text-accent-focus my-5 font-bold'>Order Information</p>
        <label class="label">
          <span class="label-text">Ordered Item:</span>
        </label>
        <input type="text" name='email' value={order.item?.toUpperCase()} disabled class="input input-bordered w-full input-sm" /> <br />
        <label class="label">
          <span class="label-text">Ordered Item Quantity:</span>
        </label>
        <input type="text" name='email' value={order.quantity} disabled class="input input-bordered w-full input-sm" /> <br />
        <label class="label">
          <span class="label-text">Price:</span>
        </label>
        <input type="number" name='quantity' disabled value={order.price} placeholder='Enter Amount Your Want To Order' class="input input-bordered w-full  input-sm" /> <br />
        <Payment order={order} obj={obj}></Payment>
      </div>
    </div>
  );
};

export default PaymentPage;