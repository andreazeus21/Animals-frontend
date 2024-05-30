import React, { useEffect, useState, useCallback } from 'react';
import DogGallery from '../components/DogGallery';
import debounce from 'lodash.debounce';

const DogsPage = () => {
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDogs = async (query) => {
    setLoading(true);
    setError(null);

    let url = 'http://localhost:3000/dogs';
    if (query) {
      url += `?search=${query}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setDogs(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchDogs = useCallback(debounce((query) => fetchDogs(query), 500), []);

  useEffect(() => {
    debouncedFetchDogs(searchTerm);
  }, [searchTerm, debouncedFetchDogs]);

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
      {!loading && !error && <DogGallery dogs={dogs} />}
    </div>
  );
};

export default DogsPage;
