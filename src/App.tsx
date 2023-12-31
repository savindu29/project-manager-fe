
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
//import ForgotPasswordPage from './pages/Login/ForgotPassword1';
import ForgotPasswordPage2 from './pages/Login/ForgotPassword';
import SignupPage from './pages/Login/RegisterUaerAdmin';
import AccRequest from './pages/Login/accRequest';
// import ManageResources from './pages/resource-manager';
import ManageResources from './pages/resource-manager';
import ManageResourceEmployees from './pages/resource-employees';





const App = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)

  return (

    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/newpass" element={<ForgotPasswordPage2 />} />
        {/* <Route path="/newpassAdmin" element={<ForgotPasswordPage />} /> */}
        <Route path="/accRequest" element={<AccRequest />} />

      <Route
        path="/employees"
        element={isAuthenticated ? <UpdatePeoplePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/resources"
        element={isAuthenticated ? <ManageResourceEmployees /> : <Navigate to="/login" />}
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
        path="/projects/manage-resources/:id"
        element={isAuthenticated ? <ManageResources	 /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/employees/new"
        element={isAuthenticated ? <PeoplePage	 /> : <Navigate to="/login" />}
      />
          <Route
    path="/dashboard"
    element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />}

/>
    </Routes>

  );
};


export default App;

