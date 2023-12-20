import React from 'react';
import NavMenu from '../components/NavMenu/NavMenu';
const isAuthenticated = 1;


const MyTickets = ({ formData }) => {
  return (
    <>
    <NavMenu isAuthenticated={isAuthenticated} />
    <div className="min-h-screen">
      {formData && (
        <div>
          <h2>My Tickets</h2>
          {/* Display the form data here */}
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
    </>
  );
};

export default MyTickets;
