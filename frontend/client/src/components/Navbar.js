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
                  Sign out
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
