//Welcome Page
import { useEffect, useState } from 'react';
import Edit from '../components/Edit_modal';
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
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

useEffect(() => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': jwt.slice(9).replaceAll("%20", ' '),
    },
  };

  fetch(`http://localhost:8080/api/ticket/get-all/${selectedOption}`, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const numberOfPages = response.headers.get('numberOfPages');
    const currentPage = response.headers.get('currentPage');

    response.json().then(data => {
      setItems(data);
      console.log(data);
      setNumberOfPages(numberOfPages);
      setCurrentPage(currentPage);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
}, []);

useEffect(() => {
  console.log(`items:${items}`);
}, [items]);

const [PriodropdownOpen, setPrioDropdownOpen] = useState(false);
const [ServicedropdownOpen, setServiceDropdownOpen] = useState(false);
const [ActiondropdownOpen, setActionDropdownOpen] = useState(false);
const [openDropdownId, setOpenDropdownId] = useState(null);
const [selectedTicket, setSelectedTicket] = useState(null);


const togglePrioDropdown = () => {
  setPrioDropdownOpen(!PriodropdownOpen);
};

const toggleActionDropdown = (id) => {
  const ticket = items.find(item => item.ticketID === id);
  setSelectedTicket(ticket);
  setOpenDropdownId(openDropdownId === id ? null : id);
};

const toggleServiceDropdown = () => {
  setServiceDropdownOpen(!ServicedropdownOpen);
}

const [selectedOption, setSelectedOption] = useState("1");

const handleOptionChange = (event) => {
  setSelectedOption(event.target.getAttribute("aria-label"));
};

const [status, setStatus] = useState('otvoreni');



return (
  <div>
    <NavMenu isAuthenticated={isAuthenticated} />
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100 mt-4">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold leading-none">Prikaz ticketa</h2>
        <button className="btn ml-4 btn-success">Otvoreni</button>
        <button className="btn ml-4 btn-warning hover:text-white">U rješavanju</button>
        <button className="btn ml-4 btn-primary">Riješeni</button>
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
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-right">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((items, index) => (
              <tr key={index} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                <td className="p-3">
                  <p>{items.title}</p>
                </td>
                <td className="p-3">
                  <p>{items.categoryName}</p>
                </td>
                <td className="p-3">
                  <p>{items.createdAt}</p>
                </td>
                <td className="p-3">
                  <p>{items.roomName}</p>
                </td>
                <td className="p-3">
                  <p>{items.priority}</p>
                </td>
                <td className="p-3">
                  <p>{items.departmentName}</p>
                </td>
                <td className="p-3 text-right">
                  {status === 'otvoreni' && <Link to='/Details' className="btn no-animation btn-success">Otvoren</Link>}
                  {status === 'pending' && <Link to='/Details' className="btn no-animation btn-warning">Pending</Link>}
                  {status === 'rijesen' && <Link to='/Details' className="btn no-animation btn-error">Rijesen</Link>}
                  {status === 'zatvoren' && <Link to='/Details' className="btn no-animation btn-error">Zakljucen</Link>}
                </td>
                <td className="p-3 text-right">
                <button className="btn border-transparent bg-transparent" onClick={() => toggleActionDropdown(items.ticketID)}>...</button>
                {openDropdownId === items.ticketID && (
                  <>
                  <ul tabIndex={0} className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 absolute">
                    <li><Link to="/Details">Details</Link></li>
                    <li><a onClick={() => {console.log('hey')}}>Change status</a></li>
                    <li><a onClick={() => {document.getElementById('my_modal_3').showModal(); toggleActionDropdown();}}>Edit</a></li>
                    <li><a>Delete</a></li>
                    <li><a>Assign to</a></li>
                    <li><a>Set as duplicate</a></li>
                  </ul>
                  </>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Edit ticket details</h3>
            <label className="label"> Category </label>
            <input type="text" value={selectedTicket?.categoryName} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label className="label"> Title </label>
            <input type="text" value={selectedTicket?.title} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label className="label"> Location </label>
            <input type="text" value={selectedTicket?.roomName} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label className="label"> Priority </label>
            <input type="text" value={selectedTicket?.priority} placeholder="Type here" className="input input-bordered w-full max-w-xs" />

            <div className="modal-action">
              <button className="btn btn-primary">Save</button>
              <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            </div>
          </div>
        </dialog>

        <div className="flex justify-center" style={{ display: "flex", justifyContent: "center" }}>
        <div className="join">
          {Array.from({ length: numberOfPages }, (_, i) => i + 1).map((page) => (
            <input
              key={page}
              className={`${numberOfPages > 1 ? 'join-item btn btn-square' : 'btn btn-square' } `}
              type="radio"
              name="options"
              aria-label={page.toString()}
              checked={selectedOption === page.toString()}
              onChange={handleOptionChange}
            />
          ))}
        </div>
      </div>
        </div>
    </div>
  </div>
);
}

export default Welcome;