import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { set } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Payment from '../Payment/Payment';
import "./Purchase.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ColorRing } from 'react-loader-spinner';
import Loading from '../Loading';

const Purchase = () => {
  const [user, loading, uError] = useAuthState(auth);
  const { partsId } = useParams();
  const [part, setPart] = useState({});
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [endOrderQuantity, setEndOrderQuantity] = useState(0);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  let navigate = useNavigate();
  const [orderLoading, setOrderLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);


  useEffect(() => {
    fetch(`https://autoparts-vsj8.onrender.com/purchase/${partsId}`, {
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
          setPart(data);
          setEndOrderQuantity(data.quantity);
        }
      })
  }, [partsId, endOrderQuantity])



  if (pageLoading) {
    return <Loading></Loading>
  }

  const handleOrder = (event) => {
    const q = event.target.value;
    setOrderQuantity(q);
    if (0 >= parseInt(q) || q === "") {
      setError("You Can't order '0' product.");
    }
    else if (parseInt(endOrderQuantity) < parseInt(q)) {
      setError("You Can't Order More than Available Products")
    }
    else {
      setError("");
    }
  }

  const handlePlaceOrder = () => {
    // e.preventDefault();
    setOrderLoading(true);
    const order = {
      userName: user?.displayName,
      email: user.email,
      item: part.name,
      quantity: parseInt(orderQuantity),
      price: (part.price * orderQuantity),
      pay: "unpaid",
      // address: e.target.address.value,
      // phone: e.target.phone.value,
    }
    fetch("https://autoparts-vsj8.onrender.com/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken")
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
        if (data.acknowledged) {
          setOrderLoading(false);
          setOrderId(data.insertedId);
          const quantity = (parseInt(part.quantity) - parseInt(orderQuantity));
          fetch("https://autoparts-vsj8.onrender.com/updateQuantity", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ quantity, id: part._id })
          })
            .then(res => res.json())
            .then(data => {
              if (data.message) {
                signOut(auth);
                localStorage.removeItem("accessToken");
              }
              if (data.acknowledged) {
                setEndOrderQuantity(quantity);
                toast.success("Order Successfull")
              }
            });
        }
      })
    // const form = document.getElementById("form");
    // form.reset();
    setOrderQuantity(1);
  }

  const goToPurchase = () => {
    navigate(`/payment/${orderId}`)
  }

  const handleIncrement = () => {
    if (parseInt(orderQuantity) < parseInt(part.quantity)) {
      setOrderQuantity(parseInt(orderQuantity) + 1);
    }
  }
  const handleDecrement = () => {
    if (parseInt(orderQuantity) > 1) {
      setOrderQuantity(parseInt(orderQuantity) - 1);
    }
  }


  return (
    <div className='bg-base-200 p-14'>
      <div className='md:flex justify-center bg-white py-10'>
        <div>
          <img style={{ width: "450px" }} className='w-96 border-0' src={part.picture} alt="" />
        </div>
        <div className='md:w-2/4 px-10'>
          <p className='text-4xl my-2 font-bold rajdhani-font orange-color'>{part?.name?.toUpperCase()}</p>
          <hr />
          <p className='text-3xl font-bold rajdhani-font orange-color my-5'>${part.price}</p>
          <hr />
          <div className='text-gray-500 text-lg my-2'>
            {/* {
              typeof part.description === "string" ? <p>{part.description}</p> :
                part.description?.map((d, index) => <p key={index}><span className='font-bold text-gray-600'>{d.split(":")[0]}:</span> {d.split(":")[1]}</p>)
            } */}
            {
              part.quantity > 0 ?
                <div className='flex items-center my-5'>
                  <div className='green-dot'></div>
                  <p>In Stock</p>
                </div> :
                <div className='flex items-center'>
                  <div className='red-dot'></div>
                  <p>Out of Stock</p>
                </div>
            }
          </div>
          <hr />
          {/* <p><span className='font-bold text-lg text-gray-600'>Min. Order Quantity:</span> 50</p> */}
          {/* <p><span className='font-bold text-lg text-gray-600'>Available Quantity:</span> {endOrderQuantity}</p>
          <p><span className='font-bold text-lg text-gray-600'>Price (Per Piece):</span> ${part.price}</p> */}
          <ul className='text-sm my-5'>
            <li className='my-2 flex items-center'><div className='black-dot'></div> Country: Germany</li>
            <li className='my-2 flex items-center'><div className='black-dot'></div> Part Number: WS5-451A2</li>
            <li className='my-2 flex items-center'><div className='black-dot'></div> Color: White / Silver </li>
            <li className='my-2 flex items-center'><div className='black-dot'></div> Material: Metal & Chrome OEM: Replica 178</li>
            <li className='my-2 flex items-center'><div className='black-dot'></div> Chrome OEM: Replica 178</li>
          </ul>
          <hr />
          <div className='my-5'>
            <p>{part.quantity} in stock</p>
            <div className='my-5'>
              {/* <label class="label">
                <span class="label-text text-base">Order Quantity:</span>
              </label> */}
              <div className='flex items-center'>
                <div className='flex items-center'>
                  <button onClick={handleDecrement} className='px-3 py-4 bg-red-100'><AiOutlineMinus /></button>
                  <input type="number" onChange={handleOrder} name='quantity' value={orderQuantity} placeholder='Enter Amount Your Want To Order' className="input input-bordered rounded-none border-red-500 w-28 input-base max-w-xs" />
                  <button onClick={handleIncrement} className='px-3 py-4 bg-red-100 mr-5'><AiOutlinePlus /></button>
                </div>
                <button onClick={handlePlaceOrder} className='btn bg-red-600 hover:bg-black rounded-none font-normal mr-5 border-0' disabled={error ? "disabled" : ""}>
                  {orderLoading ?
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={["white", "white", "white", "white", "white"]}
                    />
                    : "Place Order"}
                </button>
                {
                  orderId ? <button onClick={goToPurchase} className='btn bg-red-600 rounded-none font-normal border-0'>Make Payment</button> : ""
                }
              </div>
              {
                orderId ? <p className='text-sm mt-3'>Order placed without payment. To pay, please click the "MAKE PAYMENT" button.</p> : ""
              }
              {
                error ? <div class="alert alert-error shadow-lg w-80 py-2 mt-5">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                  </div>
                </div> : ""
              }
            </div>
          </div>
        </div>
      </div>
      {/* <div className='md:flex justify-evenly items-center'>
        <div>
          <p className='text-4xl font-bold text-accent-focus my-10'>Place Your Order Here</p>
          <form onSubmit={handlePlaceOrder} id="form">
            <label class="label">
              <span class="label-text">Your Name:</span>
            </label>
            <input type="text" name='name' value={user?.displayName} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />
            <label class="label">
              <span class="label-text">Your Email:</span>
            </label>
            <input type="text" name='email' value={user?.email} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />
            <label class="label">
              <span class="label-text">Your Address:</span>
            </label>
            <input type="text" name='address' placeholder='Enter Your Address' class=" input input-bordered w-full input-sm max-w-xs" /> <br />
            <label class="label">
              <span class="label-text">Your Phone Number:</span>
            </label>
            <input type="number" name='phone' placeholder='Enter Your Phone Number' class=" input input-bordered w-full input-sm max-w-xs" /> <br />

            <label class="label">
              <span class="label-text">Order Quantity:</span>
            </label>
            <input type="number" onChange={handleOrder} name='quantity' value={orderQuantity} placeholder='Enter Amount Your Want To Order' class="input input-bordered w-full  input-sm max-w-xs" /> <br />
            <p className='font-bold text-accent-focus pl-3 mt-1'>{part.quantity} Pieces of This Item Is in Stock</p>
            {
              error ? <div class="alert alert-error shadow-lg w-80 py-1 mt-5">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{error}</span>
                </div>
              </div> : ""
            }
            <button className='btn bg-accent-focus border-0 mt-5' disabled={error ? "disabled" : ""}>Place Order Without Payment</button>
          </form>
        </div>
        <div>
          <p className='text-4xl font-bold text-accent-focus my-10'>To Make Payment, Click Here</p>
          <button onClick={goToPurchase} disabled={!orderId && "disabled"} className='btn bg-accent-focus border-0'>Make Payment</button>
          <br />
          <small>You have to Place Your Order Without Payment first</small>
        </div>
      </div> */}
    </div>
  );
};

export default Purchase;