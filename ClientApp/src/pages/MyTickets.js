import React from 'react';
import NavMenu from '../components/NavMenu/NavMenu';
const isAuthenticated = 1;


const MyTickets = () => {
  return (
    <>
    <NavMenu isAuthenticated={isAuthenticated} />
    <div className="min-h-screen">
        <div>
          <div className="flex flex-col items-center py-8">
            <h2 className="text-3xl font-bold text-white">Ticket Summary</h2>

          <div className="flex flex-col mt-4">
            <span className="font-medium text-gray-600">Ticket ID:</span>
            <span className="text-gray-800">#123456</span>
          </div>

          <div className="flex flex-col mt-2">
            <span className="font-medium text-gray-600">Subject:</span>
            <span className="text-gray-800">[Ticket Subject]</span>
          </div>

          <div className="flex flex-col mt-2">
            <span className="font-medium text-gray-600">Description:</span>
            <p className="text-gray-800">[Short Description]</p>
          </div>

          <div className="flex flex-col mt-4">
            <button onClick className="rounded-md bg-primary-500 text-white font-bold py-2 px-4">
              View Details
            </button>
          </div>
    </div>

        </div>
    </div>
    </>
  );
};

export default MyTickets;
