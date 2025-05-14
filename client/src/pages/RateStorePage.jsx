import React, { useState } from 'react';
import { submitRating } from '../service/storeService';
import {getUserRatings } from '../service/ratingService';

const RateStorePage = () => {
  const [storeId, setStoreId] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = () => {
    submitRating(storeId, Number(rating))
      .then(res => alert(res.data.msg))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Submit/Update Rating</h2>
      <input
        placeholder="Store ID"
        value={storeId}
        onChange={e => setStoreId(e.target.value)}
        className="border p-2 m-1"
      />
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={e => setRating(e.target.value)}
        className="border p-2 m-1"
      />
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default RateStorePage;
