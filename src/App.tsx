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
        path="/dashboard"
        element={isAuthenticated ? <PeoplePage /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/projects"
        element={isAuthenticated ? <Projects /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};


export default App;