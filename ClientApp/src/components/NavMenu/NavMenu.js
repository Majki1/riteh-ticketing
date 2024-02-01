import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Cookies from 'js-cookie';


const isAuthenticated = 1;


const NavMenu = ({ isAuthenticated }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [firstName, setFirstName] = useState('');

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

    const logout = () => {
      // Remove the JWT from the cookies
      Cookies.remove('jwtToken');
      Cookies.remove('userRole');
    
      // Redirect the user to the landing page
      // Replace '/' with the path to your landing page if it's different
      window.location.href = '/';
    };
    

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
              </ul>
            </div>
            <div className="navbar-center">
              <Link className="btn btn-ghost text-xl text-white" to="/Welcome">
                Ticket System
              </Link>
            </div>
          </div>
          <div className="navbar-end">
            <h2 className='text-white'>{firstName}</h2>
            {isDropdownVisible && (
              <div className='dropdown dropdown-bottom absolute'>
              <ul
                tabIndex={1}
                className="z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={logout} className="text-white">Odjava</a>
                </li>
              </ul>
              </div>
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

