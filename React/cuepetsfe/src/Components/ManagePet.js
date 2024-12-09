import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagePets = () => {
  const [pets, setPets] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editPet, setEditPet] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [imageUrls, setImageUrls] = useState({});

  // Fetch pets data
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const ownerId = localStorage.getItem("ownerID"); // Replace with actual owner ID
        const response = await axios.get(
          `http://localhost:8080/api/v1/pets/allPets/${ownerId}`
        );
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const handleDeletePet = async (petID) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/pets/deletePet/${petID}`);
        alert("Pet deleted successfully!");
        setPets((prevPets) => prevPets.filter((pet) => pet.petID !== petID));
      } catch (error) {
        console.error("Error deleting pet:", error);
        alert("Failed to delete pet!");
      }
    }
  };

  // Fetch image for each pet
  useEffect(() => {
    const fetchImage = async (petID) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/pets/viewImage/${petID}`
        );
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrls((prevState) => ({
          ...prevState,
          [petID]: imageUrl,
        }));
      } catch (err) {
        setImageUrls((prevState) => ({
          ...prevState,
          [petID]: "https://via.placeholder.com/150", // Fallback image if fetch fails
        }));
      }
    };

    pets.forEach((pet) => {
      if (!imageUrls[pet.petID]) {
        fetchImage(pet.petID);
      }
    });
  }, [pets, imageUrls]);

  // Open edit popup
  const handleEditClick = (pet) => {
    setEditPet(pet);
    setFormValues({
      petName: pet.petName,
      petAge: pet.petAge,
      petAllergies: pet.petAllergies,
      petBehaviour: pet.petBehaviour,
    });
    setIsEditPopupOpen(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Save edited pet details
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/pets/updatePet/${editPet.petID}`,
        formValues
      );
      alert("Pet details updated successfully!");
      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet.petID === editPet.petID ? { ...pet, ...formValues } : pet
        )
      );
      setIsEditPopupOpen(false);
    } catch (error) {
      console.error("Error saving pet details:", error);
      alert("Failed to update pet details!");
    }
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
        Manage my Cute Pets
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage or edit your Pets
      </p>

      <div className="flex flex-wrap ml-0 p-10 gap-6 mx-auto">
        {pets.map((pet, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-80 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="p-6 flex flex-col items-center">
              <div className="mb-4">
                <img
                  src={imageUrls[pet.petID] || "https://via.placeholder.com/150"}
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
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transform hover:scale-105 transition-all"
              onClick={() => handleEditClick(pet)}
            >
              Edit Details
            </button>
            <button
  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-800 transform hover:scale-105 transition-all mt-4"
  onClick={() => handleDeletePet(pet.petID)}
>
  Delete Pet
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
                  value={formValues.petName || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Age:</label>
                <input
                  type="number"
                  name="petAge"
                  value={formValues.petAge || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Behaviour:</label>
                <input
                  type="text"
                  name="petBehaviour"
                  value={formValues.petBehaviour || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Allergies:</label>
                <input
                  type="text"
                  name="petAllergies"
                  value={formValues.petAllergies || ""}
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
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePets;
