import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import axios from "axios";

export default function Dashboard() {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    memberSince: "",
    profilePicture: "https://via.placeholder.com/150", // Default picture URL
  });

  const [isEditing, setIsEditing] = useState(false);
  const ownerID = localStorage.getItem("ownerID");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make API call to fetch user data (replace with actual user ID)
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/getUsersByID/${ownerID}` // Example user ID
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // Make API call to update user data (replace with actual user ID)
      await axios.post(`http://localhost:8080/api/v1/user/setPfp/${userData.id}`, {
        file: userData.profilePicture, // Add profile picture if needed
      });

      // Optionally, add update logic for other user data fields (name, email, etc.)
      console.log("User data updated:", userData);
      setIsEditing(false); // Disable editing after update
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <div>
      <AppNavbar />
      <div className="dashboard h-[90vh] flex flex-grow bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/3 bg-blue-200 p-6 flex flex-col items-center">
          {/* Profile Photo */}
          <div className="w-60 h-60 rounded-3xl bg-gray-300 mb-4 overflow-hidden">
            <img
              src={userData.pfpLocation}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Details */}
          <div className="w-full space-y-4">
            <input
              type="text"
              name="name"
              value={userData.userName}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
              disabled={!isEditing} // Make it non-editable unless in editing mode
            />
            <input
              type="email"
              name="email"
              value={userData.userEmail}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
              disabled={!isEditing}
            />
            <input
              type="text"
              name="Phone"
              value={userData.userPhone}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
              disabled={!isEditing}
            />
          </div>

          {/* Update Button */}
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save Changes" : "Update Details"}
          </button>
        </div>

        {/* Main Content */}
        <div className="w-2/3 flex flex-col p-4">
          {/* Top Half */}
          <div className="h-40 flex space-x-4 mb-4 text-4xl">
            <Link
              to="/records"
              className="flex-1 bg-purple-300 p-4 rounded-xl shadow-md hover:shadow-lg hover:bg-purple-400"
            >
              Records
            </Link>
            <Link
              to="/appointment"
              className="flex-1 bg-green-300 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-green-400"
            >
              Appointment
            </Link>
            <Link
              to="/adopt"
              className="flex-1 bg-yellow-300 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-400"
            >
              Adopt
            </Link>
          </div>

          {/* Bottom Half */}
          <div className="flex flex-col space-y-4 flex-grow">
            <Link
              to="/add-pet"
              className="bg-red-300 h-20 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-red-400"
            >
              Add Pet
            </Link>
            <Link
              to="/post-blog"
              className="bg-blue-300 h-20 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-400"
            >
              Post Blog
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
