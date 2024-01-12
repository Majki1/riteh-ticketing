import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';


const isAuthenticated = 1;


const NavMenu = ({ isAuthenticated }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

    const [imageurl, setImageUrl] = useState('');
  
    useEffect(() => {
      const fetchImage = async () => {
        try {
          const jwt = document.cookie.split(';').find(cookie => cookie.startsWith('jwt'));
          const response = await fetch('http://localhost:8080/api/user/get-profile-photo', {
            method: 'POST',
            headers: {
              'Authorization': jwt.slice(9).replaceAll("%20", ' ')
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }
    
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageUrl);
          // console.log(1);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
    
      fetchImage();
    }, []);
    

  return (
    <header className='min-w-full'>
      {isAuthenticated && (
        <div className="navbar bg-base-100 border-bottom min-w-full">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-white"
              >
                <li className="txt-white">
                  <Link className="txt-white" to="/Welcome">
                    Homepage
                  </Link>
                </li>
                <li className="txt-white">
                  <Link className="txt-white" to="/Tickets">
                    Ticketi
                  </Link>
                </li>
                <li className="txt-white">
                  <Link className="txt-white" to="/MyTickets">
                    Moji ticketi
                  </Link>
                </li>
                <li className="txt-white">
                  <Link className="txt-white" to="/ZatvoreniTicketi">
                    Zatvoreni ticketi
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-center">
              <Link className="btn btn-ghost text-xl text-white" to="/Welcome">
                Ticket System
              </Link>
            </div>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle text-white">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            {isDropdownVisible && (
              <ul
                tabIndex={1}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between text-white">Profil</a>
                </li>
                <li>
                  <a className="text-white">Postavke</a>
                </li>
                <li>
                  <a className="text-white">Odjava</a>
                </li>
              </ul>
            )}
            <label
              tabIndex={1}
              className="btn btn-ghost btn-circle avatar"
              onClick={toggleDropdown}
            >
              <div className="w-10 rounded-full">
                <img src={imageurl} alt="Fetched Image" />
              </div>
            </label>
          </div>
        </div>
      )}
    </header>
  );
}


export default NavMenu;

