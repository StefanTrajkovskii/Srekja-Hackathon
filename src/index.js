import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDetails from './pages/UserDetails';
import HackathonDetails from './pages/HackathonDetails';
import Account from './pages/Account';
import Admin from './pages/Admin';
import Hackathons from './pages/Hackathons';
import Users from './pages/Users';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/hackathon" element={<HackathonDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hackathons" element={<Hackathons />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
