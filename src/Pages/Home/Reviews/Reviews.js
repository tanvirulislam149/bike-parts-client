import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Rating from "react-rating";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsQuote } from "react-icons/bs";
import "./Reviews.css"

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://autoparts-vsj8.onrender.com/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [])


  return (
    <div className='mx-3 md:mx-0 mb-20 border-0 p-3 text-center'>
      <h2 className='text-5xl my-14 orange-color font-bold rajdhani-font'>What people think about us</h2>
      <div className="swiper-cont">
        <i className="icon-arrow-long-right review-swiper-button-prev"><BsFillArrowLeftCircleFill className="left-arrow" /></i>
        <i className="icon-arrow-long-left review-swiper-button-next"><BsFillArrowRightCircleFill className="right-arrow" /></i>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          // slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination'
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            // 640: {
            //     slidesPerView: 2,
            //     spaceBetween: 10,
            // },
            // 768: {
            //     slidesPerView: 4,
            //     spaceBetween: 40,
            // },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          navigation={{
            nextEl: '.review-swiper-button-next',
            prevEl: '.review-swiper-button-prev',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {
            reviews.map((r, index) => <SwiperSlide key={index} className="py-10 border-2  border-black bg-white rounded-none text-black">{
              <>
                <p className="font-bold text-4xl mb-3 rajdhani-font">{r.name}</p>
                <p className="font-bold text-4xl mb-3 rajdhani-font">{r.ratings}.0</p>
                <Rating
                  initialRating={r.ratings}
                  readonly
                  emptySymbol={<img src="https://i.ibb.co/WyWMbK1/download-removebg-preview.png" className="icon w-5" />}
                  fullSymbol={<img src="https://i.ibb.co/VWnVT22/Star-icon-removebg-preview.png" className="icon w-5" />}
                />
                <p className="text-lg pt-2 px-10"><BsQuote className="w-10 h-10" /> {r.text}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere officiis molestiae! Sint explicabo minus quojkgh.</p>
              </>
            }</SwiperSlide>)
          }
        </Swiper>
        <div className="swiper-custom-pagination" />
      </div>
    </div>
  );
};

export default Reviews;