// EditAppointmentModal.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function EditAppointmentModal({
  isOpen,
  onClose,
  formData,
  onFormSubmit,
  onInputChange,
}) {
  const [localFormData, setLocalFormData] = useState({ ...formData });

  useEffect(() => {
    setLocalFormData({ ...formData });
  }, [formData]);

  const [patientSuggestions, setPatientSuggestions] = useState([]);

  useEffect(() => {
    // Fetch patient names from the server on component mount
    const fetchPatientNames = async () => {
      try {
        const response = await axios.get("http://localhost:3001/patients");
        const patientNames = response.data.map(
          (patient) => `${patient.fname} ${patient.lname}`
        );
        setPatientSuggestions(patientNames);
      } catch (error) {
        console.error("Error fetching patient names:", error);
      }
    };

    fetchPatientNames();
  }, []);

  const filterPatientSuggestions = (input) => {
    return patientSuggestions.filter((patient) =>
      patient.toLowerCase().includes(input.toLowerCase())
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>
          <i className="uil uil-arrow-left"></i>
        </span>
        <h2>Edit Appointment</h2>
        <form className="newappointment" onSubmit={onFormSubmit}>
          <div className="form__group">
            <label>Patient Name:</label>{" "}
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              required
              onChange={onInputChange}
              list="patientSuggestions"
            />
            <datalist id="patientSuggestions">
              {filterPatientSuggestions(formData.patientName).map(
                (suggestion) => (
                  <option key={suggestion} value={suggestion} />
                )
              )}
            </datalist>
          </div>

          <div className="form__group">
            <label>Treatment Type:</label>{" "}
            <select
              type="text"
              name="treatmentType"
              value={localFormData.treatmentType}
              required
              onChange={onInputChange}
            >
              <option value="Surgery">Surgery</option>
              <option value="Bridge/Crown">Bridge/Crown</option>
              <option value="Root Canal">Root Canal</option>
              <option value="Ortho/Braces Monthly Adjust">
                Ortho/Braces Monthly Adjust
              </option>
              <option value="Ortho/Braces Installation">
                Ortho/Braces Installation
              </option>
              <option value="Cleaning">Cleaning</option>
              <option value="Dentures">Dentures</option>
              <option value="Wisdom Tooth Extraction">
                Wisdom Tooth Extraction
              </option>
              <option value="Tooth Extraction">Tooth Extraction</option>
              <option value="Pasta/Restoration">Pasta/Restoration</option>
              <option value="Check Up">Check Up</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form__group">
            <label>Date:</label>{" "}
            <input
              type="date"
              name="date"
              value={localFormData.date}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Time:</label>{" "}
            <input
              type="time"
              name="time"
              value={localFormData.time}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Status:</label>{" "}
            <select
              name="status"
              value={localFormData.status}
              onChange={onInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <button type="submit">Update Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default EditAppointmentModal;
