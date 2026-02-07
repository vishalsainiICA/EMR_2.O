// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./Settings.css"
// import React from 'react';
// import { faSave, faUserCog } from "@fortawesome/free-solid-svg-icons";

// const SettingsComponent = () => {
//   return (
//     <div style={{}} className="section" id="settingsSection">
//       <div className="section-header">
//         <h2 className="section-title">Settings</h2>
//       </div>

//       <div className="consultation-container">
//         {/* Profile SettingsSettings */}
//         <div className="patient-info-section">
//           <h3 style={{ display:"flex",marginBottom: '20px', gap:"5px" }}>
//             < FontAwesomeIcon icon={faUserCog}/>
//              Profile SettingsSettings
//           </h3>

//           <div className="form-group">
//             <label htmlFor="doctorName">Full Name</label>
//             <input 
//               type="text" 
//               id="doctorName" 
//               defaultValue="Dr. Anil Sharma" 
//             />
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="doctorSpecialty">Specialty</label>
//               <input 
//                 type="text" 
//                 id="doctorSpecialty" 
//                 defaultValue="General Physician" 
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="doctorLicense">Medical License</label>
//               <input 
//                 type="text" 
//                 id="doctorLicense" 
//                 defaultValue="MED123456" 
//               />
//             </div>
//           </div>

//           <button className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }}>
//             <FontAwesomeIcon icon={faSave}/>
//              Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsComponent;


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Settings.css";
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
            Profile SettingsSettings
          </h3>

          <div className="form-group">
            <br></br>
            <img className="profile" src="/public/image/MainBefore.jpg" alt="...loading" />
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



