import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function Profile({ toggleSidebar, isSidebarClosed }) {
  return (
    <section className={`dashboard ${isSidebarClosed ? "close" : ""}`}>
      <Sidebar
        isSidebarClosed={isSidebarClosed}
        toggleSidebar={toggleSidebar}
      />
      <div className="overview" id="overview">
        <i className="uil uil-bars sidebar-toggle" onClick={toggleSidebar}></i>
        <p>
        Profile
        </p>
      </div>
    </section>
  );
}

export default Profile;
