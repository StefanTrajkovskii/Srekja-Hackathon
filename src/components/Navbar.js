import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#1A1731] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-press-start text-xl">
          Hackathon Arena
        </Link>
        <div className="flex space-x-8">
          <Link to="/hackathon" className="text-orange-500 hover:text-orange-400">
            Hackatons
          </Link>
          <Link to="/user" className="text-teal-500 hover:text-teal-400">
            Users
          </Link>
          <Link to="/account" className="text-red-500 hover:text-red-400">
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
