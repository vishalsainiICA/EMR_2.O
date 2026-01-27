import API, { COMMONAPI, PYTHONAPI } from "./axiosInstance";

export const CommonApi = {
  login: (data) => COMMONAPI.post("api/login", data)
}

export const personalAssitantApi = {
  registerPatient: (data) => API.post("/common/patient/register-patient", data),
  fetchIllness: () => API.get("/common/patient/illness"),
  getUsers: () => API.get("/users"),
  getProfile: () => API.get("/profile"),
  loadPatient: () => API.get("/assitant/no-assessment-patient"),
  getAllPatient: (date = null, status = null) =>
    API.get("/assitant/all-patient-record", {
      params: {
        startDate: date?.startDate,
        endDate: date?.endDate,
        status
      }
    }),

  saveInitialAssessments: (patientId, data) => API.post(`/assitant/intital-assement`, { patientId: patientId, initialAssessment: data }),

};

export const doctorApi = {
  loadPatient: () => API.get("/doctor/today-Patient"),
  getAllPatient: (date = null, status = null) => API.get("/doctor/all-patient-record", {
    params: {
      startDate: date?.startDate,
      endDate: date?.endDate,
      status
    }
  }),
  getAllIllnessAndPharmacydata: async () => API.get('/doctor/all-illness-pharma'),
  savePrescribtion: async (data) => API.post('/doctor/save-prescribtion', data),

  getIllnessBySymtomps: async (prompt) => PYTHONAPI.post('ask', prompt),

}

