//Welcome Page
import { useEffect, useState, useCallback, useRef } from 'react';
import Edit from '../components/Edit_modal';
import { Link } from 'react-router-dom';
import './pages.css';
import Cookies from 'js-cookie';
import NavMenu from '../components/NavMenu/NavMenu';
import { data } from 'autoprefixer';

const isAuthenticated = 1;

const Welcome = () => {
  const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt'));//jwt

  const [FirstName, setFirstName] = useState("");//user
  
  const [items, setItems] = useState([]);//tickets
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [PriodropdownOpen, setPrioDropdownOpen] = useState(false);
  const [ServicedropdownOpen, setServiceDropdownOpen] = useState(false);
  const [ActiondropdownOpen, setActionDropdownOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  
  const [selectedOption, setSelectedOption] = useState("1");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(selectedTicket?.roomName || '');
  const [selectedAgentID, setSelectedAgentID] = useState(null);

  const [departmentData, setDepartmentData] = useState([{}]);
  const [newStatus, setNewStatus] = useState(null);
  const [activeTicketId, setActiveTicketId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newPrio, setNewPrio] = useState(selectedTicket?.priority || null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [detailsID, setDetailsID] = useState(null);
  const [deleteID, setDeleteID] = useState(null);
  const [assignID, setAssignID] = useState(null);
  const [agents, setAgents] = useState([]);

  const[ticketSuccess, setTicketSuccess] = useState(false);
  const[ticketError, setTicketError] = useState(false);

  const [response, setResponse] = useState({});

  useEffect(() => {//agents load
    fetch('http://localhost:8080/api/employee/get-all-agents', {
      method: 'GET',
      headers: {
        'Authorization': jwt.slice(9).replaceAll("%20", ' '),
      }
    })
      .then(response => response.json())
      .then(data => setAgents(data))
      .catch(error => console.error('Error:', error));
  }, []);


  useEffect(() => {//departments load
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
        setCategories(fetchedCategories);
  
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
        setRooms(fetchedRooms);
  
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
  
    fetchRooms();
  }, []);

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

  const handleFilterChange = () => {//every filter change

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

  const handleStatusChange = () => {//status change
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
        if(data.success)
        {
          window.location.reload();
        }
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

const handleSave = () => {
  fetch('http://localhost:8080/api/ticket/get-ticket', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt.slice(9).replaceAll("%20", ' '),
    },
    body: JSON.stringify({ ticketID: detailsID })
  })
  .then(response => response.json())
  .then(data => {
    setTicketData(data);

    const formData = new FormData();

    formData.append('jsonData' , JSON.stringify({      
      parentID: detailsID,
      title: data.title,
      description: data.description,
      room: selectedLocation? selectedLocation : data.room,
      realApplicantID: data.realApplicantID? data.realApplicantID : null,
      categoryID: selectedCategoryId? selectedCategoryId : data.categoryID,
      priority: newPrio? newPrio : data.priority,}));
    

      console.log('selectedCategoryId:', selectedCategoryId);
      console.log('data:', data);

    fetch('http://localhost:8080/api/ticket/new', { 
      method: 'POST',
      headers: {
        'Authorization': jwt.slice(9).replaceAll("%20", ' '),
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setResponse(data);
      if(data.success)
      {
        setTicketSuccess(true);
        setTimeout(() => setTicketSuccess(false), 4000);
        window.location.reload();
      }
      else
      {
        setTicketError(true);
        setTimeout(() => setTicketError(false), 4000);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setTicketError(true);
      setTimeout(() => setTicketError(false), 4000);
    });
  }
  )
};

const deleteTicket = useCallback((id) => {
  fetch(`http://localhost:8080/api/ticket/delete/${id}`, { 
    method: 'DELETE',
    headers: {
      'Authorization': jwt.slice(9).replaceAll("%20", ' '),
    },
  })
  .then(response => response.json())
  .then(data => {
    setResponse(data);
    if(data.success)
    {
      window.location.reload();
    }
    else
    {
      setTicketError(true);
      setTimeout(() => setTicketError(false), 4000);
    }
  })
}, []);

const Assign = useCallback(() => {
    fetch('http://localhost:8080/api/ticket/assign-agent', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt.slice(9).replaceAll("%20", ' '),
      },
      body: JSON.stringify({ ticketID: assignID, agentID: selectedAgentID })
    })
    .then(response => response.json())
    .then(data => {
      setResponse(data);
      if(data.success)
      {
        window.location.reload();
      }
      else
      {
        setTicketError(true);
        setTimeout(() => setTicketError(false), 4000);
      }
    })
   }, [selectedAgentID, assignID]);


    

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
                    {(Cookies.get('userRole') !== 'user' && Cookies.get('userRole') !== 'agent') &&<li><a onClick={() => {document.getElementById('Edit').showModal(); toggleActionDropdown(); setDetailsID(items.ticketID);}}>Edit</a></li>}
                    {(Cookies.get('userRole') !== 'user' && Cookies.get('userRole') !== 'agent') && <li><a onClick={() => {deleteTicket(items.ticketID)}}>Delete</a></li>}
                    {(Cookies.get('userRole') !== 'user' && Cookies.get('userRole') !== 'agent') &&<li><a onClick={() => {document.getElementById('Assign').showModal(); toggleActionDropdown(); setAssignID(items.ticketID)}}>Assign to</a></li>}
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
            <select value={selectedTicket?.categoryName} onChange={e => setSelectedCategoryId(e.target.value)} className="input input-bordered w-full max-w-xs text-white">
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>            
            <label className="label"> Title </label>
            <input type="text" value={selectedTicket?.title} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <label className="label"> Location </label>
            <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="input input-bordered w-full max-w-xs">
              {rooms.map((room, index) => (
                <option key={index} value={room}>
                  {room}
                </option>
              ))}
            </select>            
            <label className="label"> Priority </label>
            <select value={selectedTicket?.priority} onChange={e => setNewPrio(e.target.value)} className="input input-bordered w-full max-w-xs">
            <option value="0">Nije određeno</option>
              <option value="3">Hitno</option>
              <option value="2">Normalno</option>
              <option value="1">Nije hitno</option>
            </select>            
            <label className="label"> ID </label>
            <input type="text" value={selectedTicket?.ticketID} placeholder="Type here" className="input input-bordered w-full max-w-xs select-none" readOnly/>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Cancel</button>
                <button className="btn btn-primary transition-all ease-in-out duration-200" onClick={() => { handleSave(); }}>Save</button>
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
              <button className="btn btn-primary" onClick={handleStatusChange}>Save</button>
            </form>
            </div>
          </div>
        </dialog>

        <dialog id="Assign" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Assign an agent</h3>
            <select value={selectedAgentID} onChange={(event) => setSelectedAgentID(event.target.value)}>
              {Cookies.get('userRole') != 'user' ? (
                agents.map((agent) => (
                  <option key={agent.agentID} value={agent.agentID}>
                    {agent.displayDetails}
                  </option>
                ))
              ) : null}
            </select>
            <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
              <button className="btn btn-primary" onClick={Assign}>Save</button>
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
    {ticketSuccess && (
    <div role="alert" className="alert alert-success">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Edit Success</span>
    </div>
  )}
  {ticketError && (
    <div role="alert" className="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Error! {response.description}</span>
    </div>
  )}
  </div>
);
}

export default Welcome;