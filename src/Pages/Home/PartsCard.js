import React from 'react';
import { useNavigate } from 'react-router-dom';

const PartsCard = (props) => {
  const { _id, name, description, picture, price, quantity } = props.part;
  let navigate = useNavigate();
  const goToPurchase = () => {
    navigate(`/purchase/${_id}`);
  }

  return (
    <div class="card bg-base-100 shadow-xl">
      <figure class="px-10 pt-10">
        <img className='h-48 w-64 rounded-xl' src={picture} alt="Shoes" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title font-bold text-gray-600">{name?.toUpperCase()}</h2>
        {
          typeof description === "string" ? <p>{description}</p> :
            description?.map((d, index) => <p key={index}><span className='font-bold text-gray-600'>{d.split(":")[0]}:</span> {d.split(":")[1]}</p>)
        }
        {/* <p><span className='font-bold text-gray-600'>Min. Order Quantity:</span> 50</p>
                <p><span className='font-bold text-gray-600'>Available Quantity:</span> {quantity}</p> */}
        <p><span className='font-bold text-gray-600'>Price (Per Piece):</span> {price}</p>
        <div class="card-actions">
          <button onClick={goToPurchase} class="btn bg-accent-focus border-0">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default PartsCard;