import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className="dashboard">
      <nav className="side-bar">
        <div className="menu-items">
          <ul className="side-bar-links">
            <li>
              <Link to="/" className="side-bar-link">
                <i class="uil uil-apps"></i>
                <span className="link-name"> Overview </span>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-bar-link">
              <i class="uil uil-schedule"></i>
                <span className="link-name"> Appointments </span>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-bar-link">
              <i class="uil uil-users-alt"></i>
                <span className="link-name"> Patient List </span>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-bar-link">
              <i class="uil uil-transaction"></i>
                <span className="link-name"> Ledger </span>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-bar-link">
              <i class="uil uil-user-md"></i>
                <span className="link-name"> Profile </span>
              </Link>
            </li>
          </ul>
          <ul className="profile">
          
          </ul>
        </div>
      </nav>
    </section>
  );
}

export default Dashboard;
