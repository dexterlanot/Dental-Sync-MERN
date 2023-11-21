// NewTransactionModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function NewTransactionModal({
  isOpen,
  onClose,
  formData,
  onFormSubmit,
  onInputChange,
}) {
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
        <h2>New Transaction</h2>
        <form className="newpatient" onSubmit={onFormSubmit}>

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
            <label>Date:</label>{" "}
            <input
              type="date"
              name="date"
              value={formData.date}
              required
              onChange={onInputChange}
            />
          </div>
          <div className="form__group">
          <label>Treatment:</label>{" "}
            <select
              type="text"
              name="treatment"
              value={formData.treatment}
              required
              onChange={onInputChange}
            >
              <option value="" disabled hidden>
                Select Treatment
              </option>
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
            <label>Amount to be Paid:</label>{" "}
            <input
              type="number"
              name="amountToBePaid"
              value={formData.amountToBePaid}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Amount Paid:</label>{" "}
            <input
              type="number"
              name="amountPaid"
              value={formData.amountPaid}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Payment Method:</label>{" "}
            <input
              type="text"
              name="paymentMethod"
              value={formData.paymentMethod}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Reference Number:</label>{" "}
            <input
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Status:</label>{" "}
            <select
              name="status"
              value={formData.status}
              onChange={onInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  );
}

export default NewTransactionModal;