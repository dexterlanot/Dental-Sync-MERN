import React, { useEffect, useState } from "react";

function EditPatientModal({
  isOpen,
  onClose,
  formData,
  onFormSubmit,
  onInputChange,
}) {
  const [localFormData, setLocalFormData] = useState({ ...formData });

  useEffect(() => {
    // Update localFormData when formData prop changes
    setLocalFormData({ ...formData });
  }, [formData]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>
          <i className="uil uil-arrow-left"></i>
        </span>
        <h2>Edit Patient</h2>
        <form className="newpatient" onSubmit={onFormSubmit}>
          <div className="form__group">
            <label>First Name:</label>{" "}
            <input
              type="text"
              name="fname"
              value={localFormData.fname}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Last Name:</label>{" "}
            <input
              type="text"
              name="lname"
              value={localFormData.lname}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Age:</label>{" "}
            <input
              type="number"
              name="age"
              value={localFormData.age}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Date of Birth:</label>{" "}
            <input
              type="date"
              name="dateOfBirth"
              value={localFormData.dateOfBirth}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Email:</label>{" "}
            <input
              type="email"
              name="email"
              value={localFormData.email}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Phone Number:</label>{" "}
            <input
              type="tel"
              required
              name="phone"
              value={localFormData.phone}
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Address:</label>{" "}
            <textarea
              name="address"
              required
              value={localFormData.address}
              onChange={onInputChange}
            ></textarea>
          </div>

          {/* Gender input */}
          <div className="form__group">
            <label>Gender:</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={localFormData.gender === "Male"}
                  onChange={onInputChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={localFormData.gender === "Female"}
                  onChange={onInputChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={localFormData.gender === "Other"}
                  onChange={onInputChange}
                />
                Other
              </label>
            </div>
          </div>

          <button type="submit">Update Record</button>
        </form>
      </div>
    </div>
  );
}

export default EditPatientModal;
