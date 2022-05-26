import React from 'react';

const Newsletter = () => {
    return (
        <div className='text-center py-48 text-white' style={{ background: "rgba(0, 0, 0, 0.6)url(https://media.istockphoto.com/photos/new-cars-at-dealer-showroom-picture-id1321105667?b=1&k=20&m=1321105667&s=170667a&w=0&h=N-IePq-AAEwr5Fk31aX4xxQD8wlPcEZmo3vDQseYWzQ=)", backgroundRepeat: "no-repeat", height: "100%", width: "100%", backgroundSize: "cover", backgroundBlendMode: "darken" }}>
            <div className='mx-5'>
                <p className='text-4xl font-bold'>Subscribe Our Newsletter!</p>
                <p className='font-bold mt-5'>Be the first to receive exclusive promotions, updates and product</p>
                <p className='font-bold'>announcements. Subscribe to our mailing list now!</p>
                <input type="text" placeholder="Enter Your Email" class="input text-black my-10 input-bordered input-md w-full max-w-xs" />
                <button className='btn'>Subscribe Now</button>
            </div>
        </div>
    );
};

export default Newsletter;