import React from "react";
import "./H4.css";
import Dog from '../Videos/Dog.mp4' ;// Replace with the actual path to your video

const App = () => {
  return (
    <div className="container">
      {/* Left Content Section */}
      <div className="content">
        <h1>Join the Cue Pets Community</h1>
        <p>
          Sign up today to manage your pet's health and adoption journey
          effortlessly with Cue Pets.
        </p>
        <button className="signup-button">
          <span className="icon">M</span> Sign Up
        </button>
      </div>

      {/* Right Video Section */}
      <div className="video-section">
        <video autoPlay loop muted>
          <source src={Dog} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default App;
