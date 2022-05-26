import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from "react-router-dom"
import DeleteModal from '../DeleteModal';

const MyOrders = () => {
    const [user, loading, error] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    let navigate = useNavigate();
    const [id, setId] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetch(`https://pacific-inlet-53322.herokuapp.com/orders/${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [user])

    useEffect(() => {
        if (modal) {
            fetch(`https://pacific-inlet-53322.herokuapp.com/deleteOrder/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        const remaining = orders.filter(o => o._id !== id);
                        setOrders(remaining);
                    }
                });
        }
        setModal(false);
    }, [modal, id, orders])

    const goToPurchase = (_id) => {
        navigate(`/payment/${_id}`)
    }
    return (
        <div>
            <p className='text-5xl text-accent-focus my-5'>My Orders</p>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Button</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((o, index) =>
                                <>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{o.email}</td>
                                        <td>{o.item}</td>
                                        <td>{o.quantity}</td>
                                        <td>{o.price}</td>
                                        <td>{o.pay === "unpaid" && <><button onClick={() => goToPurchase(o._id)} class="btn mr-2 btn-xs btn-success">Pay</button><label for="deleteModal" onClick={() => setId(o._id)} class="btn modal-button btn-xs btn-error">Cancel</label></>}</td>
                                        <td>{o.pay === "unpaid" ? "Unpaid" : <>
                                            <p>Transaction Id:</p>
                                            <p>{o.transactionId}</p>
                                        </>}</td>
                                    </tr>
                                </>
                            )
                        }

                    </tbody>
                </table>
            </div>
            <DeleteModal setModal={setModal}></DeleteModal>
        </div>
    );
};

export default MyOrders;