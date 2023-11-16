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

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

const PrivateRoute: React.FC<{ path: string; element: React.ReactNode }> = ({ path, element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" />
  );
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/projects/*"
            element={
              <PrivateRoute
                path="/projects"
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
                path="/employees"
                element={
                  <Routes>
                    <Route index element={<UpdatePeoplePage />} />
                    <Route path="new" element={<PeoplePage />} />
                  </Routes>
                }
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
