import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function Patient({ toggleSidebar, isSidebarClosed }) {
  return (
    <section className={`dashboard ${isSidebarClosed ? "close" : ""}`}>
      <Sidebar
        isSidebarClosed={isSidebarClosed}
        toggleSidebar={toggleSidebar}
      />
      <div className="overview" id="overview">
        <i className="uil uil-bars sidebar-toggle" onClick={toggleSidebar}></i>
        <p>
        Patient
        </p>
      </div>
    </section>
  );
}

export default Patient;
