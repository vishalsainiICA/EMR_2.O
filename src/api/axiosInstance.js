import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/", // backend url
});

export const PYTHONAPI = axios.create({
  baseURL: "https://disease-rag-api-k12s.onrender.com",
  withCredentials: true
  // backend url
});
export const COMMONAPI = axios.create({
  baseURL: "http://localhost:8000/", // backend url
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2ZhNTJmMDdkM2U2NGMwYzU4ZjJiNSIsImVtYWlsIjoic2FtYXkucmFpbmFAZ21haWwuY29tIiwibmFtZSI6IlNhbWF5IFJhaW4iLCJpYXQiOjE3Njg1NjM3NjcsImV4cCI6MTc2OTE2ODU2N30.mkXjrUe40uFM_Go3zbdri0sG3YXwEcce4eFXhpoMU_Y"
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
