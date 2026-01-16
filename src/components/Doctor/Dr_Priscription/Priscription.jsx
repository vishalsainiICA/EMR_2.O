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
    <div className="section" id="prescriptionsSection">
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
        <div className="final-prescription" id="printablePrescription" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
          {/* Sample Content */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3>DR. CLINIC NAME</h3>
            <p>Sample Prescription Preview Content</p>
          </div>
          <hr />
          <div style={{ minHeight: '100px', marginTop: '20px' }}>
            <p>Rx details will appear here...</p>
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
            <i className="fas fa-times"></i> Close View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionManagement;