import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faPaw,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import "../App.css";

function AppNavbar() {
  const [nav, setNav] = useState(false);

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/signin"); // Redirect to the AboutPage component
  };

  const openNav = () => {
    setNav(!nav);
  };


  return (
    <div className="navbar-section text-2xl font-extrabold">
      <h1 className="text-4xl navbar-title">
        <Link to="/">
          CuePets <FontAwesomeIcon icon={faPaw} className="paw-icon" />
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="#" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
          Pet Record
          </a>
        </li>
        <li>
          <a href="#article" className="navbar-links">
            Article
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Appointment
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Calender
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Pet Adopt
          </a>
        </li>
        
      </ul>
      <div>
      <button
        className="navbar-btn"
        type="button"
        onClick={handleRedirect}
      >
       <FontAwesomeIcon icon={faSignInAlt} /> Sign In
      </button>
      </div>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#article">
              Article
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
              Doctors
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
      </div>
  );
}

export default AppNavbar;