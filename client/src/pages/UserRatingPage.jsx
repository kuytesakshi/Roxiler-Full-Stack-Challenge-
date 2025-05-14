import React, { useEffect, useState } from 'react';
import { getUserRatings } from '../service/ratingService';

const UserRatingsPage = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getUserRatings()
      .then(res =>{
         console.log("Ratings fetched:", res.data);
         setRatings(res.data)
      }
       )
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Ratings</h2>
    {ratings.map((r, i) => (
  <div key={i} className="p-2 border mb-2 rounded shadow">
    <p><strong>Store Name:</strong> {r.Store?.name}</p>
    <p><strong>Email:</strong> {r.Store?.email}</p>
    <p><strong>Address:</strong> {r.Store?.address}</p>
    <p><strong>Rating:</strong> {r.rating}</p>
    <p><strong>Average Rating:</strong> {r.averageRating}</p>
    <p><strong>Total Ratings:</strong> {r.totalRatings}</p>
  </div>
))}
    </div>
  );
};

export default UserRatingsPage;
