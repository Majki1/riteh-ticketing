// postlogin.js

import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import NavMenu from './components/NavMenu';

const PostLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (userData) => {
    console.log('User data after login:', userData);

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <NavMenu isAuthenticated={isAuthenticated} />
      ) : (    
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default PostLogin;
