import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Info from "../Components/Info";
import About from "../Components/About";
import Article from "../Components/Article";
import Reviews from "../Components/Reviews";
import Footer from "../Components/Footer";
import Creators from "../Components/Creators";

function Home() {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      <Info />
      <About />
      <Article />
      <Reviews />
      <Creators/>
      <Footer />
    </div>
  );
}

export default Home;
