import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import Loading from '../Loading';

const MakeAdmin = () => {
  const [user, setUser] = useState([])
  const [pageLoading, setPageLoading] = useState(false);
  const toastId = React.useRef(null);

  useEffect(() => {
    setPageLoading(true);
    fetch("https://autoparts-vsj8.onrender.com/allUser", {
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
        setUser(data)
        setPageLoading(false);
      });
  }, [])

  const handleMakeAdmin = (id) => {

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

    fetch(`https://autoparts-vsj8.onrender.com/makeAdmin/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken")
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
        if (data.acknowledged) {
          fetch("https://autoparts-vsj8.onrender.com/allUser", {
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
              setUser(data)
              toast.dismiss(toastId.current);
              toast.success("Making admin successfull.");
            });
        }
      });
  }

  if (pageLoading) {
    return <Loading />
  }

  return (
    <div>
      <p className='text-5xl rajdhani-font orange-color my-5'>Make Admin</p>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Name</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {
              user?.map((o, index) =>
                <>
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{o.email}</td>
                    <td>{o.name}</td>
                    <td>{o?.role === "admin" ? "" : <button onClick={() => handleMakeAdmin(o._id)} className='btn btn-sm '>Make Admin</button>}</td>
                  </tr>
                </>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;