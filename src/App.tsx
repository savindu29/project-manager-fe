import React, { useEffect } from 'react';
import { useAuth } from './pages/Login/useAuth';
import LoginPage from './pages/Login/login';
import SignupPage from './pages/Login/Register';
import Dashboard from './pages/dashboard';


const App: React.FC = () => {
  // Replace 'yourAuthTokenKey' with the key you use to store the authentication token in local storage
  const isAuthenticated = Boolean(localStorage.getItem('loginToken'));
  useEffect(() => {
    console.log('Authentication status:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? (
        // User is authenticated, render the DashboardPage
        <Dashboard />
      ) : (
        // User is not authenticated, render the LoginPage
        <LoginPage />
      )}
    </div>
  );
};

export default App;
