import React from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const Summary = () => {
  const [loading, setLoading] = React.useState(false);
  const onStart = () => { setLoading(true) };
  const onEnd = () => { setLoading(false) };
  const containerProps = {
    'aria-busy': loading
  };
  return (
    <div className='py-10' style={{ backgroundImage: "url(https://png.pngtree.com/thumb_back/fw800/background/20190430/pngtree-vector-abstract-perspective-flyer-or-banner-with-white-backgroun-image_110332.jpg)" }}>
      <div className='text-center text-black font-bold'>
        <p className='text-5xl my-10'>MILLIONS OF BUSINESS TRUST US</p>
        <p className='text-2xl my-10'>TRY TO UNDERSTAND USERS EXPECTATIONS</p>
      </div>
      <div className='flex justify-center mt-5'>
        <div className='border-b-2 w-20 border-black'></div>
        <div className='border-b-2 w-20 mx-10 border-black'></div>
        <div className='border-b-2 w-20 border-black'></div>
      </div>
      <div className='md:flex justify-center items-center text-center my-10'>
        <div className='mx-20 my-10 md:my-0'>
          <img className='w-28 mx-auto' src="https://i.ibb.co/M9rmvZ3/img1-removebg-preview.png" alt="" />
          <p className='text-5xl my-7 font-bold text-black'>
            {/* <CountUp end={72} duration="5" onStart={onStart} onEnd={onEnd} containerProps={containerProps} /> */}
            <CountUp end={72} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
          </p>
          <p className='text-3xl font-bold text-black'>Countries</p>
        </div>
        <div className='mx-20 my-10 md:my-0'>
          <img className='w-36 mt-5 mb-0 mx-auto' src="https://i.ibb.co/YkPZLDM/img2-removebg-preview.png" alt="" />
          <p className='text-5xl my-7 font-bold text-black'>
            <CountUp end={789} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            +</p>
          <p className='text-3xl font-bold text-black'>Shipments</p>
        </div>
        <div className='mx-20 my-10 md:my-0'>
          <img className='w-36 mx-auto' src="https://i.ibb.co/sgfnHft/img3-removebg-preview.png" alt="" />
          <p className='text-5xl mb-7 font-bold text-black'>
            <CountUp end={278} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            +</p>
          <p className='text-3xl font-bold text-black'>Happy Clients</p>
        </div>
        <div className='mx-20 my-10 md:my-0'>
          <img className='w-36 mx-auto' src="https://i.ibb.co/R2Zrnw2/img4-removebg-preview.png" alt="" />
          <p className='text-5xl mb-7 font-bold text-black'>
            <CountUp end={332} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            +</p>
          <p className='text-3xl font-bold  text-black'>Feedback</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;