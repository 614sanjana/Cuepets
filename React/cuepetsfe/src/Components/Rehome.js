import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rehome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    location: '',
    email: '',
    phone: '',
    petImage: null,
    petName: '',
    petAge: '',
    petSex: '',
    petType: '',
    petBreed: '',
    vaccinated: '',
    spayed: '',
  });

  const [petNames, setPetNames] = useState(['Buddy', 'Max', 'Bella']); // Sample data, replace with API call

  useEffect(() => {
    // Fetch pet names from API if required
    // Example: setPetNames(fetchPetNamesFromAPI());
  }, []);

  const handleViewStatusClick = () => {
    navigate('/view-status');
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setFormData({
      ownerName: '',
      location: '',
      email: '',
      phone: '',
      petImage: null,
      petName: '',
      petAge: '',
      petSex: '',
      petType: '',
      petBreed: '',
      vaccinated: '',
      spayed: '',
    });
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
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
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
          <div>
            <label className="block mb-2 font-medium">Pet Name</label>
            <select
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Select Pet</option>
              {petNames.map((name) => (
                <option key={name} value={name}>
                  {name}
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
          >
            Save Pet
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
    </div>
  );
};

export default Rehome;
