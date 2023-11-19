// PatientDetailsModal.js
import React from "react";

function PatientDetailsModal({ isOpen, onClose, patientDetails }) {
  if (!isOpen || !patientDetails) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>
          <i className="uil uil-arrow-left"></i>
        </span>
        <h2>Patient Details</h2>
        <div className="patient-details">
          <p>
            <strong>Name:</strong>{" "}
            {`${patientDetails.fname} ${patientDetails.lname}`}
          </p>
          <p>
            <strong>Age:</strong> {patientDetails.age}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(patientDetails.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' })}
          </p>
          <p>
          <p>
            <strong>Gender:</strong> {patientDetails.gender}
          </p>
            <strong>Email:</strong> {patientDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {patientDetails.phone}
          </p>
          <p>
            <strong>Address:</strong> {patientDetails.address}
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default PatientDetailsModal;
