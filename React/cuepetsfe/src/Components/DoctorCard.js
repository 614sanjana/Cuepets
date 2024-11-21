import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function DoctorCard(props) {
  return (
    <div className="dt-card">
      <img src={props.img} alt={props.name} className="dt-card-img" />
      <p className="dt-card-name">{props.name}</p>
      <p className="dt-card-title">{props.title}</p>
      <p className="dt-card-college">{props.college}</p>
    </div>
  );
}

export default DoctorCard;
