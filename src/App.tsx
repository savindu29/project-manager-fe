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
import SignupPage from "./pages/Login/Register";



const App = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)

  return (

    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />

      <Route
        path="/employees"
        element={isAuthenticated ? <UpdatePeoplePage /> : <Navigate to="/login" />}
      />

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