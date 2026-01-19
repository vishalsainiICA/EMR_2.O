
import React, { useState } from "react";
import "./Dashboard.css";

const DashboardComponent = () => {
  const [showRevenue, setShowRevenue] = useState(true);

  // ✅ Modal State
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [currentPatientForPrescription, setCurrentPatientForPrescription] = useState(null);

  // ✅ NEW: Form view OR Final view (same modal)
  const [isFinalPrescriptionView, setIsFinalPrescriptionView] = useState(false);

  // ✅ NEW: Final Prescription Data
  const [finalPrescriptionData, setFinalPrescriptionData] = useState({
    formattedDate: "",
    formattedTime: "",
    prescriptionId: "",
    diagnosisType: "Final",
    diagnosis: "",
    clinicalNotes: "",
    medications: "",
    tests: "",
    advice: "",
  });

  // ✅ Same type of patient data
  const patients = [
    {
      id: "PT-2023-0012",
      queueNo: "DQ-01",
      name: "Rajesh Kumar",
      age: 42,
      gender: "Male",
      phone: "+91 98765 43210",
      lastVisit: "2023-10-15",
      nextAppointment: "2023-11-15",
      chiefComplaint: "Fever and cough for 3 days",
      waitTime: "15 mins",
      priority: "High",
      paAssessment: {
        paName: "John Mathew",
        paTime: "10:00 AM",
        assessment: "Probable upper respiratory infection. No breathing difficulty noted.",
        allergies: "Penicillin (rash and itching)",
        medicalHistory: "Hypertension - 5 years, controlled with medication",
        vitals: {
          temperature: "100.2°F",
          bloodPressure: "130/85 mmHg",
          pulseRate: "78/min",
          respiratoryRate: "18/min",
          oxygenSaturation: "98%",
          height: "175 cm",
          weight: "75 kg",
          bmi: "24.5",
          bloodGroup: "B+",
        },
      },
    },
    {
      id: "PT-2023-0011",
      queueNo: "DQ-02",
      name: "Meena Desai",
      age: 35,
      gender: "Female",
      phone: "+91 98765 43212",
      lastVisit: "2023-10-15",
      nextAppointment: "2023-10-22",
      chiefComplaint: "Severe abdominal pain and nausea since morning",
      waitTime: "10 mins",
      priority: "Medium",
      paAssessment: {
        paName: "Sarah Johnson",
        paTime: "10:15 AM",
        assessment: "Acute abdominal pain, likely gastritis. No fever.",
        allergies: "None known",
        medicalHistory: "No chronic conditions. Last delivery: 2019 (C-section)",
        vitals: {
          temperature: "98.6°F",
          bloodPressure: "120/80 mmHg",
          pulseRate: "72/min",
          respiratoryRate: "16/min",
          oxygenSaturation: "99%",
          height: "162 cm",
          weight: "58 kg",
          bmi: "22.1",
          bloodGroup: "O+",
        },
      },
    },
  ];

  // ✅ Open Modal
  const showPrescriptionModal = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    setCurrentPatientForPrescription(patient || null);
    setIsPrescriptionModalOpen(true);

    // 🔥 always open in edit mode first
    setIsFinalPrescriptionView(false);

    document.body.style.overflow = "hidden";
  };

  // ✅ Close Modal
  const closePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setCurrentPatientForPrescription(null);
    setIsFinalPrescriptionView(false);
    document.body.style.overflow = "auto";
  };

  // ✅ Generate Final Prescription (React version of your JS function)
  const generateFinalPrescription = () => {
    if (!currentPatientForPrescription) return;

    // Diagnosis Type Toggle (same id)
    const diagnosisToggle = document.getElementById("diagnosisToggle");
    const diagnosisType = diagnosisToggle && diagnosisToggle.checked ? "Final" : "Provisional";

    // Textareas values (same ids)
    const diagnosis = document.getElementById("doctorDiagnosis")?.value || "";
    const clinicalNotes = document.getElementById("clinicalNotes")?.value || "";
    const medications = document.getElementById("medications")?.value || "";
    const tests = document.getElementById("tests")?.value || "";
    const advice = document.getElementById("advice")?.value || "";

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedTime = today.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const prescriptionId = `RX-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}${String(
      today.getDate()
    ).padStart(2, "0")}${Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0")}`;

    setFinalPrescriptionData({
      formattedDate,
      formattedTime,
      prescriptionId,
      diagnosisType,
      diagnosis,
      clinicalNotes,
      medications,
      tests,
      advice,
    });

    // ✅ Switch modal view to final prescription
    setIsFinalPrescriptionView(true);
  };

  // ✅ Back to Edit (same concept)
  const backToEditPrescription = () => {
    setIsFinalPrescriptionView(false);
  };

  // ✅ Print
  const printFinalPrescription = () => {
    window.print();
  };

  return (
    <div className="Dr_Dashboard_section section active" id="dashboardSection" style={{ display: "block" }}>
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
                className={`revenue-amount ${!showRevenue ? "hidden" : ""}`}
                id="revenueAmount"
                style={!showRevenue ? { color: "transparent", textShadow: "0 0 8px rgba(0, 0, 0, 0.2)" } : {}}
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

      {/* Consultation Queue */}
      <div className="consultation-queue">
        <div className="queue-header">
          <h2 className="queue-title">Patients Ready for Consultation</h2>
          <div className="queue-controls">
            <button className="btn btn-outline" id="refreshQueueBtn">
              <i className="fas fa-sync-alt"></i>
              Refresh
            </button>
            <button className="btn btn-primary" id="callNextPatientBtn">
              <i className="fas fa-user-plus"></i>
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
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <strong>{patient.queueNo}</strong>
                  </td>

                  <td>
                    <div>
                      <strong>{patient.name}</strong>
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-light)" }}>ID: {patient.id}</div>
                  </td>

                  <td>
                    {patient.age} / {patient.gender}
                  </td>

                  <td>{patient.chiefComplaint}</td>

                  <td>
                    <div style={{ fontSize: "11px" }}>
                      <div>
                        <i className="fas fa-user-nurse"></i> {patient.paAssessment.paName}
                      </div>
                      <div>{patient.paAssessment.assessment.substring(0, 40)}...</div>
                    </div>
                  </td>

                  <td>
                    <span className={`priority ${patient.priority.toLowerCase()}`}>{patient.priority}</span>
                  </td>

                  <td>{patient.waitTime}</td>

                  <td>
                    <button
                      className="action-btn start-consult-btn"
                      data-id={patient.id}
                      onClick={() => showPrescriptionModal(patient.id)}
                    >
                      <i className="fas fa-prescription"></i> Prescribe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Prescription Modal */}
      <div
        className="modal"
        id="prescriptionModal"
        style={{ display: isPrescriptionModalOpen ? "flex" : "none" }}
        onClick={(e) => {
          if (e.target.id === "prescriptionModal") {
            closePrescriptionModal();
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Prescription</h2>
            <button className="close-modal" id="closePrescriptionModal" onClick={closePrescriptionModal}>
              &times;
            </button>
          </div>

          <div className="modal-body">
            <div id="prescriptionFormContent">
              {currentPatientForPrescription && (
                <>
                  {/* ====================== FINAL PRESCRIPTION VIEW ====================== */}
                  {isFinalPrescriptionView ? (
                    <>
                      <div className="final-prescription" style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
                        <div className="prescription-header">
                          <div className="hospital-name">APOLLO HOSPITALS</div>
                          <div className="hospital-address">No. 21, Greams Road, Chennai - 600006, Tamil Nadu</div>
                          <div className="hospital-contact">Phone: 044-2829 3333 | Emergency: 044-2829 4444</div>
                          <div className="prescription-title">MEDICAL PRESCRIPTION</div>
                        </div>

                        <div className="prescription-patient-info">
                          <div>
                            <div className="prescription-field">
                              <span className="prescription-label">Patient Name:</span>
                              <span className="prescription-value">{currentPatientForPrescription.name}</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Age / Gender:</span>
                              <span className="prescription-value">
                                {currentPatientForPrescription.age} Years / {currentPatientForPrescription.gender}
                              </span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Patient ID:</span>
                              <span className="prescription-value">{currentPatientForPrescription.id}</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Blood Group:</span>
                              <span className="prescription-value">
                                {currentPatientForPrescription.paAssessment.vitals.bloodGroup}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="prescription-field">
                              <span className="prescription-label">Date:</span>
                              <span className="prescription-value">{finalPrescriptionData.formattedDate}</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Prescription ID:</span>
                              <span className="prescription-value">{finalPrescriptionData.prescriptionId}</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Diagnosis Type:</span>
                              <span className="prescription-value">{finalPrescriptionData.diagnosisType} Diagnosis</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Weight/Height:</span>
                              <span className="prescription-value">
                                {currentPatientForPrescription.paAssessment.vitals.weight} /{" "}
                                {currentPatientForPrescription.paAssessment.vitals.height}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="section-divider"></div>

                        {/* PA Assessment */}
                        <div className="pa-assessment">
                          <div className="pa-info">
                            <div>
                              <span className="pa-name">
                                PA Assessment by: {currentPatientForPrescription.paAssessment.paName}
                              </span>
                            </div>
                            <div className="pa-time">Time: {currentPatientForPrescription.paAssessment.paTime}</div>
                          </div>

                          <div className="assessment-findings">
                            <div className="assessment-section">
                              <span className="assessment-label">Chief Complaint:</span>
                              <span>{currentPatientForPrescription.chiefComplaint}</span>
                            </div>

                            <div className="assessment-section">
                              <span className="assessment-label">Vitals:</span>
                              <span>
                                Temp: {currentPatientForPrescription.paAssessment.vitals.temperature}, BP:{" "}
                                {currentPatientForPrescription.paAssessment.vitals.bloodPressure}, Pulse:{" "}
                                {currentPatientForPrescription.paAssessment.vitals.pulseRate}, RR:{" "}
                                {currentPatientForPrescription.paAssessment.vitals.respiratoryRate}, SpO2:{" "}
                                {currentPatientForPrescription.paAssessment.vitals.oxygenSaturation}
                              </span>
                            </div>

                            <div className="assessment-section">
                              <span className="assessment-label">Allergies:</span>
                              <span>{currentPatientForPrescription.paAssessment.allergies}</span>
                            </div>
                          </div>
                        </div>

                        {/* Doctor's Diagnosis */}
                        <div className="compact-section">
                          <div className="compact-section-title">
                            DOCTOR'S {finalPrescriptionData.diagnosisType.toUpperCase()} DIAGNOSIS
                          </div>
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Diagnosis:</strong> {finalPrescriptionData.diagnosis}
                          </div>
                          <div>
                            <strong>Clinical Findings:</strong> {finalPrescriptionData.clinicalNotes}
                          </div>
                        </div>

                        {/* Medications */}
                        <div className="prescription-medications">
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#2c3e50",
                              marginBottom: "10px",
                              fontSize: "14px",
                              textAlign: "center",
                            }}
                          >
                            MEDICATIONS PRESCRIBED
                          </div>

                          <div
                            style={{
                              whiteSpace: "pre-line",
                              padding: "8px",
                              backgroundColor: "#f8f9fa",
                              borderRadius: "6px",
                              border: "1px solid #dee2e6",
                              fontSize: "11px",
                            }}
                          >
                            {finalPrescriptionData.medications}
                          </div>
                        </div>

                        {/* Investigations & Advice */}
                        <div className="compact-section">
                          <div className="compact-section-title">INVESTIGATIONS ADVISED</div>
                          <div style={{ whiteSpace: "pre-line", fontSize: "11px" }}>{finalPrescriptionData.tests}</div>
                        </div>

                        <div className="compact-section">
                          <div className="compact-section-title">GENERAL ADVICE</div>
                          <div style={{ whiteSpace: "pre-line", fontSize: "11px" }}>{finalPrescriptionData.advice}</div>
                        </div>

                        <div
                          style={{
                            margin: "12px 0",
                            padding: "8px",
                            backgroundColor: "#fff3cd",
                            borderRadius: "6px",
                            border: "1px solid #ffeaa7",
                            fontSize: "11px",
                          }}
                        >
                          <strong>ALLERGIES:</strong> {currentPatientForPrescription.paAssessment.allergies}
                        </div>

                        <div className="doctor-signature">
                          <div className="doctor-info">
                            <div className="doctor-name">Dr. Anil Sharma</div>
                            <div className="doctor-credentials">MBBS, MD (General Medicine)</div>
                            <div className="doctor-credentials">Reg. No: MED123456 | MCI: 12345/2010</div>
                            <div className="doctor-credentials">Consultant Physician, Apollo Hospitals</div>
                          </div>
                          <div className="signature-line"></div>
                          <div style={{ marginTop: "4px", fontStyle: "italic", color: "#7f8c8d", fontSize: "10px" }}>
                            Signature & Seal
                          </div>
                        </div>

                        <div className="stamp-overlay">APOLLO HOSPITALS</div>

                        <div className="footer-stamp">
                          This is a computer-generated prescription. Valid only with doctor's signature and hospital stamp.
                          <div style={{ marginTop: "6px", fontSize: "9px" }}>
                            Generated: {finalPrescriptionData.formattedDate} | ID: {finalPrescriptionData.prescriptionId} |
                            Valid for 30 days
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "center" }}>
                        <button className="btn btn-outline" id="backToPrescriptionBtn" onClick={backToEditPrescription}>
                          <i className="fas fa-arrow-left"></i>
                          Back to Edit
                        </button>

                        <button
                          className="btn btn-primary"
                          id="saveFinalPrescriptionBtn"
                          onClick={() => alert("Final Prescription Saved!")}
                        >
                          <i className="fas fa-save"></i>
                          Save Prescription
                        </button>

                        <button className="btn btn-success" id="printFinalPrescriptionBtn" onClick={printFinalPrescription}>
                          <i className="fas fa-print"></i>
                          Print & Complete
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* ====================== EDIT PRESCRIPTION VIEW ====================== */}
                      <div className="diagnosis-toggle-container">
                        <span>Diagnosis Type:</span>
                        <label className="diagnosis-toggle">
                          <input type="checkbox" id="diagnosisToggle" defaultChecked />
                          <span className="diagnosis-toggle-slider">
                            <span className="diagnosis-toggle-option">Provisional</span>
                            <span className="diagnosis-toggle-option">Final</span>
                          </span>
                        </label>
                      </div>

                      <div className="prescription-cards-container">
                        <div className="prescription-card patient-details-enhanced">
                          <h3>
                            <i className="fas fa-user-injured"></i> Patient Details
                          </h3>

                          <div className="detail-row">
                            <div className="detail-label">Patient Name:</div>
                            <div className="detail-value">{currentPatientForPrescription.name}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Patient ID:</div>
                            <div className="detail-value">{currentPatientForPrescription.id}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Age & Gender:</div>
                            <div className="detail-value">
                              {currentPatientForPrescription.age} years / {currentPatientForPrescription.gender}
                            </div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Contact Number:</div>
                            <div className="detail-value">{currentPatientForPrescription.phone}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Last Consultation:</div>
                            <div className="detail-value">{currentPatientForPrescription.lastVisit}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Next Appointment:</div>
                            <div className="detail-value">{currentPatientForPrescription.nextAppointment}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Assessed by PA:</div>
                            <div className="detail-value">{currentPatientForPrescription.paAssessment.paName}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Assessment Time:</div>
                            <div className="detail-value">{currentPatientForPrescription.paAssessment.paTime}</div>
                          </div>
                        </div>

                        <div className="prescription-card">
                          <h3>
                            <i className="fas fa-heartbeat"></i> Patient Vitals
                          </h3>

                          <div className="vitals-grid-enhanced">
                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.paAssessment.vitals.temperature}
                              </div>
                              <div className="vital-label-enhanced">Temperature</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.paAssessment.vitals.bloodPressure}
                              </div>
                              <div className="vital-label-enhanced">Blood Pressure</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.paAssessment.vitals.pulseRate}
                              </div>
                              <div className="vital-label-enhanced">Pulse Rate</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.paAssessment.vitals.respiratoryRate}
                              </div>
                              <div className="vital-label-enhanced">Resp. Rate</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.paAssessment.vitals.oxygenSaturation}
                              </div>
                              <div className="vital-label-enhanced">SpO₂</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.paAssessment.vitals.height}
                              </div>
                              <div className="vital-label-enhanced">Height</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.paAssessment.vitals.weight}
                              </div>
                              <div className="vital-label-enhanced">Weight</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">{currentPatientForPrescription.paAssessment.vitals.bmi}</div>
                              <div className="vital-label-enhanced">BMI</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.paAssessment.vitals.bloodGroup}
                              </div>
                              <div className="vital-label-enhanced">Blood Group</div>
                            </div>
                          </div>

                          <div style={{ marginTop: "10px", fontSize: "11px", color: "var(--text-light)", textAlign: "center" }}>
                            Recorded by: {currentPatientForPrescription.paAssessment.paName} at{" "}
                            {currentPatientForPrescription.paAssessment.paTime}
                          </div>
                        </div>
                      </div>

                      <div className="prescription-cards-container">
                        <div className="prescription-card diagnosis-card-enhanced">
                          <h3>
                            <i className="fas fa-diagnoses"></i> Diagnosis
                          </h3>

                          <div className="form-group">
                            <label htmlFor="doctorDiagnosis">Diagnosis</label>
                            <textarea
                              id="doctorDiagnosis"
                              placeholder="Enter diagnosis..."
                              defaultValue="Acute Upper Respiratory Infection"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="clinicalNotes">Clinical Notes</label>
                            <textarea
                              id="clinicalNotes"
                              placeholder="Add clinical notes..."
                              defaultValue="Confirmed PA findings. Mild pharyngeal erythema noted. No tonsillar exudate. Lung fields clear."
                            />
                          </div>
                        </div>

                        <div className="prescription-card medicine-card-enhanced">
                          <h3>
                            <i className="fas fa-pills"></i> Medicine Recommendations
                          </h3>

                          <div className="form-group">
                            <label htmlFor="medications">Medications</label>
                            <textarea
                              id="medications"
                              placeholder="List medications with dosage..."
                              defaultValue={`Amoxicillin 500mg - Twice daily for 7 days
Paracetamol 500mg - As needed for fever
Vitamin C + Zinc - Once daily for immunity`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="prescription-cards-container">
                        <div className="prescription-card test-card-enhanced">
                          <h3>
                            <i className="fas fa-vial"></i> Test Recommendations
                          </h3>

                          <div className="form-group">
                            <label htmlFor="tests">Recommended Tests</label>
                            <textarea
                              id="tests"
                              placeholder="List recommended tests..."
                              defaultValue={`Complete Blood Count (CBC) if fever persists beyond 3 days
Chest X-ray if cough persists beyond 5 days`}
                            />
                          </div>
                        </div>

                        <div className="prescription-card advice-card-enhanced">
                          <h3>
                            <i className="fas fa-comment-medical"></i> General Advice
                          </h3>

                          <div className="form-group">
                            <label htmlFor="advice">Patient Advice</label>
                            <textarea
                              id="advice"
                              placeholder="Add general advice for patient..."
                              defaultValue={`1. Take adequate rest for 3-5 days
2. Drink plenty of warm fluids
3. Follow up if symptoms worsen
4. Next review in 7 days`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="alert-item danger" style={{ margin: "15px 0", padding: "12px", fontSize: "13px" }}>
                        <i className="fas fa-allergies"></i>
                        <div>
                          <div style={{ fontWeight: 600 }}>Allergy Alert</div>
                          <div>{currentPatientForPrescription.paAssessment.allergies}</div>
                        </div>
                      </div>

                      <div className="alert-item info" style={{ margin: "15px 0", padding: "12px", fontSize: "13px" }}>
                        <i className="fas fa-history"></i>
                        <div>
                          <div style={{ fontWeight: 600 }}>Medical History</div>
                          <div>{currentPatientForPrescription.paAssessment.medicalHistory}</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "center" }}>
                        <button
                          className="btn btn-outline"
                          id="saveDraftBtn"
                          onClick={() => alert("Prescription draft saved successfully!")}
                        >
                          <i className="fas fa-save"></i>
                          Save Draft
                        </button>

                        {/* ✅ UPDATED: Generate Prescription opens Final View */}
                        <button className="btn btn-success" id="generatePrescriptionBtn" onClick={generateFinalPrescription}>
                          <i className="fas fa-prescription"></i>
                          Generate Prescription
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
