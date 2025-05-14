import axios from "axios";
const API = 'http://localhost:5050/api';
export const getAllStores = async()=>{
    const token = localStorage.getItem('token');
    return axios.get(`${API}/stores`,{
        headers: {Authorization: `Bearer ${token}`},
    });
};
export const submitRating = async (storeId, rating) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API}/ratings/`, { storeId, rating }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getStoreOwnerDashboard = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API}/stores/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
export const getUserDetails = async (id) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API}/users/details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};