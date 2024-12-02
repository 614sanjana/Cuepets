import React from 'react';
import { useHistory } from 'react-router-dom';

const PetRecords = () => {
  // Sample pet data
  const pets = [
    { id: 1, name: 'Fluffy', species: 'Dog', age: 3, image: 'https://via.placeholder.com/300x200' },
    { id: 2, name: 'Whiskers', species: 'Cat', age: 2, image: 'https://via.placeholder.com/300x200' },
    { id: 3, name: 'Bella', species: 'Dog', age: 4, image: 'https://via.placeholder.com/300x200' },
    { id: 4, name: 'Leo', species: 'Cat', age: 5, image: 'https://via.placeholder.com/300x200' },
  ];

  const history = useHistory();

  // Navigate to health record page
  const handlePetClick = (petId) => {
    history.push(`/health-records/${petId}`);
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Your Pets</h2>

      {/* Grid Container for Pet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition transform hover:scale-105"
            onClick={() => handlePetClick(pet.id)}
          >
            <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{pet.name}</h3>
              <p className="text-gray-600">{pet.species} | Age: {pet.age}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetRecords;
