import "./Priscription.css"
import React, { useState } from 'react';

const PrescriptionManagement = () => {
  // Prescription view ko show/hide karne ke liye state
  const [showPreview, setShowPreview] = useState(false);

  // Mock data for table
  const prescriptions = [
    {
      id: "RX-9902",
      name: "Rajesh Kumar",
      date: "16 Jan 2024",
      medications: "Paracetamol, Amoxicillin",
      refills: "0",
      status: "Active"
    }
  ];

  return (
    <div className="section active" id="prescriptionsSection">
      <div className="section-header">
        <h2 className="section-title">Prescription Management</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="search-box" style={{ width: '300px' }}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              id="prescriptionSearch"
              placeholder="Search prescriptions..."
            />
          </div>
          <button
            className="btn btn-outline"
            id="viewFinalPrescriptionBtn"
            onClick={() => setShowPreview(true)}
          >
            <i className="fas fa-file-medical"></i> View Sample Prescription
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Prescription ID</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Medications</th>
              <th>Refills</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="prescriptionsTable">
            {prescriptions.map((rx, index) => (
              <tr key={index}>
                <td>{rx.id}</td>
                <td><strong>{rx.name}</strong></td>
                <td>{rx.date}</td>
                <td>{rx.medications}</td>
                <td>{rx.refills}</td>
                <td>
                  <span className="status-badge" style={{ padding: '4px 8px', borderRadius: '4px', background: '#e8f5e9', color: '#2e7d32' }}>
                    {rx.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm" title="Print">
                    <i className="fas fa-print"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Final Prescription View - Controlled by showPreview state */}
      <div
        id="finalPrescriptionView"
        style={{
          display: showPreview ? 'block' : 'none',
          marginTop: '30px'
        }}
      >
        {/* <div className="final-prescription" id="printablePrescription" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3>DR. CLINIC NAME</h3>
            <p>Sample Prescription Preview Content</p>
          </div>
          <hr />
          <div style={{ minHeight: '100px', marginTop: '20px' }}>
            <p>Rx details will appear here...</p>
          </div>
        </div> */}

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
                <span className="prescription-label">Patient Name :</span>
                <span className="prescription-value">kanaiya</span>
              </div>

              <div className="prescription-field">
                <span className="prescription-label">Age / Gender:</span>
                <span className="prescription-value">
                  20 Years / male
                </span>
              </div>

              <div className="prescription-field">
                <span className="prescription-label">Patient ID:</span>
                <span className="prescription-value">123456789876</span>
              </div>

              <div className="prescription-field">
                <span className="prescription-label">Blood Group:</span>
                <span className="prescription-value">
                  120/122
                </span>
              </div>
            </div>

            <div>
              <div className="prescription-field">
                <span className="prescription-label">Date:</span>
                <span className="prescription-value">22/1/2026</span>
              </div>

              <div className="prescription-field">
                <span className="prescription-label">Prescription ID:</span>
                <span className="prescription-value">0987654323456</span>
              </div>

              <div className="prescription-field">
                <span className="prescription-label">Diagnosis Type:</span>
                <span className="prescription-value">kkjhgfghj Diagnosis</span>
              </div>

              <div className="prescription-field">
                <span className="prescription-label">Weight/Height:</span>
                <span className="prescription-value">
                  50kg /5.5
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
                  PA Assessment by: Radheshyam
                </span>
              </div>
              <div className="pa-time">Time: now</div>
            </div>

            <div className="assessment-findings">
              <div className="assessment-section">
                <span className="assessment-label">Chief Complaint:</span>
                <span>NA</span>
              </div>

              <div className="assessment-section">
                <span className="assessment-label">Vitals:</span>
                <span>
                  Temp: 40 degree, BP:120
                   Pulse:66
                  88, RR:{" "}
                  60, SpO2:{" "}
                  77
                </span>
              </div>

              <div className="assessment-section">
                <span className="assessment-label">Allergies:</span>
                <span>jhkajshdkajsduaysdajsdhkjasdhsahgdfajshdfahsfkljasfdh</span>
              </div>
            </div>
          </div>

          {/* Doctor's Diagnosis */}
          <div className="compact-section">
            <div className="compact-section-title">
              DOCTOR'S HDAKJhadkjhAKJHDKJadhkjADH DIAGNOSIS
            </div>
            <div style={{ marginBottom: "6px" }}>
              <strong>Diagnosis:</strong> HGJHgdjhgJHGADJHGADJHAgsdjha
            </div>
            <div>
              <strong>Clinical Findings:</strong>khdKJHSDKJahskdjhaksjd
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
                display: "flex",
                alignItems: "start",
                justifyItems: "start"
              }}
            >
              medications
            </div>
          </div>

          {/* Investigations & Advice */}
          <div className="compact-section">
            <div className="compact-section-title">INVESTIGATIONS ADVISED</div>
            <div style={{ fontSize: "11px", display: "flex", alignItems: "start" }}>Blood check </div>
          </div>

          <div className="compact-section">
            <div className="compact-section-title">GENERAL ADVICE</div>
            <div style={{ fontSize: "11px" }}>NO alchohol drink</div>
          </div>

          <div
            style={{
              margin: "12px 0",
              padding: "8px",
              backgroundColor: "#fff3cd",
              borderRadius: "6px",
              border: "1px solid #ffeaa7",
              fontSize: "11px",
              display: "flex"
            }}
          >
            <strong>ALLERGIES:</strong> medicalHistory
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
              Generated: pdf | ID: 12345678|
              Valid for 30 days
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '30px', justifyContent: 'center' }}>
          <button className="btn btn-primary" id="printFinalPrescriptionBtn">
            <i className="fas fa-print"></i> Print Prescription
          </button>
          <button
            className="btn btn-outline"
            id="closeFinalPrescriptionBtn"
            onClick={() => setShowPreview(false)}
          >
            <i className="fas fa-times"></i>
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionManagement;