import React from 'react';
import { useParams } from 'react-router-dom';

const HealthRecord = () => {
  const { petId } = useParams();

  // Fetch pet health record based on petId (can be replaced with actual API fetch)
  // For this example, let's just mock the data:
  const pet = {
    id: petId,
    name: 'Fluffy',
    species: 'Dog',
    age: 3,
    image: 'https://via.placeholder.com/300x200',
    lastCheckup: 'October 2024',
    vaccinationStatus: 'Up to date',
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">{pet.name}'s Health Record</h2>
        <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover mt-4" />
        <p className="mt-4"><strong>Age:</strong> {pet.age} years</p>
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Last Check-up:</strong> {pet.lastCheckup}</p>
        <p><strong>Vaccination Status:</strong> {pet.vaccinationStatus}</p>
        {/* More health record details can be added here */}
      </div>
    </div>
  );
};

export default HealthRecord;
