import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Loading from "../Loading";
import PartsCard from './PartsCard';

const Parts = ({ setHomeLoading }) => {
    const { isLoading, error, data: parts } = useQuery('parts', () =>
        fetch('http://localhost:5000/parts').then(res => {
            setHomeLoading(false)
            return res.json();
        })
    )

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <p className='text-5xl text-center text-gray-600 font-bold mt-20'>Parts We Provide</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 mt-10 mx-3 md:mx-14'>
                {
                    parts?.map(part => <PartsCard key={part._id} part={part}></PartsCard>)
                }
            </div>
        </div>
    );
};

export default Parts;