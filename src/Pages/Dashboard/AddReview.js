import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';


const AddReview = () => {
    const [user, loading, error] = useAuthState(auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        const ratings = parseInt(e.target.ratings.value);
        if (ratings > 5 || ratings < 0) {
            toast.error("Rating Should Be 0 To 5")
            return
        }
        else {
            const text = e.target.text.value;
            const review = {
                name: user?.displayName,
                email: user?.email,
                ratings: ratings,
                text: text,
            }
            fetch("https://pacific-inlet-53322.herokuapp.com/reviews", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(review)
            })
                .then(res => res.json())
                .then(data => console.log(data))
        }
        document.getElementById("form").reset();
    }

    return (
        <div>
            <p className='text-center text-5xl text-accent-focus'>Review</p>
            <form className='md:w-64 mx-auto' id='form' onSubmit={handleSubmit}>
                <label class="label">
                    <span class="label-text">Name</span>
                </label>
                <input type="text" name='email' value={user ? user?.displayName : ""} disabled class="input w-full input-accent input-bordered" /> <br />
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="text" name='email' value={user ? user?.email : ''} disabled class="input input-accent w-full input-bordered" /> <br />
                <label class="label">
                    <span class="label-text">Ratings</span>
                </label>
                <input type="number" name='ratings' class="input input-accent w-full input-bordered" /> <br />
                <textarea name='text' class="textarea textarea-accent w-full my-4 h-24" placeholder="Enter Your text"></textarea> <br />
                <input className='btn bg-accent-focus w-full border-0' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddReview;