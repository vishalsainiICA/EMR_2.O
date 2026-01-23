// import React from 'react';
// import "./Patient_Record.css"

// const PatientRecords = () => {
//   // Yeh mock data table structure ko maintain karne ke liye hai
//   const records = [
//     {
//       id: "P-5001",
//       name: "Anita Verma",
//       ageGender: "28 / Female",
//       lastConsultation: "12 Oct 2023",
//       complaint: "Migraine",
//       paAssessment: "Routine Checkup",
//       status: "Stable"
//     }
//   ];

//   return (
//     <div className="section active" id="patientRecordsSection">
//       <div className="section-header">
//         <h2 className="section-title">Patient Records</h2>
//         <div style={{ display: 'flex', gap: '15px' }}>
//           <div className="search-box" style={{ width: '300px' }}>
//             <i className="fas fa-search"></i>
//             <input 
//               type="text" 
//               id="patientSearch" 
//               placeholder="Search patients..." 
//             />
//           </div>
//         </div>
//       </div>

//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>Patient ID</th>
//               <th>Patient Name</th>
//               <th>Age/Gender</th>
//               <th>Last Consultation</th>
//               <th>Chief Complaint</th>
//               <th>PA Assessment</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody id="patientRecordsTable">
//             {/* React Mapping for Table Rows */}
//             {records.map((patient, index) => (
//               <tr key={index}>
//                 <td>{patient.id}</td>
//                 <td><strong>{patient.name}</strong></td>
//                 <td>{patient.ageGender}</td>
//                 <td>{patient.lastConsultation}</td>
//                 <td>{patient.complaint}</td>
//                 <td>{patient.paAssessment}</td>
//                 <td>
//                   <span className="status-badge" style={{ padding: '4px 8px', borderRadius: '4px', background: '#e1f5fe', color: '#01579b' }}>
//                     {patient.status}
//                   </span>
//                 </td>
//                 <td>
//                   {/* <button className="btn btn-sm" title="View History">
//                     <i className="fas fa-history"></i>
//                   </button> */}
//                   <button className="btn btn-sm" title="Edit Record" style={{ marginLeft: '5px' }}>
//                     <i className="fas fa-edit"></i>
//                     prescription
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PatientRecords;















