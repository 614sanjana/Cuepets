import React from "react";
import DoctorCard from "./DoctorCard";
import profile1 from "../Assets/har.png";
import profile2 from "../Assets/mah.png";
import profile3 from "../Assets/san.png";
import profile4 from "../Assets/thr.png";
import "../Styles/Doctors.css";

function Creators() {
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Meet Our Creator Team</span>
        </h3>

        <p className="dt-description">
        Meet our exceptional team of budding developers, dedicated to
        developing a user friendly all in one pet-vet app.
        </p>
      </div>

      <div className="dt-cards-content">
        <DoctorCard
          img={profile1}
          name="Harshitha A Pai"
          title="4CB22CG012"
          college="Canara Engineering College"
        />
        <DoctorCard
          img={profile2}
          name="Mahima U S"
          title="4CB22CG022"
          college="Canara Engineering College"
        />
        <DoctorCard
          img={profile3}
          name="Sanjana Karanth U"
          title="4CB22CG041"
          college="Canara Engineering College"
        />
        <DoctorCard
          img={profile4}
          name="Thrisha S Shetty"
          title="4CB22CG055"
          college="Canara Engineering College"
        />
      </div>
    </div>
  );
}

export default Creators;
