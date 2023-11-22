<<<<<<< HEAD
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
=======
// App.tsx
import React from 'react';
import { Routes,Route,Navigate  } from 'react-router-dom';
import Projects from './pages/project-page/projects';
import Dashboard from './pages/dashboard';
import { ThemeProvider, createTheme } from '@mui/material';
import PeoplePage from './pages/people/create';
import LoginPage from './pages/Login/login';
import UpdatePeoplePage from './pages/people/update';
import AddProject from './pages/project-page/create/index';
import UpdateProject from './pages/project-page/update';
import { useAuth } from './pages/Login/useAuth';


const App = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)

  return (

    <Routes>
      <Route
        path="/employees"
        element={isAuthenticated ? <UpdatePeoplePage /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/projects"
        element={isAuthenticated ? <Projects /> : <Navigate to="/login" />}
      />
      <Route
        path="/projects/new"
        element={isAuthenticated ? <AddProject	 /> : <Navigate to="/login" />}
      />
      <Route
        path="/projects/update/:id"
        element={isAuthenticated ? <UpdateProject	 /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/employees/new"
        element={isAuthenticated ? <PeoplePage	 /> : <Navigate to="/login" />}
      />
      
    </Routes>

  );
};


export default App;
>>>>>>> 97921c0df3474175926f11e87ddba095154d68f5
