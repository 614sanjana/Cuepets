import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Rehome = () => {
  const ownerID = localStorage.getItem('ownerID');
  const [pets, setPets] = useState([]);
  const [selectedPetName, setSelectedPetName] = useState("");
  const [selectedPetID, setSelectedPetID] = useState(null);
  const [ownerName, setOwnerName] = useState(null); // State for storing owner's name
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    vaccinated: '',
    spayed: '',
  });

  // Fetch owner name from the backend
  const fetchOwnerName = async (ownerID) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/getUserName/${ownerID}`);
      setOwnerName(response.data); // Set the fetched owner name
    } catch (error) {
      console.error("Error fetching owner name:", error);
    }
  };

  // Call fetchOwnerName when the component mounts
  useEffect(() => {
    if (ownerID) {
      fetchOwnerName(ownerID);
    }
  }, [ownerID]);

  const handleViewStatusClick = () => {
    navigate('/view-status');
  };

  const fetchPetID = async (petName) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/pets/getPetID/${petName}`);
      setSelectedPetID(response.data);
    } catch (error) {
      toast.error(`Error fetching pet ID: ${error.response?.data || error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/pets/names/${ownerID}`);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, [ownerID]);

  const handlePetChange = (e) => {
    const petName = e.target.value;
    setSelectedPetName(petName);
    fetchPetID(petName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;

    setIsSubmitting(true); // Set the submitting flag to true
    
    // Prepare data for the POST request
    const data = {
      location: formData.location,
      vaccinated: formData.vaccinated,
      spayedOrNeutered: formData.spayed,
    };

    // Send POST request
    axios.post(`http://localhost:8080/api/v1/adoption/addAdopt/${ownerID}/${selectedPetID}`, data)
      .then((response) => {
        toast.success("Pet adoption process started!", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("Adoption added:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting adoption:", error);
        toast.error("Failed to start adoption process", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .finally(() => {
        setIsSubmitting(false); // Reset the submitting flag
      });

    // Clear the form data after submission
    setFormData({
      location: '',
      vaccinated: '',
      spayed: '',
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <div className="text-center text-2xl font-bold mb-8">Rehome Your Pet</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium">Owner Name</label>
            <p className="w-full p-3 border border-gray-300 rounded-md bg-gray-100">
              {ownerName || "Loading..."} {/* Display 'Loading...' until the name is fetched */}
            </p>
          </div>
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Pet Name</label>
            <select
              name="petName"
              value={selectedPetName}
              onChange={handlePetChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select a Pet</option>
              {pets.map((pet, index) => (
                <option key={index} value={pet}>
                  {pet}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label className="block mb-2 font-medium">Vaccinated</label>
              <div className="flex gap-2">
                <label>
                  <input
                    type="radio"
                    name="vaccinated"
                    value="Yes"
                    onChange={handleChange}
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="vaccinated"
                    value="No"
                    onChange={handleChange}
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Spayed/Neutered</label>
              <div className="flex gap-2">
                <label>
                  <input
                    type="radio"
                    name="spayed"
                    value="Yes"
                    onChange={handleChange}
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="spayed"
                    value="No"
                    onChange={handleChange}
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? 'Saving...' : 'Save Pet'}
          </button>
        </form>

        {/* Status Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Pet Status</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-md shadow">
              <p className="font-medium">Buddy</p>
              <p>Status: Pending Review</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-md shadow">
              <p className="font-medium">Max</p>
              <p>Status: Approved</p>
            </div>
          </div>
          <button
            onClick={handleViewStatusClick}
            className="mt-6 w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            View All Statuses
          </button>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Rehome;
