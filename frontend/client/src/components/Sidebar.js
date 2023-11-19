import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ isSidebarClosed, toggleSidebar }) {
  return (
    <nav className={`side-bar ${isSidebarClosed ? "close" : ""}`}>
      <div className="menu-items">
        <ul className="side-bar-links">
          <li>
            <NavLink to="/dashboard" className="side-bar-link" >
              <i className="uil uil-apps"></i>
              <span className="link-name"> Overview </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointment" className="side-bar-link" >
              <i className="uil uil-schedule"></i>
              <span className="link-name"> Appointments </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient" className="side-bar-link" >
              <i className="uil uil-users-alt"></i>
              <span className="link-name"> Patient</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ledger" className="side-bar-link" >
              <i className="uil uil-transaction"></i>
              <span className="link-name"> Transactions </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="side-bar-link profile" >
              <i className="uil uil-user-md"></i>
              <span className="link-name"> Profile </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
