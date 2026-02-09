import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashbord.css";
import {
  faClose,
  faClipboardList,
  faEdit,
  faPhoneAlt,
  faStethoscope,
  faHospitalUser,
  faEye,
  faFolder,
  faHistory,
  faList,
  faMapMarkedAlt,
  faPrint,
  faUserPlus,
  faUser,
  faExclamationTriangle // Make sure this is imported
} from "@fortawesome/free-solid-svg-icons";
import { useApi } from "../../../api/useApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { personalAssitantApi } from "../../../api/apiService";

function Personalassitant() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [metrices, setMetrices] = useState(null);
  const [openEditId, setOpenEditId] = useState(null);

  // --- ADDED: POPUP STATE ---
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState(""); 
  const [actionPatient, setActionPatient] = useState(null);
  const [actionReason, setActionReason] = useState("");
  const [dateData, setData] = useState("");

  const navigate = useNavigate();
  const { request: loadpatient, loading, error } = useApi(personalAssitantApi.loadPatient);

  const handleLoadPatient = async () => {
    try {
      const res = await loadpatient();
      setPatients(res?.data);
      setMetrices(res?.metrices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadPatient();
  }, []);

  const showValue = (value) =>
    value !== undefined && value !== null && value !== "" ? value : "—";

  // 🔹 MAIN ACTION HANDLER (Unified)
  const handlePatientAction = (action, patient) => {
    setOpenEditId(null); // Close Dropdown

    if (action === "edit") {
       // Edit Logic (Navigation)
       const isConfirmed = window.confirm("Are you sure you want to proceed with this action?");
       if (isConfirmed) {
          navigate("/pa/new_patientregister", { state: { patient } });
       }
    } else {
      // POSTPONE / CANCEL: Open Popup
      setActionType(action);
      setActionPatient(patient);
      setActionReason(""); 
      setData(""); // Reset Date
      setShowActionModal(true);
    }
  };

  // 🔹 SUBMIT ACTION (Console Log Logic)
  const submitAction = () => {
    if (!actionPatient) return;

    // --- POSTPONE LOGIC ---
    if (actionType === "postpone") {
      if (!dateData) {
        alert("Please select a date to postpone.");
        return;
      }
      if (!actionReason.trim()) {
        alert("Please enter a reason.");
        return;
      }
      
      console.log("Action: POSTPONE");
      console.log(`Patient: ${actionPatient.name}`);
      console.log(`New Date: ${dateData}`);
      console.log(`Reason: ${actionReason}`);
      // API call here...
    }

    // --- CANCEL LOGIC ---
    if (actionType === "cancel") {
      if (!actionReason.trim()) {
        alert("Please enter a reason for cancellation.");
        return;
      }

      console.log("Action: CANCEL");
      console.log(`Patient: ${actionPatient.name}`);
      console.log(`Reason: ${actionReason}`);
      // API call here...
    }

    // Close Modal & Reset
    setShowActionModal(false); 
    setActionPatient(null);
    setActionReason("");
    setData("");
  };

  const ScorllToview = () => {
    setTimeout(() => {
      document.getElementById("scrollView")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const hendleClickdropdown = (id) => {
    setOpenEditId((prev) => (prev === id ? null : id));
  };

  return (
    <div onClick={() => setOpenEditId(null)} className="section active" id="dashboardSection">
      {loading && <div className="loader-mini"></div>}

      {!loading && (
        <div className="dashboard-cards">
          <div className="card" id="newPatientCard">
            <div className="card-header">
              <div onClick={ScorllToview} className="card-alignment">
                <div className="card-count">{metrices?.todayPatient || "0"}</div>
                <div className="card-title">New Patients Today</div>
              </div>
              <div className="card-icon patient"><FontAwesomeIcon icon={faUserPlus} /></div>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/pa/pa_initial_assessment")}>
            <div className="card-header">
              <div className="card-alignment">
                <div className="card-count">{metrices?.pendingAssessment || "0"}</div>
                <div className="card-title">Pending Assessments</div>
              </div>
              <div className="card-icon assessment"><FontAwesomeIcon icon={faClipboardList} /></div>
            </div>
          </div>

          <div className="card" onClick={() => navigate("/pa/patienthistory")}>
            <div className="card-header">
              <div className="card-alignment">
                <div className="card-count">{metrices?.patientRecord || "0"}</div>
                <div className="card-title">Total Patient Records</div>
              </div>
              <div className="card-icon records"><FontAwesomeIcon icon={faFolder} /></div>
            </div>
          </div>
        </div>
      )}

      <div id="scrollView" className="recent-patients">
        <div className="recent-patients-header">
          <h2>Recent Patient Registrations</h2>
          <button onClick={() => navigate("/pa/patienthistory")} className="view-all-btn">
            <FontAwesomeIcon icon={faList} /> View All
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Registration Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="recentPatientsTable">
              {loading && <tr><td colSpan="7" style={{ textAlign: "center" }}>Loading patients... <div className="loader-mini"></div></td></tr>}
              {error && <tr><td colSpan="7" style={{ textAlign: "center", color: "red" }}>Failed to load patients</td></tr>}
              {!loading && !error && patients?.length === 0 && <tr><td colSpan="7" style={{ textAlign: "center" }}>No patients found</td></tr>}

              {!loading && patients?.map((item) => (
                <tr key={item._id}>
                  <td>{item.uid}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                  <td>{item.status}</td>

                  <td className="">
                    <button className="action-btn edit_dropdown" onClick={() => setSelectedPatient(item)}>
                      <FontAwesomeIcon icon={faEye} /> View
                    </button>

                    {/* DROPDOWN MENU START */}
                    {openEditId === item._id && (
                      <div className="" onClick={(e) => e.stopPropagation()}
                        style={{
                          backgroundColor: "#fff", // Added visible background
                          boxShadow: "1px 1px 5px rgba(0,0,0,0.2)", // Improved shadow
                          position: "absolute",
                          right: "90px",
                          zIndex: 10, // Ensure it's on top
                          borderRadius: "2px",
                          textAlign: "center",
                          padding: "5px 0"
                        }}
                      >
                        <div className="dropdown-item" 
                            style={{padding:'5px 10px', cursor:'pointer'}}
                            onClick={() => handlePatientAction("edit", item)}
                        >
                          Edit
                        </div>

                        <div className="dropdown-item" 
                            style={{padding:'5px 10px', cursor:'pointer'}}
                            onClick={() => handlePatientAction("postpone", item)}
                        >
                          Postpone
                        </div>

                        <div className="dropdown-item" 
                            style={{padding:'5px 10px', cursor:'pointer'}}
                            onClick={() => handlePatientAction("cancel", item)}
                        >
                          Cancel
                        </div>
                      </div>
                    )}
                    {/* DROPDOWN MENU END */}

                    <div className="action-btn edit_dropdown"
                      onClick={(e) => {
                        e.stopPropagation();
                        hendleClickdropdown(item._id);
                      }}
                    >
                      Edit
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
      {showActionModal && (
        <div className="action-modal-overlay">
          <div className="action-modal-box">
            <div className="action-header">
              <FontAwesomeIcon
                icon={actionType === 'cancel' ? faExclamationTriangle : faHistory}
                color={'#333'} 
                size="lg"
              />
              <h3 style={{textTransform: 'capitalize'}}>{actionType} Patient</h3>
            </div>
            
            <div className="action-body">
              <p>
                Are you sure you want to <strong>{actionType}</strong> : 
                <strong> {actionPatient?.name}</strong>?
              </p>
              
              <label style={{fontWeight:'bold', display:'block', marginBottom:'5px', color:'#333', textAlign:"left"}}>
                 {actionType === 'postpone' ? 'Select New Date & Reason:' : 'Reason for Cancellation:'}
              </label>

              {/* Show Date only for Postpone */}
              {actionType === 'postpone' && (
                  <input 
                    type="date" 
                    className="action-input"
                    style={{width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px'}}
                    onChange={(e) => setData(e.target.value)} 
                    value={dateData}
                  />
              )}

              <textarea
                className="action-textarea"
                placeholder="Enter reason here..."
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
              />
            </div>

            <div className="action-footer">
              <button className="btn-cancel-modal" onClick={() => setShowActionModal(false)}>
                Close
              </button>
              <button 
                className="btn-confirm-modal"
                onClick={submitAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

   
      {selectedPatient !== null && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Patient Details</h2>
              <button className="close-modal" onClick={() => setSelectedPatient(null)}>&times;</button>
            </div>

            <div className="patient-details">
              <div className="patient-header">
                <div className="patient-info">
                  <div className="patient-avatar">
                    {showValue(selectedPatient.name)?.charAt(0)}
                  </div>
                  <div className="patient-name">
                    <h2>{showValue(selectedPatient.name)}</h2>
                    <p className="patient-id">Patient ID: {showValue(selectedPatient.uid)}</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn btn-outline" onClick={() => handlePatientAction("edit", selectedPatient)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button className="btn btn-outline">
                    <FontAwesomeIcon icon={faPrint} /> Print
                  </button>
                </div>
              </div>

              <div className="patient-grid">
                <div className="info-card">
                  <h3><FontAwesomeIcon icon={faUser} /> Basic Info</h3>
                  <p><strong>Age:</strong> {showValue(selectedPatient.age)}</p>
                  <p><strong>Gender:</strong> {showValue(selectedPatient.gender)}</p>
                  <p><strong>Phone:</strong> {showValue(selectedPatient.attendeePhone)}</p>
                </div>

                <div className="info-card">
                  <h3><FontAwesomeIcon icon={faMapMarkedAlt} /> Address</h3>
                  <p>{showValue(`${selectedPatient.city || ""}, ${selectedPatient.state || ""}`)}</p>
                </div>

                <div className="info-card">
                  <h3><FontAwesomeIcon icon={faPhoneAlt} /> Emergency Contact</h3>
                  <p><strong>Name:</strong> {showValue(selectedPatient.attendeeName)}</p>
                  <p><strong>Phone:</strong> {showValue(selectedPatient.attendeePhone)}</p>
                </div>

                <div className="info-card">
                  <h3><FontAwesomeIcon icon={faStethoscope} /> Current Visit</h3>
                  <p><strong>Status:</strong> {showValue(selectedPatient.status)}</p>
                  <p><strong>Chief Complaint:</strong> {showValue(selectedPatient.initialAssementId?.complaint)}</p>
                  <p><strong>Vitals:</strong> {selectedPatient.initialAssementId?.vitals ? (
                      <>BP {showValue(selectedPatient.initialAssementId.vitals.bp)}, HR {showValue(selectedPatient.initialAssementId.vitals.heartRate)}, Temp {showValue(selectedPatient.initialAssementId.vitals.temperature)}°F, SpO₂ {showValue(selectedPatient.initialAssementId.vitals.spo2)}%</>
                    ) : ("—")}
                  </p>
                  <p><strong>Registration Time:</strong> {selectedPatient.createdAt ? new Date(selectedPatient.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</p>
                </div>
              </div>

              <div className="medical-history">
                <h3 className="section-title"><FontAwesomeIcon icon={faHistory} /> Medical History</h3>
                {selectedPatient.initialAssementId ? (
                  selectedPatient?.treatmentHistory?.map((his, index) => {
                    return <div key={index} className="history-item">
                      <div className="history-header">
                        <span className="history-date">{new Date(his.treatedAt).toLocaleDateString()}</span>
                        <span className="history-doctor">{`Dr. ${his?.doctorId?.name}`}</span>
                      </div>
                      <div className="history-details">
                        <p><strong>Medical History:</strong> {showValue(his.initialAssementId.medicalHistory)}</p>
                        <p><strong>Medications:</strong> {showValue(his?.prescriptionId?.prescriptionMediciene)}</p>
                        <p><strong>Doctor Notes:</strong> {showValue(his.initialAssementId.notes)}</p>
                      </div>
                    </div>
                  })
                ) : (
                  <p style={{ textAlign: "center" }}>No medical history found</p>
                )}
              </div>

              <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button className="btn btn-outline" onClick={() => setSelectedPatient(null)}>
                  <FontAwesomeIcon icon={faClose} /> Close
                </button>
                <button className="btn btn-outline" onClick={() => navigate("/pa/pa_initial_assessment", { state: { patient: selectedPatient } })}>
                  <FontAwesomeIcon icon={faHospitalUser} /> Create New Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Personalassitant;
