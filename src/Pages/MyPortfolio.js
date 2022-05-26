import React from 'react';
import pic from "../ProfilePicturePhoto.jpg"

const MyPortfolio = () => {
    return (
        <div className='mt-10 mx-4 md:mx-20'>
            <div className='md:flex justify-evenly flex-row-reverse'>
                <div>
                    <img className='w-80 mx-auto rounded-3xl shadow-2xl shadow-black' src={pic} alt="" />
                </div>
                <div className='flex flex-col justify-center ml-10 my-20 md:mt-10 '>
                    <p className='text-5xl font-bold text-accent-focus'>Hi, I am</p>
                    <p className='text-7xl font-bold text-accent-focus'>Tanvirul Islam.</p>
                    <p className='text-accent-focus'>Junior FrontEnd Developer</p>
                    <p className='text-2xl my-5 font-bold text-accent-focus'>Email: tanvirulislam@gmail.com</p>
                </div>
            </div>
            <div>
                <p className='text-5xl text-accent-focus font-bold mt-20'>Education</p>
                <hr className='mb-10' />
                <div className='md:flex justify-evenly my-10'>
                    <div>
                        <p className='text-3xl text-accent-focus font-bold'>School</p>
                        <p className='text-xl font-bold'>BEPZA Public School & College</p>
                        <p className='text-xl font-bold'>2012 - 2016</p>
                    </div>
                    <div>
                        <p className='text-3xl text-accent-focus font-bold'>College</p>
                        <p className='text-xl font-bold'>BEPZA Public School & College</p>
                        <p className='text-xl font-bold'>2017 - 2019</p>
                    </div>
                </div>
            </div>
            <div>
                <p className='text-5xl text-accent-focus font-bold mt-20'>MY Projects</p>
                <hr />
                <ul className='mt-10 text-xl text-accent-focus'>
                    <li><a href="https://warehouse-management-eb91a.web.app">1) DEPOT Warehouse Management Website</a></li>
                    <li><a href="https://assignment-10-2b635.web.app">2) DENTCARE website</a></li>
                    <li><a href="https://khana-by-tanvir-f4ac12.netlify.app">3) Khana Restuarant Website</a></li>
                </ul>
                <small>Click on The Name To Visit The Website</small>
            </div>
            <div>
                <p className='text-5xl mt-10 text-accent-focus font-bold'>Skills I have</p>
                <hr />
                <ul className='my-10 text-xl text-accent-focus'>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>MongoDB</li>
                    <li>ExpressJs</li>
                </ul>
            </div>
        </div>
    );
};

export default MyPortfolio;