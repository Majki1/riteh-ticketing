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
          <Router>
            <NavMenu isAuthenticated={isAuthenticated} onLogout={handleLogout} userData={userData} />
          </Router>
        <Welcome />
        </>
      ) : (    
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default PostLogin;
