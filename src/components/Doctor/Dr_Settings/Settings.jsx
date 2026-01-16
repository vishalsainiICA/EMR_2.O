import "./Settings.css"
import React from 'react';

const SettingsComponent = () => {
  return (
    <div style={{}} className="section" id="settingsSection">
      <div className="section-header">
        <h2 className="section-title">Settings</h2>
      </div>

      <div className="consultation-container">
        {/* Account Settings */}
        <div className="patient-info-section">
          <h3 style={{ marginBottom: '20px' }}>
            <i className="fas fa-user-cog"></i> Account Settings
          </h3>

          <div className="form-group">
            <label htmlFor="doctorName">Full Name</label>
            <input 
              type="text" 
              id="doctorName" 
              defaultValue="Dr. Anil Sharma" 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="doctorSpecialty">Specialty</label>
              <input 
                type="text" 
                id="doctorSpecialty" 
                defaultValue="General Physician" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="doctorLicense">Medical License</label>
              <input 
                type="text" 
                id="doctorLicense" 
                defaultValue="MED123456" 
              />
            </div>
          </div>

          <button className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }}>
            <i className="fas fa-save"></i> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;