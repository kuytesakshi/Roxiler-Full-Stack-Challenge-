// src/pages/UserHomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, Normal User</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/stores')}>
          <h2 className="text-lg font-semibold">🔍 Browse & Search Stores</h2>
          <p className="text-sm">Find and explore stores available in the system.</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Click Here</button>
        </div>

        <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/rate-store')}>
          <h2 className="text-lg font-semibold">⭐ Rate a Store</h2>
          <p className="text-sm">Submit or update your rating for a store.</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Click Here</button>
        </div>

        <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/my-ratings')}>
          <h2 className="text-lg font-semibold">📋 View My Ratings</h2>
          <p className="text-sm">See your submitted ratings and related info.</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Click Here</button>
        </div>

        <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer" onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}>
          <h2 className="text-lg font-semibold text-red-600">🚪 Logout</h2>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Click Here</button>
          <p className="text-sm text-red-400">End your session and go to login screen.</p>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
