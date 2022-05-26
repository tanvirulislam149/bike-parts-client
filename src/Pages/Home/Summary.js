import React from 'react';
import CountUp from 'react-countup';

const Summary = () => {
    const [loading, setLoading] = React.useState(false);
    const onStart = () => { setLoading(true) };
    const onEnd = () => { setLoading(false) };
    const containerProps = {
        'aria-busy': loading
    };
    return (
        <div className='py-10' style={{ backgroundImage: "url(https://png.pngtree.com/thumb_back/fw800/background/20190430/pngtree-vector-abstract-perspective-flyer-or-banner-with-white-backgroun-image_110332.jpg)" }}>
            <div className='text-center text-gray-700 font-bold'>
                <p className='text-5xl my-10'>MILLIONS OF BUSINESS TRUST US</p>
                <p className='text-2xl my-10'>TRY TO UNDERSTAND USERS EXPECTATIONS</p>
            </div>
            <div className='flex justify-center mt-5'>
                <div className='border-b-2 w-20 border-gray-400'></div>
                <div className='border-b-2 w-20 mx-10 border-gray-400'></div>
                <div className='border-b-2 w-20 border-gray-400'></div>
            </div>
            <div className='md:flex justify-center text-center my-10'>
                <div className='mx-20'>
                    <img className='w-28 mx-auto' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwal4az1CCAuge9R4KO6W0Aq3mZWzFavJR7Q&usqp=CAU" alt="" />
                    <p className='text-5xl my-7 font-bold text-gray-500'><CountUp end={72} duration="5" onStart={onStart} onEnd={onEnd} containerProps={containerProps} /></p>
                    <p className='text-3xl font-bold text-gray-500'>Countries</p>
                </div>
                <div className='mx-20'>
                    <img className='w-36 mt-5 mb-14 mx-auto' src="https://www.clipartkey.com/mpngs/m/184-1843970_shipping-icon-transparent.png" alt="" />
                    <p className='text-5xl my-7 font-bold text-gray-500'><CountUp end={789} duration="5" onStart={onStart} onEnd={onEnd} containerProps={containerProps} />+</p>
                    <p className='text-3xl font-bold text-gray-500'>Shipments</p>
                </div>
                <div className='mx-20'>
                    <img className='w-36 mx-auto' src="https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/1/5/1543.1-clients-icon-iconbunny.jpg" alt="" />
                    <p className='text-5xl my-7 font-bold text-gray-500'><CountUp end={278} duration="5" onStart={onStart} onEnd={onEnd} containerProps={containerProps} />+</p>
                    <p className='text-3xl font-bold text-gray-500'>Happy Clients</p>
                </div>
                <div className='mx-20 my-10 md:my-0'>
                    <img className='w-36  mx-auto' src="https://static.vecteezy.com/system/resources/thumbnails/002/238/477/small/feedback-icon-free-vector.jpg" alt="" />
                    <p className='text-5xl my-7 font-bold text-gray-500'><CountUp end={332} duration="5" onStart={onStart} onEnd={onEnd} containerProps={containerProps} />+</p>
                    <p className='text-3xl font-bold  text-gray-500'>Feedback</p>
                </div>
            </div>
        </div>
    );
};

export default Summary;