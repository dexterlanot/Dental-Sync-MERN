import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav>
      <Link to="/">
        <img src={logo} className='logo' alt="Logo" />
      </Link>
      <div className='navigation'>
        <ul>
          <li>
            <Link to="/" className='link'>
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className='link'>
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className='link'>
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>

  );
}

export default Navbar;
