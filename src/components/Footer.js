import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1A1731] py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-white font-press-start text-xl mb-4 md:mb-0">
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
          <div className="text-gray-400 mt-4 md:mt-0">
            Copyright {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
