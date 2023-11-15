import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const handleBookAppointment = () => {
    const externalLink = "https://bit.ly/49AKv9A";

    window.open(externalLink, "_blank");
  };

  return (
    <section className="home" id="home">
      <div className="welcome-text">
        <h2 className="name">TOOTH TALKS DENTAL CLINIC</h2>
        <p>Healthy teeth conversations</p>
        <div className="button-container">
          <button onClick={handleBookAppointment}>
            How to Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
