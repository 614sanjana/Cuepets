import React from "react";
import DoctorCard from "./DoctorCard";
import profile1 from "../Assets/profile-1.png";
import profile2 from "../Assets/profile-2.png";
import profile3 from "../Assets/profile-3.png";
import profile4 from "../Assets/profile-4.png";
import "../Styles/Doctors.css";

function Creators() {
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Meet Our Creator Team</span>
        </h3>

        <p className="dt-description">
          Meet our exceptional team of specialist doctors, dedicated to
          providing top-notch healthcare services at Health Plus. Trust in their
          knowledge and experience to lead you towards a healthier and happier
          life.
        </p>
      </div>

      <div className="dt-cards-content">
        <DoctorCard
          img={profile1}
          name="Harshitha A Pai"
          title="Backend Developer"
          college="Canara Engineering College"
        />
        <DoctorCard
          img={profile1}
          name="Sanjana"
          title="Backend Developer"
          college="Canara Engineering College"
        />
        <DoctorCard
          img={profile1}
          name="Mahima"
          title="Frontend Developer"
          college="Canara Engineering College"
        />
        <DoctorCard
          img={profile1}
          name="Trisha"
          title="Frontend Developer"
          college="Canara Engineering College"
        />
      </div>
    </div>
  );
}

export default Creators;
