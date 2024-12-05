import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManagePets = () => {
  const { ownerId } = useParams(); // Assuming ownerId is passed via URL params
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all pets for the owner
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/pets/allPets/${ownerId}`);
        setPets(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setLoading(false);
      }
    };

    fetchPets();
  }, [ownerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center text-2xl font-semibold">Manage Pets</h1>

      {/* Display pets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {pets.length === 0 ? (
          <p>No pets found for this owner.</p>
        ) : (
          pets.map((pet) => (
            <div key={pet.petID} className="bg-white p-4 rounded-lg shadow-md">
              {/* Pet Profile Image */}
              <div className="mb-4">
                <img
                  src={`http://localhost:8080/api/v1/pets/viewImage/${pet.petID}`} // Fetch image from the backend
                  alt={`${pet.petName}'s profile`}
                  className="w-60 h-60 rounded-xl mb-4 object-cover"
                />
              </div>

              {/* Pet details */}
              <h2 className="text-xl font-semibold">{pet.petName}</h2>
              <p>Age: {pet.petAge}</p>
              <p>Gender: {pet.petGender}</p>
              <p>Breed: {pet.petBreed}</p>

              {/* Link to Edit Pet */}
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate(`/editPet/${pet.petID}`)} // Navigate to edit pet page
              >
                Edit Pet
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManagePets;
