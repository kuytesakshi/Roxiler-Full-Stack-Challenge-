import React, { useState } from 'react';
import axios from 'axios';

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'normal' // default role
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5050/api/admin/add-user', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(res.data.msg);
      setFormData({ name: '', email: '', address: '', password: '', role: 'normal' });
      alert('User added successfully');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error adding user');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add User (Admin or Normal)</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required minLength={20} maxLength={60} className="w-full p-2 border" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required maxLength={400} className="w-full p-2 border" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full p-2 border" />
        <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border">
          <option value="normal">admin</option>
          <option value="admin">user</option>
          <option value="admin">store_owner</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add User</button>
      </form>
    </div>
  );
};

export default AddUserPage;
