import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import ReactStars from "react-rating-stars-component";
import Loading from "../Loading"
import { ColorRing } from 'react-loader-spinner';


const AddReview = () => {
  const [user, loading, error] = useAuthState(auth);
  const [rating, setRating] = useState(0);
  const toastId = React.useRef(null);

  if (loading) {
    return <Loading />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (rating == 0) {
      toast.error("Please Enter Your Rating.")
      return;
    } else if (text == "") {
      toast.error("You Should Describe Your Experience.")
      return;
    } else {
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
      const review = {
        name: user?.displayName,
        email: user?.email,
        ratings: rating,
        text: text,
      }
      console.log(review);
      fetch("https://autoparts-vsj8.onrender.com/reviews", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(review)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.acknowledged) {
            toast.dismiss(toastId.current);
            toast.success("Your review is saved.")
          }
        })
    }
    document.getElementById("form").reset();
    setRating(0);
  }


  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <p className='text-5xl rajdhani-font orange-color'>Add Review</p>
      <form className='md:w-4/6' id='form' onSubmit={handleSubmit}>
        <label class="label">
          <span class="label-text mt-2">Name</span>
        </label>
        <input type="text" name='email' value={user ? user?.displayName : ""} disabled class="input w-full rounded-none input-bordered" /> <br />
        <label class="label">
          <span class="label-text mt-2">Email</span>
        </label>
        <input type="text" name='email' value={user ? user?.email : ''} disabled class="input rounded-none w-full input-bordered" /> <br />
        <label class="label pb-0">
          <span class="label-text mt-2">Ratings</span>
        </label>
        <div className='flex items-center'>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            isHalf={true}
            activeColor="#FFDE2B"
          />
          <p className='bg-black text-white text-center px-3 py-0 ml-3'>{rating}</p>
        </div>
        <textarea name='text' class="textarea rounded-none border-red-500 w-full mb-4 h-24" placeholder="Describe Your Experience"></textarea> <br />
        <input className='btn bg-red-500 hover:bg-black rounded-none w-full border-0' type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddReview;