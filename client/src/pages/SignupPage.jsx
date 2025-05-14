import React, { useState } from 'react';
import { registerUser } from '../service/authService';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};

    // Name: min 20, max 60 characters
    if (form.name.length < 20 || form.name.length > 60) {
      newErrors.name = 'Name must be between 20 and 60 characters.';
    }

    // Email: required + simple email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format.';
    }

    // Address: required and max 400 characters
    if (!form.address.trim()) {
      newErrors.address = 'Address is required.';
    } else if (form.address.length > 400) {
      newErrors.address = 'Address cannot exceed 400 characters.';
    }

    // Password: min 8 chars, 1 uppercase, 1 lowercase, 1 number
    if (
      !form.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    ) {
      newErrors.password = 'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await registerUser(form);
      alert(res.msg);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="auth-container max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
}
