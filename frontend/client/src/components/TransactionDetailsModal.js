// TransactionDetailsModal.js
import React from "react";

function TransactionDetailsModal({ isOpen, onClose, transactionDetails }) {
  if (!isOpen || !transactionDetails) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="patient-details-modal">
        <span className="close-btn" onClick={onClose}>
          <i className="uil uil-arrow-left"></i>
        </span>
        <h2>Transaction Details</h2>
        <div className="patient-details">
          <p>
            <strong>Patient Name:</strong>{" "}
            {transactionDetails.patientName}
          </p>
          <p>
            <strong>Treatment:</strong> {transactionDetails.treatment}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(transactionDetails.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              timeZone: "UTC",
            })}
          </p>
          <p>
            <strong>Amount to be Paid:</strong> {transactionDetails.amountToBePaid}
          </p>
          <p>
            <strong>Amount Paid:</strong> {transactionDetails.amountPaid}
          </p>
          <p>
            <strong>Remaining Balance:</strong> {transactionDetails.remainingBalance}
          </p>
          <p>
            <strong>Status:</strong> {transactionDetails.status}
          </p>
          <p>
            <strong>Payment Method:</strong> {transactionDetails.paymentMethod}
          </p>
          <p>
            <strong>Reference Number:</strong> {transactionDetails.referenceNumber}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetailsModal;
