import React, { useState } from 'react';
import AnimalCard from './AnimalCard';

const DogGallery = ({ dogs }) => {
  const [selectedDog, setSelectedDog] = useState(null);

  const handleCardClick = (dog) => {
    setSelectedDog(dog);
  };

  return (
    <div>
      <div className="gallery">
        {dogs.map(dog => (
          <AnimalCard key={dog.id} animal={dog} onClick={handleCardClick} />
        ))}
      </div>
      {selectedDog && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedDog(null)}>X</span>
            <h2>{selectedDog.name}</h2>
            <img src={selectedDog.image} alt={selectedDog.name} />
            <p><strong>Name: </strong> {selectedDog.name}</p>
            <p><strong>Breed Group:</strong> {selectedDog.breed_group}</p>
            <p><strong>Size:</strong> {selectedDog.size}</p>
            <p><strong>Lifespan:</strong> {selectedDog.lifespan}</p>
            <p><strong>Origin:</strong> {selectedDog.origin}</p>
            <p><strong>Temperament:</strong> {selectedDog.temperament}</p>
            <p><strong>Colors:</strong> {selectedDog.colors.join(', ')}</p>
            <p><strong>Description:</strong> {selectedDog.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DogGallery;
