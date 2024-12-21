import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import HackathonDetails from './pages/HackathonDetails';
import UserDetails from './pages/UserDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hackathon" element={<HackathonDetails />} />
        <Route path="/user" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
