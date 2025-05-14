// StoreOwnerDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoreOwnerDashboard } from '../service/storeService';

const StoreOwnerDashboard = () => {
  const [storeData, setStoreData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getStoreOwnerDashboard()
      .then(res => setStoreData(res.data))
      .catch(err => {
        console.error(err);
        alert('Unauthorized or error fetching data');
        navigate('/login'); // redirect on auth error
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!storeData) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Store Owner Dashboard</h2>
      <div className="border-b-2 mb-4">
        <h3 className="text-lg font-semibold">Store Details</h3>
        <p><strong>Store Name:</strong> {storeData.storeName}</p>
        <p><strong>Average Rating:</strong> {storeData.averageRating}</p>
        <p><strong>Total Ratings:</strong> {storeData.totalRatings}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Ratings Submitted by Users</h3>
        {storeData.ratings.length === 0 ? (
          <p>No ratings submitted yet.</p>
        ) : (
          <ul>
            {storeData.ratings.map((rating, index) => (
              <li key={index} className="p-2 border mb-2 rounded shadow">
                <p><strong>User:</strong> {rating.user}</p>
                <p><strong>Rating:</strong> {rating.rating}</p>
                <p><strong>Comment:</strong> {rating.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="mt-4 p-2 bg-red-500 text-white rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default StoreOwnerDashboard;
