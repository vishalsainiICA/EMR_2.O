import "./Consultation_Queue.css"
import React from 'react';

const ConsultationQueue = () => {
  // Yeh mock data table ko render karne ke liye hai
  const queueData = [
    {
      queueNo: "Q-104",
      name: "Rajesh Kumar",
      ageGender: "45 / Male",
      complaint: "Persistent Cough",
      paAssessment: "Normal",
      vitals: "BP: 120/80, Temp: 98.6°F",
      priority: "High",
      waitTime: "12 mins"
    }
  ];

  return (
    <div className="consultation-queue-wrapper section active" id="consultationQueueSection">
    {/* <div className="section" id="consultationQueueSection"> */}
      <div className="section-header">
        <h2 className="section-title">Consultation Queue</h2>
        <div className="queue-controls">
          <button className="btn btn-outline" id="refreshFullQueueBtn">
            <i className="fas fa-sync-alt"></i> Refresh Queue
          </button>
          <button className="btn btn-primary" id="callNextFullBtn" style={{ marginLeft: '10px' }}>
            <i className="fas fa-user-plus"></i> Call Next Patient
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
              <th>Vitals</th>
              <th>Priority</th>
              <th>Wait Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="consultationQueueTable">
            {/* JavaScript logic ko React map function mein convert kiya gaya hai */}
            {queueData.map((patient, index) => (
              <tr key={index}>
                <td>{patient.queueNo}</td>
                <td><strong>{patient.name}</strong></td>
                <td>{patient.ageGender}</td>
                <td>{patient.complaint}</td>
                <td>{patient.paAssessment}</td>
                <td>{patient.vitals}</td>
                <td>
                  <span className={`priority ${patient.priority.toLowerCase()}`}>
                    {patient.priority}
                  </span>
                </td>
                <td>{patient.waitTime}</td>
                <td>
                  <button className="btn btn-sm btn-primary">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultationQueue;