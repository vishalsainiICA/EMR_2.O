import React, { useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose,faFileMedicalAlt , faClipboardList, faUser, faEye, faHospitalUser, faEdit, faPhoneAlt, faStethoscope, faFolder, faHistory, faMapMarkedAlt, faPrint, faSyncAlt, faUserMd, faUserPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Patient_Record.css"
import { useApi } from '../../../api/useApi';
import { doctorApi } from '../../../api/apiService';
import { toast } from 'react-toastify';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from 'react-router-dom';

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState({
    startDate: "",
    endDate: ""
  })
  const navigate = useNavigate()
  // Yeh mock data table structure ko maintain karne ke liye hai
  const { request: loadpatient, loading, error } = useApi(doctorApi.getAllPatient)
  const handleLoadPatient = async () => {
    try {
      const res = await loadpatient(date)
      setPatients(res?.data || [])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleLoadPatient()

  }, [])

  const showValue = (value) => {
    return value !== undefined && value !== null && value !== ""
      ? value
      : "—";
  };

  const handleExportExcel = () => {
    console.log("call_1");

    if (!patients || patients.length === 0) {
      return toast.error("No data to export");
    }
    console.log("call_2");
    //  JSON ko clean Excel-friendly format me map karo
    const excelData = patients.map((p, index) => ({
      "Sr No": index + 1,
      "Patient Name": p.name,
      "Phone": p.phone,
      "Gender": p.gender,
      "Age": p.age,
      "Doctor": p?.currentDoctorId?.name || "",
      "Status": p.status,
      "Updated At": new Date(p.updatedAt).toLocaleDateString()
    }));

    // Workbook & Sheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

    // Excel buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const fileData = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(fileData, `patients_${Date.now()}.xlsx`);
  };

  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patients;

    return patients?.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uid?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  return (
    <div className="section active" id="patientRecordsSection">

      <div className="date-filter">
        <h2 className="section-title">Patient Records</h2>
        <div className="search-box1">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            id="globalSearch"
            placeholder="Search patients by name or id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>
        <div className="filter-controls">
          <input
            type="date"
            className="date-input"
            id="startDate"
            value={date.startDate}
            onChange={(e) =>
              setDate(prev => ({
                ...prev,
                startDate: e.target.value
              }))
            }
          />

          <span>to</span>

          <input
            type="date"
            className="date-input"
            id="endDate"
            value={date.endDate}
            onChange={(e) =>
              setDate(prev => ({
                ...prev,
                endDate: e.target.value
              }))
            }
          />

          <div className="filter-btn-wrapper">
            <button
              className="filter-btn"
              id="applyFilterBtn"
              disabled={!date.startDate || !date.endDate || loading}
              onClick={handleLoadPatient}
            >
              {loading ? (
                <div className="loader-mini"></div>
              ) : (
                <>
                  <i className="fas fa-filter"></i> Apply Filter
                </>
              )}
            </button>

            {/* {(!date.startDate || !date.endDate) && (
                                  <span className="tooltip-text">
                                      Please select start & end date
                                  </span>
                              )} */}
          </div>

        </div>

        <button className="export-btn" onClick={handleExportExcel}>
          <i className="ri-upload-2-line"></i> Export (.excel)
        </button>


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
              <th>Medications</th>
              <th>Vitals</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody id="patientRecordsTable">
            {/* React Mapping for Table Rows */}
            {/*  Loading State */}
            {loading && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Loading patients...
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
            {!loading && !error && patients?.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No patients found
                </td>
              </tr>
            )}
            {!loading &&
              filteredPatients?.map((item) => (
                <tr key={item._id}>
                  <td>{item.uid}</td>
                  <td>{item.name}</td>
                  <td>{item.age}/{item.gender}</td>
                  <td>{new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</td>

                  {/* Time */}
                  <td>
                    {item?.initialAssementId?.complaint}
                  </td>

                  {/* Status */}
                  <td>


                    {item?.currentPrescriptionId?.prescriptionMediciene}
                  </td>

                  <td>
                    {item?.initialAssementId?.vitals ? (
                      <div className="vitals-important">
                        <span>BP: {item.initialAssementId.vitals.bp}</span>{" | "}
                        <span>HR: {item.initialAssementId.vitals.heartRate}</span>{" | "}
                        <span>Temp: {item.initialAssementId.vitals.temperature}</span>{" | "}
                        <span>SpO₂: {item.initialAssementId.vitals.spo2}</span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Actions */}
                  <td className="action-handler">
                    <button
                      className="action-btn"
                    // onClick={() => handleEditPatient(item)}
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
      {selectedPatient && (
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
                            selectedPatient.initialAssementId.medicalHistory
                          )}
                        </p>

                        <p>
                          <strong>Current Medications:</strong>{" "}
                          {showValue(
                            selectedPatient?.currentPrescriptionId?.prescriptionMediciene
                          )}
                        </p>

                        <p>
                          <strong>Doctor Notes:</strong>{" "}
                          {showValue(
                            selectedPatient.initialAssementId.notes
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
    </div>
  );
};

export default PatientRecords;
