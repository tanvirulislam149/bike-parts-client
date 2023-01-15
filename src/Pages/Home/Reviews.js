import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Rating from "react-rating";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://autoparts-vsj8.onrender.com/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [])


  return (
    <div className='mx-3 md:mx-10 mb-10 border-2 p-3 text-center bg-gray-100' style={{ marginTop: "-150px" }}>
      <h2 className='text-5xl my-5 text-accent-focus font-bold'>Feedback</h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          // slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
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
              spaceBetween: 20,
            },
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {
            reviews.map((r, index) => <SwiperSlide key={index} style={{ height: "350px" }} className="pb-24 pt-14 bg-white rounded-3xl text-black">{
              <>
                <p className="font-bold text-3xl mb-3">{r.name}</p>
                {/* <p className="my-4">Ratings: {r.ratings}</p> */}
                <Rating
                  initialRating={r.ratings}
                  readonly
                  emptySymbol={<img src="https://i.ibb.co/WyWMbK1/download-removebg-preview.png" className="icon w-8" />}
                  fullSymbol={<img src="https://i.ibb.co/VWnVT22/Star-icon-removebg-preview.png" className="icon w-8" />}
                />
                <p className="text-lg pt-2 px-10">{r.text} Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit facere officiis molestiae! Sint explicabo minus quojkgh</p>
              </>
            }</SwiperSlide>)
          }
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;