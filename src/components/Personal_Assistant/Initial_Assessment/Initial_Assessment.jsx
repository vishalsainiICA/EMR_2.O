import React, { useState } from 'react';
import "./Initial_Assessment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Initialassessment = () => {
    // State to toggle form visibility
    const [showForm, setShowForm] = useState(false);

    setTimeout(() => {
        document.getElementById("assessmentForm")?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // Dummy Data for Table
    const [assessments] = useState([
        {
            id: "#PT-2023-0012",
            name: "Rajesh Kumar",
            vitals: "120/80, 72 bpm, 98.6°F",
            complaint: "Severe headache and mild fever since morning",
            time: "10:30 AM",
            status: "Completed"
        },
        {
            id: "#PT-2023-0045",
            name: "Anita Sharma",
            vitals: "110/70, 80 bpm, 98.2°F",
            complaint: "Routine checkup for diabetes management",
            time: "11:15 AM",
            status: "Completed"
        }
    ]);

    return (
        <div className="section" id="initialAssessmentSection" style={{ display: 'block' }}>
            <div className="section-header">
                <h2 className="section-title">Initial Patient Assessments</h2>
                <button

                    className="btn btn-primary"
                    id="newAssessmentBtn"
                    onClick={() => {
                        setShowForm(true);

                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    New Assessment
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Patient Name</th>
                            <th>Vitals</th>
                            <th>Chief Complaint</th>
                            <th>Assessment Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="assessmentsTable">
                        {assessments.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.vitals}</td>
                                <td>{item.complaint}</td>
                                <td>{item.time}</td>
                                <td><span className="status completed">{item.status}</span></td>
                                <td className='action-handler'>
                                    <button className="action-btn"><FontAwesomeIcon icon={faEye} />View</button>
                                    <button class="action-btn"> <FontAwesomeIcon icon={faFile} /> Assess</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Assessment Form (Conditionally rendered based on state) */}
            <div
                className="assessment-form"
                id="assessmentForm"
                style={{ display: showForm ? "block" : "none", marginTop: "30px" }}
            >
                <div className='patient-detail-heading'>
                    <h3 style={{ marginBottom: "40px" }}>Initial Assessment Form</h3>
                </div>

                <div className="patient-info" style={{ marginBottom: "30px" }}>
                    <div className="patient-avatar">RK</div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <h3 id="assessmentPatientName">Rajesh Kumar</h3>
                        <p id="assessmentPatientId">#PT-2023-0012 | 42 years, Male</p>
                    </div>
                </div>

                <div className='patient-detail-heading'>
                    <h4 style={{ marginBottom: "15px" }}>Vital Signs</h4>
                </div>
                <div className="vitals-grid">
                    <div className="vital-item">
                        <div className="vital-label">Blood Pressure</div>
                        <input type="text" className="vital-input" placeholder="120/80" />
                    </div>
                    <div className="vital-item">
                        <div className="vital-label">Heart Rate</div>
                        <input type="text" className="vital-input" placeholder="72 bpm" />
                    </div>
                    <div className="vital-item">
                        <div className="vital-label">Temperature</div>
                        <input type="text" className="vital-input" placeholder="98.6°F" />
                    </div>
                    <div className="vital-item">
                        <div className="vital-label">Respiratory Rate</div>
                        <input type="text" className="vital-input" placeholder="16/min" />
                    </div>
                    <div className="vital-item">
                        <div className="vital-label">SpO2</div>
                        <input type="text" className="vital-input" placeholder="98%" />
                    </div>
                    <div className="vital-item">
                        <div className="vital-label">Weight</div>
                        <input type="text" className="vital-input" placeholder="75 kg" />
                    </div>
                    <div className="vital-item">
                        <div className="vital-label">Height</div>
                        <input type="text" className="vital-input" placeholder="175 cm" />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="chiefComplaint">Chief Complaint *</label>
                    <textarea id="chiefComplaint" placeholder="Describe the patient's main symptoms and duration" required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="medicalHistory">Relevant Medical History</label>
                    <textarea id="medicalHistory" placeholder="Any relevant medical history for current complaint"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="physicalExam">Physical Examination Findings</label>
                    <textarea id="physicalExam" placeholder="Findings from physical examination"></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="assessmentNotes">Assessment Notes</label>
                        <textarea id="assessmentNotes" placeholder="Initial assessment and observations"></textarea>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "30px" }}>
                    <button
                        type="button"
                        className="btn btn-outline"
                        id="cancelAssessmentBtn"
                        onClick={() => setShowForm(false)}
                    >
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary" id="submitAssessmentBtn">Submit Assessment</button>
                </div>
            </div>
        </div>
    );
};

export default Initialassessment;