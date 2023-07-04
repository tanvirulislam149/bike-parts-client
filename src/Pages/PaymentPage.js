import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../firebase.init';
import Payment from './Payment/Payment';
import Loading from './Loading';
import { RxCross2 } from "react-icons/rx";

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
    <div className='lg:flex justify-evenly text-center mx-4 my-10'>
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
          <input type="number" name='phone' placeholder='Enter Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} class="input p-3 rounded-none input-bordered w-full input-base" /> <br />
        </form>
      </div>
      <div className='bg-base-200 md:px-10 p-5 my-5 text-left md:w-1/3 w-full rajdhani-font'>
        <p className='text-4xl rajdhani-font my-5 font-bold'>Your Order</p>
        <p className='flex items-center text-lg font-bold'>{order.item?.toUpperCase()} <RxCross2 className='mx-2 stroke-1 text-black' /> {order.quantity}</p>
        <p className='mt-3'>Shipping</p>
        <p className='text-2xl mb-6'>Free Shipping</p>
        <div className='flex text-3xl my-3'>
          <p className='mr-2'>Total: </p>
          <p>${order.price}</p>
        </div>
        <p className='my-5'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
        <Payment order={order} obj={obj}></Payment>
      </div>
    </div>
  );
};

export default PaymentPage;