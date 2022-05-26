import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { set } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Payment from './Payment/Payment';

const Purchase = () => {
    const [user, loading, uError] = useAuthState(auth);
    const { partsId } = useParams();
    const [part, setPart] = useState({});
    const [orderQuantity, setOrderQuantity] = useState(50);
    const [endOrderQuantity, setEndOrderQuantity] = useState(0);
    const [error, setError] = useState("");
    const [orderId, setOrderId] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`https://pacific-inlet-53322.herokuapp.com/purchase/${partsId}`)
            .then(res => res.json())
            .then(data => {
                setPart(data);
                setEndOrderQuantity(data.quantity);
            })
    }, [partsId, endOrderQuantity])

    const handleOrder = (event) => {
        const q = event.target.value;
        setOrderQuantity(q);
        if (50 > parseInt(q) || q === "") {
            setError("You Have To Order Minimum 50 Pieces");
        }
        else if (parseInt(endOrderQuantity) < parseInt(q)) {
            setError("You Can't Order More than Available Products")
        }
        else {
            setError("");
        }
    }

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const order = {
            userName: e.target.name.value,
            email: e.target.email.value,
            item: part.name,
            quantity: parseInt(orderQuantity),
            price: (part.price * orderQuantity),
            pay: "unpaid",
            address: e.target.address.value,
            phone: e.target.phone.value,
        }
        fetch("https://pacific-inlet-53322.herokuapp.com/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setOrderId(data.insertedId);
                    const quantity = (parseInt(part.quantity) - parseInt(orderQuantity));
                    fetch("https://pacific-inlet-53322.herokuapp.com/updateQuantity", {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({ quantity, id: part._id })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                setEndOrderQuantity(quantity);
                                toast.success("Order Successfull")
                            }
                        });
                }
            })
        const form = document.getElementById("form");
        form.reset();
    }

    const goToPurchase = () => {
        navigate(`/payment/${orderId}`)
    }


    return (
        <div className='m-5 md:m-14'>
            <div className='md:flex justify-center my-10'>
                <div className='md:w-2/4'>
                    <img className='w-full md:h-96 border-2' src={part.picture} alt="" />
                </div>
                <div className='md:w-2/4 px-10'>
                    <p className='text-4xl my-2 font-bold text-accent-focus'>{part?.name?.toUpperCase()}</p>
                    <hr />
                    <p className='text-2xl font-bold text-accent-focus my-2'>${part.price}</p>
                    <hr />
                    <div className='text-gray-500 text-lg my-2'>
                        {
                            typeof part.description === "string" ? <p>{part.description}</p> :
                                part.description?.map((d, index) => <p key={index}><span className='font-bold text-gray-600'>{d.split(":")[0]}:</span> {d.split(":")[1]}</p>)
                        }
                    </div>
                    <hr />
                    <p><span className='font-bold text-lg text-gray-600'>Min. Order Quantity:</span> 50</p>
                    <p><span className='font-bold text-lg text-gray-600'>Available Quantity:</span> {endOrderQuantity}</p>
                    <p><span className='font-bold text-lg text-gray-600'>Price (Per Piece):</span> ${part.price}</p>
                </div>
            </div>
            <div className='md:flex justify-evenly items-center'>
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
                    <button onClick={goToPurchase} disabled={!orderId && "disabled"} className='btn bg-accent-focus border-0'>Make Payment</button> <br />
                    <small>You have to Place Your Order Without Payment first</small>
                </div>
            </div>
        </div>
    );
};

export default Purchase;