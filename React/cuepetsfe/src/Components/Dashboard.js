import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";

export default function Dashboard() {
  return (
    <div>
      <AppNavbar />
      <div className="dashboard h-[90vh] flex flex-grow bg-gray-100 ">
        {/* Sidebar */}
        <div className="w-1/3 bg-blue-200 p-6 flex flex-col items-center">
          {/* Profile Photo */}
          <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Details */}
          <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
          <p className="text-gray-600">johndoe@example.com</p>
          <p className="text-gray-600">Member since: Jan 2022</p>

          {/* Update Button */}
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
            Update Details
          </button>
        </div>

        {/* Main Content */}
        <div className="w-2/3 flex flex-col p-4">
          {/* Top Half */}
          <div className="h-40 flex space-x-4 mb-4 text-4xl ">
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
          <div className="x flex flex-col space-y-4 flex-grow ">
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
