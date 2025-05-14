import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminStats } from '../service/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAdminStats();
        setStats(response.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch dashboard stats');
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded shadow p-6 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded shadow p-6 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Total Stores</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">{stats.totalStores}</p>
        </div>
        <div className="bg-white rounded shadow p-6 text-center border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Total Ratings</h3>
          <p className="text-4xl font-bold text-purple-600 mt-2">{stats.totalRatings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
          onClick={() => navigate('/admin/add-user')}
        >
          ➕ Add User
        </button>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
          onClick={() => navigate('/admin/add-store')}
        >
          🏪 Add Store
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow"
          onClick={() => navigate('/admin/users_list')}
        >
          👥 View & Filter Users
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow"
          onClick={() => navigate('/admin/stores_list')}
        >
          🏬 View & Filter Stores
        </button>

        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded shadow"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
