import React from "react";
import './Review.css';
import Edmund from '../images/Edmund.jpeg';
import Lucy from '../images/Lucy.jpg';
import Peter from '../images/peter.jpeg';
import Susan from '../images/sss.jpeg'; // Ensure the path is correct

// Sample data for customer reviews
const reviews = [
  {
    name: "Lucy",
    review: "Cue Pets has revolutionized the way I manage my pet's health. The platform is so easy to use and has helped me keep track of all the important records!",
    image: Lucy, // Use the imported image variable
  },
  {
    name: "Edmund",
    review: "A fantastic service! My pet's medical records are now organized, and I can track vaccinations easily. Highly recommend Cue Pets to any pet owner.",
    image: Edmund, // Use the imported image variable
  },
  {
    name: "Susan",
    review: "I love how Cue Pets helps me stay on top of my pet's healthcare. The reminder feature for vaccinations and vet visits is especially useful.",
    image: Susan, // Use the imported image variable
  },
  {
    name: "Peter",
    review: "I love how Cue Pets helps me stay on top of my pet's healthcare. The reminder feature for vaccinations and vet visits is especially useful.",
    image: Peter, // Use the imported image variable
  },
];

const CustomerReviews = () => {
  return (
    <div className="reviews-container">
      <h2 className="reviews-heading">What Our Customers Say</h2>
      <div className="reviews-wrapper">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <img src={review.image} alt={review.name} className="reviewer-image" />
            <div className="review-content">
              <p className="review-text">"{review.review}"</p>
              <p className="reviewer-name">- {review.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
