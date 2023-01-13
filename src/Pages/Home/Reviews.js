import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://autoparts-vsj8.onrender.com/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [])


  return (
    <div className='mx-3 md:mx-20 mb-10 border-2 text-center bg-white' style={{ marginTop: "-150px" }}>
      <h2 className='text-3xl my-5 text-accent-focus'>Feedback</h2>
      <div className="mx-1">
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
            delay: 1000,
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
            reviews.map((r, index) => <SwiperSlide key={index} className="py-20 bg-accent rounded-3xl">{
              <>
                <p>{r.name}</p>
                <p className="my-4">Ratings: {r.ratings}</p>
                <p>{r.text}</p>
              </>
            }</SwiperSlide>)
          }
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;