import axios from "axios";
const API = 'http://localhost:5050/api/ratings';

export const getUserRatings = async () => {
  const token = localStorage.getItem('token');
  console.log("Token used:", token); // ✅ check token
  return axios.get(`${API}/user-ratings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
