import React, { useState } from 'react';

const PatientHistory = () => {
    // 10 Dummy Records for testing
    const [patients, setPatients] = useState([
        { id: "P-1001", name: "Rahul Sharma", ageGender: "45/M", lastVisit: "2023-10-24", diagnosis: "Hypertension", totalVisits: 5 },
        { id: "P-1002", name: "Suman Devi", ageGender: "38/F", lastVisit: "2023-10-22", diagnosis: "Type 2 Diabetes", totalVisits: 3 },
        { id: "P-1003", name: "Amit Patel", ageGender: "29/M", lastVisit: "2023-10-20", diagnosis: "Common Cold", totalVisits: 1 },
        { id: "P-1004", name: "Priya Singh", ageGender: "32/F", lastVisit: "2023-10-18", diagnosis: "Migraine", totalVisits: 4 },
        { id: "P-1005", name: "Vikram Rathore", ageGender: "55/M", lastVisit: "2023-10-15", diagnosis: "Arthritis", totalVisits: 8 },
        { id: "P-1006", name: "Anjali Gupta", ageGender: "24/F", lastVisit: "2023-10-12", diagnosis: "Thyroid", totalVisits: 2 },
        { id: "P-1007", name: "Suresh Meena", ageGender: "62/M", lastVisit: "2023-10-10", diagnosis: "Post-op Checkup", totalVisits: 6 },
        { id: "P-1008", name: "Kavita Rao", ageGender: "41/F", lastVisit: "2023-10-08", diagnosis: "Anemia", totalVisits: 3 },
        { id: "P-1009", name: "Deepak Verma", ageGender: "35/M", lastVisit: "2023-10-05", diagnosis: "Viral Fever", totalVisits: 1 },
        { id: "P-1010", name: "Sunita Joshi", ageGender: "50/F", lastVisit: "2023-10-01", diagnosis: "Asthma", totalVisits: 7 }
    ]);

    return (
        <div className="section" id="patientHistorySection">

     <div className="date-filter">
          <h2 className="section-title">Patient History</h2>
                                    <div className="filter-controls">
            <input
              type="date"
              className="date-input"
              id="startDate"
              defaultValue="2023-10-01"
            />
            <span>to</span>
            <input
              type="date"
              className="date-input"
              id="endDate"
              defaultValue="2023-10-15"
            />
            <button className="filter-btn" id="applyFilterBtn">
              <i className="fas fa-filter"></i> Apply Filter
            </button>
          </div>
        </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Patient Name</th>
                            <th>Age/Gender</th>
                            <th>Last Visit</th>
                            <th>Last Diagnosis</th>
                            <th>Total Visits</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="patientHistoryTable">
                        {/* Map function data render karne ke liye */}
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.ageGender}</td>
                                <td>{patient.lastVisit}</td>
                                <td>{patient.diagnosis}</td>
                                <td>{patient.totalVisits}</td>
                                <td>
                                    <button className="action-btn">
                                        <i className="fas fa-eye"></i> View
                                    </button>
                                    <button className="action-btn">
                                        <i className="fas fa-file-medical"></i> Records
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

export default PatientHistory;