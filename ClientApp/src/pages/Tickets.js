import React, { useState, useEffect } from 'react';
import './pages.css';
import NavMenu from '../components/NavMenu/NavMenu';

const isAuthenticated = 1;

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    room: '',
    categoryID: '',
    parentID: '',
    rememberMe: false,
    realApplicantID: '',
  });
  const [categories, setCategories] = useState([]);

  const submitForm = async () => {
    const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt='));
    const { title, description, room, categoryID, parentID, realApplicantID } = formData;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, room, categoryID, parentID, realApplicantID }),
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/ticket/new', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }
  
      const responseData = await response.json();
      if (!responseData.success) {
        throw new Error(responseData.errorDescription);
      }
  
      alert('Ticket created successfully');
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Error creating ticket:' + error.message);
    }
  };

  const handleTicketChange = (event) => {
    const selectedTicket = event.target.value;
    setSelectedTicket(selectedTicket);
    setFormData((prevFormData) => ({
      ...prevFormData,
      ticket: selectedTicket,
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt='));
        const response = await fetch('http://localhost:8080/api/category/get-all', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + jwt
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
  
        const fetchedCategories = await response.json();
        setCategories(fetchedCategories);
        setSelectedTicket(fetchedCategories.length > 0 ? fetchedCategories[0] : null);
  
        console.log('Fetched categories:', fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchData();
  }, []);

    return (
      <main>
      <NavMenu isAuthenticated={isAuthenticated} />
      <div className='min-h-screen px-5 pt-20'>
        <input
          type="text"
          list="ticketOptions"
          className="select select-bordered w-full max-w-xs text-white bg-slate-700"
          placeholder="Search and select a ticket"
          onChange={handleTicketChange}
        />
        <datalist id="ticketOptions">
          {categories.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>

        {selectedTicket && (
          <div className="mx-auto max-w-xl">
            <form action="" className="space-y-5">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-6">
                  <label htmlFor="example7" className="mb-1 block text-sm font-medium text-white">Ticket</label>
                  <input
                    type="text"
                    id="example7"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="Ticket"
                    value={selectedTicket}
                    readOnly
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="title" className="mb-1 block text-sm font-medium text-white">Naslov</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="Kratki opis problema"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="room" className="mb-1 block text-sm font-medium text-white">Oznaka prostorije</label>
                  <input
                    type="text"
                    id="room"
                    name="room"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="e.g. I5"
                    value={formData.room}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="parentID" className="mb-1 block text-sm font-medium text-white">ID ticket-roditelja</label>
                  <input
                    type="text"
                    id="parentID"
                    name="parentID"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="*Nije obavezno polje"
                    value={formData.parentID}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="realApplicantId" className="mb-1 block text-sm font-medium text-white">ID korisnika u čije ime se otvara ticket</label>
                  <input
                    type="text"
                    id="realApplicantId"
                    name="realApplicantId"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="*Nije obavezno polje"
                    value={formData.realApplicantID}
                    onChange={handleChange}
                  />
                  <div class="mb-6">
                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis problema</label>
                    <input type="text" 
                    id="description" 
                    name="description"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder='*Nije obavezno polje'
                    value={formData.description}
                    onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="col-span-12">
                  <button
                    type="button"
                    onSubmit={submitForm}
                    className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      </main>
    );
  }

export default Tickets;
