import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPetForm = ({ ownerId }) => {
  const [petDetails, setPetDetails] = useState({
    petName: "",
    petAge: "",
    petBreedID: "",
    petGender: "",
    adoptionStatus: false,
    petBehaviour: [],
    petAllergies: [],
  });

  const [breeds, setBreeds] = useState([]);
  const [message, setMessage] = useState("");
  const ownerID = localStorage.getItem('ownerID');
  // Fetch breeds from the backend
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/petBreed/names" // Replace with your actual endpoint
        );
        console.log("Fetched breeds:", response.data);
        setBreeds(response.data); // Assuming the response is an array of breed objects
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add pet details
      await axios.post(
        `http://localhost:8080/api/v1/pets/addPet/${ownerID}`,
        petDetails
      );

      setMessage("Pet added successfully!");

      // Upload profile picture
    } catch (error) {
      setMessage(`Error: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side: Form */}
      <div className="w-1/2 p-6 bg-white shadow-lg shadow-gray-500 overflow-y-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Add a Pet
        </h1>
        {message && (
          <div className="p-4 mb-4 text-white bg-blue-500 rounded">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Pet Name</label>
            <input
              type="text"
              name="petName"
              value={petDetails.petName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Pet Age</label>
            <input
              type="text"
              name="petAge"
              value={petDetails.petAge}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Pet Breed</label>
            <select
              name="petBreedID"
              value={petDetails.petBreedID}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Breed</option>
              {breeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Pet Gender</label>
            <select
              name="petGender"
              value={petDetails.petGender}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Pet Sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
  <label className="block text-gray-700 font-medium">Pet Behaviour</label>
  <input
    type="text"
    name="petBehaviour"
    value={petDetails.petBehaviour.join(", ")} // Convert array to a comma-separated string for display
    onChange={(e) => {
      const { value } = e.target;
      setPetDetails((prevDetails) => ({
        ...prevDetails,
        petBehaviour: value.split(",").map((item) => item.trim()), // Convert input back to array
      }));
    }}
    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
    placeholder="Comma-separated values"
  />
</div>
<div>
  <label className="block text-gray-700 font-medium">Pet Allergies</label>
  <input
    type="text"
    name="petAllergies"
    value={petDetails.petAllergies.join(", ")} // Convert array to a comma-separated string for display
    onChange={(e) => {
      const { value } = e.target;
      setPetDetails((prevDetails) => ({
        ...prevDetails,
        petAllergies: value.split(",").map((item) => item.trim()), // Convert input back to array
      }));
    }}
    className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
    placeholder="Comma-separated values"
  />
</div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Add Pet
          </button>
        </form>
      </div>

    </div>
  );
};

export default AddPetForm;
