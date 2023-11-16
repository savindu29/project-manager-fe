import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Projects from "./pages/project-page/projects";
import Dashboard from "./pages/dashboard";
import { ThemeProvider, createMuiTheme } from "@mui/material";
import PeoplePage from "./pages/people/create";
import LoginPage from "./pages/Login/login";
import UpdatePeoplePage from "./pages/people/update";
import AddProject from "./pages/project-page/create/index"
import UpdateProject from "./pages/project-page/update";

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create-new" element={<AddProject />} />
          <Route path="/projects/update/:id" element={<UpdateProject />} />
          <Route path="/employees" element={<UpdatePeoplePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/employees/new" element={<PeoplePage />} />
          {/* Redirect the root path to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
