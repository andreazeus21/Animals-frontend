import React from 'react';

const AnimalCard = ({ animal, onClick }) => (
  <div className="animal-card" onClick={() => onClick(animal)}>
    <img src={animal.image} alt={animal.name} />
    <h3>{animal.name}</h3>
    <h5>{animal.breed_group || animal.species}</h5>
  </div>
);

export default AnimalCard;
