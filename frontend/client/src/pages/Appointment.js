import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function Appointment({ toggleSidebar, isSidebarClosed }) {
  return (
    <section className={`dashboard ${isSidebarClosed ? "close" : ""}`}>
      <Sidebar
        isSidebarClosed={isSidebarClosed}
        toggleSidebar={toggleSidebar}
      />
      <div className="overview" id="overview">
        <i className="uil uil-bars sidebar-toggle" onClick={toggleSidebar}></i>
        <p>
        Appointment
        </p>
      </div>
    </section>
  );
}

export default Appointment;
