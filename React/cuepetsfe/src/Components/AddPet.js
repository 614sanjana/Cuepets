import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import pic1 from "../Assets/closeup-vertical-shot-cute-cat-daylight_181624-44265.avif";
import pic2 from "../Assets/vertical-shot-cute-brown-dog-blurry-background_181624-41411.avif";
import pic3 from "../Assets/25399.jpg";

const AddPetForm = ({ ownerId }) => {
  const navigate = useNavigate();
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use imported images in the gallery
  const galleryImages = [pic1, pic2, pic3];

  const ownerID = localStorage.getItem("ownerID");

  // Fetch breeds from the backend
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/petBreed/names" // Replace with your actual endpoint
        );
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  // Gallery image rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/api/v1/pets/addPet/${ownerID}`,
        petDetails
      );
      setMessage("Pet added successfully!");
    } catch (error) {
      setMessage(`Error: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side: Form */}
      <div className="w-1/2 p-8 bg-white shadow-2xl overflow-y-auto flex flex-col justify-between mx-8">
        <div>
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Add a Pet
          </h1>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mb-6 bg-blue-500 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-all"
          >
            ← Back
          </button>

          {message && (
            <div className="p-4 mb-4 text-white bg-green-500 rounded-lg shadow-md">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold">Pet Name</label>
              <input
                type="text"
                name="petName"
                value={petDetails.petName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Pet Age</label>
              <input
                type="text"
                name="petAge"
                value={petDetails.petAge}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Pet Breed</label>
              <select
                name="petBreedID"
                value={petDetails.petBreedID}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-400"
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
              <label className="block text-gray-700 font-semibold">Pet Gender</label>
              <select
                name="petGender"
                value={petDetails.petGender}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-400"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Pet Behaviour</label>
              <input
                type="text"
                name="petBehaviour"
                value={petDetails.petBehaviour.join(", ")}
                onChange={(e) => {
                  const { value } = e.target;
                  setPetDetails((prevDetails) => ({
                    ...prevDetails,
                    petBehaviour: value.split(",").map((item) => item.trim()),
                  }));
                }}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-400"
                placeholder="Comma-separated values"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Pet Allergies</label>
              <input
                type="text"
                name="petAllergies"
                value={petDetails.petAllergies.join(", ")}
                onChange={(e) => {
                  const { value } = e.target;
                  setPetDetails((prevDetails) => ({
                    ...prevDetails,
                    petAllergies: value.split(",").map((item) => item.trim()),
                  }));
                }}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-400"
                placeholder="Comma-separated values"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-400 transition-all"
            >
              Add Pet
            </button>
          </form>
        </div>
      </div>

      {/* Right Side: Full-height Gallery */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
  <div className="h-5/4 w-3/4 flex items-center justify-center">
    <div className="w-full h-full rounded-xl p-2 border-black items-center justify-center bg-white shadow-lg flex flex-col">
      <img  
        src={galleryImages[currentImageIndex]}
        alt="Gallery"
        className="w-1/2 h-1/4  object-fill rounded-t-xl"
      />
      <p className="text-center py-4 text-gray-700 font-medium">
        Pet Gallery
      </p>
    </div>
  </div>
</div>
    </div>
  );
};

export default AddPetForm;
