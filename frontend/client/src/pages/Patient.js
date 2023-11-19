import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import NewPatientModal from "../components/NewPatientModal";
import EditPatientModal from "../components/EditPatientModal";
import PatientDetailsModal from "../components/PatientDetailsModal";
import PatientDelete from "../components/PatientDelete";
import ReactPaginate from "react-paginate";
import "animate.css";

function Patient({ toggleSidebar, isSidebarClosed }) {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    age: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editingPatient, setEditingPatient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all patients on component mount
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3001/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPatient) {
        // Update existing patient if editing
        await axios.put(
          `http://localhost:3001/patients/${editingPatient._id}`,
          formData
        );
      } else {
        // Create a new patient if not editing
        await axios.post("http://localhost:3001/patients", formData);
      }

      // Refresh the list of patients
      fetchPatients();

      // Reset the form data and editingPatient state
      setFormData({
        fname: "",
        lname: "",
        age: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
      });
      setEditingPatient(null);

      // Close the modals
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error creating/updating patient:", error);
    }
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new patient
      const response = await axios.post(
        "http://localhost:3001/patients",
        formData
      );

      // Create a new array with the new data at the beginning and the rest of the data following it
      const updatedPatients = [response.data, ...patients];

      // Update the state with the new array
      setPatients(updatedPatients);

      // Reset the form data
      setFormData({
        fname: "",
        lname: "",
        age: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
      });

      // Close the modal
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update existing patient if editing
      await axios.put(
        `http://localhost:3001/patients/${editingPatient._id}`,
        formData
      );

      // Refresh the list of patients
      fetchPatients();

      // Reset the form data and editingPatient state
      setFormData({
        fname: "",
        lname: "",
        age: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
      });
      setEditingPatient(null);

      // Close the modal
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const handleEdit = (patient) => {
    // Set the editingPatient state and populate the form data
    setEditingPatient(patient);
    setFormData({
      fname: patient.fname,
      lname: patient.lname,
      age: patient.age,
      gender: patient.gender,
      dateOfBirth: patient.dateOfBirth,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
    });

    // Open the Edit Patient modal
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      // Delete a patient by ID
      await axios.delete(`http://localhost:3001/patients/${id}`);
      // Refresh the list of patients
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);

  const handlePatientDetailsClick = (patient) => {
    setSelectedPatientDetails(patient);
    setIsDetailsModalOpen(true);
  };

  // delete
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const handleDeleteConfirmation = (patient) => {
    setPatientToDelete(patient);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteCancel = () => {
    setPatientToDelete(null);
    setIsDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (patientToDelete) {
      await handleDelete(patientToDelete._id);
      setPatientToDelete(null);
      setIsDeleteConfirmationOpen(false);
    }
  };

  //  search
  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.fname} ${patient.lname}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      patient.age.toString().includes(searchTerm) ||
      patient.dateOfBirth.toString().includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // pagination
  const [currentPage, setCurrentPage] = useState(0); // Add this line
  const patientsPerPage = 6;

  const indexOfLastPatient = (currentPage + 1) * patientsPerPage;
  const indexOfFirstPatient = currentPage * patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

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
                Add Patient
              </button>
            </div>
          </div>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th className="age">Age</th>
                <th>Date of Birth</th>
                <th className="email">Email</th>
                <th>Phone</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className="animate__animated animate__fadeInUp"
                >
                  <td>{`${patient.fname} ${patient.lname}`}</td>
                  <td className="age">{patient.age}</td>
                  <td>
                    {new Date(patient.dateOfBirth).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className="email">{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td className="action">
                    <button
                      className="action info"
                      onClick={() => handlePatientDetailsClick(patient)}
                    >
                      <i class="uil uil-info"></i>
                    </button>
                    <button
                      className="action edit"
                      onClick={() => handleEdit(patient)}
                    >
                      <i class="uil uil-pen"></i>
                    </button>
                    <button
                      className="action delete"
                      onClick={() => handleDeleteConfirmation(patient)}
                    >
                      <i class="uil uil-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(filteredPatients.length / patientsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
          <NewPatientModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            formData={formData}
            onFormSubmit={handleAddFormSubmit}
            onInputChange={handleInputChange}
          />
          <EditPatientModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            formData={formData}
            onFormSubmit={handleEditFormSubmit}
            onInputChange={handleInputChange}
          />
          <PatientDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            patientDetails={selectedPatientDetails}
          />
          {isDeleteConfirmationOpen && (
            <PatientDelete
              title="Confirm Deletion"
              message="Are you sure you want to delete this patient?"
              onCancel={handleDeleteCancel}
              onConfirm={handleDeleteConfirm}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Patient;
