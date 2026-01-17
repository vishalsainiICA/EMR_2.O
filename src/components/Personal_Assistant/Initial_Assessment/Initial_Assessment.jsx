import React, { useEffect, useState } from 'react';
import "./Initial_Assessment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useApi } from '../../../api/useApi';
import personalAssitantApi from '../../../api/apiService';

const Initialassessment = () => {
    // State to toggle form visibility
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
const [showForm, setShowForm] = useState(false);

const [assessmentData, setAssessmentData] = useState({
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
  physicalExam: "",
  notes: ""
});

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

 const {request : loadpatient , loading , error} = useApi(personalAssitantApi.loadPatient)

   useEffect(()=>{
    
  const handleLoadPatient = async()=>{
      try {
        const res = await loadpatient()
        setPatients(res?.data)
      } catch (error) {
        console.log(error);  
      }
    } 
    handleLoadPatient()
   
   },[])


    return (
        <div className="section" id="initialAssessmentSection" style={{ display: 'block' }}>
            <div className="section-header">
                <h2 className="section-title">Initial Patient Assessments</h2>
                <button

                    className="btn btn-primary"
                    id="newAssessmentBtn"
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
  {loading && (
    <tr>
      <td colSpan="7">Loading...</td>
    </tr>
  )}

  {!loading && patients.length > 0 &&
    patients.map((item, index) => (
      <tr key={item._id}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.gender}</td>
        <td>{item.age}</td>
        <td>{new Date(item.createdAt).toLocaleString()}</td>
        <td>
          <span className={`status ${item.status?.toLowerCase()}`}>
            {item.status}
          </span>
        </td>
        <td className="action-handler">
          <button className="action-btn">
            <FontAwesomeIcon icon={faEye} /> View
          </button>
          <button 
            onClick={() => {
                        setShowForm(true);
                        setSelectedPatient(item)

                    }}
           className="action-btn">
            
            <FontAwesomeIcon icon={faFile} /> Assess
          </button>
        </td>
      </tr>
    ))
  }

  {!loading && patients.length === 0 && (
    <tr>PM	Schedul
      <td colSpan="7">No patients found</td>
    </tr>
  )}
</tbody>

                </table>
            </div>

            {/* Assessment Form (Conditionally rendered based on state) */}
{showForm && selectedPatient && (
  <div
    className="assessment-form"
    id={`assessmentForm-${selectedPatient._id}`}
    style={{ marginTop: "30px" }}
  >
    <div className="patient-detail-heading">
      <h3 style={{ marginBottom: "40px" }}>Initial Assessment Form</h3>
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

      <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <h3>{selectedPatient.name}</h3>
        <p>
          #{selectedPatient._id.slice(-6)} | {selectedPatient.age} years, {selectedPatient.gender}
        </p>
      </div>
    </div>

    {/* ================= Vital Signs ================= */}
    <h4 style={{ marginBottom: "15px" }}>Vital Signs</h4>

    <div className="vitals-grid">
      <input name="bp" placeholder="120/80" value={assessmentData.vitals.bp} onChange={handleVitalsChange} />
      <input name="heartRate" placeholder="72 bpm" value={assessmentData.vitals.heartRate} onChange={handleVitalsChange} />
      <input name="temperature" placeholder="98.6°F" value={assessmentData.vitals.temperature} onChange={handleVitalsChange} />
      <input name="respRate" placeholder="16/min" value={assessmentData.vitals.respRate} onChange={handleVitalsChange} />
      <input name="spo2" placeholder="98%" value={assessmentData.vitals.spo2} onChange={handleVitalsChange} />
      <input name="weight" placeholder="75 kg" value={assessmentData.vitals.weight} onChange={handleVitalsChange} />
      <input name="height" placeholder="175 cm" value={assessmentData.vitals.height} onChange={handleVitalsChange} />
    </div>

    {/* ================= Text Sections ================= */}
    <textarea
      name="complaint"
      placeholder="Chief Complaint"
      value={assessmentData.complaint}
      onChange={handleTextChange}
      required
    />

    <textarea
      name="medicalHistory"
      placeholder="Relevant Medical History"
      value={assessmentData.medicalHistory}
      onChange={handleTextChange}
    />

    <textarea
      name="physicalExam"
      placeholder="Physical Examination Findings"
      value={assessmentData.physicalExam}
      onChange={handleTextChange}
    />

    <textarea
      name="notes"
      placeholder="Assessment Notes"
      value={assessmentData.notes}
      onChange={handleTextChange}
    />

    {/* ================= Actions ================= */}
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "30px" }}>
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
        onClick={() =>
          console.log({
            patientId: selectedPatient._id,
            initialAssessment: assessmentData
          })
        }
      >
        Submit Assessment
      </button>
    </div>
  </div>
)}

        </div>
    );
};

export default Initialassessment;