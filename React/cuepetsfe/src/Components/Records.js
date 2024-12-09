import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Record = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);
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

  const handleAddRecord = async () => {
    if (!selectedPet || !imageFile || !description) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("description", description);

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
      setImageFile(null);
      setDescription("");
      setShowAddRecordModal(false);
      // Fetch the updated health records
      const updatedRecords = await axios.get(
        `http://localhost:8080/api/v1/healthrecord/getRecords/${selectedPet.petID}`
      );
      console.log(response.data);
      setHealthRecords(updatedRecords.data || []);
    } catch (error) {
      console.error("Error adding health record:", error);
    }
  };

  const handleViewImage = async (record) => {
    const recordID = record.recordID;

    try {
      const response = await fetch(`http://localhost:8080/api/v1/healthrecord/viewImage/${recordID}`);
      if (!response.ok) {
        throw new Error("Image not found or an error occurred");
      }
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageToShow(imageUrl);
      setShowModal(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setImageToShow(null);
  };

  const handleDeleteRecord = async (recordID) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/healthrecord/deleteHealthRecord/${recordID}`);
      alert(response.data); // Show success message from the backend
      // Fetch the updated health records after deletion
      if (selectedPet) {
        const updatedRecords = await axios.get(
          `http://localhost:8080/api/v1/healthrecord/getRecords/${selectedPet.petID}`
        );
        setHealthRecords(updatedRecords.data || []);
      }
    } catch (error) {
      console.error("Error deleting health record:", error);
      alert("Error deleting health record.");
    }
  };

  return (
    <div className="h-screen p-4 bg-gradient-to-br from-white to-blue-100 text-center font-sans">
      <h1 className="text-4xl font-bold text-blue-600 mb-0">Pet Health Records</h1>
      <p className="text-lg text-gray-600 mb-8">Manage and view all your pet health records.</p>
      <div className="flex h-full">
        {/* Left Side: Pet List */}
        <div className="w-1/4 p-6 overflow-y-auto bg-white shadow rounded-lg max-h-screen">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Pets</h2>
          {pets.length === 0 ? (
            <p className="text-gray-500">No pets found. Add your pets to see them here.</p>
          ) : (
            pets.map((pet, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg w-3/4 ml-14 shadow-md p-4 mb-4 hover:shadow-lg transition-all"
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
                <h2 className="text-2xl font-semibold text-blue-600">{selectedPet.petName}'s Records</h2>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 focus:outline-none"
                  onClick={() => setShowAddRecordModal(true)}
                >
                  + Add New Record
                </button>
              </div>
              <table className="table-auto w-full border-collapse mb-6">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {healthRecords.map((record) => (
                    <tr key={record.recordID}>
                      <td className="border px-4 py-2">{record.recordDateAndTime}</td>
                      <td className="border px-4 py-2">{record.description}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                          onClick={() => handleViewImage(record)}
                        >
                          View Image
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 ml-10 py-2 rounded-lg hover:bg-red-800 mt-2"
                          onClick={() => handleDeleteRecord(record.recordID)}
                        >
                          Delete
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

      {/* Modal for Adding Record */}
      {showAddRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Record</h2>
            <input
              type="file"
              className="mb-4"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <textarea
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
                onClick={handleAddRecord}
              >
                Save
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowAddRecordModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Viewing Image */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4">
            <button
              className="absolute top-0 right-0 bg-red-600 text-white p-2 rounded-full"
              onClick={closeModal}
            >
              X
            </button>
            {imageToShow ? (
              <img src={imageToShow} alt="Health Record" className="max-w-full max-h-screen" />
            ) : (
              <p className="text-red-500">Error loading image</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Record;
