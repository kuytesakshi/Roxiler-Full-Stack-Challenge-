// src/pages/UpdatePassword.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'http://localhost:5050/api/users/password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error updating password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Update Password</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password (8-16 chars, 1 uppercase, 1 special)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default UpdatePassword;
