import React, { useState } from 'react';
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

  const handleViewStatusClick = () => {
    navigate('/view-status'); // This will navigate to the Rehome component
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
    // Reset the form after submission
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
    <div className="p-6 bg-gray-100 min-h-screen relative">
      {/* "View Status" Button */}
      <button
        onClick={handleViewStatusClick} // Navigates to the View Status page
        className="absolute top-6 right-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        View Status
      </button>

      {/* Page Title */}
      <div className="text-center text-2xl font-bold mb-8">Rehome Your Pet</div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block mb-2">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block mb-2">Pet Image</label>
          <input
            type="file"
            name="petImage"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block mb-2">Pet Name</label>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2">Pet Age</label>
            <input
              type="number"
              name="petAge"
              value={formData.petAge}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2">Sex</label>
            <input
              type="text"
              name="petSex"
              value={formData.petSex}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2">Type</label>
            <input
              type="text"
              name="petType"
              value={formData.petType}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2">Breed</label>
            <input
              type="text"
              name="petBreed"
              value={formData.petBreed}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="mr-4">
            <label className="mr-2">Vaccinated</label>
            <input
              type="radio"
              name="vaccinated"
              value="Yes"
              onChange={handleChange}
              required
            />{' '}
            Yes
            <input
              type="radio"
              name="vaccinated"
              value="No"
              onChange={handleChange}
              required
            />{' '}
            No
          </div>

          <div>
            <label className="mr-2">Spayed/Neutered</label>
            <input
              type="radio"
              name="spayed"
              value="Yes"
              onChange={handleChange}
              required
            />{' '}
            Yes
            <input
              type="radio"
              name="spayed"
              value="No"
              onChange={handleChange}
              required
            />{' '}
            No
          </div>
        </div>

        <button
          type="submit"
          onClick={handleViewStatusClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Save Pet
        </button>
      </form>
    </div>
  );
};

export default Rehome;
