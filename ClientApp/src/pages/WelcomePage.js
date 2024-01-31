//Welcome Page
import { useEffect, useState, useCallback } from 'react';
import Edit from '../components/Edit_modal';
import { Link } from 'react-router-dom';
import './pages.css';
import Cookies from 'js-cookie';
import NavMenu from '../components/NavMenu/NavMenu';

const isAuthenticated = 1;

const Welcome = () => {
  const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt'));
  const [departmentData, setDepartmentData] = useState([{}]);
  const [FirstName, setFirstName] = useState("");
  const [isTableVisible, setTableVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [PriodropdownOpen, setPrioDropdownOpen] = useState(false);
  const [ServicedropdownOpen, setServiceDropdownOpen] = useState(false);
  const [ActiondropdownOpen, setActionDropdownOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState("1");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [activeTicketId, setActiveTicketId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/department/get-all', {
      method: 'GET',
      headers: {
        'Authorization': jwt.slice(9).replaceAll("%20", ' '),
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => setDepartmentData(data))
      .catch(error => console.error('Error:', error));
  }, []);


  const toggleTableVisibility = () => {
    setTableVisible(!isTableVisible);
  };

  useEffect(() => {//jwt load
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

  useEffect(() => {//tickets load
    handleFilterChange();
  }, [selectedStatus ,selectedPriority, selectedDepartment]);

  const handleFilterChange = () => {

    const url = new URL(`http://localhost:8080/api/ticket/get-all/${selectedOption}`);
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': jwt.slice(9).replaceAll("%20", ' '),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: selectedStatus, priority: selectedPriority, departmentID: selectedDepartment}),
    };
  
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const numberOfPages = response.headers.get('numberOfPages');
        const currentPage = response.headers.get('currentPage');
  
        response.json().then(data => {
          setItems(data);
          setNumberOfPages(numberOfPages);
          setCurrentPage(currentPage);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleStatusChange = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': jwt.slice(9).replaceAll("%20", ' '),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ticketID: activeTicketId, status: newStatus}),
    };
  
    fetch('http://localhost:8080/api/ticket/change-status', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Server response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };



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
};

const handleOptionChange = (event) => {
  setSelectedOption(event.target.getAttribute("aria-label"));
};

const openModal = (ticketId) => {
  setActiveTicketId(ticketId);
  document.getElementById('Status').showModal();
  toggleActionDropdown();
};

console.log(departmentData);


return (
  <div>
    <NavMenu isAuthenticated={isAuthenticated} />
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100 mt-4">
      <div className="flex items-center mb-4"> {/* buttoni */}
        <h2 className="text-2xl font-semibold leading-none">Prikaz ticketa</h2>
        <button onClick={() => { setSelectedStatus(null); setSelectedPriority(null); setSelectedDepartment(null)}} className="btn btn-error bg-amber-700 ml-4 border-amber-700 hover:bg-amber-700 hover:border-amber-700">Reset filters</button>
        <button onClick={() => { setSelectedStatus('Otvoren'); }} className="btn ml-4 btn-success">Otvoreni</button>
        <button onClick={() => { setSelectedStatus('U rješavanju'); }} className="btn ml-4 btn-warning hover:text-white">U rješavanju</button>
        <button onClick={() => { setSelectedStatus('Riješen');  }} className="btn ml-4 btn-primary">Riješeni</button>
        <button onClick={() => { setSelectedStatus('Zaključen'); }} className="btn ml-4 btn-error">Zatvoreni</button>
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-secondary ml-4" onClick={togglePrioDropdown}>Prioritet</div>
          {PriodropdownOpen && (
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a onClick={() => { setSelectedPriority(3); }}>Hitno</a></li>
              <li><a onClick={() => { setSelectedPriority(2); }}>Normalno</a></li>
              <li><a onClick={() => { setSelectedPriority(1); }}>Nije hitno</a></li>
            </ul>
          )}
        </div>
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-accent ml-4" onClick={toggleServiceDropdown}>Službe</div>
          {ServicedropdownOpen && (
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {departmentData?.map((department, index) => (
                  <li><button 
                  key={index} 
                  value={department.departmentName} 
                  title={department.departmentName}
                  onClick={() => { setSelectedDepartment(department.departmentID); }}
                  >
                    {department.departmentName}
                  </button></li>
                ))}
              </ul>
          )}
        </div>
        <Link className="btn glass ml-4" to="/Tickets">Novi ticket</Link>
      </div>

      <div className="overflow-x-auto">{/* tablica i page buttoni*/}
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
                  {items.status === 'Otvoren' && <button className="btn no-animation btn-success">Otvoren</button>}
                  {items.status === 'U rješavanju' && <button className="btn no-animation btn-warning">U rjesavanju</button>}
                  {items.status === 'Riješen' && <button className="btn no-animation btn-error">Rijesen</button>}
                  {items.status === 'Zaključen' && <button className="btn no-animation btn-error">Zakljucen</button>}
                </td>
                <td className="p-3 text-right">
                <button className="btn border-transparent bg-transparent" onClick={() => toggleActionDropdown(items.ticketID)}>...</button>
                {openDropdownId === items.ticketID && (
                  <>
                  <ul tabIndex={0} className="dropdown-content dropdown-left z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 absolute">
                    <li><Link to={`/Details/${items.ticketID}`}>Details</Link></li>
                    {Cookies.get('userRole') !== 'user' && <li><a onClick={() => openModal(items.ticketID)}>Change status</a></li>}
                    {(Cookies.get('userRole') !== 'user' && Cookies.get('userRole') !== 'agent') &&<li><a onClick={() => {document.getElementById('Edit').showModal(); toggleActionDropdown();}}>Edit</a></li>}
                    {(Cookies.get('userRole') !== 'user' && Cookies.get('userRole') !== 'agent') && <li><a>Delete</a></li>}
                    {(Cookies.get('userRole') !== 'user' && Cookies.get('userRole') !== 'agent') &&<li><a>Assign to</a></li>}
                  </ul>
                  </>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

          <dialog id="Edit" className="modal">
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
            <label className="label"> ID </label>
            <input type="text" value={selectedTicket?.ticketID} placeholder="Type here" className="input input-bordered w-full max-w-xs" readOnly/>

            <div className="modal-action">
              <button className="btn btn-primary">Save</button>
              <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            </div>
          </div>
        </dialog>

        <dialog id="Status" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Change status</h3>
            <label className="label"> Status </label>
            <select value={selectedTicket?.status} onChange= {e => setNewStatus(e.target.value)} className="input input-bordered w-full max-w-xs">
              <option value="Otvoren">Otvoren</option>
              <option value="U rješavanju">U rješavanju</option>
              <option value="Riješen">Riješen</option>
              <option value="Zaključen">Zaključen</option>
            </select>
            <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
              <button className="btn btn-primary" onClick={{handleStatusChange}}>Save</button>
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
                onChange={() => handleOptionChange(page.toString())}
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