import React from 'react';
import './H3.css'; // Import the updated CSS file

function H3() {
  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">
        <h1>Enhance Your Pet Care Experience Today</h1>
        <p>
          Cue Pets simplifies pet ownership by keeping essential health records organized.
          Enjoy peace of mind knowing your pet's health is always in check.
        </p>

        {/* Floating Paw Symbols */}
        
        <div className="paw-symbol">🐾</div>
        
        <div className="paw-symbol">🐾</div>

        {/* Buttons */}
        <div className="text-center mt-5">
        <button className="btn btn-primary me-3">Sign Up</button>
      
      </div>
    </div>

      {/* Right Section */}
      <div className="right-section"></div>
    </div>
  );
}

export default H3;
