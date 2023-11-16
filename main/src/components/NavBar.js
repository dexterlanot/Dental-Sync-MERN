import React, { useState } from "react";
import { Link } from "react-scroll";
import "../index.css";
import logo from "../assets/logo.png";

function Navbar() {
  const handleBookAppointment = () => {
    const externalLink = "https://bit.ly/49AKv9A";

    window.open(externalLink, "_blank");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={isMenuOpen ? "open" : ""}>
      <Link to="home" spy={true} smooth={true} duration={500}>
        <img src={logo} className="logo" alt="Logo" />
      </Link>
      <div className="navigation">
        <ul>
          <li>
            <Link
              to="home"
              className="link"
              spy={true}
              smooth={true}
              duration={500}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="services"
              className="link"
              spy={true}
              smooth={true}
              duration={500}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="about"
              className="link"
              spy={true}
              smooth={true}
              duration={500}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              className="link"
              spy={true}
              smooth={true}
              duration={500}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link to="/" className="appointment-link">
              Book an Appointment
            </Link>
          </li>
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              style={{ fill: "rgba(11,96,120,1)" }}
            >
              <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              style={{ fill: "rgba(11,96,120,1)" }}
            >
              <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
            </svg>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
