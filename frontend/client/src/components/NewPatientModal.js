import React from "react";

function NewPatientModal({
  isOpen,
  onClose,
  formData,
  onFormSubmit,
  onInputChange,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>
          <i class="uil uil-arrow-left"></i>
        </span>
        <h2>New Patient</h2>
        <form className="newpatient" onSubmit={onFormSubmit}>
          <div className="form__group">
            <label>First Name:</label>{" "}
            <input
              type="text"
              name="fname"
              value={formData.fname}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Last Name:</label>{" "}
            <input
              type="text"
              name="lname"
              value={formData.lname}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Age:</label>{" "}
            <input
              type="number"
              name="age"
              value={formData.age}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Date of Birth:</label>{" "}
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Email:</label>{" "}
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.phone}
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Address:</label>{" "}
            <textarea
              name="address"
              required
              value={formData.address}
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
                  checked={formData.gender === "Male"}
                  onChange={onInputChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={onInputChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={onInputChange}
                />
                Other
              </label>
            </div>
          </div>

          <button type="submit">Add Patient</button>
        </form>
      </div>
    </div>
  );
}

export default NewPatientModal;
