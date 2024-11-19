import React from "react";
import Doctor from "../Assets/animal2.png";
import SolutionStep from "./SolutionStep";
import "../Styles/About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
        Welcome to Cue Pets, a comprehensive platform designed to help pet owners
         easily manage health records, track vaccination schedules, and
          access trusted veterinary information. Cue Pets is here to simplify
           pet healthcare, ensuring you never miss a vital checkup or vaccination. Stay 
           proactive and keep your pets happy and healthy with Cue Pets!.
        </p>

        <h4 className="about-text-title">Key Features</h4>

        <SolutionStep
          title="Pet medical records and vaccination tracking"
          description="Securely store and access your pet’s health records in one place."
        />

        <SolutionStep
          title="Adoption services to connect pets with homes"
          description="Connect loving pets with forever homes through our easy-to-use adoption platform."
        />

        <SolutionStep
          title="Veterinary articles and care guides"
          description="Access expert articles on pet care, health, and wellness."
        />
      </div>
    </div>
  );
}

export default About;
