import React, { useState } from 'react';
import AnimalCard from './AnimalCard';

const BirdGallery = ({ birds }) => {
  const [selectedBird, setSelectedBird] = useState(null);

  const handleCardClick = (bird) => {
    setSelectedBird(bird);
  };

  return (
    <div>
      <div className="gallery">
        {birds.map(bird => (
          <AnimalCard key={bird.id} animal={bird} onClick={handleCardClick} />
        ))}
      </div>
      {selectedBird && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedBird(null)}>&times;</span>
            <h2>{selectedBird.name}</h2>
            <img src={selectedBird.image} alt={selectedBird.name} />
            <p><strong>Name:</strong> {selectedBird.name}</p>
            <p><strong>Species:</strong> {selectedBird.species}</p>
            <p><strong>Family:</strong> {selectedBird.family}</p>
            <p><strong>Habitat:</strong> {selectedBird.habitat}</p>
            <p><strong>Place of found:</strong> {selectedBird.place_of_found}</p>
            <p><strong>Diet:</strong> {selectedBird.diet}</p>
            <p><strong>Description:</strong> {selectedBird.description}</p>
            <p><strong>Weight (kg):</strong> {selectedBird.weight_kg}</p>
            <p><strong>Height (cm):</strong> {selectedBird.height_cm ? selectedBird.height_cm : 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirdGallery;
