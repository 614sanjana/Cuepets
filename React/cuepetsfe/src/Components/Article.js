import React from "react";
import Pets from "../Assets/animal3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/Article.css";

function Article() {
  const navigate = useNavigate();

  const handleExploreArticlesClick = () => {
    navigate("/articles");
  };

  return (
    <div className="ba-section" id="article">
      <div className="ba-image-content">
        <img src={Pets} alt="Happy Pets Group" className="ba-image1" />
      </div>

      <div className="ba-text-content">
        <h3 className="ba-title">
          <span>Pet Care Tips & Articles</span>
        </h3>
        <p className="ba-description">
          Explore our resources to ensure your pets are happy and healthy. From expert advice to practical tips, we’ve got everything you need to provide the best care for your furry companions.
        </p>

        <p className="ba-checks ba-check-first">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Expert-Reviewed Pet Articles
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Tips for a Healthy Lifestyle
        </p>
        <p className="ba-checks">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Guidance on Pet Nutrition
        </p>
        <p className="ba-checks ba-check-last">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Behavioral Training Tips
        </p>

        <button
          className="text-appointment-btn"
          type="button"
          onClick={handleExploreArticlesClick}
        >
          <FontAwesomeIcon icon={faPaw} /> Explore Articles
        </button>
      </div>
    </div>
  );
}

export default Article;
