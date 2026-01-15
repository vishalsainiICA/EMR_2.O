import React, { useState } from 'react';
import './Patient_History.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEdit, faExclamationTriangle, faHistory, faHospitalUser, faMapMarkedAlt, faNewspaper, faPrint, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const PatientHistory = () => {
    const [patients] = useState([
        { id: "P-1001", name: "Rahul Sharma", ageGender: "45/M", lastVisit: "2023-10-24", diagnosis: "Hypertension", totalVisits: 5, phone: "9876543210", address: "Malviya Nagar, Jaipur", bloodGroup: "O+", allergies: "None" },
        { id: "P-1002", name: "Suman Devi", ageGender: "38/F", lastVisit: "2023-10-22", diagnosis: "Type 2 Diabetes", totalVisits: 3, phone: "9988776655", address: "Vaishali Nagar, Jaipur", bloodGroup: "B+", allergies: "Peanuts" },
        // ... baaki dummy data wahi rahega
    ]);

    const [selectedPatient, setSelectedPatient] = useState(null);

    return (
        <div className="section active" id="patientHistorySection">
            <div className="date-filter">
                <h2 className="section-title">Patient History</h2>
                {/* <div className="filter-controls">
                    <input type="date" className="date-input" id="startDate" defaultValue="2023-10-01" />
                    <span>to</span>
                    <input type="date" className="date-input" id="endDate" defaultValue="2023-10-15" />
                    <button className="filter-btn" id="applyFilterBtn">
                        <i className="fas fa-filter"></i> Apply Filter
                    </button>
                </div> */}
                <div className="search-box1">
                    <FontAwesomeIcon icon={faSearch}/>
                    <input
                        type="text"
                        id="globalSearch"
                        placeholder="Search patients by name or id..."
                    />
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
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.ageGender}</td>
                                <td>{patient.lastVisit}</td>
                                <td>{patient.diagnosis}</td>
                                <td>{patient.totalVisits}</td>
                                <td>
                                    <button className="action-btn" onClick={() => setSelectedPatient(patient)}>
                                        <i className="fas fa-eye"></i> <FontAwesomeIcon icon={faHistory}/> Full History
                                    </button>
                                    {/* <button className="action-btn">
                                        <i className="fas fa-file-medical"></i> Records
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Patieant-full History */}

            {selectedPatient && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title"> Patient Details</h2>
                            <button className="close-modal" onClick={() => setSelectedPatient(null)}>&times;</button>
                        </div>
                        {/* <div className="modal-bodyy"> */}
                        <div className="patient-details">
                            <div className="patient-header">
                                <div className="patient-info">
                                    <div className="patient-avatar">{selectedPatient.name.charAt(0)}</div>
                                    <div className="patient-name">
                                        <h2>{selectedPatient.name}</h2>
                                        <p className="patient-id">Patient ID: {selectedPatient.id}</p>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button className="btn btn-outline">
                                        <FontAwesomeIcon icon={faEdit}/> Edit
                                    </button>
                                    <button className="btn btn-outline">
                                     <FontAwesomeIcon icon={faPrint}/> Print
                                    </button>
                                </div>
                            </div>

                            <div className="patient-grid">
                                <div className="info-card">
                                    <h3><FontAwesomeIcon icon={faUser}/> Basic Info</h3>
                                    <p><strong>Age/Gender:</strong> {selectedPatient.ageGender}</p>
                                    <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
                                    <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                                </div>
                                <div className="info-card">
                                    <h3><FontAwesomeIcon icon={faMapMarkedAlt}/> Address</h3>
                                    <p>{selectedPatient.address}</p>
                                </div>
                                <div className="info-card">
                                    <h3> <FontAwesomeIcon icon={faExclamationTriangle}/> Allergies</h3>
                                    <p>{selectedPatient.allergies}</p>
                                    <p><strong>Age/Gender:</strong> {selectedPatient.ageGender}</p>
                                    <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
                                    <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                                </div>
                                <div className="info-card">
                                    <h3> <FontAwesomeIcon icon={faUser}/> Medical Information</h3>
                                    <p><strong>Age/Gender:</strong> {selectedPatient.ageGender}</p>
                                    <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
                                    <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                                </div>
                                <div className="info-card">
                                    <h3> <FontAwesomeIcon icon={faUser}/>Current Visit</h3>
                                    <p><strong>Age/Gender:</strong> {selectedPatient.ageGender}</p>
                                    <p><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
                                    <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                                </div>

                            </div>

                            <div className="medical-history">
                                <h3 className="section-title"><FontAwesomeIcon icon={faHistory}/> Medical History</h3>
                                <div className="history-item">
                                    <div className="history-header">
                                        <span className="history-date">{selectedPatient.lastVisit}</span>
                                        <span className="history-doctor">Dr. Sameer Khan</span>
                                    </div>
                                    <div className="history-details">
                                        <p><strong>Diagnosis:</strong> {selectedPatient.diagnosis}</p>
                                        <p><strong>Notes:</strong> Patient checkup completed.</p>
                                        <p><strong>Follow-up:</strong> 7 days</p>
                                    </div>
                                </div>
                                <div className="history-item">
                                    <div className="history-header">
                                        <span className="history-date">{selectedPatient.lastVisit}</span>
                                        <span className="history-doctor">Dr. Priya Chawla</span>
                                    </div>
                                    <div className="history-details">
                                        <p><strong>Diagnosis:</strong> {selectedPatient.diagnosis}</p>
                                        <p><strong>Notes:</strong> Patient checkup Pending.</p>
                                        <p><strong>Follow-up:</strong> 3 days</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "100%", display: "flex", justifyContent: "end", gap: "10px" }}>
                                <button className="btn btn-outline">
                                    <FontAwesomeIcon icon={faClose}/> Close
                                </button>

                                <button className="btn btn-outline">
                                    <FontAwesomeIcon icon={faHospitalUser}/> Create New Assessment
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                // </div>
            )}
        </div>
    );
};

export default PatientHistory;