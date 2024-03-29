import React from 'react';
import discount from "../../assets/discount.png"
import support from "../../assets/support.png"

const Facilities = () => {
  return (
    <div className='md:flex justify-center items-center my-10'>
      <div className='flex justify-evenly items-center my-5 mr-3'>
        <div>
          <img className='w-24' src="https://previews.123rf.com/images/zaki31072017/zaki310720172005/zaki31072017200508463/147744935-dise%C3%B1o-de-plantilla-de-vector-plano-de-icono-de-barco-de-moda.jpg" alt="ship" />
        </div>
        <div className='pr-4 md:pr-0'>
          <p className='font-bold text-xl'>FREE DELIVERY</p>
          <p className='font-bold text-gray-400'>Order Over $1000</p>
        </div>
      </div>
      <div className='flex justify-evenly items-center md:mx-10 md:border-x-2 md:border-gray-400 md:px-10 py-5 md:py-0 my-5 mr-3'>
        <div>
          <img className='w-14 mr-3 ' src={discount} alt="ship" />
        </div>
        <div>
          <p className='font-bold text-xl'>DISCOUNT</p>
          <p className='font-bold text-gray-400'>Order Over $1000</p>
        </div>
      </div>
      <div className='flex justify-evenly items-center my-5 py-5 md:py-0 mr-3'>
        <div>
          <img className='w-12 mr-3' src="https://static.vecteezy.com/system/resources/thumbnails/006/095/886/small/undo-icon-style-free-vector.jpg" alt="ship" />
        </div>
        <div>
          <p className='font-bold text-xl'>MONEY BACK </p>
          <p className='font-bold text-gray-400'>WITHING 30 DAYS</p>
        </div>
      </div>
      <div className='flex justify-evenly items-center md:mx-10 md:border-l-2 md:border-gray-400 md:px-10  my-5 mr-0'>
        <div>
          <img className='w-14 mx-2 text-black' src={support} alt="support" />
        </div>
        <div className='pl-5 md:pl-0'>
          <p className='font-bold text-xl'>ONLINE SUPPORT</p>
          <p className='font-bold text-gray-400'>Anytime 24 / 7</p>
        </div>
      </div>
    </div>
  );
};

export default Facilities;