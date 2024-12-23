import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HackathonDetails from './pages/HackathonDetails';
import UserDetails from './pages/UserDetails';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hackathon" element={<HackathonDetails />} />
      <Route path="/user" element={<UserDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;