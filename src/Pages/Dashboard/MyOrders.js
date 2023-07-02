import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from "react-router-dom"
import DeleteModal from '../DeleteModal';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import Loading from "../Loading";

const MyOrders = ({ setModal, modal }) => {
  const [user, loading, error] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  let navigate = useNavigate();
  const [id, setId] = useState();
  const toastId = React.useRef(null);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    fetch(`https://autoparts-vsj8.onrender.com/orders/${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setPageLoading(false);
      });
  }, [user])

  useEffect(() => {
    if (modal) {
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
      fetch(`https://autoparts-vsj8.onrender.com/deleteOrder/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged) {
            const remaining = orders.filter(o => o._id !== id);
            setOrders(remaining);
            toast.dismiss(toastId.current);
            toast.success("Order Deleted Successfully.")
          }
        });
    }
    setModal(false);
  }, [modal, id, orders])

  if (pageLoading) {
    return <Loading></Loading>
  }

  const goToPurchase = (_id) => {
    navigate(`/payment/${_id}`)
  }
  return (
    <div>
      <p className='text-5xl rajdhani-font orange-color my-5'>My Orders</p>
      <hr />
      {
        orders ?
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
          </div> :
          <p className='text-center text-4xl rajdhani-font'>No Orders Found.</p>
      }
      {/* <DeleteModal setModal={setModal}></DeleteModal> */}
    </div>
  );
};

export default MyOrders;