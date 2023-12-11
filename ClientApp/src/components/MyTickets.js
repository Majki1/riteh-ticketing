import React from 'react';

const MyTickets = ({ formData }) => {
  return (
    <div className="min-h-screen">
      {formData && (
        <div>
          <h2>My Tickets</h2>
          {/* Display the form data here */}
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
