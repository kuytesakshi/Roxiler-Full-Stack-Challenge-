import React, { useEffect, useState } from 'react';
import { getAllUsers, getUserDetails } from '../service/storeService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [expandedRatings, setExpandedRatings] = useState({}); // { userId: true/false }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();

        const usersWithRatings = await Promise.all(
          response.data.map(async (user) => {
            if (user.role === 'store_owner') {
              try {
                const detailRes = await getUserDetails(user.id);
                return {
                  ...user,
                  averageRating: detailRes.data.averageRating,
                  ratings: detailRes.data.ratings || [] // include individual ratings
                };
              } catch (err) {
                console.warn(`Failed to fetch rating for user ${user.id}`, err);
                return user;
              }
            }
            return user;
          })
        );

        setUsers(usersWithRatings);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    (user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleRatingView = (userId) => {
    setExpandedRatings(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <input
        type="text"
        placeholder="Search by username or email"
        className="w-full px-4 py-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full table-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Avg Rating</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <React.Fragment key={user.id}>
              <tr>
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border">
                  {user.role === 'store_owner' ? (user.averageRating || 'No ratings') : '-'}
                </td>
                <td className="px-4 py-2 border">
                  {user.role === 'store_owner' && (
                    <button
                      onClick={() => toggleRatingView(user.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      {expandedRatings[user.id] ? 'Hide Ratings' : 'View Ratings'}
                    </button>
                  )}
                </td>
              </tr>

              {expandedRatings[user.id] && (
                <tr>
                  <td colSpan="6" className="px-4 py-2 border bg-gray-100">
                    <strong>Ratings:</strong>
                    {user.ratings && user.ratings.length > 0 ? (
                      <ul className="list-disc pl-6 mt-2">
                        {user.ratings.map((r, index) => (
                          <li key={index}>⭐ {r.rating} (by user {r.UserId})</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No ratings available.</p>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
