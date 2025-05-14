import axios from 'axios';
const API = 'http://localhost:5050/api/auth';
export const registerUser = (data) =>
    axios.post(`${API}/register`,data)
    .then(res=>
        res.data
    );

export const loginUser = (data) =>
    axios.post(`${API}/login`, data)
    .then (res=>
        res.data
    )
