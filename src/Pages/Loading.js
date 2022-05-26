import React from 'react';
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-96'>
            <SyncLoader color='gray' margin={5} size={20} />
        </div>
    );
};

export default Loading;