import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import Record from "./Records";
import BlogManage from "./BlogManage";
import AppointmentScheduler from "./AppointmentForm";
import AdoptOrRehome from "./Adopt";
import axios from 'axios';

export default function DashHome() {
  const ownerID = localStorage.getItem("ownerID");
  const [currentComponent, setCurrentComponent] = useState('home');
  const [pets, setPets] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  const handleLinkClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const ownerId = localStorage.getItem('ownerID');
        const response = await axios.get(`http://localhost:8080/api/v1/pets/allPets/${ownerId}`);
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    const fetchImage = async (petID) => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/pets/viewImage/${petID}`);
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrls((prevState) => ({
          ...prevState,
          [petID]: imageUrl,
        }));
      } catch (err) {
        setImageUrls((prevState) => ({
          ...prevState,
          [petID]: "https://via.placeholder.com/150", // Fallback image
        }));
      }
    };

    pets.forEach(pet => {
      if (!imageUrls[pet.petID]) {
        fetchImage(pet.petID);
      }
    });
  }, [pets, imageUrls]);

  if (!ownerID) {
    alert("Login First !!");
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppNavbar onLinkClick={handleLinkClick} />
      <div className="flex-grow mt-2 p-4">
        {currentComponent === 'home' && (
          <div>
            <h1 className="text-4xl font-bold text-blue-600 mb-6">My Pets</h1>
            <div className="flex flex-wrap ml-0 p-10 gap-6 max-w-6xl mx-auto">
              {pets.slice(0, 2).map((pet, index) => ( // Show only first two pets
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-4 w-40 sm:w-60 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl"
                >
                  <img
                    src={imageUrls[pet.petID] || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-24 h-24 rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-semibold text-blue-600">{pet.petName}</h3>
                  <p className="text-gray-500">Age: {pet.petAge}</p>
                </div>
              ))}
              <div
                className="bg-gray-100 rounded-xl shadow-lg p-4 w-40 sm:w-60 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                onClick={() => setCurrentComponent('dashboard')}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-blue-600 font-bold">View More Pets</p>
                  <span className="text-sm text-gray-500">(Go to Dashboard)</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentComponent === 'petrecord' && <Record />}
        {currentComponent === 'article' && <BlogManage />}
        {currentComponent === 'appointment' && <AppointmentScheduler />}
        {currentComponent === 'petadopt' && <AdoptOrRehome />}
        {currentComponent === 'dashboard' && <Dashboard />}
      </div>
      <Footer />
    </div>
  );
}
