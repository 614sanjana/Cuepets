import React, { useState } from "react";
import { petFacts } from "../Scripts/petFacts"; // Import pet facts
import "../Styles/Reviews.css";

function PetFacts() {
  const factsLength = petFacts.length - 1;
  const [factIndex, setFactIndex] = useState(0);

  // Navigate to the previous fact
  const handlePreviousFact = () => {
    setFactIndex(factIndex <= 0 ? factsLength : factIndex - 1);
  };

  // Navigate to the next fact
  const handleNextFact = () => {
    setFactIndex(factIndex >= factsLength ? 0 : factIndex + 1);
  };

  const { fact, petType } = petFacts[factIndex];

  return (
    <div className="fact-section" id="pet-facts">
      <div className="rw-text-content">
        <p className="rw-text-title">
          Fascinating <span className="rw-text-highlight">Pet Facts</span>
        </p>

        <p className="rw-text-format">
          <span className="rw-text-quote1">''</span>
          <span className="rw-fact">{fact}</span>
          <span className="rw-text-quote2">''</span>
        </p>

        <p className="rw-pet-type">~ About {petType}</p>

        <div className="rw-btns">
          <button
            className="rw-next-btn"
            type="button"
            onClick={handlePreviousFact}
          >
            ←
          </button>
          <button
            className="rw-next-btn"
            type="button"
            onClick={handleNextFact}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetFacts;
