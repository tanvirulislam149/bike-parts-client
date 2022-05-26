import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const MyProfile = () => {
    const [user, loading, uError] = useAuthState(auth);
    const [person, setPerson] = useState();
    useEffect(() => {
        fetch(`http://localhost:5000/userData/${user?.email}`)
            .then(res => res.json())
            .then(data => setPerson(data));
    }, [user])

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            name: user?.displayName,
            email: user?.email,
            address: e.target.address.value,
            phone: e.target.phone.value,
            education: e.target.education.value
        }
        fetch("http://localhost:5000/updateUser", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("update successful")
                    fetch(`http://localhost:5000/userData/${user?.email}`)
                        .then(res => res.json())
                        .then(data => setPerson(data));
                }
                else {
                    toast.error("Update unsuccessful")
                }
            });
        document.getElementById("form").reset();
    }
    return (
        <div className='mx-4'>
            <p className='text-4xl text-accent-focus font-bold text-center'>My Profile</p>
            <div className='md:flex justify-evenly'>
                <div className='md:w-80 text-center mx-auto md:mx-0 my-10'>
                    <p className='text-2xl text-accent-focus'>Your Information</p>
                    <form className=''>
                        <label class="label">
                            <span class="label-text">Your Name:</span>
                        </label>
                        <input type="text" name='name' value={person?.name} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />
                        <label class="label">
                            <span class="label-text">Your Email:</span>
                        </label>
                        <input type="text" name='email' value={person?.email} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />
                        <label class="label">
                            <span class="label-text">Your Address:</span>
                        </label>
                        <input type="text" name='address' value={person?.address} disabled class=" input input-bordered w-full input-sm max-w-xs" /> <br />
                        <label class="label">
                            <span class="label-text">Your Phone Number:</span>
                        </label>
                        <input type="number" name='phone' value={person?.phone} disabled class=" input input-bordered w-full input-sm max-w-xs" /> <br />
                        <label class="label">
                            <span class="label-text">Your Education:</span>
                        </label>
                        <input type="text" name='education' value={person?.education} disabled class=" input input-bordered w-full input-sm max-w-xs" /> <br />
                    </form>
                </div>
                <div className='md:w-80 my-10 text-center'>
                    <p className='text-2xl text-center text-accent-focus'>Update Your Information</p>
                    <form onSubmit={handleUpdate} id="form">
                        <label class="label">
                            <span class="label-text">Your Name:</span>
                        </label>
                        <input type="text" name='name' value={person?.name} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />
                        <label class="label">
                            <span class="label-text">Your Email:</span>
                        </label>
                        <input type="text" name='email' value={person?.email} disabled class="input input-bordered w-full input-sm max-w-xs" /> <br />
                        <label class="label">
                            <span class="label-text">Your Address:</span>
                        </label>
                        <input type="text" name='address' placeholder='Enter Your Address' class=" input input-bordered w-full input-sm max-w-xs" /> <br />
                        <label class="label">
                            <span class="label-text">Your Phone Number:</span>
                        </label>
                        <input type="number" name='phone' placeholder='Enter Your Phone Number' class=" input input-bordered w-full input-sm max-w-xs" /> <br />
                        <label class="label">
                            <span class="label-text">Your Education:</span>
                        </label>
                        <input type="text" name='education' placeholder='Enter Your Education' class=" input input-bordered w-full input-sm max-w-xs" /> <br />
                        <input className='btn my-4 w-80 bg-accent-focus border-0' type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;