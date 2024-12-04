import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import food from '../Assets/food.jpeg';
import vet1 from '../Assets/vet1.jpeg';
import behav from '../Assets/behav.jpeg';

const ManagePets = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  const articles = [
    {
      title: "Healthy Pet Diets",
      description: "Discover the best nutrition practices for your pets.",
      image: food,
      tips: [
        "Include proteins, fats, and carbohydrates in their meals.",
        "Avoid human food that can be toxic, such as chocolate or onions.",
        "Provide fresh water at all times.",
        "Add omega-3 fatty acids for a shiny coat and healthy skin.",
        "Monitor portion sizes to maintain a healthy weight.",
        "Avoid over-reliance on dry food; mix with wet food for variety.",
        "Consult your vet for customized diet plans based on breed and health needs.",
      ],
    },
    {
      title: "Behavioral Training Tips",
      description: "Effective ways to improve your pet’s behavior.",
      image: behav,
      tips: [
        "Use positive reinforcement like treats and praise.",
        "Establish a consistent training routine.",
        "Be patient and avoid punishment-based methods.",
      ],
    },
    {
      title: "Guidance on Vet Visits",
      description: "Regular checkups are essential for early detection of health issues.",
      image: vet1,
      tips: [
        "Schedule yearly wellness exams.",
        "Keep up with vaccinations and parasite control.",
        "Monitor your pet for any unusual behavior or symptoms.",
      ],
    },
  ];

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleBackButton = () => {
    window.history.back();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-white to-blue-100 text-center font-sans animate-fadeIn">
      <button
        className="fixed top-5 left-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:-translate-x-1 transition-all"
        onClick={handleBackButton}
      >
        &larr; Back
      </button>

      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Advanced Pet Care Articles
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore in-depth guidance on pet nutrition, training, and health care.
      </p>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-80 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full rounded-lg mb-4 transform transition-transform hover:scale-105"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              {article.title}
            </h3>
            <p className="text-gray-500 mb-4">{article.description}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transform hover:scale-105 transition-all"
              onClick={() => toggleReadMore(index)}
            >
              {expandedIndex === index ? "Show Less" : "Read More"}
            </button>
            {expandedIndex === index && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg shadow text-left">
                <h4 className="text-lg font-semibold text-blue-600 mb-2">
                  Quick Tips:
                </h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {article.tips.map((tip, i) => (
                    <li key={i} className="mb-1">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePets;
