// src/pages/AddStorePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStorePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    userId: ''
  });
  const [owners, setOwners] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch store owners (users with role = 'store_owner')
    const fetchOwners = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/users?role=store_owner', {
          headers: { Authorization: localStorage.getItem('token') }
        });
        setOwners(res.data);
      } catch (err) {
        console.error('Error fetching store owners', err);
      }
    };

    fetchOwners();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/stores', formData, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setMessage(res.data.msg);
      setFormData({ name: '', email: '', address: '', userId: '' });
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Failed to create store');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Add New Store</h2>
      {message && <div className="text-green-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Store Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Store Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Store Owner</option>
          {owners.map(owner => (
            <option key={owner.id} value={owner.id}>
              {owner.name} ({owner.email})
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Store
        </button>
      </form>
    </div>
  );
};

export default AddStorePage;
