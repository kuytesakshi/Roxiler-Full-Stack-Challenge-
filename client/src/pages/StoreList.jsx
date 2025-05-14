import React, { useEffect, useState } from 'react';
import { getAllStores } from '../service/storeService';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getAllStores();
        setStores(response.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch stores');
      }
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Stores</h2>

      <input
        type="text"
        placeholder="Search by store name"
        className="w-full px-4 py-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full table-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Location</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredStores.map(store => (
            <tr key={store.id}>
              <td className="px-4 py-2 border">{store.id}</td>
              <td className="px-4 py-2 border">{store.name}</td>
              <td className="px-4 py-2 border">{store.address}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
