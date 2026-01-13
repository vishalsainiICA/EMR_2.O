import API from "./axiosInstance";

const personalAssitantApi = {
  registerPatient: (data) => API.get("/"),
  getUsers: () => API.get("/users"),
  getProfile: () => API.get("/profile"),
};

export default personalAssitantApi;
