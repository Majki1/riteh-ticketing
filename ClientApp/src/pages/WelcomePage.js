//Welcome Page
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';
import Cookies from 'js-cookie';


const Welcome = () => {
  const [FirstName, setFirstName] = useState("");
  //const [LastName, setLastName] = useState("");
  const [isTableVisible, setTableVisible] = useState(false);
  const [items, setItems] = useState([]);

  const toggleTableVisibility = () => {
    setTableVisible(!isTableVisible);
  };

  useEffect(() => {
    const jwt = Cookies.get('jwtToken'); 
    if (!jwt) {
      console.error('JWT not found in cookies');
      return;
    }
  
    const payloadBase64Url = jwt.split('.')[1];
    const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
  
    const username = payload.firstName; 
    if (!username) {
      console.error('Username not found in JWT payload');
      return;
    }
  
    setFirstName(username); 
  }, []);

  const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt'));

useEffect(() => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': jwt.slice(9).replaceAll("%20", ' '),
      'Content-Type': 'application/json',
    },
  };

  fetch('http://localhost:8080/api/ticket/get-recently-opened-tickets', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);  
      setItems(data);
      // data is the JSON object that the API returned
      // It should have the fields: ticketID, title, room, createdAt, applicant, status
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, []);

useEffect(() => {
  console.log(items);
}, [items]);


  

    return(
        <>
          <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
            <div class="overflow-hidden border-slate-800 shadow-md">
            {isTableVisible && (
              <div class="overflow-hidden rounded-lg border border-slate-800 shadow-md">
              <table class="w-full border-collapse bg-slate-500 text-left text-sm text-white">
                <thead class="bg-slate-600">
                  <tr>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Room</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Time</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Title</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">State</th>
                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800 border-t border-slate-800">
                  <tr class="hover:bg-slate-600">
                  {items.map((item, index) => (
                    <th key={index} className="px-6 py-4 font-medium text-white">{item.applicant}</th>
                  ))}
                    <td class="px-6 py-4 text-white">{items.roomName}</td>
                    <td class="px-6 py-4 text-white">{items.createdAt}</td>
                    <td class="px-6 py-4 text-white">{items.title}</td>
                    <td class="px-6 py-4 text-white">
                    <span class="inline-flex items-center gap-1 rounded-full bg-slate-400 px-2 py-1 text-xs font-bold text-red-600 ">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                      U obradi
                    </span>
                    </td>
                  <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="/Active" class="text-primary-700">Details</a></td>
                  </tr>
                  <tr class="hover:bg-slate-600">
                    <th class="px-6 py-4 font-medium text-white">username</th>
                    <td class="px-6 py-4 text-white">room</td>
                    <td class="px-6 py-4 text-white">time</td>
                    <td class="px-6 py-4 text-white">title</td>
                    <td class="px-6 py-4 text-white">
                    <span class="inline-flex items-center gap-1 rounded-full bg-slate-400 px-2 py-1 text-xs font-bold text-red-600 ">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                      U obradi
                    </span>
                    </td>
                    <td class="flex justify-end gap-4 px-6 py-4 font-medium"><a href="/Active" class="text-primary-700">Details</a></td>
                  </tr>
                </tbody>
              </table>
              </div>
            )}
            </div>

              <div className='justify-content-start'>
                <h1 className="text-5xl bg-gradient-to-r from-green-400 to-blue-500 inline-block text-transparent bg-clip-text p-2 font-bold">Dobro došli {FirstName}</h1>
                <p className="py-6 px-2 text-white">RiTeh ticketing sustav</p>
                <Link className="btn bg-gradient-to-r text-white from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500" to= '/Tickets'>Ticket</Link>
                 <button
                className="btn bg-gradient-to-r text-white from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                onClick={toggleTableVisibility}
              >
                {isTableVisible ? 'Sakrij tablicu' : 'Aktivni ticketi'}
              </button>
              </div>
            </div>
          </div>
        </>
    );
};

export default Welcome;