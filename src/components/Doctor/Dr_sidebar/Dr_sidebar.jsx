import React, { useState } from 'react';
import "./Dr_sidebar.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCog, faUser, faDashboard, faHistory, faPrescription, faSearch, faUserInjured, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { LogOut } from 'lucide-react';



const Side_bar = () => {

  const [headline, setHeadline] = useState("Dashboard")

  const navigate = useNavigate()
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="app-container"> {/* Ek wrapper div zaroori hai React return ke liye */}

      {/* Sidebar Section */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-header">
          <div className="logo">EMR</div>
          <div className="logo-text">Dr.Parcha</div>
        </div>

        <div className="nav-menu">
          <NavLink to="/dr/dashboard" className="nav-item " data-page="dashboard" onClick={() => setHeadline("Dashboard")}>
            <FontAwesomeIcon icon={faDashboard} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/dr/consultation_Queue" className="nav-item " data-page="newPatient" onClick={() => setHeadline("Consultation Queue")}>
            <FontAwesomeIcon icon={faUserMd} />
            <span>Consultation Queue</span>
          </NavLink>
          <NavLink to="/dr/patientRecord" className="nav-item" data-page="initialAssessment" onClick={() => setHeadline("Patient Records")}>
            <FontAwesomeIcon icon={faUserInjured} />
            <span>Patient Records</span>
          </NavLink>
          {/* <NavLink to="Prescription" className="nav-item" data-page="patientHistory" onClick={() => setHeadline("Prescription Management")}>
            <FontAwesomeIcon icon={faPrescription} />
            <span>Prescription Management</span>
          </NavLink> */}
          <NavLink to="/dr/setting" className="nav-item" data-page="settings" onClick={() => setHeadline(" Settings")} >
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </NavLink>
          <div className="menu-item logout-item" onClick={handleLogout}>
            <LogOut size={16} /> <span>Sign Out</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-avatar">PA</div>
          <div className="user-info">
            <h4>Dr.Mahesh Kumar</h4>
            <p>Cardiology</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <button className="mobile-toggle" id="mobileToggle">
            <i className="fas fa-bars"></i>
          </button>
          <div className="header-title">
            <h1 id="pageTitle">{headline}</h1>
          </div>

          <div className="header-actions">
            {/* <div className="search-box">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                id="globalSearch"
                placeholder="Search patients, records..."
              />
            </div> */}

            <div className="notification" id="notificationBtn">
              <i className="far fa-bell"></i>
              <FontAwesomeIcon icon={faBell} />
              <div className="notification-badge">3</div>
            </div>

          </div>
        </div>

        {/* Content Area */}
        <div className="content">


          <Outlet />


        </div>
      </div>

    </div>
  );
};

export default Side_bar;