import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "sans-serif" // Corrected the typo here
    ].join(','),
  }
});
root.render(

  
  <React.StrictMode>
         <BrowserRouter>
            <App />
            
        </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
