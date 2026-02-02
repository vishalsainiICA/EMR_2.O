import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dashbord.css"
import { faClose, faClipboardList, faEdit, faPhoneAlt, faStethoscope, faExclamationTriangle, faHospitalUser, faEye, faFolder, faHistory, faList, faMapMarkedAlt, faPrint, faSyncAlt, faUserMd, faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import { faClose, faEdit, faExclamationTriangle, faHistory, faHospitalUser, faMapMarkedAlt, faNewspaper, faPrint, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { useApi } from "../../../api/useApi";
import { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { useNavigate } from "react-router-dom";
import { personalAssitantApi } from "../../../api/apiService";
function Personalassitant() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [metrices, setMetrices] = useState(null)

  const navigate = useNavigate()
  const { request: loadpatient, loading, error } = useApi(personalAssitantApi.loadPatient)
  const handleLoadPatient = async () => {
    try {
      const res = await loadpatient()
      setPatients(res?.data)
      setMetrices(res?.metrices)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleLoadPatient()

  }, [])

  // useEffect(() => {
  //   navigate("/login")
  // }, [error])

  const showValue = (value) => {
    return value !== undefined && value !== null && value !== ""
      ? value
      : "—";
  };

  const handleEditPatient = (patient) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to edit this patient?"
    );

    if (isConfirmed) {
      navigate("/pa/new_patientregister", {
        state: { patient }
      });
    }
  };

  const ScorllToview = () => {
    setTimeout(() => {
      document.getElementById("scrollView")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }



  return (
    <div className="section active" id="dashboardSection">
      {/* UPDATED: Date Filter
      <div className="date-filter">
        <h3>Dashboard Overview</h3>
        <div className="filter-controls">
          <input type="date" className="date-input" id="startDate" defaultValue="2023-10-01" />
          <span>to</span>
          <input type="date" className="date-input" id="endDate" defaultValue="2023-10-15" />
          <button className="filter-btn" id="applyFilterBtn">
            <i className="fas fa-filter"></i> Apply Filter
          </button>
        </div>
      </div> */}

      {/* UPDATED: Dashboard Cards - Smaller */}
      {loading && (
        <div className="loader-mini">

        </div>
      )}
      {!loading && (
        <div className="dashboard-cards">
          <div className="card" id="newPatientCard">
            <div className="card-header">
              <div onClick={ScorllToview} className="card-alignment">
                <div className="card-count">{metrices?.todayPatient || "0"}</div>
                <div className="card-title"> New Patients Today</div>
              </div>
              <div className="card-icon patient">
                <FontAwesomeIcon icon={faUserPlus} />
              </div>
            </div>
            <div className="card-trend">+2 from yesterday</div>
          </div>

          <div className="card" id="pendingAssessmentsCard">
            <div className="card-header">
              <div className="card-alignment">
                <div className="card-count">{metrices?.pendingAssessment || "0"}</div>
                <div className="card-title">Pending Assessments</div>
              </div>
              <div className="card-icon assessment">
                <FontAwesomeIcon icon={faClipboardList} />
              </div>
            </div>
            <div className="card-trend down">-3 from yesterday</div>
          </div>

          <div className="card" id="patientRecordsCard">
            <div className="card-header">
              <div className="card-alignment">
                <div className="card-count">{metrices?.patientRecord || "0"}</div>
                <div className="card-title">Total Patient Records</div>
              </div>
              <div className="card-icon records">
                <FontAwesomeIcon icon={faFolder} />
              </div>
            </div>
            <div className="card-trend">+12 this week</div>
          </div>

          {/* <div className="card" id="doctorQueueCard">
          <div className="card-header">
            <div className="card-alignment">
              <div className="card-count">5</div>
              <div className="card-title">In Doctor Queue</div>
            </div>
            <div className="card-icon queue">
              <FontAwesomeIcon icon={faUserMd} />
            </div>
          </div>
          <div className="card-trend">+1 in queue</div>
        </div> */}
        </div>
      )}


      {/* UPDATED: Recent Patients Table */}
      <div id="scrollView" className="recent-patients">
        <div className="recent-patients-header">
          <h2 className="recent-patients-title">Recent Patient Registrations</h2>
          <button onClick={() => navigate("/pa/patienthistory")} style={{ display: "flex", gap: "5px" }} className="view-all-btn" id="viewAllPatientsBtn">
            <FontAwesomeIcon icon={faList} />
            View All
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
              {/*  Loading State */}
              {loading && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>

                    Loading patients...  <div className="loader-mini"></div>
                  </td>
                </tr>
              )}

              {/* Error State */}
              {error && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", color: "red" }}>
                    Failed to load patients
                  </td>
                </tr>
              )}

              {/* Empty State */}
              {!loading && patients?.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No patients found
                  </td>
                </tr>
              )}

              {/* Data Rows */}
              {!loading &&
                patients?.map((item) => (
                  <tr key={item._id}>
                    <td>{item.uid}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>

                    {/* Time */}
                    <td>
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge ${item.status === "Assessment Done"
                          ? "completed"
                          : item.status === "Scheduled"
                            ? "pending"
                            : "active"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="action-handler">
                      <button
                        className="action-btn"
                        onClick={() => handleEditPatient(item)}
                      >

                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>

                      <button
                        className="action-btn"
                        onClick={() => {
                          setSelectedPatient(item);
                          // open view modal/page
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} /> View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Doctor Queue Section */}
      {selectedPatient !== null && (
        <div className="modal">

          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Patient Details</h2>
              <button
                className="close-modal"
                onClick={() => setSelectedPatient(null)}
              >
                &times;
              </button>
            </div>

            <div className="patient-details">
              {/* ================= Header ================= */}
              <div className="patient-header">
                <div className="patient-info">
                  <div className="patient-avatar">
                    {showValue(selectedPatient.name)?.charAt(0)}
                  </div>

                  <div className="patient-name">
                    <h2>{showValue(selectedPatient.name)}</h2>
                    <p className="patient-id">
                      Patient ID: {showValue(selectedPatient.uid)}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn btn-outline">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button className="btn btn-outline">
                    <FontAwesomeIcon icon={faPrint} /> Print
                  </button>
                </div>
              </div>

              {/* ================= Info Grid ================= */}
              <div className="patient-grid">

                {/* Basic Info */}
                <div className="info-card">
                  <h3><FontAwesomeIcon icon={faUser} /> Basic Info</h3>
                  <p><strong>Age:</strong> {showValue(selectedPatient.age)}</p>
                  <p><strong>Gender:</strong> {showValue(selectedPatient.gender)}</p>
                  <p><strong>Phone:</strong> {showValue(selectedPatient.attendeePhone)}</p>
                </div>

                {/* Address */}
                <div className="info-card">
                  <h3><FontAwesomeIcon icon={faMapMarkedAlt} /> Address</h3>
                  <p>
                    {showValue(
                      `${selectedPatient.city || ""}, ${selectedPatient.state || ""}`
                    )}
                  </p>
                </div>

                {/* Emergency Contact */}
                <div className="info-card">
                  <h3><FontAwesomeIcon icon={faPhoneAlt} /> Emergency Contact</h3>
                  <p><strong>Name:</strong> {showValue(selectedPatient.attendeeName)}</p>
                  <p><strong>Phone:</strong> {showValue(selectedPatient.attendeePhone)}</p>
                </div>

                {/* Medical Info */}
                {/* Current Visit */}
                <div className="info-card">
                  <h3><FontAwesomeIcon icon={faStethoscope} /> Current Visit</h3>

                  <p><strong>Status:</strong> {showValue(selectedPatient.status)}</p>

                  <p>
                    <strong>Chief Complaint:</strong>{" "}
                    {showValue(selectedPatient.initialAssementId?.complaint)}
                  </p>

                  <p>
                    <strong>Vitals:</strong>{" "}
                    {selectedPatient.initialAssementId?.vitals ? (
                      <>
                        BP {showValue(selectedPatient.initialAssementId.vitals.bp)},{" "}
                        HR {showValue(selectedPatient.initialAssementId.vitals.heartRate)},{" "}
                        Temp {showValue(selectedPatient.initialAssementId.vitals.temperature)}°F,{" "}
                        SpO₂ {showValue(selectedPatient.initialAssementId.vitals.spo2)}%
                      </>
                    ) : (
                      "—"
                    )}
                  </p>

                  <p>
                    <strong>Registration Time:</strong>{" "}
                    {selectedPatient.createdAt
                      ? new Date(selectedPatient.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : "—"}
                  </p>
                </div>
              </div>

              {/* ================= Medical History ================= */}
              <div className="medical-history">
                <h3 className="section-title">
                  <FontAwesomeIcon icon={faHistory} /> Medical History
                </h3>

                {selectedPatient.initialAssementId ? (
                  selectedPatient?.treatmentHistory?.map((his, index) => {
                    return <div key={index} className="history-item">
                      <div className="history-header">
                        <span className="history-date">
                          {new Date(
                            his.treatedAt
                          ).toLocaleDateString()}
                        </span>
                        <span className="history-doctor">{`Dr. ${his?.doctorId?.name}`}</span>
                      </div>

                      <div className="history-details">
                        <p>
                          <strong>Medical History:</strong>{" "}
                          {showValue(
                            his.initialAssementId.medicalHistory
                          )}
                        </p>

                        <p>
                          <strong>Medications:</strong>{" "}
                          {showValue(
                            his?.prescriptionId?.prescriptionMediciene
                          )}
                        </p>

                        <p>
                          <strong>Doctor Notes:</strong>{" "}
                          {showValue(
                            his.initialAssementId.notes
                          )}
                        </p>
                      </div>
                    </div>
                  })

                ) : (
                  <p style={{ textAlign: "center" }}>No medical history found</p>
                )}
              </div>

              {/* ================= Footer ================= */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedPatient(null)}
                >
                  <FontAwesomeIcon icon={faClose} /> Close
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/pa/pa_initial_assessment", { state: { patient: selectedPatient } })}
                >
                  <FontAwesomeIcon icon={faHospitalUser} /> Create New Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div >
  )

}

export default Personalassitant;