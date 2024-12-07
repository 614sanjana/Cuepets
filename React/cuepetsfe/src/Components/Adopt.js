import React from 'react';
import { useNavigate } from 'react-router-dom';
import adoptme from '../Assets/adoptme.jpg'; // Correct import
import rehome from '../Assets/rehome.jpg'; // Correct import

const AdoptOrRehome = () => {
  const navigate = useNavigate();

  const handleRehomeClick = () => {
    navigate('/rehome'); // This will navigate to the Rehome component
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="text-center text-4xl font-bold mb-12 text-blue-500 font-serif">
        Adopt or Rehome a Pet ❤️
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Adopt A Pet Card */}
        <div className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
          <img
            src={adoptme}
            alt="Adopt A Pet"
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h3 className="text-2xl font-bold mb-2">Adopt A Pet!</h3>
            <p className="text-justify leading-6 mb-4">
              Find a loving home for your new best friend. Your next companion is waiting for you!
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300">
              Adopt Now
            </button>
          </div>
        </div>

        {/* Rehome Your Pet Card */}
        <div className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
          <img
            src={rehome}
            alt="Rehome Your Pet"
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h3 className="text-2xl font-bold mb-2">Rehome Your Pet</h3>
            <p className="text-justify leading-6 mb-4">
              Help your pet find a safe and loving new home. Together, let's make a difference!
            </p>
            <button
              onClick={handleRehomeClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
            >
              Rehome Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptOrRehome;
