// Transaction.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import NewTransactionModal from "../components/NewTransactionModal";
import EditTransactionModal from "../components/EditTransactionModal";
import TransactionDelete from "../components/TransactionDelete";
import TransactionDetailsModal from "../components/TransactionDetailsModal";
import ReactPaginate from "react-paginate";
import "animate.css";
import "../index.css";

function Transaction({ toggleSidebar, isSidebarClosed }) {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    patientName: "",
    treatment: "",
    amountToBePaid: "",
    amountPaid: "",
    paymentMethod: "",
    referenceNumber: "",
    status: "Pending",
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 7;
  const [isTransactionDetailsModalOpen, setIsTransactionDetailsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTransaction) {
        await axios.put(
          `http://localhost:3001/transactions/${editingTransaction._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3001/transactions", formData);
      }

      fetchTransactions();

      setFormData({
        date: "",
        patientName: "",
        treatment: "",
        amountToBePaid: "",
        amountPaid: "",
        paymentMethod: "",
        referenceNumber: "",
        status: "Pending",
      });
      setEditingTransaction(null);

      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error creating/updating transaction:", error);
    }
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/transactions",
        formData
      );

      const updatedTransactions = [response.data, ...transactions];
      setTransactions(updatedTransactions);

      setFormData({
        date: "",
        patientName: "",
        treatment: "",
        amountToBePaid: "",
        amountPaid: "",
        paymentMethod: "",
        referenceNumber: "",
        status: "Pending",
      });

      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3001/transactions/${editingTransaction._id}`,
        formData
      );

      fetchTransactions();

      setFormData({
        date: "",
        patientName: "",
        treatment: "",
        amountToBePaid: "",
        amountPaid: "",
        paymentMethod: "",
        referenceNumber: "",
        status: "Pending",
      });
      setEditingTransaction(null);

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const patientName = transaction.patientName.toLowerCase();
    return (
      patientName.includes(searchTerm.toLowerCase()) ||
      transaction.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.date.includes(searchTerm) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastTransaction = (currentPage + 1) * transactionsPerPage;
  const indexOfFirstTransaction = currentPage * transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className={`dashboard ${isSidebarClosed ? "close" : ""}`}>
      <Sidebar
        isSidebarClosed={isSidebarClosed}
        toggleSidebar={toggleSidebar}
      />
      <div className="bar-toggle">
        <i className="uil uil-bars sidebar-toggle" onClick={toggleSidebar}></i>
      </div>
      <div className="overview" id="overview">
        <div className="table">
          <div className="table_header">
            <p>Transaction Records</p>
            <div className="header-controls">
              <div className="search-container">
                <i className="uil uil-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search..."
                  className="patient-search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="add-button"
                onClick={() => setIsAddModalOpen(true)}
              >
                <i className="uil uil-file-plus-alt"></i>
                New Transaction
              </button>
            </div>
          </div>
        </div>
        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th className="name">Patient</th>
                <th className="treatment-type">Treatment</th>
                <th>Date</th>
                <th className="amount">Total</th>
                <th className="amount">Paid</th>
                <th className="amount">Balance</th>
                {/* <th>Payment Method</th>
                <th>Reference Number</th> */}
                <th className="transac-status">Status </th>
                <th className="action-transac">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="animate__animated animate__fadeInUp"
                >
                  <td className="name">{transaction.patientName}</td>
                  <td className="treatment-type">{transaction.treatment}</td>
                  <td>
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className="amount">{transaction.amountToBePaid}</td>
                  <td className="amount">{transaction.amountPaid}</td>
                  <td className="amount">{transaction.remainingBalance}</td>
                  {/* <td>{transaction.paymentMethod}</td>
                  <td>{transaction.referenceNumber}</td> */}
                  <td className="transac-status">
                    <span
                      className={`status-text ${transaction.status.toLowerCase()}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="action-transac">
                  <button
                      className="action info"
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setIsTransactionDetailsModalOpen(true);
                      }}
                    >
                      <i className="uil uil-info"></i>
                    </button>
                    <button
                      className="action edit"
                      onClick={() => {
                        setEditingTransaction(transaction);
                        setFormData(transaction);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                    </button>
                    <button
                      className="action delete"
                      onClick={() => {
                        setEditingTransaction(transaction);
                        setIsDeleteConfirmationOpen(true);
                      }}
                    >
                      <i className="uil uil-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={<i className="uil uil-previous"></i>}
            nextLabel={<i className="uil uil-step-forward"></i>}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(
              filteredTransactions.length / transactionsPerPage
            )}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={
              "pagination animate__animated animate__fadeInUp"
            }
            activeClassName={"active"}
          />
          <NewTransactionModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            formData={formData}
            onFormSubmit={handleAddFormSubmit}
            onInputChange={handleInputChange}
          />
          <EditTransactionModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            formData={formData}
            onFormSubmit={handleEditFormSubmit}
            onInputChange={handleInputChange}
          />
          {isDeleteConfirmationOpen && (
            <TransactionDelete
              title="Confirm Deletion"
              message="Are you sure you want to delete this transaction?"
              onCancel={() => setIsDeleteConfirmationOpen(false)}
              onConfirm={() => {
                handleDelete(editingTransaction._id);
                setIsDeleteConfirmationOpen(false);
              }}
            />
          )}
          <TransactionDetailsModal
            isOpen={isTransactionDetailsModalOpen}
            onClose={() => setIsTransactionDetailsModalOpen(false)}
            transactionDetails={selectedTransaction}
          />
        </div>
      </div>
    </section>
  );
}

export default Transaction;
