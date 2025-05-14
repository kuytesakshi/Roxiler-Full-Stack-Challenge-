import React, { useEffect, useState } from 'react';
import { getAllStores } from '../service/storeService';

const AllStoresPage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch once and set both main and filtered data
    getAllStores()
      .then(res => {
        setStores(res.data);
        setFilteredStores(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStores(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Stores</h2>

      {/* Search bar */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by store name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Display filtered results in a table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Ratings</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.length > 0 ? (
            filteredStores.map(store => (
              <tr key={store.id}>
                <td className="border px-4 py-2">{store.name}</td>
                <td className="border px-4 py-2">{store.email}</td>
                <td className="border px-4 py-2">{store.address}</td>
                <td className="border px-4 py-2">
                  {store.Ratings?.map(r => r.rating).join(', ') || 'No ratings'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">No stores found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllStoresPage;
