import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import NavBar from './components/navbar';
import { AuthProvider  } from './hooks/useAuth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider  >
      <BrowserRouter>
        <NavBar />
        <App />
      </BrowserRouter>
      </AuthProvider >
    </ThemeProvider>
  </React.StrictMode>
);

