import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import logo from "../assets/logo.png";

function Navbar() {
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <img src={logo} className="logo" alt="Logo" />
      <div className="navigation">
        <ul>
          {isUserSignedIn ? (
            <>
              <Link to="/dashboard"></Link>
              <li>
                <button className="sign-out-button" onClick={handleSignOut}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M60.4624 15.0313C60.4105 15.0271 60.3667 15 60.3125 15H37.9168C34.471 15 31.6668 17.8042 31.6668 21.25V23.3332C31.6668 24.4833 32.5999 25.4168 33.75 25.4168C34.9001 25.4168 35.8332 24.4833 35.8332 23.3332V21.25C35.8332 20.1022 36.7686 19.1668 37.9168 19.1668H47.6229L46.9874 19.3793C45.3001 19.9625 44.1668 21.5521 44.1668 23.3332V54.5832H37.9168C36.7686 54.5832 35.8332 53.6478 35.8332 52.5V48.3332C35.8332 47.1835 34.9001 46.25 33.75 46.25C32.5999 46.25 31.6668 47.1835 31.6668 48.3332V52.5C31.6668 55.9458 34.471 58.75 37.9168 58.75H44.1668V60.8332C44.1668 63.1312 46.0352 65 48.3332 65C48.7791 65 49.2022 64.9355 49.6603 64.7936L62.1771 60.6207C63.8667 60.0375 65 58.4479 65 56.6668V19.1668C65 16.7376 62.9061 14.8333 60.4624 15.0313Z"
                      fill="#0B6078"
                    />
                    <path
                      d="M37.3061 34.3604L28.9729 26.0271C28.377 25.4313 27.4813 25.252 26.702 25.5751C25.9249 25.8978 25.4168 26.6585 25.4168 27.5V33.75H17.0832C15.9335 33.75 15 34.6835 15 35.8332C15 36.9833 15.9335 37.9168 17.0832 37.9168H25.4168V44.1668C25.4168 45.0083 25.9249 45.7686 26.702 46.0917C27.4813 46.4144 28.377 46.2355 28.9729 45.6396L37.3061 37.3061C38.1209 36.4916 38.1209 35.1752 37.3061 34.3604Z"
                      fill="#0B6078"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="link">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
