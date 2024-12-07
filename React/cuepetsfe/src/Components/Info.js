import React from "react";
import InformationCard from "./InformationCard";
import { faFileMedical, faSyringe, faHome } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Info.css";

function PetInfo() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Offer for Your Pets</span>
        </h3>
        <p className="info-description">
          We provide services designed to enhance your pet's health and happiness. From keeping track of medical records to vaccinations and even adoption assistance, our platform is your one-stop solution for pet care.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Medical Records Management"
          description="Keep your pet's health history organized and accessible. Our platform allows you to store and manage medical records, including past treatments, prescriptions, and vet visits, ensuring you're always prepared."
          icon={faFileMedical}
        />

        <InformationCard
          title="Appointment Tracking"
          description="Stay on top of your pet's appointment schedule with our tracking service. Receive timely reminders for upcoming vaccinations and maintain a log of completed ones, keeping your pet healthy and safe."
          icon={faSyringe}
        />

        <InformationCard
          title="Pet Adoption Assistance"
          description="Looking to expand your family? Explore our pet adoption services to connect with local shelters and find your perfect companion. We also provide resources to ensure a smooth adoption process."
          icon={faHome}
        />
      </div>
    </div>
  );
}

export default PetInfo;
