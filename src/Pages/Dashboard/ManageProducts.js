import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import auth from '../../firebase.init';
import DeleteModal from '../DeleteModal';
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Loading from '../Loading';

const ManageProducts = ({ setModal, modal }) => {
  const [products, setProducts] = useState([]);
  // const [modal, setModal] = useState(false);
  const [id, setId] = useState();
  const [pageLoading, setPageLoading] = useState(false);
  const toastId = React.useRef(null);

  useEffect(() => {
    setPageLoading(true);
    fetch("https://autoparts-vsj8.onrender.com/parts")
      .then(res => res.json())
      .then(data => {
        setPageLoading(false);
        setProducts(data);
      });
  }, [])


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

      fetch(`https://autoparts-vsj8.onrender.com/deleteProduct/${id}`, {
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
            const remaining = products.filter(o => o._id !== id);
            setProducts(remaining);
            toast.dismiss(toastId.current);
            toast.success("Product Deleted Successfully.");
          }
        });
    }
    setModal(false);
  }, [modal, id, products])

  if (pageLoading) {
    return <Loading />
  }



  return (
    <div>
      <p className='text-5xl rajdhani-font orange-color my-5'>Manage Products</p>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Picture</th>
              <th>Name</th>
              <th>Price</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((o, index) =>
                <>
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td><img className='w-14 rounded-xl' src={o.picture} alt="" /></td>
                    <td>{o.name?.toUpperCase()}</td>
                    <td>${o.price}</td>
                    <td><label for="deleteModal" onClick={() => setId(o._id)} className='btn btn-xs btn-error'>Delete Product</label></td>
                  </tr>
                </>
              )
            }

          </tbody>
        </table>
      </div>
      {/* <DeleteModal setModal={setModal}></DeleteModal> */}
    </div>
  );
};

export default ManageProducts;