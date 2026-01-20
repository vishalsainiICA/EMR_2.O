import API, { COMMONAPI } from "./axiosInstance";

export const CommonApi = {
  login : (data)=>COMMONAPI.post("api/login" ,data)
}

export const personalAssitantApi = {
  registerPatient: (data) => API.post("/common/patient/register-patient", data),
  fetchIllness: () => API.get("/common/patient/illness"),
  getUsers: () => API.get("/users"),
  getProfile: () => API.get("/profile"),
  loadPatient : () => API.get("/assitant/all-patient-record"),
  saveInitialAssessments : (patientId, data) => API.post(`/assitant/intital-assement` , { patientId :patientId, initialAssessment: data}),

};

export const doctorApi = {
   loadPatient : () => API.get("/doctor/today-Patient"),
  getAllIllnessAndPharmacydata: async () =>  API.get('/doctor/all-illness-pharma'),
  savePrescribtion: async (data) => doctorInstance.post('/doctor/save-prescribtion', data)
}

