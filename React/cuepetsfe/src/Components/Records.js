import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Record = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [imageToShow, setImageToShow] = useState(null); // The image to display in the modal
  const navigate = useNavigate();

  // Fetch pets data
  useEffect(() => {
    const ownerId = localStorage.getItem("ownerID");
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/pets/allPets/${ownerId}`);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  // Fetch health records for the selected pet
  useEffect(() => {
    if (selectedPet) {
      const fetchHealthRecords = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/healthrecord/getRecords/${selectedPet.petID}`
          );
          setHealthRecords(response.data || []);
        } catch (error) {
          console.error("Error fetching health records:", error);
        }
      };

      fetchHealthRecords();
    }
  }, [selectedPet]);

  const handleViewRecords = (pet) => {
    setSelectedPet(pet);
  };

  const handleBackButton = () => {
    window.history.back();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAddRecord = async () => {
    if (!selectedPet || !selectedFile) {
      alert("Please select a pet and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/healthrecord/addRecord/${selectedPet.petID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data);
      setSelectedFile(null); // Clear the selected file
      // Fetch the updated health records
      const updatedRecords = await axios.get(
        `http://localhost:8080/api/v1/healthrecord/getRecords/${selectedPet.petID}`
      );
      setHealthRecords(updatedRecords.data || []);
    } catch (error) {
      console.error("Error adding health record:", error);
    }
  };

  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  // Open the modal with the image
  const handleViewImage = async (record) => {
    const recordID = record.recordID; // Get the recordID for the specific record

    // Store the recordID in localStorage to persist it
    localStorage.setItem("recordID", recordID);

    try {
      // Fetch the image using the stored recordID
      const response = await fetch(`http://localhost:8080/api/v1/healthrecord/viewImage/${recordID}`);
      
      if (!response.ok) {
        throw new Error("Image not found or an error occurred");
      }

      // Create a URL for the image from the response blob
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      
      // Set the image URL in the state to display in the modal
      setImageToShow(imageUrl);
      setShowModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setImageToShow(null);
  };

  return (
    <div className="h-screen p-8 bg-gradient-to-br from-white to-blue-100 text-center font-sans">
      <button
        className="fixed top-5 left-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:-translate-x-1 transition-all"
        onClick={handleBackButton}
      >
        &larr; Back
      </button>

      <h1 className="text-4xl font-bold text-blue-600 mb-6">Pet Health Records</h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage and view all your pet health records.
      </p>

      <div className="flex h-full">
        {/* Left Side: Pet List */}
        <div className="w-1/4 p-6 overflow-y-auto bg-white shadow rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Pets</h2>
          {pets.length === 0 ? (
            <p className="text-gray-500">No pets found. Add your pets to see them here.</p>
          ) : (
            pets.map((pet, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg w-6/7 shadow-md p-4 mb-4 hover:shadow-lg transition-all"
              >
                <img
                  src={pet.petImage || "https://via.placeholder.com/150"}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-blue-600">{pet.petName}</h3>
                <p className="text-gray-600">Age: {pet.petAge}</p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                  onClick={() => handleViewRecords(pet)}
                >
                  View Records
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Pet Details */}
        <div className="w-3/4 p-6 bg-blue-50 shadow rounded-lg">
          {selectedPet ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-blue-600">
                  {selectedPet.petName}'s Records
                </h2>
                <label className="block">
                  <input type="file" onChange={handleFileChange} />
                  <button
                    className="bg-green-600 text-white px-6 py-2 ml-4 rounded-lg shadow hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 transform hover:scale-105 transition-all"
                    onClick={handleAddRecord}
                  >
                    + Add New Record
                  </button>
                </label>
              </div>
              <table className="table-auto w-full border-collapse mb-6">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {healthRecords.map((record) => (
                    <tr key={record.recordID}>
                      <td className="border px-4 py-2">{record.recordDateAndTime}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                          onClick={() => handleViewImage(record)} // Pass the record to view the image
                        >
                          View Image
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a pet on the left to view its records.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for full-screen image */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4">
            <button
              className="absolute top-0 right-0 bg-red-600 text-white p-2 rounded-full"
              onClick={closeModal}
            >
              X
            </button>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <img src={imageToShow} alt="Health Record" className="max-w-full max-h-screen" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Record;
