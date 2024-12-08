import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdoptPet = () => {
  const [pets, setPets] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editPet, setEditPet] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState({});

  // Fetch pets data
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/adoption/availablePets`);
        console.log(response.data);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  // Fetch image for each pet
  useEffect(() => {
    const fetchImage = async (petID) => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/pets/viewImage/${petID}`);
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrls((prevState) => ({
          ...prevState,
          [petID]: imageUrl,
        }));
      } catch (err) {
        setImageUrls((prevState) => ({
          ...prevState,
          [petID]: "https://via.placeholder.com/150",  // Fallback image if fetch fails
        }));
      }
    };

    pets.forEach(pet => {
      if (!imageUrls[pet.petID]) {  // Check if imageUrl is already set
        fetchImage(pet.petID);
      }
    });
  }, [pets, imageUrls]);

  // Open edit popup
  const handleEditClick = (pet) => {
    setEditPet(pet);
    setFormValues(pet);
    setIsEditPopupOpen(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleBackButton = () => {
    window.history.back();
  };

  return (
    <div className="h-screen p-8 justify-start bg-gradient-to-br from-white to-blue-100 text-center font-sans animate-fadeIn">
      <button
        className="fixed top-5 left-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:-translate-x-1 transition-all"
        onClick={handleBackButton}
      >
        &larr; Back
      </button>

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Adopt Cute Pets from CuePets
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Give new home to your favourite pets
      </p>

      <div className="flex flex-wrap ml-0 p-10 gap-6 max-w-6xl mx-auto">
        {pets.map((pet, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-80 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="p-6 flex flex-col items-center">
              {/* Profile Photo */}
              <div className="mb-4">
                <img
                  src={imageUrls[pet.petID] || "https://via.placeholder.com/150"}  // Default to placeholder if no image URL
                  alt="Profile"
                  className="w-60 h-60 rounded-xl mb-4"
                />
              </div>
              
            </div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              {pet.petName}
            </h3>
            <p className="text-gray-500 mb-4">Age: {pet.petAge}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-500 transform hover:scale-105 transition-all"
              onClick={() => handleEditClick(pet)}
            >
            Adopt Now
            </button>
          </div>
        ))}
      </div>

      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Edit Pet Details</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name:</label>
                <input
                  type="text"
                  name="petName"
                  value={formValues.petName || ''}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Age:</label>
                <input
                  type="number"
                  name="petAge"
                  value={formValues.petAge || ''}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Age:</label>
                <input
                  type="number"
                  name="petAge"
                  value={formValues.petAge || ''}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Age:</label>
                <input
                  type="number"
                  name="petAge"
                  value={formValues.petGender || ''}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => setIsEditPopupOpen(false)}
                >
                  Cancel
                </button>
               
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptPet;
