import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Projects from "./pages/project-page/projects";
import Dashboard from "./pages/dashboard";
import { ThemeProvider, createMuiTheme } from "@mui/material";
import PeoplePage from "./pages/people";

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
        <Route path="/employees" element={<PeoplePage />} />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
