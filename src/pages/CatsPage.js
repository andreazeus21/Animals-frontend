import React, { useEffect, useState, useCallback } from 'react';
import CatGallery from '../components/CatGallery';
import debounce from 'lodash.debounce';

const CatsPage = () => {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCats = async (query) => {
    setLoading(true);
    setError(null);

    let url = 'http://localhost:3000/cats';
    if (query) {
      url += `?search=${query}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchCats = useCallback(debounce((query) => fetchCats(query), 500), []);

  useEffect(() => {
    debouncedFetchCats(searchTerm);
  }, [searchTerm, debouncedFetchCats]);

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
      {!loading && !error && <CatGallery cats={cats} />}
    </div>
  );
};

export default CatsPage;
