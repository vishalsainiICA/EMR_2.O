import React, { useState } from 'react';

const DashboardComponent = () => {
  // Revenue visibility state for the toggle functionality
  const [showRevenue, setShowRevenue] = useState(true);

  // Mock data for the table - functionality unchanged
  const patients = [
    {
      queueNo: "Q-104",
      name: "Rajesh Kumar",
      ageGender: "45 / Male",
      complaint: "Persistent Cough & Fever",
      paAssessment: "Completed",
      priority: "High",
      waitTime: "12 mins"
    },
    {
      queueNo: "Q-105",
      name: "Suman Sharma",
      ageGender: "32 / Female",
      complaint: "Abdominal Pain",
      paAssessment: "Completed",
      priority: "Medium",
      waitTime: "25 mins"
    }
  ];

  return (
    <div className="section active" id="dashboardSection" style={{ display: 'block' }}>
      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card" id="todaysConsultationsCard">
          <div className="card-header">
            <div>
              <div className="card-count">8</div>
              <div className="card-title">Today's Consultations</div>
            </div>
            <div className="card-icon consultation">
              <i className="fas fa-stethoscope"></i>
            </div>
          </div>
          <div className="card-trend">+2 from yesterday</div>
        </div>

        <div className="card" id="waitingPatientsCard">
          <div className="card-header">
            <div>
              <div className="card-count">3</div>
              <div className="card-title">Ready for Consultation</div>
            </div>
            <div className="card-icon waiting">
              <i className="fas fa-clock"></i>
            </div>
          </div>
          <div className="card-trend down">-1 from yesterday</div>
        </div>

        <div className="card" id="prescriptionsCard">
          <div className="card-header">
            <div>
              <div className="card-count">12</div>
              <div className="card-title">Prescriptions Today</div>
            </div>
            <div className="card-icon prescription">
              <i className="fas fa-prescription"></i>
            </div>
          </div>
          <div className="card-trend">+4 this week</div>
        </div>

        <div className="card" id="revenueCard">
          <div className="card-header">
            <div>
              <div 
                className={`revenue-amount ${!showRevenue ? 'hidden' : ''}`} 
                id="revenueAmount"
                style={!showRevenue ? { color: 'transparent', textShadow: '0 0 8px rgba(0, 0, 0, 0.2)' } : {}}
              >
                ₹ 45,600
              </div>
              <div className="card-title">Monthly Revenue</div>
            </div>
            <div className="card-icon revenue">
              <i className="fas fa-rupee-sign"></i>
            </div>
          </div>
          <div className="revenue-toggle-container">
            <span className="toggle-label">Hide Amount</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                id="revenueToggle" 
                checked={!showRevenue}
                onChange={() => setShowRevenue(!showRevenue)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Consultation Queue (on dashboard) */}
      <div className="consultation-queue">
        <div className="queue-header">
          <h2 className="queue-title">Patients Ready for Consultation</h2>
          <div className="queue-controls">
            <button className="btn btn-outline" id="refreshQueueBtn" style={{ marginRight: '10px' }}>
              <i className="fas fa-sync-alt" style={{ marginRight: '5px' }}></i>
              Refresh
            </button>
            <button className="btn btn-primary" id="callNextPatientBtn">
              <i className="fas fa-user-plus" style={{ marginRight: '5px' }}></i>
              Call Next Patient
            </button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Queue No.</th>
                <th>Patient Name</th>
                <th>Age/Gender</th>
                <th>Chief Complaint</th>
                <th>PA Assessment</th>
                <th>Priority</th>
                <th>Wait Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="dashboardQueueTable">
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.queueNo}</td>
                  <td><strong>{patient.name}</strong></td>
                  <td>{patient.ageGender}</td>
                  <td>{patient.complaint}</td>
                  <td>
                    <span className="status completed">{patient.paAssessment}</span>
                  </td>
                  <td>
                    <span className={`priority ${patient.priority.toLowerCase()}`}>
                      {patient.priority}
                    </span>
                  </td>
                  <td>{patient.waitTime}</td>
                  <td>
                    <button className="action-btn">
                      <i className="fas fa-file-medical"></i> Consult
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;