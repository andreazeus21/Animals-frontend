import React, { useEffect, useState, useCallback } from 'react';
import BirdGallery from '../components/BirdGallery';
import debounce from 'lodash.debounce';

const BirdsPage = () => {
  const [birds, setBirds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBirds = async (query) => {
    setLoading(true);
    setError(null);

    let url = 'http://localhost:3000/birds';
    if (query) {
      url += `?search=${query}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setBirds(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchBirds = useCallback(debounce((query) => fetchBirds(query), 500), []);

  useEffect(() => {
    debouncedFetchBirds(searchTerm);
  }, [searchTerm, debouncedFetchBirds]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <BirdGallery birds={birds} />}
    </div>
  );
};

export default BirdsPage;
