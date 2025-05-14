import axios from 'axios';
const API = 'http://localhost:5050/api';

export const getAdminStats = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
