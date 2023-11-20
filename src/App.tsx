import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Projects from "./pages/project-page/projects";
import Dashboard from "./pages/dashboard";
import { ThemeProvider, createTheme } from "@mui/material";
import PeoplePage from "./pages/people/create";
import LoginPage from "./pages/Login/login";
import UpdatePeoplePage from "./pages/people/update";
import AddProject from "./pages/project-page/create/index";
import UpdateProject from "./pages/project-page/update/update-project";
import SignupPage from "./pages/Login/Register";
import { useAuth } from "./pages/Login/useAuth";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

const PrivateRoute: React.FC<{ path: string; element: React.ReactNode }> = ({ path, element }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{element}</> : null;
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/projects/*"
            element={
              <PrivateRoute
                path="/projects/*"  // Update the path to match the intended routes
                element={
                  <Routes>
                    <Route index element={<Projects />} />
                    <Route path="create-new" element={<AddProject />} />
                    <Route path="update/:id" element={<UpdateProject />} />
                  </Routes>
                }
              />
            }
          />
          <Route
            path="/employees/*"
            element={
              <PrivateRoute
                path="/employees/*"  // Update the path to match the intended routes
                element={
                  <Routes>
                    <Route index element={<UpdatePeoplePage />} />
                    <Route path="new" element={<PeoplePage />} />
                  </Routes>
                }
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
