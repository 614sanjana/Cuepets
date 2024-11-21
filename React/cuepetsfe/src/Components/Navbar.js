import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faPaw,
  faSignInAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isSignInPanelOpen, setIsSignInPanelOpen] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };


  return (
    <div className="navbar-section text-2xl font-extrabold">
      <h1 className="navbar-title">
        <Link to="/">
          Cuepets <FontAwesomeIcon icon={faPaw} className="paw-icon" />
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            Services
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            About
          </a>
        </li>
        <li>
          <a href="#article" className="navbar-links">
            Article
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Creators
          </a>
        </li>
      </ul>
      <div>
      <button
        className="navbar-btn"
        type="button"
      >
        <Link to="/signin" className="navbar-links">
       <FontAwesomeIcon icon={faSignInAlt} /> Sign In</Link>
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

export default Navbar;