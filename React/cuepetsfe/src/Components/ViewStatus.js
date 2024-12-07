import React, { useState, useEffect } from 'react';

const ViewStatus = () => {
  const [pets, setPets] = useState([]);

  // Load pets from localStorage
  useEffect(() => {
    const storedPets = JSON.parse(localStorage.getItem('pets')) || [];
    setPets(storedPets);
  }, []);

  // Save updated pets back to localStorage
  const updateLocalStorage = (updatedPets) => {
    localStorage.setItem('pets', JSON.stringify(updatedPets));
    setPets(updatedPets);
  };

  // Status Update Handler
  const updateStatus = (index, newStatus) => {
    const updatedPets = [...pets];
    updatedPets[index].status = newStatus;
    updateLocalStorage(updatedPets);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-center text-2xl font-bold mb-6">
        Your Pets Listed for Adoption
      </div>

      {pets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg space-y-4"
            >
              <div className="text-lg font-bold">{pet.petName}</div>
              <div>
                <span className="font-semibold">Type:</span> {pet.petType}
              </div>
              <div>
                <span className="font-semibold">Breed:</span> {pet.petBreed}
              </div>
              <div>
                <span className="font-semibold">Age:</span> {pet.petAge} years
              </div>
              <div>
                <span className="font-semibold">Sex:</span> {pet.petSex}
              </div>
              <div>
                <span className="font-semibold">Vaccinated:</span>{' '}
                {pet.vaccinated}
              </div>
              <div>
                <span className="font-semibold">Spayed/Neutered:</span>{' '}
                {pet.spayed}
              </div>
              <div>
                <span className="font-semibold">Owner:</span> {pet.ownerName} (
                {pet.email})
              </div>
              <div>
                <span className="font-semibold">Location:</span> {pet.location}
              </div>
              <div>
                <span className="font-semibold">Phone:</span> {pet.phone}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{' '}
                <span
                  className={`${
                    pet.status === 'Adopted'
                      ? 'text-green-500'
                      : 'text-red-500'
                  } font-semibold`}
                >
                  {pet.status || 'Available'}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={() => updateStatus(index, 'Adopted')}
                  disabled={pet.status === 'Adopted'}
                >
                  Mark as Adopted
                </button>
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  onClick={() => updateStatus(index, 'Available')}
                  disabled={pet.status === 'Available'}
                >
                  Mark as Available
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl">
          No pets listed for adoption yet.
        </div>
      )}
    </div>
  );
};

export default ViewStatus;
