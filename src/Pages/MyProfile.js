import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Loading from './Loading';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

const MyProfile = () => {
  const [user, loading, uError] = useAuthState(auth);
  const [person, setPerson] = useState();
  const toastId = React.useRef(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [edu, setEdu] = useState("");

  useEffect(() => {
    setPageLoading(true);
    axios(`https://autoparts-vsj8.onrender.com/userData/${user?.email}`)
      .then(res => {
        if (res.data) {
          setPageLoading(false);
          setPerson(res.data);
          setAddress(res.data.address);
          setEdu(res.data.education);
          setPhone(res.data.phone);
        }
      })
  }, [user])

  if (pageLoading || loading) {
    return <Loading />
  }

  const handleUpdate = (e) => {
    e.preventDefault();
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
    const data = {
      name: user?.displayName,
      email: user?.email,
      address: e.target.address.value,
      phone: e.target.phone.value,
      education: e.target.education.value
    }
    console.log(data);
    fetch("https://autoparts-vsj8.onrender.com/updateUser", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.dismiss(toastId.current);
          toast.success("Updated successfully")
          fetch(`https://autoparts-vsj8.onrender.com/userData/${user?.email}`)
            .then(res => res.json())
            .then(data => setPerson(data));
        }
        else {
          toast.dismiss(toastId.current);
          toast.error("Update unsuccessful")
        }
      });
    // document.getElementById("form").reset();
  }
  return (
    <div className='md:mx-4'>
      <p className='text-5xl rajdhani-font orange-color font-bold'>My Profile</p>
      <div className='md:flex md:w-4/6 justify-evenly'>
        <div className='my-10 w-full text-center'>
          <form onSubmit={handleUpdate} id="form">
            <label class="label">
              <span class="label-text">Your Name:</span>
            </label>
            <input type="text" name='name' value={person?.name} disabled class="input input-bordered rounded-none border-red-500 w-full input-base" /> <br />
            <label class="label">
              <span class="label-text">Your Email:</span>
            </label>
            <input type="text" name='email' value={person?.email} disabled class="input input-bordered rounded-none border-red-500 w-full input-base" /> <br />
            <label class="label">
              <span class="label-text">Your Address:</span>
            </label>
            <input type="text" name='address' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter Your Address' class=" input input-bordered rounded-none border-red-500 w-full input-base" /> <br />
            <label class="label">
              <span class="label-text">Your Phone Number:</span>
            </label>
            <input type="number" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Your Phone Number' class=" input input-bordered rounded-none border-red-500 w-full input-base" /> <br />
            <label class="label">
              <span class="label-text">Your Education:</span>
            </label>
            <input type="text" name='education' value={edu} onChange={(e) => setEdu(e.target.value)} placeholder='Enter Your Education' class=" input input-bordered rounded-none border-red-500 w-full input-base" /> <br />
            <input className='btn my-4 w-full rounded-none bg-red-500 hover:bg-black border-0' type="submit" value="Update" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;