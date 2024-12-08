import React from 'react';
import { useNavigate } from 'react-router-dom';
import adoptme from '../Assets/adoptme.jpg'; // Correct import
import rehome from '../Assets/rehome.jpg'; // Correct import

const AdoptOrRehome = () => {
  const navigate = useNavigate();

  const handleRehomeClick = () => {
    navigate('/rehome'); // This will navigate to the Rehome component
  };

  const handleAdoptClick = () => {
    navigate('/adopt-pet'); // This will navigate to the Adopt component
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="p-0 h-screen flex flex-col items-center bg-center bg-contain overflow-hidden">

      <div className="text-center text-5xl mb-3 font-bold text-blue-500 mt-0 font-serif rounded-lg backdrop-blur bg-white/70">
        Adopt or Rehome a Pet ❤️
      </div>

      {/* YouTube Video and Cards Section */}
      <div className="flex w-full  gap-60">
        {/* YouTube Video Section (Left Side) */}
        <div className="w-1/2">
          <iframe
            width="100%"
            height="650"
            src="https://www.youtube.com/embed/ieHv-6UUftc"
            title="Adopt or Rehome a Pet"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow-md"
          ></iframe>
        </div>

        {/* Card Section (Right Side) */}
        <div className="w-3/7 grid grid-cols-1 gap-10">
          {/* Adopt A Pet Card */}
          <div className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
            <img
              src={adoptme}
              alt="Adopt A Pet"
              className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-6 p-5 text-white z-10">
              <h3 className="text-2xl font-bold mb-2 text-red-600">Adopt A Pet!</h3>
              <p className="text-justify leading-6 mb-4 text-violet-950 font-bold">
                Find a loving home for your new best friend. Your next companion is waiting for you!
              </p>
              <button 
                onClick={handleAdoptClick}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
              >
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
            <div className="absolute bottom-6 p-5 text-white z-10">
              <h3 className="text-2xl font-bold mb-2 text-red-600">Rehome Your Pet</h3>
              <p className="leading-5 mb-4 text-violet-950 font-bold">
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
    </div>
  );
};

export default AdoptOrRehome;
