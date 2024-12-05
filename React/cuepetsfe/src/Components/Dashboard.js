import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import axios from "axios";

export default function Dashboard() {
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    profilePicture: "https://via.placeholder.com/150", // Default picture URL
  });

  const [isEditing, setIsEditing] = useState(false);
  const ownerID = localStorage.getItem("ownerID");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/getUsersByID/${ownerID}`
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [ownerID]);

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/user/viewImage/${ownerID}`
        );
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);
      } catch (err) {
        setImageUrl("https://via.placeholder.com/150");
      }
    };

    fetchImage();
  }, [ownerID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/user/setPfp/${ownerID}`, {
        file: userData.profilePicture,
      });

      console.log("User data updated:", userData);
      setIsEditing(false);
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
          <div className="mb-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className="w-60 h-60 rounded-xl mb-4"
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          {/* Upload New Profile Picture */}
          <div className="mb-6">
            <input
              type="file"
              id="profilePictureUpload"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const formData = new FormData();
                  formData.append("file", file);

                  try {
                    const response = await axios.post(
                      `http://localhost:8080/api/v1/user/setPfp/${ownerID}`,
                      formData,
                      {
                        headers: { "Content-Type": "multipart/form-data" },
                      }
                    );

                    if (response.status === 200) {
                      alert("Profile picture updated successfully.");
                      const updatedImageResponse = await fetch(
                        `http://localhost:8080/api/v1/user/viewImage/${ownerID}`
                      );
                      const imageBlob = await updatedImageResponse.blob();
                      setImageUrl(URL.createObjectURL(imageBlob));
                    }
                  } catch (error) {
                    console.error("Error uploading profile picture", error);
                  }
                }
              }}
            />
            <label
              htmlFor="profilePictureUpload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Upload New Picture
            </label>
          </div>
{/* Input Fields */}
<input
  type="text"
  name="name"
  value={userData.userName}
  onChange={handleChange}
  className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
  disabled={!isEditing}
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
  name="phone"
  value={userData.userPhone}
  onChange={handleChange}
  className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
  disabled={!isEditing}
/>


       {/* Update Button */}
<button
  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
  onClick={() => {
    if (isEditing) {
      handleUpdate(); // Save changes
    } else {
      setIsEditing(true); // Enable editing mode
    }
  }}
>
  {isEditing ? "Save Changes" : "Update Details"}
</button>
</div>

        {/* Main Content */}
        <div className="w-2/3 flex flex-col p-4">
          <div className="h-40 flex space-x-4 mb-4 text-4xl">
            <Link
              to="/pet-records"
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

          <div className="flex flex-col space-y-4 flex-grow">
            <Link
              to="/add-pet"
              className="bg-red-300 h-20 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-red-400"
            >
              Add Pet
            </Link>
            <Link
              to="/blog-post"
              className="bg-blue-300 h-20 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-400"
            >
              Post Blog
            </Link>
            <Link
              to="/manage-pets"
              className="bg-blue-300 h-20 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-400"
            >
              Manage Pet
            </Link>
            <Link
              to="/blog-manage"
              className="bg-blue-300 h-20 p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-400"
            >
              Blog Manager
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
