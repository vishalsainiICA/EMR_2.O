import React, { useEffect, useMemo, useState } from 'react';
import "./Initial_Assessment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faPlus, faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../../../api/useApi';
import { personalAssitantApi } from '../../../api/apiService';
import { toast } from 'react-toastify';

const Initialassessment = () => {
  // State to toggle form visibility
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate()

  const [assessmentData, setAssessmentData] = useState({
    vitals: {
      bp: "",
      heartRate: "",
      temperature: "",
      respRate: "",
      spo2: "",
      weight: "",
      height: "",
      bloodgroup: ""
    },
    complaint: "",
    medicalHistory: "",
    // physicalExam: "",
    notes: ""
  });

  const location = useLocation();
  const editPatient = location.state?.patient || null;


  useEffect(() => {
    if (editPatient) {
      setShowForm(true)
      setSelectedPatient(editPatient)
    }
  })


  const resetInitialAssessment = () => {
    setAssessmentData({
      vitals: {
        bp: "",
        heartRate: "",
        temperature: "",
        respRate: "",
        spo2: "",
        weight: "",
        height: ""
      },
      complaint: "",
      medicalHistory: "",
      // physicalExam: "",
      notes: "",
      selectedSym: []
    });
  };


  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setAssessmentData(prev => ({
      ...prev,
      vitals: { ...prev.vitals, [name]: value }
    }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setAssessmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  setTimeout(() => {
    document.getElementById("assessmentForm")?.scrollIntoView({ behavior: "smooth" });
  }, 100);

  // Dummy Data for Tabl
  const { request: loadpatient, loading, error } = useApi(personalAssitantApi.loadPatient)
  const { request: saveIntialAssessment, loading: intiLoading, error: intialError } = useApi(personalAssitantApi.saveInitialAssessments)

  const handleLoadPatient = async () => {
    try {
      const res = await loadpatient()
      setPatients(res?.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSaveIntialAssement = async (patientId, data) => {
    try {
      console.log("Call");

      const res = await saveIntialAssessment(patientId, data)
      handleLoadPatient()
      toast.success(res.message)
      setSelectedPatient(null)
      setShowForm(false)
      console.log(showForm);
      console.log(selectedPatient);
      loadpatient()
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    handleLoadPatient()

  }, [])

  useEffect(() => {
    if (intialError) toast.error(intialError)
    if (error) toast.error(error)
  }, [intialError, error])

  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patients;

    return patients?.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uid?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  return (
    <div className="section" id="initialAssessmentSection" style={{ display: 'block' }}>
      <div className="section-header">
        <h2 className="section-title">Initial Patient Assessments</h2>
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
            {loading && (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            )}

            {!loading && patients.length > 0 &&
              filteredPatients.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
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

                  <td>{item.age}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>
                    <span className={`status ${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="action-handler">
                    <button
                      onClick={() => {
                        if (item?.initialAssementId) {
                          console.log("call");

                          setAssessmentData(item?.initialAssementId);
                          console.log("call", assessmentData);

                        } else {
                          // reset form for new assessment
                          resetInitialAssessment()
                        }
                        setSelectedPatient(item);
                        setShowForm(true);

                        setTimeout(() => {

                          const el = document.getElementById(`assessmentForm-${item?._id}`);
                          el?.scrollIntoView({ behavior: "smooth" })
                        }, 100);
                        <a href={`assessmentForm-${selectedPatient._id}`}></a>
                      }}

                      className="action-btn">

                      <FontAwesomeIcon icon={faFile} /> Assess
                    </button>
                  </td>
                </tr>
              ))
            }

            {!loading && patients.length === 0 && (
              <tr>
                <td colSpan="7">No patients found</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Assessment Form (Conditionally rendered based on state) */}
      {console.log("assessmentData", assessmentData)
      }
      {showForm && selectedPatient && (
        <div
          className="assessment-form"
          id={`assessmentForm-${selectedPatient._id}`}
          style={{ marginTop: "30px" }}
        >
          <div className="modal-header">
            <h3 style={{ marginBottom: "20px" }}>Initial Assessment Form</h3>
            <button
              className="close-modal"
              onClick={() => {
                setShowForm(false)
                setSelectedPatient(null)
              }}
            >
              <FontAwesomeIcon icon={faClose} />

            </button>
          </div>

          {/* ================= Patient Info ================= */}
          <div className="patient-info" style={{ marginBottom: "30px" }}>
            <div className="patient-avatar">
              {selectedPatient.name
                .split(" ")
                .map(w => w[0])
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <h3>{selectedPatient.name}</h3>
              <p>
                #{selectedPatient._id.slice(-6)} | {selectedPatient.age} years,{" "}
                {selectedPatient.gender}
              </p>
            </div>
          </div>

          {/* ================= Vital Signs ================= */}
          <h4 style={{ marginBottom: "15px" }}>Vital Signs</h4>

          <div className="vitals-grid">
            <div className="vital-item">
              <div className="vital-label">Blood Pressure</div>
              <input
                type="text"
                className="vital-input"
                name="bp"
                placeholder="120/80"
                value={assessmentData.vitals.bp}
                onChange={handleVitalsChange}
              />
            </div>

            <div className="vital-item">
              <div className="vital-label">Heart Rate</div>
              <input
                type="text"
                className="vital-input"
                name="heartRate"
                placeholder="72 bpm"
                value={assessmentData.vitals.heartRate}
                onChange={handleVitalsChange}
              />
            </div>

            <div className="vital-item">
              <div className="vital-label">Temperature</div>
              <input
                type="text"
                className="vital-input"
                name="temperature"
                placeholder="98.6°F"
                value={assessmentData.vitals.temperature}
                onChange={handleVitalsChange}
              />
            </div>

            <div className="vital-item">
              <div className="vital-label">Respiratory Rate</div>
              <input
                type="text"
                className="vital-input"
                name="respRate"
                placeholder="16/min"
                value={assessmentData.vitals.respRate}
                onChange={handleVitalsChange}
              />
            </div>

            <div className="vital-item">
              <div className="vital-label">SpO2</div>
              <input
                type="text"
                className="vital-input"
                name="spo2"
                placeholder="98%"
                value={assessmentData.vitals.spo2}
                onChange={handleVitalsChange}
              />
            </div>

            <div className="vital-item">
              <div className="vital-label">Weight</div>
              <input
                type="text"
                className="vital-input"
                name="weight"
                placeholder="75 kg"
                value={assessmentData.vitals.weight}
                onChange={handleVitalsChange}
              />
            </div>

            <div className="vital-item">
              <div className="vital-label">Height</div>
              <input
                type="text"
                className="vital-input"
                name="height"
                placeholder="175 cm"
                value={assessmentData.vitals.height}
                onChange={handleVitalsChange}
              />
            </div>
            <div className="vital-item">
              <div className="vital-label">Blood Group</div>
              <select
                className="vital-input"
                name="bloodgroup"
                value={assessmentData?.vitals?.bloodgroup || ""}
                onChange={handleVitalsChange}
              >
                <option value="">Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

            </div>
          </div>

          {/* ================= Text Sections ================= */}
          <div className="form-group">
            <label>Chief Complaint *</label>
            <textarea
              name="complaint"
              placeholder="Describe the patient's main symptoms and duration"
              value={assessmentData.complaint}
              onChange={handleTextChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Relevant Medical History</label>
            <textarea
              name="medicalHistory"
              placeholder="Any relevant medical history for current complaint"
              value={assessmentData.medicalHistory}
              onChange={handleTextChange}
            />
          </div>

          {/* <div className="form-group">
      <label>Physical Examination Findings</label>
      <textarea
        name="physicalExam"
        placeholder="Findings from physical examination"
        value={assessmentData.physicalExam}
        onChange={handleTextChange}
      />
    </div> */}

          <div className="form-group">
            <label>Assessment Notes</label>
            <textarea
              name="notes"
              placeholder="Initial assessment and observations"
              value={assessmentData.notes}
              onChange={handleTextChange}
            />
          </div>

          {/* ================= Actions ================= */}
          <div
            className="form-group"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "15px",
              marginTop: "30px"
            }}
          >
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setShowForm(false);
                setSelectedPatient(null);
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn btn-primary"
              disabled={intiLoading}
              onClick={() =>
                handleSaveIntialAssement(selectedPatient._id, assessmentData)
              }
            >
              {intiLoading ? (
                <>
                  <span className="spinner" /> Submitting...
                </>
              ) : (
                "Submit Assessment"
              )}
            </button>

          </div>
        </div>
      )}


    </div>
  );
};

export default Initialassessment;