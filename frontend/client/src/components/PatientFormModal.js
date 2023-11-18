import React, { useState } from "react";

const PatientFormModal = ({ showForm, handleCloseForm, handleAddPatient }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    gender: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic if needed
    handleAddPatient(formData);
    handleCloseForm();
  };

  return (
    showForm && (
      <div className="modal-overlay">
        <div className="appointment-form-modal">
          <form>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />

            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <div className="button-container">
              <button type="submit">Add Patient</button>
              <button type="button" onClick={handleCloseForm}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default PatientFormModal;
