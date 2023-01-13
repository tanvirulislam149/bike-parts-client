import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import auth from '../../firebase.init';
import DeleteModal from '../DeleteModal';

const ManageAllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState();
  useEffect(() => {
    fetch("https://autoparts-vsj8.onrender.com/allOrders", {
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
        setAllOrders(data)
      });
  }, [])

  const handleShipped = (id) => {
    fetch(`https://autoparts-vsj8.onrender.com/shipped/${id}`, {
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
        if (data.acknowledged) {
          fetch("https://autoparts-vsj8.onrender.com/allOrders", {
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
              setAllOrders(data);
            });
        }
      });
  }


  useEffect(() => {
    if (modal) {
      fetch(`https://autoparts-vsj8.onrender.com/cancelOrder/${id}`, {
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
          if (data.acknowledged) {
            const remaining = allOrders.filter(o => o._id !== id);
            setAllOrders(remaining);
          }
        });
    }
    setModal(false);
  }, [modal, id, allOrders])


  return (
    <div>
      <div>
        <p className='text-5xl text-accent-focus my-5'>Manage All Orders</p>
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
                allOrders?.map((o, index) =>
                  <>
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{o.email}</td>
                      <td>{o.item}</td>
                      <td>{o.quantity}</td>
                      <td>{o.price}</td>
                      <td>{o.pay === "unpaid" ? <label for="deleteModal" onClick={() => setId(o._id)} className='btn btn-xs btn-error'>Cancel</label> : <button onClick={() => handleShipped(o._id)} disabled={o.status === "Shipped" && "disabled"} className='btn btn-xs btn-success'>Set For Shipment</button>}</td>
                      <td>{o.status || "Unpaid"}</td>
                    </tr>
                  </>
                )
              }

            </tbody>
          </table>
        </div>
        <DeleteModal setModal={setModal}></DeleteModal>
      </div>
    </div>
  );
};

export default ManageAllOrders;