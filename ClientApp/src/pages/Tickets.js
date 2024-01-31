import React, { useState, useEffect, useRef} from 'react';
import './pages.css';
import NavMenu from '../components/NavMenu/NavMenu';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';

const isAuthenticated = 1;

const Tickets = () => {
  const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt'));
  const editorRef = useRef(null);
  const [selectedTicket, setSelectedTicket] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    room: '',
    categoryID: '',
    parentID: '',
    rememberMe: false,
    realApplicantID: '',
    selectedFile : '',
    priority: '0',
  });
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {//users
  const fetchUsers = async () =>{
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': jwt.slice(9).replaceAll("%20", ' '),
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/user/get-users', requestOptions); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonObjects = await response.json();
      setUsers(jsonObjects);
      console.log(jsonObjects);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  fetchUsers();
  }, []);

  const navigate = useNavigate();

const submitForm = async () => {
  const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt'));
  const { title, description, room, categoryID, parentID, realApplicantID, priority} = formData;

  // Create a new FormData instance
  const form = new FormData();
  
  form.append('image', selectedFile);
  // Add the JSON data as a string
  form.append('jsonData', JSON.stringify({title, room, categoryID, realApplicantID, parentID, description, priority: null}));

  // Add the file

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': jwt.slice(9).replaceAll("%20", ' '),
    },
    body: form,
  };

  try {
    const response = await fetch('http://localhost:8080/api/ticket/new', requestOptions);
    if (!response.ok) {
      const responseBody = await response.text();
      console.error('Server responded with status', response.status, 'and body', responseBody);
      throw new Error('Failed to create ticket');
    }

    const responseData = await response.json();
    if (!responseData.success) {
      throw new Error(responseData.errorDescription);
    }

    // If the ticket creation is successful, navigate to the /Welcome route
    navigate('/Welcome');
  } catch (error) {
    console.error('Error creating ticket:', error);
    // If there's an error, show an alert
    alert('There was an error creating the ticket.');
  }
};

  const handleRoomChange = (event) => {
    const roomName = event.target.value;
    setSelectedRoom(roomName);
    setFormData({
      ...formData,
      room: roomName,
    });
  };

  useEffect(() => {//kategorije
    const fetchData = async () => {
      try {
        console.log(jwt.slice(9));
        const response = await fetch('http://localhost:8080/api/category/get-all', {
          method: 'POST',
          headers: {
            'Authorization': jwt.slice(9).replaceAll("%20", ' ')
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
  
        const fetchedCategories = await response.json();
        console.log(fetchedCategories);
        setCategories(fetchedCategories);
        setSelectedTicket(fetchedCategories.length > 0 ? fetchedCategories[0] : null);
  
        console.log('Fetched categories:', fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {//rooms
    const fetchRooms = async () => {
      try {
        const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt'));
        const response = await fetch('http://localhost:8080/api/room/get-all', {
          method: 'POST',
          headers: {
            'Authorization': jwt.slice(9).replaceAll("%20", ' ')
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
  
        const fetchedRooms = await response.json();
        console.log(fetchedRooms);
        setRooms(fetchedRooms);
        setSelectedRoom(fetchedRooms.length > 0 ? fetchedRooms[0] : null);
  
        console.log('Fetched rooms:', fetchedRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
  
    fetchRooms();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (name === 'selectedTicket') {
      const selectedCategory = categories.find(category => category.name === value);
      if (selectedCategory) {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
          categoryID: selectedCategory.id,
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

    return (
      <main>
      <NavMenu isAuthenticated={isAuthenticated} />
      <div className='min-h-screen px-5 pt-20 flex'>
        <div className="w-1/3 pr-2">
          <label htmlFor="ticket" className="mb-1 block text-sm font-medium text-white">Kategorija</label>
          <input
            type="text"
            list="ticketOptions"
            className="select select-bordered w-full max-w-xs text-white bg-slate-700"
            placeholder="Search and select a ticket"
            name='selectedTicket'
            onChange={handleChange}
          />
          <datalist id="ticketOptions">
            {categories.map((option, index) => (
              <option key={index} value={option.name} title={option.name} />
            ))}
          </datalist>
          <div className='mt-4'>
            <label className="mb-1 block text-sm font-medium text-white">Opis</label>
                  <Editor
                    apiKey='ad7uva7bm7qw480xu8rzob74602k3fws7wxex4pg171kp568'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        description: event.target.getContent(),
                      });
                    }}
                  />
                  </div>
        </div>
        

        {selectedTicket && (
          <div className="w-2/3 pl-2 mx-auto max-w-xl">
            <form action="" className="space-y-5">
              <div className="grid grid-cols-12 gap-5">

                <div className="col-span-6">
                  <label htmlFor="title" className="mb-1 block text-sm font-medium text-white">Naslov</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="Kratki opis problema"
                    value={formData.title}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                </div>


                <div className="col-span-6">
                  <label htmlFor="room" className="mb-1 block text-sm font-medium text-white">Room</label>
                  <input
                    type="text"
                    id="room"
                    name='room'
                    list="roomOptions"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="Room"
                    value={formData.room}
                    onChange={handleChange}
                  />
                  <datalist id="roomOptions">
                    {rooms.map((option, index) => (
                      <option key={index} value={option} />
                    ))}
                  </datalist>
                </div>


                <div className="col-span-6">
                  <label htmlFor="realApplicantID" className="mb-1 block text-sm font-medium text-white">ID korisnika u čije ime se otvara ticket</label>
                  <input
                    type="text"
                    id="realApplicantID"
                    name="realApplicantID"
                    list="realApplicantOptions"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-white mb-6" // Added margin-bottom here
                    placeholder="*Nije obavezno polje"
                    value={formData.realApplicantID}
                    onChange={handleChange}
                  />
                  <datalist id="realApplicantOptions">
                    {users.map((option, index) => (
                      <option key={index} value={option.userID} title={option.userID} />
                    ))}
                  </datalist>
                  </div>
  
                <div className="col-span-6">
                  <label htmlFor="image" className="block text-white text-sm font-bold mb-2">Upload Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs text-white"
                  />
                </div>

                
                <div className="col-span-12">
                  <Link
                    type="button"
                    onClick={submitForm}
                    className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
                  >
                    Submit
                  </Link>
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
