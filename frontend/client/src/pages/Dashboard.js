import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning, ");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon, ");
    } else {
      setGreeting("Good evening, ");
    }
  }, []);

  return (
    <section className={`dashboard ${isSidebarClosed ? "close" : ""}`}>
      <nav className={`side-bar ${isSidebarClosed ? "close" : ""}`}>
        <div className="menu-items">
          <ul className="side-bar-links">
            <li>
              <a href="#" className="side-bar-link">
                <i className="uil uil-apps"></i>
                <span className="link-name"> Overview </span>
              </a>
            </li>
            <li>
              <Link to="/" className="side-bar-link">
                <i className="uil uil-schedule"></i>
                <span className="link-name"> Appointments </span>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-bar-link">
                <i className="uil uil-users-alt"></i>
                <span className="link-name"> Patient</span>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-bar-link">
                <i className="uil uil-transaction"></i>
                <span className="link-name"> Ledger </span>
              </Link>
            </li>
            <li>
              <Link to="/" className="side-bar-link profile">
                <i className="uil uil-user-md"></i>
                <span className="link-name"> Profile </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="overview" id="overview">
        <i className="uil uil-bars sidebar-toggle" onClick={toggleSidebar}></i>
        <div className="dash-content">
          <div className="overview-content">
            <div className="greetandinfo">
              <div className="greetings">
                <h1>{greeting} Dr. Name </h1>
                <p>Tooth Talks Dental Clinic</p>
              </div>
              <div className="clinic-info">
                <h4> Clinic Information </h4>
                <i class="uil uil-map-marker"></i>
                <span> Makalintal Ave, Poblacion, Bauan, Batangas </span> <br />
                <i class="uil uil-envelope-alt"></i>
                <span> toothtalksdental@gmail.com </span> <br />
                <i class="uil uil-phone"></i>
                <span> 0998 953 5223 </span>
              </div>
            </div>
            <div className="title">
              <i class="uil uil-chart"></i>
              <span className="text">Overview</span>
            </div>

            <div className="boxes">
              <div className="box box1">
              <i class="uil uil-clipboard-notes"></i>
                <span className="text">Today's Appointments</span>
                <span className="number"> {'0'} </span>
              </div>
              <div className="box box2">
              <i class="uil uil-arrow-to-right"></i>
                <span className="text">Upcoming Appointments</span>
                <span className="number"> {'0'} </span>
              </div>
              <div className="box box3">
              <i class="uil uil-user"></i>
                <span className="text">Total Patients</span>
                <span className="number"> {'0'} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
