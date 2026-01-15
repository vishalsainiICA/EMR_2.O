import React, { useRef, useState } from 'react';
import "./NewPatientRegister.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faClipboardList, faCloudUploadAlt, faEdit, faEye, faFolder, faList, faScaleUnbalanced, faSyncAlt, faUserMd, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from '@fortawesome/free-regular-svg-icons';


const NewPatient = () => {
  const [patient, setPatient] = useState({});
  const [files, setFiles] = useState([])

  const FileinputRef = useRef(null)

  const openFileDialog = () => {
    FileinputRef.current.click();
  }
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };
  const handleChange = (key, value) => {
    setPatient((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="section active" id="newPatientSection">
      <div className="section-header">
        <h2 className="section-title">New Patient Registration </h2>
        <button className="btn btn-outline" id="scanAadharBtn">
         <FontAwesomeIcon icon={faIdCard}/> Scan Aadhar Card
        </button>
      </div>

      <div className="patient-details">
        <form id="newPatientForm">
          {/* Aadhar Scan Section */}
          <div className="aadhar-scan" id="aadharScanBtnSection">
            <i className=" fa-id-card"><FontAwesomeIcon icon={faIdCard}/></i>
            <p>Scan Aadhar Card to Auto-fetch Patient Details</p>
            <span>Click here or use scanner to capture Aadhar details</span>
          </div>


          <div
            className="patient-preview"
            id="patientPreview"
            style={{ display: 'none' }}
          >
            <h3>Patient Details from Aadhar</h3>
            <div className="preview-grid">
              <div className="preview-item">
                <label>Full Name</label>
                <p id="previewName">Rajesh Kumar</p>
              </div>
              <div className="preview-item">
                <label>Date of Birth</label>
                <p id="previewDOB">15-08-1981</p>
              </div>
              <div className="preview-item">
                <label>Gender</label>
                <p id="previewGender">Male</p>
              </div>
              <div className="preview-item">
                <label>Aadhar Number</label>
                <p id="previewAadhar">XXXX-XXXX-1234</p>
              </div>
            </div>
          </div>

          <div className='patient-detail-heading'>
            <h3 style={{ marginBottom: '20px' }}>Patient Information</h3>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientName">Full Name *</label>
              <input
                onChange={(e) => handleChange("name", e.target.value)}
                value={patient?.name}
                type="text"
                id="patientName"
                className="form-control"
                placeholder="Enter patient full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientAge">Age *</label>
              <input
                onChange={(e) => handleChange("age", e.target.value)}
                value={patient?.age}
                type="number"
                id="patientAge"
                className="form-control"
                placeholder="Age"
                min="0"
                max="120"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientGender">Gender *</label>
              <select
                onChange={(e) => handleChange("gender", e.target.value)}
                value={patient?.gender}
                id="patientGender" className="form-control" required defaultValue="">
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="patientPhone">Contact Number *</label>
              <input
                onChange={(e) => handleChange("contact", e.target.value)}
                value={patient?.contact}
                type="tel"
                id="patientPhone"
                className="form-control"
                placeholder="+91 00000 00000"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="patientAddress">Address</label>
            <textarea
              id="patientAddress"
              className="form-control"
              placeholder="Enter patient address"
              rows="3"
            ></textarea>
          </div>

          {/* Emergency Contact Fields */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emergencyName">Emergency Contact Name</label>
              <input
                onChange={(e) => handleChange("attendeeName", e.target.value)}
                value={patient?.attendeeName}
                type="text"
                id="emergencyName"
                className="form-control"
                placeholder="Emergency contact person name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyPhone">Emergency Contact Number</label>
              <input
                onChange={(e) => handleChange("attendeePhone", e.target.value)}
                value={patient?.attendeePhone}
                type="tel"
                id="emergencyPhone"
                className="form-control"
                placeholder="Emergency contact phone number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="consultingDoctor">Consulting Doctor *</label>
              <select
                onChange={(e) => handleChange("doctorId", e.target.value)}
                value={patient?.doctorId}
                id="consultingDoctor" className="form-control" required defaultValue="">
                <option value="" disabled>Select Doctor</option>
                <option value="dr_sharma">Dr. Anil Sharma (General Physician)</option>
                <option value="dr_nair">Dr. Priya Nair (Internal Medicine)</option>
                <option value="dr_mehta">Dr. Rohan Mehta (Cardiologist)</option>
                <option value="dr_verma">Dr. Sunita Verma (Endocrinologist)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="visitType">Visit Type</label>
              <select
                onChange={(e) => handleChange("visitType", e.target.value)}
                value={patient?.visitType}
                id="visitType" className="form-control" defaultValue="consultation">
                <option value="consultation">Consultation</option>
                <option value="followup">Follow Up</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="patientHistory">Medical History Summary</label>
            <textarea
              onChange={(e) => handleChange("patientHistory", e.target.value)}
              value={patient?.patientHistory}
              id="patientHistory"
              className="form-control"
              placeholder="Any known medical conditions, allergies, or previous surgeries"
              rows="3"
            ></textarea>
          </div>

          {/* File Upload Section */}
          <div className="file-upload-section">
            <h3 style={{ marginBottom: '15px' }}>Upload Previous Medical Records</h3>
            <div onClick={openFileDialog} className="file-upload-box" id="fileUploadBox">
              <i className="fas fa-cloud-upload-alt"><FontAwesomeIcon icon={faCloudUploadAlt}/></i>
              <p>Click to upload or drag and drop</p>
              <span>Supports PDF, JPG, PNG (Max 10MB each)</span>
            </div>
            <input type="file"
              ref={FileinputRef}
              multiple
              accept='.pdf,.jpg,.jpeg,.png'
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          <div className="uploaded-files">
        {files.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
          </div>

          <div
            // className="form-group1"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '15px',
              marginTop: '30px'
            }}
           >
            <button type="button" className="btn btn-outline" id="cancelPatientBtn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Register Patient
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewPatient;