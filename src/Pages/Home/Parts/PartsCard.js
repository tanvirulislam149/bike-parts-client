import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./PartsCard.css";

const PartsCard = (props) => {
  const { _id, name, description, picture, price, quantity } = props.part;
  let navigate = useNavigate();
  const goToPurchase = () => {
    navigate(`/purchase/${_id}`);
  }

  return (
    <div class="card bg-base-100 shadow-2xl rounded-none">
      <figure class="px-0">
        <img className='h-64 w-64' src={picture} alt="Shoes" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="font-bold text-black">{name?.toUpperCase()}</h2>
        {/* {
          typeof description === "string" ? <p>{description}</p> :
            description?.map((d, index) => <p key={index}><span className='font-bold text-black'>{d.split(":")[0]}:</span> {d.split(":")[1]}</p>)
        }
        <p><span className='font-bold text-black'>Min. Order Quantity:</span> 50</p>
                <p><span className='font-bold text-black'>Available Quantity:</span> {quantity}</p>
        <p><span className='font-bold text-black'>Price (Per Piece):</span> {price}</p> */}
        <p className='font-bold text-2xl text-black'>${price}</p>
        <div class="card-actions">
          <button onClick={goToPurchase} class="btn order-btn rounded-none border-0">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default PartsCard;