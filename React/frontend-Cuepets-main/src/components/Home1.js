import React from 'react'
import './home1.css';


const home1 = () => {
  return (
    <div>
     <div className="features-section">
      {/* Heading Section */}
      <div className="text-center mb-5">
        <h2 className="features-heading">
          Discover the Essential Features of <span className="highlight">Cue Pets</span>
        </h2>
        <p className="features-subheading">
          Cue Pets offers a comprehensive solution for pet owners. Manage your pet's health
          and adoption journey with ease.
        </p>
      </div>

      {/* Features and Image Section */}
      <div className="row align-items-center">
        {/* Left Features */}
        <div className="col-md-3 text-center feature-box">
          <div className="feature-icon">💊</div>
          <h4 className="feature-title">Track Medical Records</h4>
          <p className="feature-description">
            Keep all your pet's medical records organized and easily accessible whenever you
            need them.
          </p>
        </div>
        <div className="col-md-3 text-center feature-box">
          <div className="feature-icon">💉</div>
          <h4 className="feature-title">Vaccination Log</h4>
          <p className="feature-description">
            Stay on top of your pet's vaccinations and ensure their health is always a
            priority.
          </p>
        </div>

        {/* Image Section */}
        <div className="col-md-3 text-center">
          <img
            src="https://via.placeholder.com/300"
            alt="Pet owner with a pet"
            className="feature-image"
          />
        </div>

        {/* Right Features */}
        <div className="col-md-3 text-center feature-box">
          <div className="feature-icon">🐾</div>
          <h4 className="feature-title">Pet Adoption Made Easy</h4>
          <p className="feature-description">
            Find your perfect pet companion with our streamlined adoption process and
            resources.
          </p>
        </div>
        <div className="col-md-3 text-center feature-box">
          <div className="feature-icon">👥</div>
          <h4 className="feature-title">Join Our Community</h4>
          <p className="feature-description">
            Become part of a supportive network of pet lovers and share your experiences.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center mt-5">
        <button className="btn btn-primary me-3">Learn More</button>
        <button className="btn btn-outline-primary">Sign Up</button>
      </div>
    </div>
  

    </div>
  )
}

export default home1
