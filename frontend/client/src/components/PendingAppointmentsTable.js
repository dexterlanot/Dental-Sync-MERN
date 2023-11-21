import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function PendingAppointmentsTable() {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const appointmentsPerPage = 3;

  useEffect(() => {
    fetchPendingAppointments();
  }, [pageNumber]);

  const fetchPendingAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/appointments?status=Pending`
      );

      const totalPendingAppointments = response.data.length;

      setTotalPages(Math.ceil(totalPendingAppointments / appointmentsPerPage));

      // Filter pending appointments based on the page and limit
      const paginatedAppointments = response.data
        .slice(
          pageNumber * appointmentsPerPage,
          (pageNumber + 1) * appointmentsPerPage
        )
        .map((appointment) => ({
          ...appointment,
          date: new Date(appointment.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "UTC",
          }),
          time: new Date(`2000-01-01 ${appointment.time}`).toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
        }));

      setPendingAppointments(paginatedAppointments);
    } catch (error) {
      console.error("Error fetching pending appointments:", error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="table-section">
      <div className="table-title">
        <i class="uil uil-clock-five"></i>
        <span className="text">Pending Appointments</span>
      </div>
      <table className="pending-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th className="treatment-type">Treatment Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pendingAppointments
            .filter((appointment) => appointment.status === "Pending")
            .map((appointment) => (
              <tr
                className="animate__animated animate__fadeInUp"
                key={appointment._id}
              >
                <td>{appointment.patientName}</td>
                <td className="treatment-type">{appointment.treatmentType}</td>
                <td>
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    timeZone: "UTC",
                  })}
                </td>
                <td>
                  {new Date(
                    `2000-01-01 ${appointment.time}`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="status">
                  <span className={`status-text ${appointment.status.toLowerCase()}`}>{appointment.status}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={<i class="uil uil-previous"></i>}
        nextLabel={<i class="uil uil-step-forward"></i>}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination animate__animated animate__fadeInUp"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default PendingAppointmentsTable;
