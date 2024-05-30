import React, { useState } from 'react';
import AnimalCard from './AnimalCard';

const CatGallery = ({ cats }) => {
  const [selectedCat, setSelectedCat] = useState(null);

  const handleCardClick = (cat) => {
    setSelectedCat(cat);
  };

  return (
    <div>
      <div className="gallery">
        {cats.map(cat => (
          <AnimalCard key={cat.id} animal={cat} onClick={handleCardClick} />
        ))}
      </div>
      {selectedCat && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedCat(null)}>&times;</span>
            <h2>{selectedCat.name}</h2>
            <img src={selectedCat.image} alt={selectedCat.name} />
            <p><strong>Name: </strong> {selectedCat.name}</p>
            <p><strong>Origin: </strong> {selectedCat.origin}</p>
            <p><strong>Temperament:</strong> {selectedCat.temperament}</p>
            <p><strong>Colors:</strong> {selectedCat.colors.join(', ')}</p>
            <p><strong>Description:</strong> {selectedCat.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatGallery;
