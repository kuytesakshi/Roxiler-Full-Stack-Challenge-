import React, { useState } from 'react';
import { loginUser } from '../service/authService';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg(''); // clear error when user types
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      alert('Login successful');

      const role = res.user.role;
      if (role === 'admin') {
        navigate('/admin-home');
      } else if (role === 'store_owner') {
        navigate('/store-owner');
      } else {
        navigate('/user-home');
      }

    } catch (err) {
      const msg = err.response?.data?.msg || 'Invalid email or password';
      setErrorMsg(msg);
    }
  };

  return (
    <div className="auth-container max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          type="email"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          type="password"
          className="w-full border px-3 py-2 rounded"
        />
        
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>

        <div className="text-center mt-2">
          <Link to="/update-password" className="text-blue-500 hover:underline">
            Update Password
          </Link>
        </div>
      </form>
    </div>
  );
}
