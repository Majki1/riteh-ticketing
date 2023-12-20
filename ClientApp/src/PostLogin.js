// postlogin.js

import { useState } from 'react';
import LoginForm from './pages/LoginForm';
import NavMenu from './components/NavMenu/NavMenu';
import Welcome from './pages/WelcomePage';
import { BrowserRouter as Router } from 'react-router-dom';

const PostLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    console.log('User data after login:', userData);
    setUserData(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
        <NavMenu isAuthenticated={isAuthenticated} />
        <Welcome userData={userData}/>
        </>
      ) : (    
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default PostLogin;
