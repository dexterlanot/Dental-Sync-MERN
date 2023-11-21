// Dashboard.js
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "animate.css";
import PendingAppointmentsTable from "../components/PendingAppointmentsTable";

function Dashboard() {
  const [isSidebarClosed, setSidebarClosed] = useState(false);
  const [numberOfPatients, setNumberOfPatients] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0); // Add this line
  const [pendingAppointments, setPendingAppointments] = useState(0); // Add this line
  const [totalAppointments, setTotalAppointments] = useState(0);


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

    fetchNumberOfPatients();
    fetchAppointmentsCount("Completed", setTodayAppointments);
    fetchAppointmentsCount("Pending", setPendingAppointments);
    fetchTotalAppointments();
  }, []);

  const fetchTotalAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/appointments/count"
      );

      console.log("Number of total appointments:", response.data.count);
      setTotalAppointments(response.data.count);
    } catch (error) {
      console.error("Error fetching number of total appointments:", error);
    }
  };

  const fetchAppointmentsCount = async (status, setCount) => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); // Use ISO string for comparison

      const response = await axios.get(
        `http://localhost:3001/api/appointments/count?status=${status}&date=${formattedDate}`
      );

      console.log(`Number of ${status} appointments:`, response.data.count);
      setCount(response.data.count);
    } catch (error) {
      console.error(`Error fetching number of ${status} appointments:`, error);
    }
  };

  const fetchNumberOfPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/patients/count"
      );
      console.log("Number of patients:", response.data.count); // Log the count
      setNumberOfPatients(response.data.count);
    } catch (error) {
      console.error("Error fetching number of patients:", error);
    }
  };

  return (
    <section className={`dashboard ${isSidebarClosed ? "close" : ""}`}>
      <Sidebar
        isSidebarClosed={isSidebarClosed}
        toggleSidebar={toggleSidebar}
      />
      <div className="bar-toggle">
        <i className="uil uil-bars sidebar-toggle" onClick={toggleSidebar}></i>
      </div>
      <div className="overview " id="overview">
        <div className="dash-content">
          <div className="overview-content">
            <div className="greetandinfo">
              <div className="greetings">
                <h1 className="animate__animated animate__fadeInUp">
                  {greeting} Dr. {"{Name here}"}{" "}
                </h1>
                <p className="animate__animated animate__fadeInUp">
                  Tooth Talks Dental Clinic
                </p>
              </div>
              <div className="clinic-info">
                <h4> Clinic Information </h4>
                <i className="uil uil-map-marker"></i>
                <span> Makalintal Ave, Poblacion, Bauan, Batangas </span> <br />
                <i className="uil uil-envelope-alt"></i>
                <span> toothtalksdental@gmail.com </span> <br />
                <i className="uil uil-phone"></i>
                <span> 0998 953 5223 </span>
              </div>
            </div>
            <div className="title">
              <i className="uil uil-chart"></i>
              <span className="text">Overview</span>
            </div>

            <div className="boxes">
              <div className="box box1 animate__animated animate__zoomIn">
                <div className="icon">
                  <span className="text">Pending  <br/> Appointments</span>
                  <i class="uil uil-clock-five"></i>
                </div>
                <span className="number">{pendingAppointments}</span>
              </div>
              <div className="box box2 animate__animated animate__zoomIn">
                <div className="icon">
                  <span className="text">Completed  <br/> Appointments</span>
                  <i class="uil uil-thumbs-up"></i>
                </div>
                <span className="number">{todayAppointments}</span>
              </div>
              <div className="box box3 animate__animated animate__zoomIn">
                <div className="icon">
                  <span className="text"> Scheduled </span>
                  <i class="uil uil-list-ol-alt"></i>
                </div>
                <span className="number"> {totalAppointments} </span>
              </div>
              <div className="box box4 animate__animated animate__zoomIn">
                <div className="icon">
                  <span className="text">Total <br/> Patients</span>
                  <i className="uil uil-user"></i>
                </div>
                <span className="number">{numberOfPatients}</span>
              </div>
            </div>
            <PendingAppointmentsTable />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
