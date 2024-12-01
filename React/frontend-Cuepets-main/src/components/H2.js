import React from "react";
import './H2.css';
import hm from '../images/hm.jpg';

const H2 = () => {
  return (
    <div className="features-section">
      {/* Heading Section */}
      <div className="text-center mb-5">
        <h2 className="features-heading">
          Discover the Essential Features of <span className="highlight">CuePets</span>
        </h2>
        
      </div>

      {/* Features and Image Section */}
      <div className="features-container">
        {/* Left Features */}
        <div className="features-column">
          <div className="feature-box">
            <div className="feature-icon">💊</div>
            <h4 className="feature-title">Track Medical Records</h4>
            <p className="feature-description">
              Keep all your pet's medical records organized and easily accessible whenever you need them.
            </p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">💉</div>
            <h4 className="feature-title">Vaccination Log</h4>
            <p className="feature-description">
              Stay on top of your pet's vaccinations and ensure their health is always a priority.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="image-column">
          <img
            src={hm}
            alt="Pet owner with a pet"
            className="feature-image"
          />
        </div>

        {/* Right Features */}
        <div className="features-column">
          <div className="feature-box">
            <div className="feature-icon">🐾</div>
            <h4 className="feature-title">Pet Adoption Made Easy</h4>
            <p className="feature-description">
              Find your perfect pet companion with our streamlined adoption process and resources.
            </p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">👥</div>
            <h4 className="feature-title">Join Our Community</h4>
            <p className="feature-description">
              Become part of a supportive network of pet lovers and share your experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-5">
        <button className="btn btn-primary me-3">Learn More</button>
        <button className="btn btn-outline-primary">Sign Up</button>
      </div>
    </div>
  );
};

export default H2;
