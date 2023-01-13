import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import auth from '../../firebase.init';

const MakeAdmin = () => {
  const [user, setUser] = useState([])
  useEffect(() => {
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
      });
  }, [])

  const handleMakeAdmin = (id) => {
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
            });
        }
      });
  }

  return (
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
  );
};

export default MakeAdmin;