import React, { useEffect, useState } from "react";
import "./Patient_Record.css";
import { useApi } from "../../../api/useApi";
import { doctorApi } from "../../../api/apiService";

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);

  // ✅ 3 MODALS STATE (SAME)
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [currentPatientForPrescription, setCurrentPatientForPrescription] = useState(null);
  const [isFinalPrescriptionView, setIsFinalPrescriptionView] = useState(false);
  const [isPaDocumentsModalOpen, setIsPaDocumentsModalOpen] = useState(false);

  // ✅ Final Prescription Data (SAME)
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

  // ✅ Search
  const [search, setSearch] = useState("");

  // ✅ API Hook
  const { request: loadpatient, loading } = useApi(doctorApi.loadPatient);

  // ✅ Load Patients
  const handleLoadPatient = async () => {
    try {
      const res = await loadpatient();
      setPatients(res?.data?.todayPatient || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadPatient();
  }, []);

  // ✅ Open Prescription Modal (SAME)
  const showPrescriptionModal = (patientId) => {
    const patient = patients.find((p) => p._id === patientId);

    setCurrentPatientForPrescription({
      ...(patient || {}),
      paDocuments: [
        { id: "DOC001", name: "Patient Consent Form", type: "Form", date: "2023-10-15", uploadedBy: "John Mathew" },
        { id: "DOC002", name: "Lab Test Results", type: "Report", date: "2023-10-14", uploadedBy: "John Mathew" },
        { id: "DOC003", name: "Previous Prescription", type: "Prescription", date: "2023-09-20", uploadedBy: "John Mathew" },
        { id: "DOC004", name: "Insurance Card Copy", type: "Insurance", date: "2023-10-15", uploadedBy: "John Mathew" },
        { id: "DOC005", name: "ECG Report", type: "Medical Report", date: "2023-10-10", uploadedBy: "John Mathew" },
      ],
    });

    setIsPrescriptionModalOpen(true);
    setIsFinalPrescriptionView(false);
    document.body.style.overflow = "hidden";
  };

  // ✅ Close Prescription Modal (SAME)
  const closePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setCurrentPatientForPrescription(null);
    setIsFinalPrescriptionView(false);
    setIsPaDocumentsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // ✅ PA Documents Modal (SAME)
  const showPaDocumentsModal = () => {
    if (!currentPatientForPrescription) return;
    setIsPaDocumentsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePaDocumentsModal = () => {
    setIsPaDocumentsModalOpen(false);
    document.body.style.overflow = "hidden";
  };

  // ✅ Helper function for icon (SAME)
  const getDocIcon = (docType) => {
    switch ((docType || "").toLowerCase()) {
      case "form":
        return "edit";
      case "report":
        return "chart-line";
      case "prescription":
        return "prescription";
      case "insurance":
        return "file-invoice-dollar";
      case "medical report":
        return "file-medical";
      case "notes":
        return "sticky-note";
      default:
        return "file";
    }
  };

  // ✅ Generate Final Prescription (SAME)
  const generateFinalPrescription = () => {
    if (!currentPatientForPrescription) return;

    const diagnosisToggle = document.getElementById("diagnosisToggle");
    const diagnosisType = diagnosisToggle && diagnosisToggle.checked ? "Final" : "Provisional";

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

    setIsFinalPrescriptionView(true);
  };

  const backToEditPrescription = () => {
    setIsFinalPrescriptionView(false);
  };

  const printFinalPrescription = () => {
    window.print();
  };

  // ✅ Filtered patients (Search)
  const filteredPatients = patients.filter((p) => {
    const name = (p?.name || "").toLowerCase();
    const uid = (p?.uid || "").toLowerCase();
    const query = search.toLowerCase();

    return name.includes(query) || uid.includes(query);
  });

  return (
    <div className="section active" id="patientRecordsSection">
      <div className="section-header">
        <h2 className="section-title">Patient Records</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <div className="search-box" style={{ width: "300px" }}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              id="patientSearch"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
            {/* Loading */}
            {loading && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  <i className="fas fa-spinner fa-spin"></i> Loading patients...
                </td>
              </tr>
            )}

            {/* No Data */}
            {!loading && filteredPatients.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No patient records found
                </td>
              </tr>
            )}

            {/* Patient Rows */}
            {!loading &&
              filteredPatients.map((patient, index) => (
                <tr key={patient._id || index}>
                  <td>{patient.uid || patient._id}</td>

                  <td>
                    <strong>{patient.name}</strong>
                  </td>

                  <td>
                    {patient.age} / {patient.gender}
                  </td>

                  <td>{patient?.lastVisit || "-"}</td>

                  <td>{patient.initialAssementId?.complaint || "-"}</td>

                  <td>
                    {patient.initialAssementId?.notes
                      ? patient.initialAssementId.notes.substring(0, 20) + "..."
                      : "-"}
                  </td>

                  <td>
                    <span
                      className="status-badge"
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        background: "#e1f5fe",
                        color: "#01579b",
                      }}
                    >
                      {patient.isPrescbribedDone ? "Completed" : "Pending"}
                    </span>
                  </td>

                  <td>
                    {/* ✅ SAME button UI, just opens modal */}
                    <button
                      className="btn btn-sm"
                      title="Edit Record"
                      style={{ marginLeft: "5px" }}
                      onClick={() => showPrescriptionModal(patient._id)}
                    >
                      <i className="fas fa-edit"></i>
                      prescription
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/*  Prescription Modal */}
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
                          <div className="hospital-name">S.R. KALLA</div>
                          <div className="hospital-address">No. 21, Greams Road, Chennai - 600006, Tamil Nadu</div>
                          <div className="hospital-contact">Phone: 044-2829 3333 | Emergency: 044-2829 4444</div>
                          <div className="prescription-title">MEDICAL PRESCRIPTION</div>
                        </div>

                        <div className="prescription-patient-info">
                          <div>
                            <div className="prescription-field">
                              <span className="prescription-label">Patient Name jjj:</span>
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
                              <span className="prescription-value">{currentPatientForPrescription?._id}</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Blood Group:</span>
                              <span className="prescription-value">
                                {currentPatientForPrescription?.initialAssementId.vitals.bp}
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
                                {currentPatientForPrescription?.initialAssementId?.vitals?.weight} /{" "}
                                {currentPatientForPrescription?.initialAssementId?.vitals?.height}
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
                                PA Assessment by: {currentPatientForPrescription?.registerarId?.name}
                              </span>
                            </div>
                            <div className="pa-time">Time: {currentPatientForPrescription?.registerarId?.updatedAt}</div>
                          </div>

                          <div className="assessment-findings">
                            <div className="assessment-section">
                              <span className="assessment-label">Chief Complaint:</span>
                              <span>{currentPatientForPrescription.initialAssementId?.complaint}</span>
                            </div>

                            <div className="assessment-section">
                              <span className="assessment-label">Vitals:</span>
                              <span>
                                Temp: {currentPatientForPrescription.initialAssementId.vitals.temperature}, BP:{" "}
                                {currentPatientForPrescription.initialAssementId.vitals.bp}, Pulse:{" "}
                                {currentPatientForPrescription.initialAssementId.vitals.heartRate}, RR:{" "}
                                {currentPatientForPrescription.initialAssementId.vitals.respRate}, SpO2:{" "}
                                {currentPatientForPrescription.initialAssementId.vitals.spo2}
                              </span>
                            </div>

                            <div className="assessment-section">
                              <span className="assessment-label">Allergies:</span>
                              <span>{currentPatientForPrescription?.initialAssementId?.selectedSym?.join(",")}</span>
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
                              display:"flex",
                              alignItems:"start",
                              justifyItems:"start"
                            }}
                          >
                            {finalPrescriptionData.medications}
                          </div>
                        </div>

                        {/* Investigations & Advice */}
                        <div className="compact-section">
                          <div className="compact-section-title">INVESTIGATIONS ADVISED</div>
                          <div style={{  fontSize: "11px",display:"flex",alignItems:"start" }}>{finalPrescriptionData.tests}</div>
                        </div>

                        <div className="compact-section">
                          <div className="compact-section-title">GENERAL ADVICE</div>
                          <div style={{ fontSize: "11px" }}>{finalPrescriptionData.advice}</div>
                        </div>

                        <div
                          style={{
                            margin: "12px 0",
                            padding: "8px",
                            backgroundColor: "#fff3cd",
                            borderRadius: "6px",
                            border: "1px solid #ffeaa7",
                            fontSize: "11px",
                            display:"flex"
                          }}
                        >
                          <strong>ALLERGIES:</strong> {currentPatientForPrescription.initialAssementId?.medicalHistory}
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

                        <div className="stamp-overlay">S.R. KALLA</div>

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
                      <div className="diagnosis-toggle-container" >
                        <span>Diagnosis Type:</span>
                        <label className="diagnosis-toggle">
                          <input type="checkbox" id="diagnosisToggle" defaultChecked />
                          <span className="diagnosis-toggle-slider">
                            <span className="diagnosis-toggle-option">Provisional</span>
                            <span className="diagnosis-toggle-option">Final</span>
                          </span>
                        </label>

                        <button
                          className="view-pa-docs-btn"
                          id="viewPaDocumentsBtn"
                          onClick={showPaDocumentsModal}>

                          <i class="fas fa-file-medical-alt"></i>
                          View PA Documents
                        </button>

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
                            <div className="detail-value">{currentPatientForPrescription.uid}</div>
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
                            <div className="detail-value">{currentPatientForPrescription?.lastVisit || "0"}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Next Appointment:</div>
                            <div className="detail-value">{currentPatientForPrescription?.nextAppointment || "-/"}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Assessed by PA:</div>
                            <div className="detail-value">{currentPatientForPrescription.registerarId?.name}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Assessment Time:</div>
                            <div className="detail-value">{currentPatientForPrescription.registerarId?.updatedAt}</div>
                          </div>
                        </div>

                        <div className="prescription-card">
                          <h3>
                            <i className="fas fa-heartbeat"></i> Patient Vitals
                          </h3>

                          <div className="vitals-grid-enhanced">
                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId?.vitals.temperature}
                              </div>
                              <div className="vital-label-enhanced">Temperature</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.bloodPressure}
                              </div>
                              <div className="vital-label-enhanced">Blood Pressure</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.pulseRate}
                              </div>
                              <div className="vital-label-enhanced">Pulse Rate</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.respiratoryRate}
                              </div>
                              <div className="vital-label-enhanced">Resp. Rate</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.oxygenSaturation}
                              </div>
                              <div className="vital-label-enhanced">SpO₂</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.height}
                              </div>
                              <div className="vital-label-enhanced">Height</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.weight}
                              </div>
                              <div className="vital-label-enhanced">Weight</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">{currentPatientForPrescription.initialAssementId.vitals.bmi}</div>
                              <div className="vital-label-enhanced">BMI</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.bg}
                              </div>
                              <div className="vital-label-enhanced">Blood Group</div>
                            </div>
                          </div>

                          <div style={{ marginTop: "10px", fontSize: "11px", color: "var(--text-light)", textAlign: "center" }}>
                            Recorded by: {currentPatientForPrescription.registerarId.name} at{" "}
                            {currentPatientForPrescription.registerarId.updatedAt}
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
                          <div>{currentPatientForPrescription.initialAssementId.complaint}</div>
                        </div>
                      </div>

                      <div className="alert-item info" style={{ margin: "15px 0", padding: "12px", fontSize: "13px" }}>
                        <i className="fas fa-history"></i>
                        <div>
                          <div style={{ fontWeight: 600 }}>Medical History</div>
                          <div>{currentPatientForPrescription?.initialAssementId?.medicalHistory}</div>
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

                        {/*  UPDATED: Generate Prescription opens Final View */}
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

      {/* ===================== NEW: PA Documents Modal ===================== */}
      <div
        className="modal pa-documents-modal"
        id="paDocumentsModal"
        style={{ display: isPaDocumentsModalOpen ? "flex" : "none" }}
        onClick={(e) => {
          if (e.target.id === "paDocumentsModal") {
            closePaDocumentsModal();
          }
        }}
      >
        <div className="pa-documents-content">
          <div className="pa-docs-header">
            <h2 className="pa-docs-title">
              <i className="fas fa-file-medical-alt"></i> PA Uploaded Documents
            </h2>
            <button className="close-modal" id="closePaDocsModal" onClick={closePaDocumentsModal}>
              &times;
            </button>
          </div>

          <div className="pa-docs-body">
            <p>Documents uploaded by the Physician Assistant for this patient:</p>

            <div className="pa-docs-grid" id="paDocsGrid">
              {currentPatientForPrescription?.paDocuments && currentPatientForPrescription.paDocuments.length > 0 ? (
                currentPatientForPrescription.paDocuments.map((doc) => (
                  <div className="pa-doc-card" key={doc.id}>
                    <div className="pa-doc-icon">
                      <i className={`fas fa-file-${getDocIcon(doc.type)}`}></i>
                    </div>
                    <div className="pa-doc-title">{doc.name}</div>
                    <div className="pa-doc-info">Type: {doc.type}</div>
                    <div className="pa-doc-info">Uploaded by: {doc.uploadedBy}</div>
                    <div className="pa-doc-date">Date: {doc.date}</div>
                  </div>
                ))
              ) : (
                <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "var(--text-light)" }}>
                  No documents uploaded by PA for this patient.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
