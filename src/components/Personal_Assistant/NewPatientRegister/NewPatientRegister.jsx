import React, { useEffect, useRef, useState } from 'react';
import "./NewPatientRegister.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faClipboardList, faCloudUploadAlt, faEdit, faEye, faFolder, faList, faScaleUnbalanced, faSyncAlt, faUserMd, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { calculateAge, extractTextFromImage, indianStates, parseAadhaarText } from '../../../api/Ocr';
import { toast } from 'react-toastify';
import { useApi } from '../../../api/useApi';
import personalAssitantApi from '../../../api/apiService';
import { useNavigate } from 'react-router-dom';


const NewPatient = () => {
  const [categoryName, setCategoryName] = useState(null)
    const [patient, setPatient] = useState({});
  const [files, setFiles] = useState([])
  const [aadhaarDoc, setAadhaarDoc] = useState([]);
  const [symtomps, setSymptopms] = useState([])
const [selectedSymtomps, setselectedSymtomps] = useState([]);
const [searchTermforsymtoms, setsearchTermforsymtoms] = useState("");
const [filteredsymtomps, setfilteredsymtomps] = useState([]);
const [assinDoc, setAssignDoc] = useState([]);

  const navigate = useNavigate()
  const FileinputRef = useRef(null)
  const AadharFileInputRef = useRef(null)

  useEffect(()=>{
     const profile = JSON.parse(localStorage.getItem("profile")) || null

     if(!profile){ 
      navigate("/login", {replace:true})
     }
     console.log("prfie", profile)
     
     setAssignDoc(profile?.assignDoctors)
  },[])

  const openFileDialog = (type = null) => {
    if(type && type ==="addhar"){
      AadharFileInputRef.current.click();
    }
    else {
     FileinputRef.current.click();
    }
    
  }
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleAddharFileChange = async(e) => {
  const files = Array.from(e.target.files);

  if (files.length > 2) {
    toast.info("Please select only 2 files (Aadhaar Front & Back)");
    e.target.value = ""; // reset input
    return;
  }

  // Optional: size check (example 5MB each)
  for (let file of files) {
    if (file.size > 5 * 1024 * 1024) {
      toast.info("Each file should be less than 5MB");
      e.target.value = "";
      return;
    }
  }
   const combinedText = await extractTextFromImage(aadhaarDoc)

  const parsed = parseAadhaarText(combinedText);
  setPatient((prev) => ({
        ...prev,
        name: parsed.name,
        age: parsed.DOB ? calculateAge(parsed.DOB) : prev.age,
        gender: parsed.gender || prev.gender,
        permanentAddress: parsed.address || prev.permanentAddress,
        aadhaarNumber: parsed?.aadhaarNumber ? parsed?.aadhaarNumber : parsed?.aadhaarNumber,
        city: parsed.city,
        state: parsed.state,
        pinCode: parsed.pinCode,
      }));
  toast.success("Aadhaar details extracted successfully ");
  setAadhaarDoc(files)
};

  const handleChange = (key, value) => {
    setPatient((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

   const {request : registerPatient , loading:patientLoading , error : patientError} = useApi(personalAssitantApi.registerPatient)
   const {request : fetchSymtomps , loading:symtompsLoading , error : symtompsError} = useApi(personalAssitantApi.fetchIllness)

   useEffect(()=>{
    
  const fetchAllIllness = async()=>{
      try {
        const res = await fetchSymtomps()
        setSymptopms(res?.data)
      } catch (error) {
        console.log(error);  
      }
    } 

    fetchAllIllness()
   
   },[])

const handleRegisterPatient = async (e) => {
  e.preventDefault(); // correct spelling

  try {
    const formdata = new FormData();

    /* ================= FILES ================= */
    files.forEach((doc, index) => {
      formdata.append(`categories[${index}]`, doc.category);
      formdata.append(`fileCount[${index}]`, files.length);

      if (doc.files && Array.isArray(doc.files)) {
        doc.files.forEach((file) => {
          formdata.append("documents", file);
        });
      }
    });

    /* ================= AADHAAR ================= */
    if (aadhaarDoc?.[0]) formdata.append("aadhaarFront", aadhaarDoc[0]);
    if (aadhaarDoc?.[1]) formdata.append("aadhaarBack", aadhaarDoc[1]);

    /* ================= PATIENT DATA ================= */
    Object.keys(patient).forEach((key) => {
      let value = patient[key];

      if (
        typeof value === "object" &&
        value !== null &&
        !(value instanceof File)
      ) {
        value = JSON.stringify(value);
      }

      formdata.append(key, value ?? "");
    });

    /* ================= API CALL ================= */
    const res = await registerPatient(formdata);

    console.log("Patient Registered:", res);

  } catch (error) {
    console.error("Register Patient Error:", error);
  }
};


const handleChangeSymtomps = (e) => {
  const value = e.target.value;

  // split by comma
  const parts = value
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  // last part = search term
  const searchTerm = parts[parts.length - 1] || "";

  setsearchTermforsymtoms(searchTerm);

  if (!searchTerm) {
    setfilteredsymtomps([]);
    return;
  }

  const filtered = symtomps.filter((ill) =>
    ill.symptoms?.some((sym) =>
      sym.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  setfilteredsymtomps(filtered);
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
        <form id="newPatientForm" onSubmit={handleRegisterPatient}>
          {/* Aadhar Scan Section */}
          <div onClick={()=>openFileDialog("addhar")} className="aadhar-scan" id="aadharScanBtnSection">
            <i className=" fa-id-card"><FontAwesomeIcon icon={faIdCard}/></i>
            <p>Scan Aadhar Card to Auto-fetch Patient Details</p>
            <span>Click here or use scanner to capture Aadhar details</span>
<input
  type="file"
  ref={AadharFileInputRef}
  accept=".pdf,.jpg,.jpeg,.png"
  multiple
  style={{ display: "none" }}
  onChange={handleAddharFileChange}
/>
     <div className="uploaded-files">
        {aadhaarDoc && aadhaarDoc?.length > 0 && aadhaarDoc?.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientGender">State *</label>
              <select
                onChange={(e) => handleChange("state", e.target.value)}
                value={patient?.state}
                id="patientGender" className="form-control" required defaultValue="">
                <option value="" disabled>Select State*</option>
                {indianStates.map((item, index)=>{
                  return  <option key={index} value={item}>{item}</option>
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="patientPhone">City*</label>
              <input
                onChange={(e) => handleChange("city", e.target.value)}
                value={patient?.city}
                type="text"
                id="patientPhone"
                className="form-control"
                placeholder="eg.jaipur"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="patientAddress">Address</label>
            <textarea
             onChange={(e) => handleChange("permanentAddress", e.target.value)}
              value={patient?.permanentAddress}
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
                {console.log( "AD",assinDoc)
                }
                {assinDoc?.length > 0 && (
                  assinDoc?.map((doc , index)=>{
                    return   <option key={index} value={doc._id}>{`${doc.name} (${doc.departmentName})`}</option>
                  })
                )}  
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
  <div className='form-group-heading'>
     <label htmlFor="patientHistory">Medical History Summary</label> 
     <div>
 <input type="search" placeholder="Search & add symptoms..." onChange={handleChangeSymtomps} value={searchTermforsymtoms} />
    {filteredsymtomps.length > 0 && searchTermforsymtoms.trim() !== "" && (
    <div className="illnessSuggenstion">
      {filteredsymtomps.map((ill, i) =>
        ill.symptoms?.map((sym, index) => {   
       return (
            <div
              key={`${i}-${index}`}
              className="illCard"
              onClick={() => {
                 setselectedSymtomps((prev) => [...prev, sym]);
                setsearchTermforsymtoms("");
                setfilteredsymtomps([]);
              }}
            >
              <div>
                <h5>{sym}</h5>
                <p>{ill?.illnessName}</p>
              </div>

              {/* {isSelected && (
                <i
                  className="ri-check-line"
                  style={{
                    fontSize: "22px",
                    color: "green",
                  }}
                ></i>
              )} */}
            </div>
          );
        })
      )}
    </div>
  )}
     </div>

  </div>


  <div
    id="patientHistory"
    className="form-control-show-sym"
  >
    {console.log( 
      "sum", selectedSymtomps)
    }
    {selectedSymtomps.length > 0 && (
     selectedSymtomps.map((sym, index)=>{
      console.log(sym);
      
      return <p key={index}>{sym} </p>
     })
    )}
  </div>
</div>

          {/* File Upload Section */}
          <div className="file-upload-section">
            <div className='file-upload-section-heading'>
            <h3 style={{ marginBottom: '15px' }}>Upload Previous Medical Records</h3>
             <div>
                    <select
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      style={{ width: "150px", height: "30px", color: "black", borderRadius: "10px", padding: "5px", border: "0.3px solid lightgray", }} name="" id="category">

                      <option value="">Select Category</option>
                      <option value="Prescription">Prescription</option>
                      <option value="Blood test">Blood test related</option>
                      <option value="Xray">Xray</option>
                      <option value="MRI & CT Scan">MRI & CT Scan</option>
                      <option value="Other">Other</option>
                    </select>
                    {!categoryName && (
                      <p style={{
                        fontSize: '12px',
                        color: 'orange',
                        boxShadow: "1px"

                      }}>Pleae Select Cateogry First</p>
                    )}
            </div>
            </div>



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
               onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setFiles((prev) => [
                          ...prev,
                          { category: categoryName, files },
                        ]);

                        setCategoryName("")
                      }} 
            />
          <div className="uploaded-files">
              {files.length > 0 && (
                <div className="uploaded-docs">
                  <h4>Uploaded Documents:</h4>
                  <br />

                  {files.map((obj, index) => (
                    <div key={index}>
                      <h5>{obj?.category}</h5>

                      {obj?.files?.map((file, i) => (
                        <p key={i}>✓ {file.name || file} (Processing)</p>
                      ))}
                    </div>
                  ))}

                </div>
              )}
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