import React from 'react';

const Banner = () => {
    return (
        <div style={{ background: "rgba(0, 0, 0, 0.4)url(https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2021/07/27122822/Ingenious-car-inventions-Cover-270720211723.jpg)", backgroundRepeat: "no-repeat", height: "", backgroundSize: "cover", backgroundBlendMode: "darken" }}>
            <div className='text-white md:pr-5 font-bold pt-64 pb-64 md:pt-10 text-center md:text-right'>
                <div className='backdrop-blur-xl p-5 md:backdrop-blur-none'>
                    <p className='text-5xl md:text-9xl'>Car Parts</p>
                    <p className='text-5xl md:text-9xl'>Manufacturer</p>
                    <p className='text-5xl md:text-5xl'>Company</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;