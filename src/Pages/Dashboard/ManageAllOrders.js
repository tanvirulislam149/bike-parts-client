import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import auth from '../../firebase.init';
import DeleteModal from '../DeleteModal';
import Loading from '../Loading';
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const ManageAllOrders = ({ setModal, modal }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [id, setId] = useState();
  const toastId = React.useRef(null);


  useEffect(() => {
    setPageLoading(true);
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
        } else {
          setPageLoading(false);
          setAllOrders(data)
        }

      });
  }, [])

  const handleShipped = (id) => {

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
              toast.dismiss(toastId.current);
              toast.success("Order is set for shipment.");
            });
        }
      });
  }


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
            toast.dismiss(toastId.current);
            toast.success("Order cancelled successfully.");
          }
        });
    }
    setModal(false);
  }, [modal, id, allOrders])


  if (pageLoading) {
    return <Loading></Loading>
  }


  return (
    <div>
      <div>
        <p className='text-5xl text-accent-focus rajdhani-font orange-color my-5'>Manage All Orders</p>
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
                  <tr key={o._id}>
                    <th>{index + 1}</th>
                    <td>{o.email}</td>
                    <td>{o.item}</td>
                    <td>{o.quantity}</td>
                    <td>{o.price}</td>
                    <td>{o.pay === "unpaid" ? <label for="deleteModal" onClick={() => setId(o._id)} className='btn btn-xs btn-error'>Cancel</label> : <button onClick={() => handleShipped(o._id)} disabled={o.status === "Shipped" && "disabled"} className='btn btn-xs btn-success'>Set For Shipment</button>}</td>
                    <td>{o.status || "Unpaid"}</td>
                  </tr>
                )
              }

            </tbody>
          </table>
        </div>
        {/* <DeleteModal setModal={setModal}></DeleteModal> */}
      </div>
    </div>
  );
};

export default ManageAllOrders;