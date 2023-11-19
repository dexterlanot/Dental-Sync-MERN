import React from "react";

function PatientDelete({ title, message, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PatientDelete;
