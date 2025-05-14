import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name || user.username}!</h1>
        <p className="text-lg mb-6">You are logged in as a <span className="font-semibold">{user.role.replace('_', ' ')}</span>.</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {user.role === 'admin' && (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => navigate('/admin-home')}
              >
                Admin Dashboard
              </button>
            </>
          )}

          {user.role === 'store_owner' && (
            <>
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => navigate('/store-owner')}
              >
                Store Owner Dashboard
              </button>
            </>
          )}

          {user.role === 'user' && (
            <>
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
                onClick={() => navigate('/user-home')}
              >
                Browse Stores
              </button>
            </>
          )}

          <button
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded col-span-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
