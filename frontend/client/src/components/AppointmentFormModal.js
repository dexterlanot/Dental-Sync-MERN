import React from "react";

const AppointmentFormModal = ({ showForm, handleCloseForm, formData, setFormData }) => {
  return (
    showForm && (
      <div className="modal-overlay">
        <div className="appointment-form-modal">
          <form>
            <label>Patient ID:</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={(e) =>
                setFormData({ ...formData, patientId: e.target.value })
              }
              required
            />

            <label>Treatment Type:</label>
            <input
              type="text"
              name="treatmentType"
              value={formData.treatmentType}
              onChange={(e) =>
                setFormData({ ...formData, treatmentType: e.target.value })
              }
              required
            />

            <label>Date and Time:</label>
            <input
              type="datetime-local"
              name="dateAndTime"
              value={formData.dateAndTime}
              onChange={(e) =>
                setFormData({ ...formData, dateAndTime: e.target.value })
              }
              required
            />

            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              {/* Add other status options */}
            </select>

            <div className="button-container">
              <button type="submit">Submit</button>
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

export default AppointmentFormModal;
