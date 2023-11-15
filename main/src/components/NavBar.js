import React from "react";
import { Link } from "react-scroll";
import "../index.css";
import logo from "../assets/logo.png";

function Navbar() {
    return (
        <nav>
            <img src={logo} className="logo" alt="Logo" />
            <div className="navigation">
                <ul>
                    <li>
                        <Link to="home" className="link" spy={true} smooth={true} duration={500}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="services" className="link" spy={true} smooth={true} duration={500}>
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link to="about" className="link" spy={true} smooth={true} duration={500}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="contact" className="link" spy={true} smooth={true} duration={500}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="appointment-link">
                            Book an Appointment
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
