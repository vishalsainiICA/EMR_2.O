import React, { useState } from 'react';
import "./md_side_bar.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCog, faDashboard, faHistory, faSearch, faUserInjured } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { LogOut } from 'lucide-react';
const Side_bar = () => {

  const navigate = useNavigate()
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const [headline, setHeadline] = useState("Dashboard")
  return (
    <div className="app-container"> {/* Ek wrapper div zaroori hai React return ke liye */}

      {/* Sidebar Section */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-header">
          <div className="logo">EMR</div>
          <div className="logo-text">Dr.Parcha</div>
        </div>

        <div className="nav-menu">
          <NavLink to="" className="nav-item " data-page="dashboard" onClick={() => setHeadline("Dashboard")}>
            <FontAwesomeIcon icon={faDashboard} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="" className="nav-item " data-page="newPatient" onClick={() => setHeadline("Patient Registration")}>
            <FontAwesomeIcon icon={faUserInjured} />
            <span>Patient Registration</span>
          </NavLink>
          <NavLink to="" className="nav-item" data-page="initialAssessment" onClick={() => setHeadline("Initial Assessments")}>
            {/* <i className="fas fa-clipboard-check"></i> */}
            <FontAwesomeIcon icon={faClipboard} />
            <span>Initial Assessments</span>
          </NavLink>
          <NavLink to="" className="nav-item" data-page="patientHistory" onClick={() => setHeadline("Patient History")}>
            {/* <i className="fas fa-history"></i> */}
            <FontAwesomeIcon icon={faHistory} />
            <span>Patient History</span>
          </NavLink>
          {/* <NavLink to="/" className="nav-item" data-page="medicalRecords">
            <i className="fas fa-file-medical"></i>
            <span>Medical Records</span>
          </NavLink>
          <NavLink to="#" className="nav-item" data-page="doctorQueue">
            <i className="fas fa-user-md"></i>
            <span>Doctor Queue</span>
          </NavLink> */}
          <NavLink to="" className="nav-item" data-page="settings" onClick={() => setHeadline("PA Settings")} >
            {/* <i className="fas fa-cog"></i> */}
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </NavLink>
          <hr />
          <div className="menu-item logout-item" onClick={handleLogout}>
            <LogOut size={16} /> <span>Sign Out</span>
          </div>

        </div>


        <div className="sidebar-footer">
          <div className="user-avatar">AB</div>
          <div className="user-info">
            <h4>Ajay Barman</h4>
            <p></p>
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