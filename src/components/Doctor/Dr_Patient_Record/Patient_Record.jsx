import React from 'react';
import "./Patient_Record.css"

const PatientRecords = () => {
  // Yeh mock data table structure ko maintain karne ke liye hai
  const records = [
    {
      id: "P-5001",
      name: "Anita Verma",
      ageGender: "28 / Female",
      lastConsultation: "12 Oct 2023",
      complaint: "Migraine",
      paAssessment: "Routine Checkup",
      status: "Stable"
    }
  ];

  return (
    <div className="section" id="patientRecordsSection">
      <div className="section-header">
        <h2 className="section-title">Patient Records</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="search-box" style={{ width: '300px' }}>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              id="patientSearch" 
              placeholder="Search patients..." 
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Age/Gender</th>
              <th>Last Consultation</th>
              <th>Chief Complaint</th>
              <th>PA Assessment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="patientRecordsTable">
            {/* React Mapping for Table Rows */}
            {records.map((patient, index) => (
              <tr key={index}>
                <td>{patient.id}</td>
                <td><strong>{patient.name}</strong></td>
                <td>{patient.ageGender}</td>
                <td>{patient.lastConsultation}</td>
                <td>{patient.complaint}</td>
                <td>{patient.paAssessment}</td>
                <td>
                  <span className="status-badge" style={{ padding: '4px 8px', borderRadius: '4px', background: '#e1f5fe', color: '#01579b' }}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm" title="View History">
                    <i className="fas fa-history"></i>
                  </button>
                  <button className="btn btn-sm" title="Edit Record" style={{ marginLeft: '5px' }}>
                    <i className="fas fa-edit"></i>
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

export default PatientRecords;