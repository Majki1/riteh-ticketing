import React, { useState } from 'react';
import NavMenu from '../components/NavMenu/NavMenu';

const isAuthenticated = 1;

const Details = () => {

    return (
        <>
        <NavMenu isAuthenticated={isAuthenticated}/>
        <div className="flex flex-col w-full justify-center items-center">
                <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                                <h2 className="card-title text-white">Card title!</h2>
                                <p className='text-white'>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Buy Now</button>
                                </div>
                        </div>
                </div>

                <div className="divider divider-secondary"></div>

                <div className="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
        </div>
        </>
    );
};

export default Details;