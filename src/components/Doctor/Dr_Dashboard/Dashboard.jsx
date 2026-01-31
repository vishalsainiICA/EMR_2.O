
import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import { useApi } from "../../../api/useApi";
import { doctorApi } from "../../../api/apiService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLink, faFileMedicalAlt, faPrescription, faRupeeSign, faStethoscope, faSyncAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const DashboardComponent = () => {
  const [text, setText] = useState("");
  const [textForLabtest, setextForLabtest] = useState("");
  const [textForsymtomps, setextForsymtomps] = useState("");
  const [textForIllness, setextForIllness] = useState("");
  const [showRevenue, setShowRevenue] = useState(true);
  const [patients, setPatients] = useState([]);
  const [loadIllness, setloadIllness] = useState([]);
  const [state, setState] = useState({
    labTest: [],
    illnessData: [],
    medicieneData: [],
  });
  const [selectedState, setselectedState] = useState({
    selectedLabTest: [],
    selectedIllnessData: [],
    selectedSymtompsData: [],
    selectedMedicieneData: [],
  });

  const [filterState, setfilterState] = useState({
    filterLabTest: [],
    filterIllnessData: [],
    filterMedicieneData: [],
    filterSymtompsData: [],
  });
  const textareaRef = useRef(null);
  const textareaRefForLabtest = useRef(null);
  const textareaRefForSymtomps = useRef(null);
  const textareaRefForIllness = useRef(null);
  //  Modal State
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [currentPatientForPrescription, setCurrentPatientForPrescription] = useState(null);

  //  NEW: Form view OR Final view (same modal)
  const [isFinalPrescriptionView, setIsFinalPrescriptionView] = useState(false);


  //  NEW: PA Documents Modal State
  const [isPaDocumentsModalOpen, setIsPaDocumentsModalOpen] = useState(false);
  const [isImageVier, setisImageVier] = useState(null)


  //  NEW: Final Prescription Data
  const [finalPrescriptionData, setFinalPrescriptionData] = useState({
    formattedDate: "",
    formattedTime: "",
    prescriptionId: "",
    diagnosisType: "Final",
    diagnosis: "",
    clinicalNotes: "",
    medications: "",
    tests: "",
    advice: "",
  });

  const { request: loadpatient, loading, error } = useApi(doctorApi.loadPatient)
  const { request: getAllIllnessAndPharmacydata, loading: loadillnessAndMedicien, error: errorloadillnessAndMedicien } = useApi(doctorApi.getAllIllnessAndPharmacydata)
  const {
    request: savePriscribtion,
    loading: loadingsavePriscribtion,
    error: errorsavePriscribtion,
  } = useApi(doctorApi.savePrescribtion);

  const {
    request: getLoadIllness,
    loading: loadingIllnessBySymptoms,
    error: errorIllnessBySymptoms,
  } = useApi(doctorApi.getIllnessBySymtomps);


  const handleLoadIllness = async () => {
    if (selectedState.selectedSymtompsData.length === 0) return;
    try {
      const prompt = {
        question: `This is my vitals: ${currentPatientForPrescription?.patient?.initialAssementId?.vitals || "N/A"
          }
Symptoms: ${selectedState.selectedSymtompsData.join(", ")}`,
      };

      const res = await getLoadIllness(prompt);
      console.log("res", res?.answer?.possibleIllnesses);

      setloadIllness(res?.answer?.possibleIllnesses || []);
    } catch (err) {
      console.error("Load illness error:", err);
    }
  };
  const handleLoadPatient = async () => {
    try {
      const res = await loadpatient()
      console.log(res)

      setPatients(res?.data?.todayPatient)
    } catch (error) {
      console.log(error);
    }
  }
  const handleSavePriscbrition = async () => {
    try {
      const formdata = new FormData();
      // 🔹 IDs
      formdata.append("patientId", currentPatientForPrescription?._id);
      formdata.append("doctorId", currentPatientForPrescription?.doctorId);
      formdata.append("hospitalId", currentPatientForPrescription?.hospitalId);
      formdata.append("initialAssementId", currentPatientForPrescription?.initialAssementId?._id);

      // 🔹 Prescription core fields
      formdata.append(
        "prescriptionType",
        finalPrescriptionData?.diagnosisType || "Final"
      );

      formdata.append(
        "illness",
        finalPrescriptionData?.diagnosis || ""
      );

      formdata.append(
        "symptoms",
        finalPrescriptionData?.clinicalNotes || ""
      );

      formdata.append(
        "prescriptionMediciene",
        finalPrescriptionData?.medications || ""
      );

      // 🔹 labTest → Array expected in model
      const labTests =
        finalPrescriptionData?.tests
          ?.split(",")
          .map(t => t.trim())
          .filter(Boolean) || [];

      formdata.append("labTest", JSON.stringify(labTests));

      // 🔹 Optional image

      formdata.append("prescriptionImage", "");
      await savePriscribtion(formdata);
      setIsPrescriptionModalOpen(false)
      await handleLoadPatient()
      toast.success("Prescription saved:");

    } catch (error) {
      console.error("Save prescription error:", error);
    }
  };



  // useEffect(() => {
  //   handleLoadIllness();
  // }, [selectedState.selectedSymtompsData]);




  useEffect(() => {
    const fetchIllness = async () => {

      try {
        const res = await getAllIllnessAndPharmacydata();
        const illnessData = res?.data?.Illness || [];
        const medicieneData = res?.data?.Mediciene || [];
        const labTest = res?.data?.Labtest || [];
        console.log("illnessData", illnessData);
        console.log("medicieneData", medicieneData);
        console.log("labTest", labTest);

        setState({
          labTest: labTest,
          illnessData: illnessData,
          medicieneData: medicieneData,
        });
      } catch (err) {
        console.log(error);

      }
    };
    fetchIllness()
    handleLoadPatient()

  }, [])
  //  Open Modal
  const showPrescriptionModal = (patientId) => {
    const patient = patients.find((p) => p._id === patientId);


    // setCurrentPatientForPrescription(patient || null);

    setCurrentPatientForPrescription({
      ...(patient || {}),
      paDocuments: [
        { id: "DOC001", name: "Patient Consent Form", type: "Form", date: "2023-10-15", uploadedBy: "John Mathew" },
        { id: "DOC002", name: "Lab Test Results", type: "Report", date: "2023-10-14", uploadedBy: "John Mathew" },
        { id: "DOC003", name: "Previous Prescription", type: "Prescription", date: "2023-09-20", uploadedBy: "John Mathew" },
        { id: "DOC004", name: "Insurance Card Copy", type: "Insurance", date: "2023-10-15", uploadedBy: "John Mathew" },
        { id: "DOC005", name: "ECG Report", type: "Medical Report", date: "2023-10-10", uploadedBy: "John Mathew" },
      ],
    });



    setIsPrescriptionModalOpen(true);

    //always open in edit mode first
    setIsFinalPrescriptionView(false);

    document.body.style.overflow = "hidden";
  };

  //  Close Modal
  const closePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setCurrentPatientForPrescription(null);
    setIsFinalPrescriptionView(false);
    document.body.style.overflow = "auto";

    // close PA DOCS model
    setIsPaDocumentsModalOpen(false);

  };

  //  Show PA Documents Modal (React version)
  const showPaDocumentsModal = () => {
    if (!currentPatientForPrescription) return;
    setIsPaDocumentsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  //Close PA Documents Modal
  const closePaDocumentsModal = () => {
    setIsPaDocumentsModalOpen(false);
    document.body.style.overflow = "hidden"; // prescription modal still open
  };

  // Helper function to get document icon (same logic as JS)
  const getDocIcon = (docType) => {
    switch ((docType || "").toLowerCase()) {
      case "form":
        return "edit";
      case "report":
        return "chart-line";
      case "prescription":
        return "prescription";
      case "insurance":
        return "file-invoice-dollar";
      case "medical report":
        return "file-medical";
      case "notes":
        return "sticky-note";
      default:
        return "file";
    }
  };



  //  Generate Final Prescription (React version of your JS function)
  const generateFinalPrescription = () => {
    if (!currentPatientForPrescription) return;

    // Diagnosis Type Toggle (same id)
    const diagnosisToggle = document.getElementById("diagnosisToggle");
    const diagnosisType = diagnosisToggle && diagnosisToggle.checked ? "Final" : "Provisional";

    // Textareas values (same ids)
    const diagnosis = document.getElementById("doctorDiagnosis")?.value || "";
    const clinicalNotes = document.getElementById("clinicalNotes")?.value || "";
    const medications = document.getElementById("medications")?.value || "";
    const tests = document.getElementById("tests")?.value || "";
    const advice = document.getElementById("advice")?.value || "";

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedTime = today.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const prescriptionId = `RX-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}${String(
      today.getDate()
    ).padStart(2, "0")}${Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0")}`;

    setFinalPrescriptionData({
      formattedDate,
      formattedTime,
      prescriptionId,
      diagnosisType,
      diagnosis,
      clinicalNotes,
      medications,
      tests,
      advice,
    });

    //  Switch modal view to final prescription
    setIsFinalPrescriptionView(true);
  };

  //  Back to Edit (same concept)
  const backToEditPrescription = () => {
    setIsFinalPrescriptionView(false);
  };

  //  Print
  const printFinalPrescription = () => {
    window.print();
  };
  const handleChangeCommon = (
    e,
    dataArray,
    setText,
    setFilterState,
    filterKey,
    matchKey // ex: "medicine_name"
  ) => {
    const value = e.target.value;
    setText(value);

    const lastWord = value.split(",").pop().trim();

    if (lastWord.length > 0) {
      const filtered = dataArray.filter((item) =>
        item?.[matchKey]
          ?.toLowerCase()
          .startsWith(lastWord.toLowerCase())
      );

      setFilterState((prev) => ({
        ...prev,
        [filterKey]: filtered,
      }));
    } else {
      setFilterState((prev) => ({
        ...prev,
        [filterKey]: [],
      }));
    }
  };

  const handleSelectCommon = (
    item,
    textareaRef,
    text,
    setText,
    setSelectedState,
    selectedKey,
    setFilterState,
    filterKey
  ) => {
    const textarea = textareaRef.current;
    const cursorPos = textarea.selectionStart;

    const beforeCursor = text.slice(0, cursorPos);
    const afterCursor = text.slice(cursorPos);

    const words = beforeCursor.split(",");
    words.pop();

    const newText =
      words.join(", ").trim() +
      (words.length ? ", " : "") +
      item +
      ", " +
      afterCursor.trimStart();

    setText(newText);

    setSelectedState((prev) => ({
      ...prev,
      [selectedKey]: prev[selectedKey].includes(item)
        ? prev[selectedKey]
        : [...prev[selectedKey], item],
    }));

    setFilterState((prev) => ({
      ...prev,
      [filterKey]: [],
    }));

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = newText.length;
    }, 0);
  };
  const handleKeyDownCommon = (
    e,
    textareaRef,
    text,
    selectedValues,
    setText,
    setSelectedState,
    selectedKey
  ) => {
    if (e.key === "Backspace") {
      const textarea = textareaRef.current;
      const cursorPos = textarea.selectionStart;
      const beforeCursor = text.slice(0, cursorPos);

      const words = beforeCursor.split(",");
      const lastWord = words[words.length - 1]?.trim();

      if (selectedValues.includes(lastWord)) {
        e.preventDefault();
        words.pop();

        const newText =
          words.join(", ").trim() + (words.length ? ", " : "");

        setText(newText);

        setSelectedState((prev) => ({
          ...prev,
          [selectedKey]: prev[selectedKey].filter(
            (val) => val !== lastWord
          ),
        }));
      }
    }
  };

  const handleChangeForSymtomps = (e) => {
    const value = e.target.value;
    setextForsymtomps(value);

    const lastWord = value.split(",").pop().trim();
    if (lastWord.length > 0) {
      const filtered = state.illnessData.filter((item) =>
        item?.symptoms?.some((sym) =>
          sym?.toLowerCase().startsWith(lastWord.toLowerCase())
        )
      );

      setfilterState((prev) => ({
        ...prev,
        filterSymtompsData: filtered,
      }));
    } else {
      setfilterState((prev) => ({
        ...prev,
        filterSymtompsData: [],
      }));
    }
  };

  const handleViewDoc = (doc) => {
    // 1. Check if the document actually has files
    if (!doc?.files || doc.files.length === 0) {
      alert("No files attached to this document.");
      return;
    }

    // 2. Update the state to 'open' the viewer with this doc's data
    // Using the name from your JSX: isImageVier
    setisImageVier(doc);

    // Optional: Log for debugging
    console.log("Viewing Document:", doc);
  };

  return (
    <div className="Dr_Dashboard_section section active" id="dashboardSection" style={{ display: "block" }}>
      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card" id="todaysConsultationsCard">
          <div className="card-header">
            <div className="card-alignment">
              <div className="card-count">8</div>
              <div className="card-title">Today's Consultations</div>
            </div>
            <div className="card-icon consultation">
              <FontAwesomeIcon icon={faStethoscope} />
            </div>
          </div>
          <div className="card-trend">+2 from yesterday</div>
        </div>

        <div className="card" id="waitingPatientsCard">
          <div className="card-header">
            <div className="card-alignment">
              <div className="card-count">3</div>
              <div className="card-title">Ready for Consultation</div>
            </div>
            <div className="card-icon waiting">
              <FontAwesomeIcon icon={faClock} />
            </div>
          </div>
          <div className="card-trend down">-1 from yesterday</div>
        </div>

        <div className="card" id="prescriptionsCard">
          <div className="card-header">
            <div className="card-alignment" >
              <div className="card-count">12</div>
              <div className="card-title">Prescriptions Today</div>
            </div>
            <div className="card-icon prescription">
              <FontAwesomeIcon icon={faPrescription} />
            </div>
          </div>
          <div className="card-trend">+4 this week</div>
        </div>

        <div className="card" id="revenueCard">
          <div className="card-header">
            <div className="card-alignment">
              <div
                className={`revenue-amount ${!showRevenue ? "hidden" : ""}`}
                id="revenueAmount"
                style={!showRevenue ? { color: "transparent", textShadow: "0 0 8px rgba(0, 0, 0, 0.2)" } : {}}
              >
                ₹ 45,600
              </div>
              <div className="card-title">Monthly Revenue</div>
            </div>
            <div className="card-icon revenue">
              <FontAwesomeIcon icon={faRupeeSign} />
            </div>
          </div>

          <div className="revenue-toggle-container">
            <span className="toggle-label">Hide Amount</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="revenueToggle"
                checked={!showRevenue}
                onChange={() => setShowRevenue(!showRevenue)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Consultation Queue */}
      <div className="consultation-queue">
        <div className="queue-header">
          <h2 className="queue-title">Patients Ready for Consultation</h2>
          <div className="queue-controls">
            <button onClick={handleLoadPatient} className="btn btn-outline" id="refreshQueueBtn">
              <FontAwesomeIcon icon={faSyncAlt} />
              Refresh
            </button>
            <button className="btn btn-primary" id="callNextPatientBtn">
              <FontAwesomeIcon icon={faUserPlus} />
              Call Next Patient
            </button>
          </div>
        </div>

        <div className="table-container">
          <table  >
            <thead >
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Age/Gender</th>
                <th>Chief Complaint</th>
                <th>PA Assessment</th>
                <th>Priority</th>
                <th>Wait Time</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody id="dashboardQueueTable">
              {/*Loading state */}
              {console.log(patients)}

              {loading && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                    <i className="fas fa-spinner fa-spin"></i> Loading patients...
                  </td>
                </tr>
              )}

              {/*  No data state */}
              {!loading && patients?.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                    No patients found for today
                  </td>
                </tr>
              )}

              {/* Patient rows */}
              {!loading &&
                patients?.map((patient, index) => (
                  <tr key={patient._id}>
                    {/* Queue No */}
                    <td>
                      <strong>{patient.uid}</strong>
                    </td>

                    {/* Patient Info */}
                    <td>
                      <strong>{patient.name}</strong>
                    </td>

                    {/* Age / Gender */}
                    <td>
                      {patient.age} / {patient.gender}
                    </td>

                    {/* Chief Complaint */}
                    <td>
                      {patient.initialAssementId?.complaint || "-"}
                    </td>

                    {/* Assessment */}
                    <td>
                      <div style={{ fontSize: "11px" }}>
                        <div>
                          <i className="fas fa-notes-medical"></i> Initial Assessment
                        </div>
                        <div>
                          {patient.initialAssementId?.notes
                            ? patient.initialAssementId.notes.substring(0, 40) + "..."
                            : "-"}
                        </div>
                      </div>
                    </td>

                    {/* Priority / Status */}
                    <td>
                      <span className="priority normal">
                        {patient.status}
                      </span>
                    </td>

                    {/* Prescription Status */}
                    <td>
                      {patient.isPrescbribedDone ? "Completed" : "Pending"}
                    </td>

                    {/* Action */}
                    <td>
                      {patient?.currentPrescriptionId ?
                        (
                          <button

                            disabled={true}
                            className="btn btn-primary"
                            onClick={() => showPrescriptionModal(patient._id)}

                          >
                            {"Prescribe Done"}
                          </button>
                        ) :
                        (<button
                          className="btn btn-primary"
                          onClick={() => showPrescriptionModal(patient._id)}

                        >

                          {"Prescribe"}
                        </button>)
                      }

                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>


      {/*  Prescription Modal */}
      <div
        className="modal"
        id="prescriptionModal"
        style={{ display: isPrescriptionModalOpen ? "flex" : "none" }}
        onClick={(e) => {
          if (e.target.id === "prescriptionModal") {
            closePrescriptionModal();
          }
        }}
      >
        <div className="modal-content">

          <div className="">
            <div className="modal-header">
              <h2 className="modal-title">Prescription </h2>
              <button className="close-modal" id="closePrescriptionModal" onClick={closePrescriptionModal}>
                &times;
              </button>
            </div>
            <div className="model-patient-history-documnet">
              {
                Array.isArray(currentPatientForPrescription?.pastDocuments) &&
                currentPatientForPrescription.pastDocuments.length > 0 && (

                  <div className="patient-history-documents">

                    {console.log("currentPatientForPrescription.pastDocuments", currentPatientForPrescription.pastDocuments)
                    }
                    {currentPatientForPrescription.pastDocuments.map((category, catIndex) => {
                      console.log("category", category);

                      return category?.files?.map((file, fileIndex) => {
                        console.log("file", file);

                        return (
                          <div
                            key={`${catIndex}-${fileIndex}`}
                            className="patient-history-document-card"
                          >
                            <img
                              src={`${import.meta.env.VITE_BACKEND_URL}${file?.path}`}
                              alt={`Document ${fileIndex + 1}`}
                              onClick={() =>
                                window.open(
                                  `http://localhost:8000/${file?.path}`,
                                  "_blank"
                                )
                              }
                            />
                            <p>{`Doc-${fileIndex + 1}`}</p>
                          </div>
                        )
                      })
                    })}
                  </div>
                )
              }


            </div>


          </div>

          <div className="modal-body">
            <div id="prescriptionFormContent">
              {currentPatientForPrescription && (
                <>
                  {/* ====================== FINAL PRESCRIPTION VIEW ====================== */}
                  {isFinalPrescriptionView ? (
                    <>
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
                              <span className="prescription-label">Patient Name:</span>
                              <span className="prescription-value">{currentPatientForPrescription.name}</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Age / Gender:</span>
                              <span className="prescription-value">
                                {currentPatientForPrescription.age} Years / {currentPatientForPrescription.gender}
                              </span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Patient ID:</span>
                              <span className="prescription-value">{currentPatientForPrescription?._id}</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Blood Group:</span>
                              <span className="prescription-value">
                                {currentPatientForPrescription?.initialAssementId.vitals.bp}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="prescription-field">
                              <span className="prescription-label">Date:</span>
                              <span className="prescription-value">{finalPrescriptionData.formattedDate}</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Prescription ID:</span>
                              <span className="prescription-value">{finalPrescriptionData.prescriptionId}</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Diagnosis Type:</span>
                              <span className="prescription-value">{finalPrescriptionData.diagnosisType} Diagnosis</span>
                            </div>

                            <div className="prescription-field">
                              <span className="prescription-label">Weight/Height:</span>
                              <span className="prescription-value">
                                {currentPatientForPrescription?.initialAssementId?.vitals?.weight} /{" "}
                                {currentPatientForPrescription?.initialAssementId?.vitals?.height}
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
                                PA Assessment by: {currentPatientForPrescription?.registerarId?.name}
                              </span>
                            </div>
                            <div className="pa-time">Time: {currentPatientForPrescription?.registerarId?.updatedAt}</div>
                          </div>

                          <div className="assessment-findings">
                            <div className="assessment-section">
                              <span className="assessment-label">Chief Complaint:</span>
                              <span>{currentPatientForPrescription.initialAssementId?.complaint}</span>
                            </div>

                            <div className="assessment-section">
                              <span className="assessment-label">Vitals:</span>
                              <span>
                                Temp: {currentPatientForPrescription.initialAssementId.vitals.temperature}, BP:{" "}
                                {currentPatientForPrescription.initialAssementId.vitals.bp}, Pulse:{" "}
                                {currentPatientForPrescription.initialAssementId.vitals.heartRate}, RR:{" "}
                                {currentPatientForPrescription.initialAssementId.vitals.respRate}, SpO2:{" "}
                                {currentPatientForPrescription.initialAssementId.vitals.spo2}
                              </span>
                            </div>

                            <div className="assessment-section">
                              <span className="assessment-label">Allergies:</span>
                              <span>{currentPatientForPrescription?.initialAssementId?.selectedSym?.join(",")}</span>
                            </div>
                          </div>
                        </div>

                        {/* Doctor's Diagnosis */}
                        <div className="compact-section">
                          <div className="compact-section-title">
                            DOCTOR'S {finalPrescriptionData.diagnosisType.toUpperCase()} DIAGNOSIS
                          </div>
                          <div style={{ marginBottom: "6px" }}>
                            <strong>Diagnosis:</strong> {finalPrescriptionData.diagnosis}
                          </div>
                          <div>
                            <strong>Clinical Findings:</strong> {finalPrescriptionData.clinicalNotes}
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
                            {finalPrescriptionData.medications}
                          </div>
                        </div>

                        {/* Investigations & Advice */}
                        <div className="compact-section">
                          <div className="compact-section-title">INVESTIGATIONS ADVISED</div>
                          <div style={{ fontSize: "11px", display: "flex", alignItems: "start" }}>{finalPrescriptionData.tests}</div>
                        </div>

                        <div className="compact-section">
                          <div className="compact-section-title">GENERAL ADVICE</div>
                          <div style={{ fontSize: "11px" }}>{finalPrescriptionData.advice}</div>
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
                          <strong>ALLERGIES:</strong> {currentPatientForPrescription.initialAssementId?.medicalHistory}
                        </div>

                        <div className="doctor-signature">
                          <div className="doctor-info">
                            <div className="doctor-name">Dr. Mahesh Kumar</div>
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
                            Generated: {finalPrescriptionData.formattedDate} | ID: {finalPrescriptionData.prescriptionId} |
                            Valid for 30 days
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "center" }}>
                        <button className="btn btn-outline" id="backToPrescriptionBtn" onClick={backToEditPrescription}>
                          <i className="fas fa-arrow-left"></i>
                          Back to Edit
                        </button>

                        <button
                          type="button"
                          disabled={loadingsavePriscribtion}
                          className={`btn btn-primary ${loadingsavePriscribtion ? "disabled" : ""}`}
                          id="saveFinalPrescriptionBtn"
                          onClick={handleSavePriscbrition}
                        >
                          {loadingsavePriscribtion ? (
                            <>
                              <i className="fas fa-spinner fa-spin me-2"></i>
                              Saving...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-2"></i>
                              Save Prescription
                            </>
                          )}
                        </button>

                        <button className="btn btn-success" id="printFinalPrescriptionBtn" onClick={printFinalPrescription}>
                          <i className="fas fa-print"></i>
                          Print & Complete
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* ====================== EDIT PRESCRIPTION VIEW ====================== */}
                      <div className="diagnosis-toggle-container" >
                        <div className="diagnosis-div">
                          <div style={{ alignItems: "center", display: "flex" }}>
                            <span>Diagnosis Type:</span>
                            <label className="diagnosis-toggle">
                              <input type="checkbox" id="diagnosisToggle" defaultChecked />
                              <span className="diagnosis-toggle-slider">
                                <span className="diagnosis-toggle-option">Provisional</span>
                                <span className="diagnosis-toggle-option">Final</span>
                              </span>
                            </label>
                          </div>
                          <button
                            className="view-pa-docs-btn"
                            id="viewPaDocumentsBtn"
                            onClick={showPaDocumentsModal}>

                            <i class="fas fa-file-medical-alt"></i>
                            < FontAwesomeIcon icon={faFileMedicalAlt} />
                            View PA Documents
                          </button>
                        </div>

                      </div>

                      <div className="prescription-cards-container">
                        <div className="prescription-card patient-details-enhanced">
                          <h3>
                            <i className="fas fa-user-injured"></i> Patient Details
                          </h3>

                          <div className="detail-row">
                            <div className="detail-label">Patient Name:</div>
                            <div className="detail-value">{currentPatientForPrescription.name}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Patient ID:</div>
                            <div className="detail-value">{currentPatientForPrescription.uid}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Age & Gender:</div>
                            <div className="detail-value">
                              {currentPatientForPrescription.age} years / {currentPatientForPrescription.gender}
                            </div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Contact Number:</div>
                            <div className="detail-value">{currentPatientForPrescription.phone}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Last Consultation:</div>
                            <div className="detail-value">{currentPatientForPrescription?.lastVisit || "0"}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Next Appointment:</div>
                            <div className="detail-value">{currentPatientForPrescription?.nextAppointment || "-/"}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Assessed by PA:</div>
                            <div className="detail-value">{currentPatientForPrescription.registerarId?.name}</div>
                          </div>

                          <div className="detail-row">
                            <div className="detail-label">Assessment Time:</div>
                            <div className="detail-value">{currentPatientForPrescription.registerarId?.updatedAt}</div>
                          </div>
                        </div>

                        <div className="prescription-card">
                          <h3>
                            <i className="fas fa-heartbeat"></i> Patient Vitals
                          </h3>

                          <div className="vitals-grid-enhanced">
                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId?.vitals.temperature}
                              </div>
                              <div className="vital-label-enhanced">Temperature</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.bloodPressure}
                              </div>
                              <div className="vital-label-enhanced">Blood Pressure</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.pulseRate}
                              </div>
                              <div className="vital-label-enhanced">Pulse Rate</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.respiratoryRate}
                              </div>
                              <div className="vital-label-enhanced">Resp. Rate</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.oxygenSaturation}
                              </div>
                              <div className="vital-label-enhanced">SpO₂</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.height}
                              </div>
                              <div className="vital-label-enhanced">Height</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.weight}
                              </div>
                              <div className="vital-label-enhanced">Weight</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">{currentPatientForPrescription.initialAssementId.vitals.bmi}</div>
                              <div className="vital-label-enhanced">BMI</div>
                            </div>

                            <div className="vital-card-enhanced">
                              <div className="vital-value-enhanced">
                                {currentPatientForPrescription.initialAssementId.vitals.bg}
                              </div>
                              <div className="vital-label-enhanced">Blood Group</div>
                            </div>
                          </div>

                          <div style={{ marginTop: "10px", fontSize: "11px", color: "var(--text-light)", textAlign: "center" }}>
                            Recorded by: {currentPatientForPrescription.registerarId.name} at{" "}
                            {currentPatientForPrescription.registerarId.updatedAt}
                          </div>
                        </div>
                      </div>

                      <div className="prescription-cards-container">
                        <div className="prescription-card diagnosis-card-enhanced">
                          <h3>
                            <i className="fas fa-diagnoses"></i> Diagnosis
                          </h3>

                          <div className="form-group">

                            <div style={{
                              width: "100%",
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '10px'


                            }}>
                              <label htmlFor="doctorDiagnosis">Symtomps</label>

                              <button onClick={handleLoadIllness} className="btn btn-primary"><FontAwesomeIcon icon={faLink} ></FontAwesomeIcon>Generate</button>
                            </div>
                            <textarea
                              ref={textareaRefForSymtomps}
                              value={textForsymtomps}
                              onChange={handleChangeForSymtomps}
                              // onKeyDown={handleChangeForSymtomps}
                              id="clinicalNotes"
                              placeholder="Add clinical notes..."
                            // defaultValue="Confirmed PA findings. Mild pharyngeal erythema noted. No tonsillar exudate. Lung fields clear."
                            />
                            {filterState.filterSymtompsData.length > 0 && (
                              <div className="illnessSuggenstion">
                                {filterState.filterSymtompsData.map((ill) => {

                                  return ill?.symptoms.map((sym) => {
                                    const isSelected =
                                      selectedState.selectedSymtompsData.includes(
                                        sym
                                      );

                                    return (
                                      <div
                                        key={sym}
                                        className="illCard"
                                        onClick={() => {
                                          if (!isSelected) {
                                            handleSelectCommon(
                                              sym,
                                              textareaRefForSymtomps,
                                              textForsymtomps,
                                              setextForsymtomps,
                                              setselectedState,
                                              "selectedSymtompsData",
                                              setfilterState,
                                              "filterSymtompsData"
                                            );
                                          }
                                        }}
                                      >
                                        <div className="illCard-info">
                                          <h5>{sym}</h5>
                                          <p>{ill?.illnessName}</p>
                                        </div>

                                        {isSelected && (
                                          <i
                                            className="ri-check-line"
                                            style={{
                                              fontSize: "22px",
                                              color: "green",
                                            }}
                                          />
                                        )}
                                      </div>
                                    );
                                  })

                                })}
                              </div>
                            )}
                          </div>
                          <div className="ai-genDiv">
                            <p style={{
                              display: 'flex',
                              justifyContent: 'start',
                              marginBottom: '10px'
                            }}>Ai Generated: </p>
                            {loadingIllnessBySymptoms && (
                              <div className="loader-mini">

                              </div>
                            )}

                            {!loadingIllnessBySymptoms && loadIllness?.length > 0 && (
                              <div className="illness-grid">
                                {loadIllness.map((item, index) => {
                                  const isSelected = selectedState.selectedIllnessData.includes(item?.illness);

                                  return (
                                    <div
                                      onClick={() => {
                                        handleSelectCommon(
                                          item?.illness,
                                          textareaRefForIllness,
                                          textForIllness,
                                          setextForIllness,
                                          setselectedState,
                                          "selectedIllnessData",
                                          setfilterState,
                                          "filterIllnessData"
                                        );
                                      }}
                                      className="illness-card"
                                      key={index}
                                    >
                                      <div className="illness-header">
                                        {/* Changed value to checked for a checkbox */}
                                        <input checked={isSelected} readOnly type="checkbox" />
                                        <p>{item.illness}</p>
                                      </div>

                                      <p
                                        className="confidence"
                                        style={{
                                          color:
                                            item.confidence_score > 0.80
                                              ? "green"
                                              : item.confidence_score > 0.50
                                                ? "orange"
                                                : "red",
                                        }}
                                      >
                                        Confidence: <b>{item.confidence_score}%</b>
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}


                          </div>
                          <div className="form-group">
                            <label htmlFor="doctorDiagnosis">Diagnosis</label>
                            <textarea
                              ref={textareaRefForIllness}
                              value={textForIllness}
                              onChange={(e) =>
                                handleChangeCommon(
                                  e,
                                  state.illnessData,
                                  setextForIllness,
                                  setfilterState,
                                  "filterIllnessData",
                                  "illnessName"
                                )
                              }
                              onKeyDown={(e) =>
                                handleKeyDownCommon(
                                  e,
                                  textareaRefForIllness,
                                  textForIllness,
                                  selectedState.selectedIllnessData,
                                  setextForIllness,
                                  setselectedState,
                                  "selectedIllnessData"
                                )
                              }
                              id="doctorDiagnosis"
                              placeholder="Enter diagnosis..."
                            // defaultValue="Acute Upper Respiratory Infection"
                            />
                            {filterState.filterIllnessData.length > 0 && (
                              <div className="illnessSuggenstion">
                                {filterState.filterIllnessData.map((ill) => {

                                  const isSelected =
                                    selectedState.selectedIllnessData.includes(
                                      ill?.illnessName
                                    );

                                  return (
                                    <div
                                      key={ill?.illnessName}
                                      className="illCard"
                                      onClick={() => {
                                        if (!isSelected) {
                                          handleSelectCommon(
                                            ill?.illnessName,
                                            textareaRefForIllness,
                                            textForIllness,
                                            setextForIllness,
                                            setselectedState,
                                            "selectedIllnessData",
                                            setfilterState,
                                            "filterIllnessData"
                                          );
                                        }
                                      }}
                                    >
                                      <div className="illCard-info">
                                        <h5>{ill?.illnessName}</h5>
                                        <p>{ill?.illnessName}</p>
                                      </div>

                                      {isSelected && (
                                        <i
                                          className="ri-check-line"
                                          style={{
                                            fontSize: "22px",
                                            color: "green",
                                          }}
                                        />
                                      )}
                                    </div>
                                  );

                                })}
                              </div>
                            )}

                          </div>
                        </div>

                        <div className="prescription-card medicine-card-enhanced">
                          <h3>
                            <i className="fas fa-pills"></i> Medicine Recommendations
                          </h3>

                          <div className="form-group">

                            <label htmlFor="medications">Medications</label>

                            <textarea
                              id="medications"
                              ref={textareaRef}
                              value={text}
                              onChange={(e) =>
                                handleChangeCommon(
                                  e,
                                  state.medicieneData,
                                  setText,
                                  setfilterState,
                                  "filterMedicieneData",
                                  "medicine_name"
                                )
                              }
                              onKeyDown={(e) =>
                                handleKeyDownCommon(
                                  e,
                                  textareaRef,
                                  text,
                                  selectedState.selectedMedicieneData,
                                  setText,
                                  setselectedState,
                                  "selectedMedicieneData"
                                )
                              }
                              placeholder="List medications with dosage..."
                            />



                            {filterState.filterMedicieneData.length > 0 && (
                              <div className="illnessSuggenstion">
                                {filterState.filterMedicieneData.map((ill) => {
                                  const isSelected =
                                    selectedState.selectedMedicieneData.includes(
                                      ill.medicine_name
                                    );

                                  return (
                                    <div
                                      key={ill.medicine_name}
                                      className="illCard"
                                      onClick={() => {
                                        if (!isSelected) {
                                          handleSelectCommon(
                                            ill.medicine_name,
                                            textareaRef,
                                            text,
                                            setText,
                                            setselectedState,
                                            "selectedMedicieneData",
                                            setfilterState,
                                            "filterMedicieneData"
                                          );
                                        }
                                      }}
                                    >
                                      <div className="illCard-info">
                                        <h5>{ill.medicine_name}</h5>
                                        <p>{ill.dosage}</p>
                                      </div>

                                      {isSelected && (
                                        <i
                                          className="ri-check-line"
                                          style={{
                                            fontSize: "22px",
                                            color: "green",
                                          }}
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                          </div>
                        </div>
                      </div>

                      <div className="prescription-cards-container">
                        <div className="prescription-card test-card-enhanced">
                          <h3>
                            <i className="fas fa-vial"></i> Test Recommendations
                          </h3>

                          <div className="form-group">
                            <label htmlFor="tests">Recommended Tests</label>
                            <textarea

                              id="tests"
                              placeholder="List recommended tests..."
                              //                               defaultValue={`Complete Blood Count (CBC) if fever persists beyond 3 days
                              // Chest X-ray if cough persists beyond 5 days`}
                              onChange={(e) =>
                                handleChangeCommon(
                                  e,
                                  state.labTest,
                                  setextForLabtest,
                                  // filterState.filterLabTest
                                  setfilterState,
                                  "filterLabTest",
                                  "test"
                                )
                              }
                              onKeyDown={(e) =>
                                handleKeyDownCommon(
                                  e,
                                  textareaRefForLabtest,
                                  textForLabtest,
                                  selectedState.selectedLabTest,

                                  setextForLabtest,
                                  setselectedState,
                                  "selectedLabTest"
                                )
                              }
                              ref={textareaRefForLabtest}
                              value={textForLabtest}
                            />

                            {filterState.filterLabTest.length > 0 && (
                              <div className="illnessSuggenstion">
                                {filterState.filterLabTest.map((ill) => {

                                  const isSelected =
                                    selectedState.selectedLabTest.includes(
                                      ill?.test
                                    );

                                  return (
                                    <div
                                      key={ill?.test}
                                      className="illCard"
                                      onClick={() => {
                                        if (!isSelected) {
                                          handleSelectCommon(
                                            ill?.test,
                                            textareaRefForLabtest,
                                            textForLabtest,
                                            setextForLabtest,
                                            setselectedState,
                                            "selectedLabTest",
                                            setfilterState,
                                            "filterLabTest"
                                          );
                                        }
                                      }}
                                    >
                                      <div className="illCard-info">
                                        <h5>{ill?.test}</h5>
                                        <p>{ill?.disease?.join(",")}</p>
                                      </div>

                                      {isSelected && (
                                        <i
                                          className="ri-check-line"
                                          style={{
                                            fontSize: "22px",
                                            color: "green",
                                          }}
                                        />
                                      )}
                                    </div>
                                  );

                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="prescription-card advice-card-enhanced">
                          <h3>
                            <i className="fas fa-comment-medical"></i> General Advice
                          </h3>

                          <div className="form-group">
                            <label htmlFor="advice">Patient Advice</label>
                            <textarea
                              style={{
                                display: 'flex',
                                justifyContent: 'start'
                              }}
                              id="advice"
                              placeholder="Add general advice for patient..."
                              defaultValue=
                              {`1. Take adequate rest for 3-5 days
                                2. Drink plenty of warm fluids
                                3. Follow up if symptoms worsen
                                4. Next review in 7 days`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="alert-item danger" style={{ margin: "15px 0", padding: "12px", fontSize: "13px" }}>
                        <i className="fas fa-allergies"></i>
                        <div>
                          <div style={{ fontWeight: 600 }}>Allergy Alert</div>
                          <div>{currentPatientForPrescription.initialAssementId.complaint}</div>
                        </div>
                      </div>

                      <div className="alert-item info" style={{ margin: "15px 0", padding: "12px", fontSize: "13px" }}>
                        <i className="fas fa-history"></i>
                        <div>
                          <div style={{ fontWeight: 600 }}>Medical History</div>
                          <div>{currentPatientForPrescription?.initialAssementId?.medicalHistory}</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "center" }}>
                        <button
                          className="btn btn-outline"
                          id="saveDraftBtn"
                          onClick={() => alert("Prescription draft saved successfully!")}
                        >
                          <i className="fas fa-save"></i>
                          Save Draft
                        </button>

                        {/*  UPDATED: Generate Prescription opens Final View */}
                        <button className="btn btn-success" id="generatePrescriptionBtn" onClick={generateFinalPrescription}>
                          <i className="fas fa-prescription"></i>
                          Generate Prescription
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== NEW: PA Documents Modal ===================== */}
      <div
        className="modal pa-documents-modal"
        id="paDocumentsModal"
        style={{ display: isPaDocumentsModalOpen ? "flex" : "none" }}
        onClick={(e) => {
          if (e.target.id === "paDocumentsModal") {
            closePaDocumentsModal();
          }
        }}
      >
        <div className="pa-documents-content">
          <div className="pa-docs-header">
            <h2 className="pa-docs-title">
              <i className="fas fa-file-medical-alt"></i> PA Uploaded Documents
            </h2>
            <button className="close-modal" id="closePaDocsModal" onClick={closePaDocumentsModal}>
              &times;
            </button>
          </div>

          <div className="pa-docs-body">
            <p>Documents uploaded by the Physician Assistant for this patient:</p>

            <div className="pa-docs-grid" id="paDocsGrid">
              {currentPatientForPrescription?.pastDocuments?.length > 0 ? (
                currentPatientForPrescription.pastDocuments.map((doc, index) => (
                  <div className="pa-doc-card" key={index} onClick={() => handleViewDoc(doc)}>
                    <div className="pa-doc-badge">{doc?.category}</div>

                    <div className="pa-doc-icon-wrapper">
                      <i className={`fas fa-file-${getDocIcon(doc.type)}`}></i>
                    </div>

                    <div className="pa-doc-content">
                      <h4 className="pa-doc-title">Document #{index + 1}</h4>
                      <p className="pa-doc-meta">
                        <i className="fas fa-user-edit"></i> {doc?.registerarId?.name || 'System'}
                      </p>
                      <p className="pa-doc-date">
                        <i className="fas fa-calendar-alt"></i> {new Date(doc?.updatedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <button onClick={() => setisImageVier(doc?.pastDocuments)} className="pa-view-btn">View Files</button>
                  </div>
                ))
              ) : (
                <div className="pa-empty-state">
                  <i className="fas fa-folder-open"></i>
                  <p>No documents uploaded by PA for this patient.</p>
                </div>
              )}

              {/* Improved Image Viewer Overlay */}
              {isImageVier && (
                <div className="pa-image-overlay" onClick={() => setisImageVier(null)}>
                  <div className="pa-viewer-container" onClick={e => e.stopPropagation()}>

                    {/* Header Section */}
                    <div className="pa-viewer-header">
                      <h3>{isImageVier?.category} - Document Files</h3>
                      <button className="pa-close-viewer" onClick={() => setisImageVier(null)}>
                        <i className="fas fa-times"></i> Close
                      </button>
                    </div>

                    {/* Image Grid Section */}
                    <div className="pa-viewer-grid">
                      {isImageVier?.files?.map((file, index) => (
                        <div key={index} className="pa-viewer-item">
                          <img
                            src={`http://localhost:8000/${file?.path}`}
                            alt={`Page ${index + 1}`}
                            onClick={() => window.open(`http://localhost:8000/${file?.path}`, '_blank')}
                          />
                          <span className="pa-file-label">Page {index + 1}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default DashboardComponent;
