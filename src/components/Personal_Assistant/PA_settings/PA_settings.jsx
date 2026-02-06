// import React, { useState } from 'react';
// import "./PA_settings.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDatabase, faBell, faPrint, faUserCog, faShieldAlt, faKey, faHistory, faUserShield } from '@fortawesome/free-solid-svg-icons';
// import { } from '@fortawesome/free-regular-svg-icons';

// const PA_setting = () => {

//     const [settings, setSettings] = useState({
//         emailNotifications: true,
//         smsAlerts: true,
//         twoFactor: false,
//         newPatientAlerts: true,
//         doctorAssignment: true,
//         prescriptionAlerts: true,
//         autoPrint: false,
//         includeLogo: true,
//         printQueue: false,
//         autoBackup: true,
//         encryption: true,
//         cloudSync: true
//     });


//     const handleToggle = (settingName) => {
//         setSettings(prev => ({
//             ...prev,
//             [settingName]: !prev[settingName]
//         }));
//     };

//     return (
//         <div className="section" id="settingsSection" style={{ display: 'block' }}>
//             <div className="section-header">
//                 <h2 className="section-title">Settings</h2>
//             </div>

//             <div className="settings-grid">

//                 <div className="setting-card">
//                     <h3><FontAwesomeIcon icon={faUserCog} /> Account Settings</h3>
//                     <div className="setting-option">
//                         <span>Email Notifications</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.emailNotifications}
//                                 onChange={() => handleToggle('emailNotifications')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                     <div className="setting-option">
//                         <span>SMS Alerts</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.smsAlerts}
//                                 onChange={() => handleToggle('smsAlerts')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                     <div className="setting-option">
//                         <span>Two-Factor Authentication</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.twoFactor}
//                                 onChange={() => handleToggle('twoFactor')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                 </div>


//                 <div className="setting-card">
//                     <h3><FontAwesomeIcon icon={faBell} /> Notification Settings</h3>
//                     <div className="setting-option">
//                         <span>New Patient Alerts</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.newPatientAlerts}
//                                 onChange={() => handleToggle('newPatientAlerts')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                     <div className="setting-option">
//                         <span>Doctor Assignment Alerts</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.doctorAssignment}
//                                 onChange={() => handleToggle('doctorAssignment')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                     <div className="setting-option">
//                         <span>Prescription Ready Alerts</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.prescriptionAlerts}
//                                 onChange={() => handleToggle('prescriptionAlerts')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                 </div>

//                 <div className="setting-card">
//                     <h3><FontAwesomeIcon icon={faPrint} /> Print Settings</h3>
//                     <div className="setting-option">
//                         <span>Auto Print Prescriptions</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.autoPrint}
//                                 onChange={() => handleToggle('autoPrint')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                     <div className="setting-option">
//                         <span>Include Logo on Print</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.includeLogo}
//                                 onChange={() => handleToggle('includeLogo')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                     <div className="setting-option">
//                         <span>Print Queue Summary</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.printQueue}
//                                 onChange={() => handleToggle('printQueue')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                 </div>

//                 <div className="setting-card">
//                     <h3><FontAwesomeIcon icon={faDatabase} /> Data Management</h3>
//                     <div className="setting-option">
//                         <span>Auto Backup Records</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.autoBackup}
//                                 onChange={() => handleToggle('autoBackup')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                     <div className="setting-option">
//                         <span>Data Encryption</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.encryption}
//                                 onChange={() => handleToggle('encryption')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                     <div className="setting-option">
//                         <span>Cloud Sync</span>
//                         <label className="toggle-switch">
//                             <input
//                                 type="checkbox"
//                                 checked={settings.cloudSync}
//                                 onChange={() => handleToggle('cloudSync')}
//                             />
//                             <span className="toggle-slider"></span>
//                         </label>
//                     </div>
//                 </div>
//             </div>

//             <div className="setting-card" style={{ marginTop: "30px" }}>
//                 <h3><FontAwesomeIcon icon={faShieldAlt} /> Security</h3>
//                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '15px' }}>
//                     <button className="btn btn-outline">
//                         <FontAwesomeIcon icon={faKey} /> Change Password
//                     </button>
//                     <button className="btn btn-outline">
//                         <FontAwesomeIcon icon={faHistory} /> View Login History
//                     </button>
//                     <button className="btn btn-outline">
//                         <FontAwesomeIcon icon={faUserShield} /> Privacy Settings
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default PA_setting;


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PA_settings.css";

import React, { useState } from "react";
import { faSave, faUserCog } from "@fortawesome/free-solid-svg-icons";


const SettingsComponent = () => {

  const [formData, setFormData] = useState({
    FullName: "",
    Specialty: "",
    MedicalLicense: "",
  });
  const [Disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const edit = () => {
    setDisabled(false);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", formData);
  };

  return (
    <div className="section" id="settingsSection">

      <div className="section-header">
        <h2 className="section-title">Settings</h2>
        <button className="btn btn-primary" onClick={edit}>Edit</button>
      </div>



      <form className="consultation-container" onSubmit={submit}>
        <div className="patient-info-section">
          <h3 style={{ display: "flex", marginBottom: "20px", gap: "5px" }}>
            <FontAwesomeIcon icon={faUserCog} />
            Account Settings
          </h3>

          <div className="form-group">
            <img className="profile" src="/public/image/MainBefore.jpg" alt="...loading" />
            <br></br>
            <label>Full Name</label>
            <input
              name="FullName"
              type="text"
              placeholder="Dr. Name"
              value={formData.FullName}
              onChange={handleChange}
              disabled={Disabled}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Specialty</label>
              <input
                name="Specialty"
                type="text"
                placeholder="General Physician"
                value={formData.Specialty}
                onChange={handleChange}
                disabled={Disabled}
              />
            </div>

            <div className="form-group">
              <label>Medical License</label>
              <input
                name="MedicalLicense"
                type="text"
                placeholder="MED123456"
                value={formData.MedicalLicense}
                onChange={handleChange}
                disabled={Disabled}
              />
            </div>
          </div>


          <button
            className="btn btn-primary"
            type="submit"
            style={{ marginTop: "20px", width: "100%" }}
          >
            <FontAwesomeIcon icon={faSave} /> Save Changes
          </button>

        </div>
      </form>
    </div>
  );
};

export default SettingsComponent;



