import axios from "axios";

const API_URL = "https://booking-backend-cljf.onrender.com/api";

export const getPackages = () => axios.get(`${API_URL}/packages`);
export const getPackageById = (id) => axios.get(`${API_URL}/packages/${id}`);
export const createBooking = (data) => axios.post(`${API_URL}/bookings`, data);
export const addPackage = (data) =>
  axios.post(`${API_URL}/admin/packages`, data);
export const updatePackage = (id, data) =>
  axios.put(`${API_URL}/admin/packages/${id}`, data);
export const deletePackage = (id) =>
  axios.delete(`${API_URL}/admin/packages/${id}`);
