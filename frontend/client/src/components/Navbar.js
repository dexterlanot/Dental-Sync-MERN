import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import logo from '../assets/client-logo.png';

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-8 mr-3" alt="Logo" />
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="text-gray-900 hover:text-blue-700">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-gray-900 hover:text-blue-700">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
