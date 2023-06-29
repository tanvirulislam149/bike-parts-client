import React from 'react';
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className='text-center py-32 text-white background'>
      <div className='mx-5'>
        <p className='text-6xl font-bold rajdhani-font'>Subscribe Our Newsletter!</p>
        <p className='mt-2'>Subscribe our newsletter and all latest news of</p>
        <p>our latest product, promotion and offers</p>
        <input type="text" placeholder="Enter Your Email" class="input text-white my-5 input-bordered rounded-none bg-transparent border-2 border-gray-800 input-md w-full max-w-xs" />
        <button className='btn rounded-none subscribe-btn'>Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;