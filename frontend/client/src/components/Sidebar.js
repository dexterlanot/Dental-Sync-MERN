import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ isSidebarClosed, toggleSidebar }) {
  return (
    <nav className={`side-bar ${isSidebarClosed ? "close" : ""}`}>
      <div className="menu-items">
        <ul className="side-bar-links">
          <li>
            <NavLink to="/dashboard" className="side-bar-link"activeClassName="active" >
              <i className="uil uil-apps"></i>
              <span className="link-name"> Overview </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointment" className="side-bar-link" activeClassName="active">
              <i className="uil uil-schedule"></i>
              <span className="link-name"> Appointments </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/patient" className="side-bar-link" activeClassName="active">
              <i className="uil uil-users-alt"></i>
              <span className="link-name"> Patient</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/transaction" className="side-bar-link" activeClassName="active">
              <i className="uil uil-transaction"></i>
              <span className="link-name"> Transactions </span>
            </NavLink>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
