//Welcome Page
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';
import Cookies from 'js-cookie';
import NavMenu from '../components/NavMenu/NavMenu';

const isAuthenticated = 1;

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

  fetch('http://localhost:8080/api/ticket/get-ticket', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => { 
      setItems(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, []);

useEffect(() => {
  console.log(items);
}, [items]);

const [PriodropdownOpen, setPrioDropdownOpen] = useState(false);
const [ServicedropdownOpen, setServiceDropdownOpen] = useState(false);

const togglePrioDropdown = () => {
  setPrioDropdownOpen(!PriodropdownOpen);
};

const toggleServiceDropdown = () => {
  setServiceDropdownOpen(!ServicedropdownOpen);
}

return (
  <div>
    <NavMenu isAuthenticated={isAuthenticated} />
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100 mt-4">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold leading-none">Prikaz ticketa</h2>
        <button className="btn ml-4 btn-success">Otvoreni</button>
        <button className="btn ml-4 btn-warning hover:text-white">Pending</button>
        <button className="btn ml-4 btn-error">Zatvoreni</button>
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-secondary ml-4" onClick={togglePrioDropdown}>Prioritet</div>
          {PriodropdownOpen && (
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Visok</a></li>
              <li><a>Srednji</a></li>
              <li><a>Nizak</a></li>
            </ul>
          )}
        </div>
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-accent ml-4" onClick={toggleServiceDropdown}>Službe</div>
          {ServicedropdownOpen && (
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Računalni centrar</a></li>
              <li><a>Kak se ona druga zvala</a></li>
            </ul>
          )}
        </div>
        <Link className="btn glass ml-4" to="/Tickets">Novi ticket</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-700">
            <tr className="">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Kategorija</th>
              <th className="p-3 text-left">Vrijeme podizanja</th>
              <th className="p-3 text-left">Lokacija</th>
              <th className="p-3 text-left">Prioritet</th>
              <th className="p-3 text-left">Status/Detalji</th>
              {Cookies.get('userRole') === 'agent' &&<th className="p-3 text-right">Edit</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                <td className="p-3">
                  <p>{item.title}</p>
                </td>
                <td className="p-3">
                  <p>{item.kategorija}</p>
                </td>
                <td className="p-3">
                  <p>{item.createdAt}</p>
                  <p className="dark:text-gray-400">{item.time}</p>
                </td>
                <td className="p-3">
                  <p>{item.roomName}</p>
                </td>
                <td className="p-3">
                  <p>{item.priority}</p>
                </td>
                <td className="p-3 text-right">
                  {item.status === 'otvoreni' && <button className="btn no-animation btn-success">Open</button>}
                  {item.status === 'pending' && <button className="btn no-animation btn-warning">Pending</button>}
                  {item.status === 'closed' && <button className="btn no-animation btn-error">Closed</button>}
                </td>
                <td className="p-3 text-right">
                {Cookies.get('userRole') === 'agent' &&<Link className="btn glass" to>Detalji</Link>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default Welcome;