import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Projects from "./pages/project-page/projects";
import Dashboard from "./pages/dashboard";
import { ThemeProvider, createMuiTheme } from "@mui/material";
import PeoplePage from "./pages/people/create";
import CreateProject from "./pages/project-page/create/create-project";
//import UpdateProjects from "./pages/project-page/update/update-project";
import UpdateProject from "./pages/project-page/update/update-project";
import LoginPage from "./pages/Login/login";
import UpdatePeoplePage from "./pages/people/update";

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Poppins",
        "sans-serif" // Corrected the typo here
      ].join(','),
    }
  });
  
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Routes>
        {/*<Route path="/" element={ />} />*/}
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create-new" element={<CreateProject />} />
        <Route path="/projects/update/:id" element={<UpdateProject/>} />
        <Route path="/employees" element={<UpdatePeoplePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employees/new" element={<PeoplePage />} />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
