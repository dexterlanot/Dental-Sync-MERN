// Appointment.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import NewAppointmentModal from "../components/NewAppointmentModal";
import EditAppointmentModal from "../components/EditAppointmentModal";
import AppointmentDelete from "../components/AppointmentDelete";
import ReactPaginate from "react-paginate";
import "animate.css";
import "../index.css";

function Appointment({ toggleSidebar, isSidebarClosed }) {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    treatmentType: "",
    date: "",
    time: "",
    status: "Pending",
  });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const appointmentsPerPage = 7;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAppointment) {
        await axios.put(
          `http://localhost:3001/appointments/${editingAppointment._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3001/appointments", formData);
      }

      fetchAppointments();

      setFormData({
        patientName: "",
        treatmentType: "",
        date: "",
        time: "",
        status: "Pending",
      });
      setEditingAppointment(null);

      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error creating/updating appointment:", error);
    }
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/appointments",
        formData
      );

      const updatedAppointments = [response.data, ...appointments];
      setAppointments(updatedAppointments);

      setFormData({
        patientName: "",
        treatmentType: "",
        date: "",
        time: "",
        status: "Pending",
      });

      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3001/appointments/${editingAppointment._id}`,
        formData
      );

      fetchAppointments();

      setFormData({
        patientName: "",
        treatmentType: "",
        date: "",
        time: "",
        status: "Pending",
      });
      setEditingAppointment(null);

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = appointment.patientName.toLowerCase();
    return (
      patientName.includes(searchTerm.toLowerCase()) ||
      appointment.treatmentType
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.date.includes(searchTerm) ||
      appointment.time.includes(searchTerm) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastAppointment = (currentPage + 1) * appointmentsPerPage;
  const indexOfFirstAppointment = currentPage * appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

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
            <p>Appointment Information</p>
            <div className="header-controls">
              <div className="search-container">
                <i class="uil uil-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  className="patient-search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="add-button"
                onClick={() => setIsAddModalOpen(true)}
              >
                <i className="uil uil-file-plus-alt"></i>
                New Appointment
              </button>
            </div>
          </div>
        </div>
        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th className="treatment-type">Treatment Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="animate__animated animate__fadeInUp"
                >
                  <td>{appointment.patientName}</td>
                  <td className="treatment-type">
                    {appointment.treatmentType}
                  </td>
                  <td>
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      timeZone: "UTC",
                    })}
                  </td>
                  <td>
                    {new Date(
                      `2000-01-01 ${appointment.time}`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="status"><span className={`status-text ${appointment.status.toLowerCase()}`}>{appointment.status}</span></td>
                  <td className="action">
                    <button
                      className="action edit"
                      onClick={() => {
                        setEditingAppointment(appointment);
                        setFormData(appointment);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <i class="uil uil-pen"></i>
                    </button>
                    <button
                      className="action delete"
                      onClick={() => {
                        setEditingAppointment(appointment);
                        setIsDeleteConfirmationOpen(true);
                      }}
                    >
                      <i class="uil uil-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={<i class="uil uil-previous"></i>}
            nextLabel={<i class="uil uil-step-forward"></i>}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(
              filteredAppointments.length / appointmentsPerPage
            )}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination animate__animated animate__fadeInUp"}
            activeClassName={"active"}
          />
          <NewAppointmentModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            formData={formData}
            onFormSubmit={handleAddFormSubmit}
            onInputChange={handleInputChange}
          />
          <EditAppointmentModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            formData={formData}
            onFormSubmit={handleEditFormSubmit}
            onInputChange={handleInputChange}
          />
          {isDeleteConfirmationOpen && (
            <AppointmentDelete
              title="Confirm Deletion"
              message="Are you sure you want to delete this appointment?"
              onCancel={() => setIsDeleteConfirmationOpen(false)}
              onConfirm={() => {
                handleDelete(editingAppointment._id);
                setIsDeleteConfirmationOpen(false);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Appointment;
