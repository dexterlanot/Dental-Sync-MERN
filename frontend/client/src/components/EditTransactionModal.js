import React from "react";

function EditTransactionModal({
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
          <i className="uil uil-arrow-left"></i>
        </span>
        <h2>Edit Transaction</h2>
        <form className="edittransaction" onSubmit={onFormSubmit}>
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
            <label>Patient Name:</label>{" "}
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              required
              onChange={onInputChange}
            />
          </div>

          <div className="form__group">
            <label>Treatment:</label>{" "}
            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              required
              onChange={onInputChange}
            />
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

          <button type="submit">Update Transaction</button>
        </form>
      </div>
    </div>
  );
}

export default EditTransactionModal;