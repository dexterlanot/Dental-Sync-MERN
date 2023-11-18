import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination"; // Import the Pagination component
import AppointmentFormModal from "../components/AppointmentFormModal";

const Appointment = ({ toggleSidebar, isSidebarClosed }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    treatmentType: "",
    dateAndTime: "",
    status: "Pending",
  });
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  useEffect(() => {
    fetch("http://localhost:3001/appointments")
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleAddNewAppointment = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className={`dashboard ${isSidebarClosed ? "close" : ""}`}>
      <Sidebar
        isSidebarClosed={isSidebarClosed}
        toggleSidebar={toggleSidebar}
      />

      <div className="overview" id="overview">
        <i className="uil uil-bars sidebar-toggle" onClick={toggleSidebar}></i>
        <div className="table">
          <div className="table_header">
            <p>Appointments</p>
            <button className="add-button" onClick={handleAddNewAppointment}>
              <i class="uil uil-file-plus-alt"></i>
              New Appointment
            </button>
          </div>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Treatment Type</th>
                <th>Date and Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((appointment) => (
                <tr key={appointment._id}>
                  <td>
                    <Link to={`/patients/${appointment.patientId}`}>
                      {appointment.patientName}{" "}
                    </Link>
                  </td>
                  <td>{appointment.treatmentType}</td>
                  <td>{appointment.dateAndTime}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AppointmentFormModal
          showForm={showForm}
          handleCloseForm={handleCloseForm}
          formData={formData}
          setFormData={setFormData}
        />

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={appointments.length}
          paginate={paginate}
        />
      </div>
    </section>
  );
};

export default Appointment;
