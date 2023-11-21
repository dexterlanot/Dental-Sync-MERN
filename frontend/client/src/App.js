import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Appointment from "./pages/Appointment";
import Patient from "./pages/Patient";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";
import "./index.css";
import "./App.css";

function App() {
  const isUserSignedIn = !!localStorage.getItem("token");
  const location = useLocation();
  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className="App">
      <Navbar />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {isUserSignedIn && (
              <>
                <Route
                  path="/dashboard"
                  element={<Dashboard toggleSidebar={toggleSidebar} />}
                />
                <Route
                  path="/appointment"
                  element={<Appointment toggleSidebar={toggleSidebar} isSidebarClosed={isSidebarClosed} />}
                />
                <Route
                  path="/patient"
                  element={<Patient toggleSidebar={toggleSidebar} isSidebarClosed={isSidebarClosed} />}
                />
                <Route
                  path="/transaction"
                  element={<Transaction toggleSidebar={toggleSidebar} isSidebarClosed={isSidebarClosed} />}
                />
                <Route
                  path="/profile"
                  element={<Profile toggleSidebar={toggleSidebar} isSidebarClosed={isSidebarClosed} />}
                />
              </>
            )}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
