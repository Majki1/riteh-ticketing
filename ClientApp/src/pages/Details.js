import React, { useState, useEffect } from 'react';
import NavMenu from '../components/NavMenu/NavMenu';
import { useParams } from 'react-router-dom';
import './pages.css';
import Markdown from 'react-markdown';


const Details = () => {
        const isAuthenticated = 1;
        const [ticketData, setTicketData] = useState(null);
        const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt'));
        const { ticketID } = useParams();
        const [isFlipped, setIsFlipped] = useState(false);
        const [comentToggle, setComentToggle] = useState(false);

        useEffect(() => {
              
                fetch('http://localhost:8080/api/ticket/get-ticket', { 
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt.slice(9).replaceAll("%20", ' '),
                  },
                  body: JSON.stringify({ ticketID: ticketID })
                })
                .then(response => response.json())
                .then(data => setTicketData(data))
                .catch(error => console.error('Error:', error));
              }, [ticketID]);


const handleCommentToggle = () => {
  setComentToggle(!comentToggle);
}



    return (
        <>
        <NavMenu isAuthenticated={isAuthenticated}/>
        <div className="flex flex-col w-full justify-center items-center mt-4">
          {ticketData && (
            <div className={`card ${isFlipped ? 'flipped' : ''} w-full md:w-1/2 lg:w-1/2 bg-indigo-900 text-primary-content`}>
          <div className="card-body flex flex-col md:flex-row">
            {!isFlipped ? (
              <>
                <div className="w-full md:w-1/2 text-gray-300">
                <h2 className="card-title padding-top-2.5">Title</h2>
                <p className='text-gray-400'>{ticketData.title}</p>
                <h2 className="card-title padding-top-2.5">Location</h2>
                <p className='text-gray-400'>{ticketData.room}</p>
                <h2 className="card-title padding-top-2.5">Category</h2>
                <p className='text-gray-400'>{ticketData.categoryName}</p>
                <h2 className="card-title padding-top-2.5">Status</h2>
                <p className='text-gray-400'>{ticketData.status}</p>
                <h2 className="card-title padding-top-2.5">Time</h2>
                <p className='text-gray-400'>{ticketData.createdAt}</p>
                <h2 className="card-title padding-top-2.5">Description</h2>
                <div className='text-gray-400' dangerouslySetInnerHTML={{__html: ticketData.description}}/>
                <h2 className="card-title padding-top-2.5">Agents</h2>
                <p className='text-gray-400 padding-bottom-2.5'>{ticketData.agents.length === 0 ? 'Nije još dodijeljen' : ticketData.agents}</p>
              </div>
              <div className="w-full md:w-1/2 text-gray-300">
                <h2 className="card-title padding-top-2.5">Applicant</h2>
                <p className='text-gray-400'>{ticketData.applicantID}</p>
                <h2 className="card-title padding-top-2.5">Name</h2>
                <p className='text-gray-400'>{ticketData.applicantFullName}</p>
                <h2 className="card-title padding-top-2.5">Real applicant</h2>
                <p className='text-gray-400'>{ticketData.realApplicantID != null ? ticketData.realApplicantID : ticketData.applicantID}</p>
                <h2 className="card-title padding-top-2.5">Real applicant name</h2>
                <p className='text-gray-400'>{ticketData.realApplicantFullName != null ? ticketData.realApplicantFullName : ticketData.applicantFullName}</p>
                <h2 className="card-title padding-top-2.5">Department</h2>
                <p className='text-gray-400'>{ticketData.department}</p>
                <h2 className="card-title padding-top-2.5">Department Leader</h2>
                <p className='text-gray-400'>{ticketData.departmentLeaderID}</p>
                <h2 className="card-title padding-top-2.5">Department Leader Name</h2>
                <p className='text-gray-400'>{ticketData.departmentLeaderFullName}</p>
              </div>
              <button className="btn btn-primary padding-top-2.5" onClick={() => setIsFlipped(!isFlipped)}>Image</button>
              </>
            ) : (
            <div className="card-back">
              <label className="card-title text-gray-300">Description image</label>
              {ticketData.ticketImage ? <img src={`data:image/jpeg;base64,${ticketData.ticketImage}`} alt="Ticket" className='object-contain h-auto max-w-lg rounded-lg shadow-xl mx-auto dark:shadow-gray-800'/> : <p className='text-gray-400'>No image uploaded</p>}
              <button className="btn btn-primary mt-4" onClick={() => setIsFlipped(!isFlipped)}>Back</button>
            </div>
          )}
            </div>
          </div>
          )}

          <div className="divider divider-secondary"></div>

          </div>

          <div class="container mx-auto px-4 py-8">
        <div class="bg-gray-300 rounded-lg p-4 mb-4">
            <div class="flex items-center">
                <div>
                    <h2 class="font-bold">username</h2>
                    <p class="text-gray-500">09:31 21-11-2023</p>
                </div>
            </div>
            <p class="mt-4">Change that happened</p>
            <div className="flex items-center">
              <input type="text" placeholder="Enter your comment..." className="input w-full max-w-xs bg-transparent ml-4 mt-4" />
              <button class="btn bg-indigo-900 mt-4" onClick={handleCommentToggle}>Comments</button>
            </div>
        </div>
        {comentToggle && (
        <div class="bg-gray-300 rounded-lg p-4">
            <h3 class="font-bold mb-4">Comments</h3>
            <div class="border-t border-gray-200 mb-4"></div>
            <div class="mb-4">
                <div>
                    <h2 class="font-bold">Jane Smith</h2>
                    <p class="text-gray-500">@janesmith</p>
                    <p class="mt-2">Great post!</p>
               </div>
            </div>
            <div class="mb-4">
                <div>
                    <h2 class="font-bold">John Doe</h2>
                    <p class="text-gray-500">@johndoe</p>
                    <p class="mt-2">Thanks!</p>
                </div>
            </div>
        </div>
        )}
    </div>
        </>
    );
};

export default Details;