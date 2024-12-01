import React from "react";
import { Link } from 'react-router-dom';
import './Home.css' // Correct path to your home.css

import first from "../images/first.jpg"; // Correctly importing the image

const Home = () => {
  return (
    <div className="container-fluid" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Upper Section with Background Image */}
      <div 
        className="upper-section"
        style={{
          flex: 1,
          backgroundImage: `url(${first})`, // Use the imported image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Lower Section with Solid Color */}
      <div 
        className="lower-section"
        style={{
          flex: 1,
          backgroundColor: "#ff8c00", // Orange color
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "20px" }}>
          Your Pet's Health, Simplified and Streamlined
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 1, animation: "fadeInUp 1.5s forwards" }}>
          Welcome to Cue Pets, where we empower pet owners to effortlessly manage their furry friends' medical records, vaccination logs, and adoption journeys. Join our community and ensure your pet's health is always a priority.
        </p>
        <div className="mt-4">
          <button className="btn btn-light me-3">
          <Link className="nav-link" to="/Sign">
            Get Started </Link></button>
          <button className="btn btn-outline-light">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
