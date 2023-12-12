import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: username, password: password }),
      });

      const headers = await response.headers;
      const data = await response.json();

      if (response.ok & data.success) {
          console.log('Login successful. Token:', headers.get('Authorization'));
      } else {
        console.error('Login failed. Server replied: ', data.description);

      }
    } catch (error) {
      console.error('Error during login:', error);

    }
  };

  return (
    <div className="mx-auto max-w-md p-6 rounded-md min-h-screen sm:p-10 bg-transparent dark:bg-gray-900 dark:text-gray-100">
    <div className="mb-8 text-center">
      <h1 className="justify-content-top my-3 text-4xl font-bold">Sign in</h1>
      <p className="text-sm dark:text-gray-400">Sign in to access your account</p>
    </div>
    <form novalidate="" action="" className="space-y-12">
      <div className="space-y-4">
        <div>
          <label for="email" className="block mb-2 text-sm">Email</label>
          <input type="email" name="email" id="email" placeholder="pero@riteh.hr" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label for="password" className="text-sm">Password</label>
          </div>
          <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" onChange={(event) => setPassword(event.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <button type="button" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-slate-400 dark:text-gray-900 hover:bg-slate-950 hover:text-white" onClick={handleLogin}>Sign in</button>
        </div>
      </div>
    </form>
  </div>
  );
};

export default LoginForm;
