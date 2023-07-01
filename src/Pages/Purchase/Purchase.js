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
    setOrderLoading(true);
    const order = {
      userName: user?.displayName,
      email: user.email,
      item: part.name,
      quantity: parseInt(orderQuantity),
      price: (part.price * orderQuantity),
      pay: "unpaid",
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
    <div className='bg-base-200'>
      <div className='p-14'>
        <div className='md:flex bg-white py-10 justify-center'>
          <div>
            <img style={{ width: "450px" }} className='w-96 border-0' src={part.picture} alt="" />
          </div>
          <div className='md:w-2/4 px-10'>
            <p className='text-4xl my-2 font-bold rajdhani-font orange-color'>{part?.name?.toUpperCase()}</p>
            <hr />
            <p className='text-3xl font-bold rajdhani-font orange-color my-5'>${part.price}</p>
            <hr />
            <div className='text-gray-500 text-lg my-2'>
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
      </div>
      <div className='my-0 px-28 py-14 bg-white'>
        <p className='text-black text-5xl rajdhani-font border-black border-b-2 pb-2 w-52'>Discription</p>
        <div className='w-4/5 my-10 leading-8'>
          <p>Silver with Mirror Cut Facewheels by SpareGold. The SpareGold custom aftermarket alloy builds a new dynamic trend featuring awheel behind a wheel look. Previously non-manufacturable, SpareGold had to work closely with engineers for months until every corner of the Sebring was at just the right angle to be casted into metal without sacrificing aesthetic qualities. Two split five spoke designs overlap combining into a three dimensional mesh pattern. Each spoke is angled just enough to create sharp edges posturizing a truly refined look on the customwheel</p>
          <p className='font-bold text-2xl rajdhani-font my-8'>Featured</p>
          <li>Plastic Hub Centering Ring Ensures a Vibration Free Ride</li>
          <li>Tight Runout Tolerances Ensure thatwheels are Straight, Round and have Even Thickness
          </li>
          <li>Factory Balancing ofwheels to Minimize Vibrations and Need forwheel Weights</li>
          <li>Load Rating Specified on Everywheel</li>
          <li>Compatible with All Original Equipment Tire Pressure Monitoring System (TPMS) Sensors
          </li>
          <li>Correct Fitment for Your Vehicle</li>
          <li>Precise and Correctwheel Offset for Your Vehicle</li>
          <li>Metal Decorative Rivets and Extra Thick Emblems Ensure Lasting Good Looks</li>
          <li>TSW provides a five-year structural warranty</li>
          <li>2-Year Warranty on Chrome and Silver Finish</li>
        </div>
      </div>
    </div>
  );
};

export default Purchase;