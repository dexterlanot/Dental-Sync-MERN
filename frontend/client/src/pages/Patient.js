import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import PatientFormModal from "../components/PatientFormModal"; // Import the PatientFormModal component

const PatientList = ({ toggleSidebar, isSidebarClosed }) => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch patients from your API endpoint
    fetch("http://localhost:3001/patients")
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  const handleAddNewPatient = () => {
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
  const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem);

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
            <p>Patients</p>
            <button className="add-button" onClick={handleAddNewPatient}>
              <i className="uil uil-file-plus-alt"></i>
              New Patient
            </button>
          </div>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Date of Birth</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.dateOfBirth}</td>
                  <td>{patient.phoneNumber}</td>
                  <td>{patient.email}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PatientFormModal
          showForm={showForm}
          handleCloseForm={handleCloseForm}
          // Add necessary props related to patient form data
        />

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={patients.length}
          paginate={paginate}
        />
      </div>
    </section>
  );
};

export default PatientList;
